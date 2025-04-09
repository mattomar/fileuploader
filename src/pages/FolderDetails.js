import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import FolderCard from "../components/folderCard";
import FileCard from "../components/fileCard";
import { uploadFileToFolder, createSubFolder, getFolderById } from "../utils/api";

const FolderDetails = () => {
  const { id } = useParams();
  const [folder, setFolder] = useState(null);
  const [files, setFiles] = useState([]);
  const [subfolders, setSubfolders] = useState([]);
  const [folderName, setFolderName] = useState("");
  const [uploading, setUploading] = useState(false);

  const fetchFolder = async () => {
    try {
      const data = await getFolderById(id);
      setFolder(data.folder);
      setFiles(data.files);
      setSubfolders(data.subfolders || []);
    } catch (err) {
      console.error("Error fetching folder details:", err);
    }
  };

  useEffect(() => {
    fetchFolder();
  }, [id]);

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);
    try {
      await uploadFileToFolder(file, id);
      await fetchFolder();
    } catch (err) {
      console.error("Upload failed:", err);
    } finally {
      setUploading(false);
    }
  };

  const handleCreateFolder = async () => {
    if (!folderName.trim()) return;
    try {
      await createSubFolder(folderName, id);
      setFolderName("");
      await fetchFolder();
    } catch (err) {
      console.error("Failed to create subfolder:", err);
    }
  };

  if (!folder) return <p>Loading...</p>;

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">{folder.name}</h1>

      {/* Upload + Subfolder UI */}
      <div className="bg-gray-100 p-4 rounded-lg mb-6">
        <div className="mb-4">
          <label className="block mb-1 font-medium">Upload File to This Folder:</label>
          <input
            type="file"
            onChange={handleUpload}
            disabled={uploading}
            className="text-sm"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Create Subfolder:</label>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Folder name"
              value={folderName}
              onChange={(e) => setFolderName(e.target.value)}
              className="border px-2 py-1 text-sm rounded w-full"
            />
            <button
              onClick={handleCreateFolder}
              className="bg-blue-500 text-white px-3 py-1 rounded text-sm"
            >
              Create
            </button>
          </div>
        </div>
      </div>

      {/* Subfolders */}
      {subfolders.length > 0 && (
        <>
          <h2 className="text-lg font-semibold mb-2">Subfolders</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
            {subfolders.map((sub) => (
              <FolderCard key={sub.id} folder={sub} />
            ))}
          </div>
        </>
      )}

      {/* Files */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {files.map((file) => (
          <FileCard key={file.id} file={file} />
        ))}
      </div>
    </div>
  );
};

export default FolderDetails;
