import React, { useEffect, useState } from "react";
import FolderCard from "./folderCard";
import FileCard from "./fileCard";
import CreateFolder from "./createFolderForm";
import UploadButton from "../components/uploadFileButton";

const FolderFileView = () => {
  const [folders, setFolders] = useState([]);
  const [orphanFiles, setOrphanFiles] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadedURL, setUploadedURL] = useState("");
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchFoldersAndFiles();
  }, []);

  const fetchFoldersAndFiles = async () => {
    try {
      const folderRes = await fetch("http://localhost:5014/api/folders", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!folderRes.ok) throw new Error("Failed to fetch folders");
      const folderData = await folderRes.json();
      setFolders(folderData);

      const fileRes = await fetch("http://localhost:5014/api/files", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!fileRes.ok) throw new Error("Failed to fetch files");
      const { files } = await fileRes.json();
      const unsorted = files.filter(file => !file.folderId);
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

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("http://localhost:5014/api/upload", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const data = await res.json();
      if (data.url) {
        setUploadedURL(data.url);
        fetchFoldersAndFiles(); // Refresh files
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
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">My Folders</h1>

      {/* Upload Section */}
      <div className="bg-gray-100 p-4 rounded-lg mb-6">
        <UploadButton
          uploading={uploading}
          selectedFile={selectedFile}
          onChange={handleFileChange}
        />

        {selectedFile && !uploading && (
          <p className="mt-2 text-sm text-gray-700">{selectedFile.name}</p>
        )}

        {uploadedURL && (
          <div className="mt-2 text-sm">
            <p className="text-green-600">Uploaded URL:</p>
            <a
              href={uploadedURL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 underline"
            >
              {uploadedURL}
            </a>
          </div>
        )}

        {error && <p className="text-red-600 mt-2">{error}</p>}
      </div>

      {/* Create Folder */}
      <CreateFolder
        onFolderCreated={(newFolder) => setFolders(prev => [newFolder, ...prev])}
      />

      {/* Folder grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
        {folders.map(folder => (
          <FolderCard key={folder.id} folder={folder} />
        ))}
      </div>

      {/* Orphan files */}
      {orphanFiles.length > 0 && (
        <>
          <h2 className="text-lg font-semibold mt-6 mb-2">Files Outside Folders</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {orphanFiles.map(file => (
              <FileCard key={file.id} file={file} />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default FolderFileView;