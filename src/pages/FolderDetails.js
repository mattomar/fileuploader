import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import FolderCard from "../components/folderCard";
import FileCard from "../components/fileCard";
import UploadButton from "../components/uploadFileButton";
import CreateFolder from "../components/createFolderForm";
import {
  uploadFileToFolder,
  getFolderById,
} from "../utils/api";

import "../styles/folderDetails.css";

const FolderDetails = () => {
  const { id } = useParams();
  const [folder, setFolder] = useState(null);
  const [files, setFiles] = useState([]);
  const [subfolders, setSubfolders] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadedURL, setUploadedURL] = useState("");
  const [error, setError] = useState("");

  const fetchFolder = async () => {
    try {
      const data = await getFolderById(id);
      setFolder(data.folder);
      setFiles(data.files || []);
      setSubfolders(data.subfolders || []);
    } catch (err) {
      console.error("Error fetching folder details:", err);
    }
  };

  useEffect(() => {
    fetchFolder();
  }, [id]);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setSelectedFile(file);
    setUploading(true);
    setError("");
    setUploadedURL("");

    try {
      const result = await uploadFileToFolder(file, id);
      await fetchFolder();
      setUploadedURL(result?.url || "");
    } catch (err) {
      console.error("Upload failed:", err);
      setError("Upload failed. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  const handleNewFolder = (newFolder) => {
    setSubfolders((prev) => [newFolder, ...prev]);
  };

  const handleFolderMove = (movedFolderId) => {
    setSubfolders((prev) => prev.filter((f) => f.id !== movedFolderId));
  };

  const handleFileMove = (movedFileId) => {
    setFiles((prev) => prev.filter((f) => f.id !== movedFileId));
  };

  if (!folder) return <p>Loading...</p>;

  return (
    <div className="folder-file-container">
      <h1 className="main-title">{folder.name}</h1>

      <div className="upload-section">
        <div className="button-row">
          <UploadButton
            uploading={uploading}
            selectedFile={selectedFile}
            onChange={handleFileChange}
          />
          <CreateFolder parentId={id} onFolderCreated={handleNewFolder} />
        </div>

        {selectedFile && !uploading && (
          <p className="selected-file">{selectedFile.name}</p>
        )}

        {uploadedURL && (
          <div className="upload-result">
            <p className="upload-success">Uploaded URL:</p>
          </div>
        )}

        {error && <p className="upload-error">{error}</p>}
      </div>

      <div className="folder-list">
        {subfolders.map((sub) => (
          <FolderCard
            key={sub.id}
            folder={sub}
            onDelete={handleFolderMove}
            onMove={handleFolderMove}
            refresh={fetchFolder} // auto-update when moved
          />
        ))}
        {files.map((file) => (
          <FileCard
            key={file.id}
            file={file}
            onDelete={handleFileMove}
            onMove={handleFileMove}
            refresh={fetchFolder} // auto-update when moved
          />
        ))}
      </div>
    </div>
  );
};

export default FolderDetails;