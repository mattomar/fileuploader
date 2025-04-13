import React, { useEffect, useState } from "react";
import FolderCard from "./folderCard";
import FileCard from "./fileCard";
import CreateFolder from "./createFolderForm";
import UploadButton from "../components/uploadFileButton";
import { fetchFolders, fetchFiles, uploadFile, moveFile } from "../utils/api";
import "../styles/folderFileView.css";

const FolderFileView = () => {
  const [folders, setFolders] = useState([]);
  const [orphanFiles, setOrphanFiles] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadedURL, setUploadedURL] = useState("");
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const [showInitialLoading, setShowInitialLoading] = useState(true);
  const [movingFileIds, setMovingFileIds] = useState([]);

  useEffect(() => {
    // show loading screen for 4 seconds
    const timer = setTimeout(() => setShowInitialLoading(false), 3000);

    // start fetching in the background
    fetchFoldersAndFiles();

    return () => clearTimeout(timer);
  }, []);

  const fetchFoldersAndFiles = async () => {
    try {
      const folderData = await fetchFolders();
      setFolders(Array.isArray(folderData) ? folderData : []);

      const { files } = await fetchFiles();
      const unsorted = files.filter((file) => !file.folderId);
      setOrphanFiles(unsorted);
    } catch (err) {
      console.error("Error fetching folders/files", err);
    }
  };

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setSelectedFile(file);
    setUploading(true);
    setError("");
    setUploadedURL("");

    try {
      const data = await uploadFile(file);
      if (data.file?.path) {
        setUploadedURL(data.file.path);
        if (data.file.folderId === null) {
          setOrphanFiles((prev) => [data.file, ...prev]);
        }
      }
    } catch (err) {
      console.error("Upload failed:", err);
      setError("Upload failed. Check your server.");
    } finally {
      setUploading(false);
    }
  };

  const handleMoveFile = async (fileId, folderId) => {
    setMovingFileIds((prev) => [...prev, fileId]);

    try {
      const response = await moveFile(fileId, folderId);
      if (response.success) {
        setOrphanFiles((prev) => prev.filter((file) => file.id !== fileId));
        setFolders((prev) =>
          prev.map((folder) =>
            folder.id === folderId
              ? {
                  ...folder,
                  files: [...(folder.files || []), response.file],
                }
              : folder
          )
        );
      } else {
        setError("Failed to move the file.");
      }
    } catch (err) {
      console.error("Error moving file:", err);
      setError("Error moving the file.");
    } finally {
      setMovingFileIds((prev) => prev.filter((id) => id !== fileId));
    }
  };

  if (showInitialLoading) {
    return (
      <div className="spinner-container">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className="folder-file-container">
      <h1 className="main-title">My Folders</h1>

      <div className="upload-section">
        <div className="button-row">
          <UploadButton
            uploading={uploading}
            selectedFile={selectedFile}
            onChange={handleFileChange}
          />
          <CreateFolder
            onFolderCreated={(newFolder) =>
              setFolders((prev) => [newFolder, ...prev])
            }
          />
        </div>

     
        {error && <p className="upload-error">{error}</p>}
      </div>

      <div className="folder-list">
        {folders.map((folder) => (
          <FolderCard
            key={folder.id}
            folder={folder}
            onDelete={(deletedId) =>
              setFolders((prev) => prev.filter((f) => f.id !== deletedId))
            }
            refresh={fetchFoldersAndFiles}
          />
        ))}

        {orphanFiles.map((file) => (
          <FileCard
            key={file.id}
            file={file}
            loading={movingFileIds.includes(file.id)}
            onDelete={(deletedId) =>
              setOrphanFiles((prev) => prev.filter((f) => f.id !== deletedId))
            }
            onMove={(folderId) => handleMoveFile(file.id, folderId)}
          />
        ))}
      </div>
    </div>
  );
};

export default FolderFileView;