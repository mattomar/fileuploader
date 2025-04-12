import React, { useEffect, useState } from "react";
import FolderCard from "./folderCard";
import FileCard from "./fileCard";
import CreateFolder from "./createFolderForm";
import UploadButton from "../components/uploadFileButton";
import { fetchFolders, fetchFiles, uploadFile } from "../utils/api";
import "../styles/folderFileView.css";

const FolderFileView = () => {
  const [folders, setFolders] = useState([]);
  const [orphanFiles, setOrphanFiles] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadedURL, setUploadedURL] = useState("");
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchFoldersAndFiles();
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
      if (data.url) {
        setUploadedURL(data.url);
        fetchFoldersAndFiles();
      } else {
        setError("Upload succeeded, but no URL returned.");
      }
    } catch (err) {
      console.error("Upload failed:", err);
      setError("Upload failed. Check your server.");
    } finally {
      setUploading(false);
    }
  };

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

          <CreateFolder onFolderCreated={(newFolder) => setFolders((prev) => [newFolder, ...prev])} />
        </div>

        {selectedFile && !uploading && <p className="selected-file">{selectedFile.name}</p>}

        {uploadedURL && (
          <div className="upload-result">
            <p className="upload-success">Uploaded URL:</p>
            <a href={uploadedURL} target="_blank" rel="noopener noreferrer">
              {uploadedURL}
            </a>
          </div>
        )}

        {error && <p className="upload-error">{error}</p>}
      </div>

      <div className="folder-list">
        {folders.map((folder) => (
          <FolderCard
            key={folder.id}
            folder={folder}
            onDelete={(deletedId) =>
              setFolders((prevFolders) => prevFolders.filter((f) => f.id !== deletedId))
            }
            refresh={fetchFoldersAndFiles}
          />
        ))}
        {orphanFiles.map((file) => (
          <FileCard
            key={file.id}
            file={file}
            onDelete={(deletedId) =>
              setOrphanFiles((prev) => prev.filter((f) => f.id !== deletedId))
            }
          />
        ))}
      </div>
    </div>
  );
};

export default FolderFileView;