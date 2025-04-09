import React, { useState } from "react";
import { createFolder } from "../utils/api";

const CreateFolder = ({ onFolderCreated }) => {
  const [folderName, setFolderName] = useState("");
  const [loading, setLoading] = useState(false);

  const handleCreate = async () => {
    if (!folderName.trim()) return;

    try {
      setLoading(true);
      const newFolder = await createFolder(folderName);
      onFolderCreated(newFolder);
      setFolderName("");
    } catch (err) {
      console.error("Error creating folder:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mb-4 flex gap-2 items-center">
      <input
        className="border p-2 rounded"
        type="text"
        value={folderName}
        onChange={(e) => setFolderName(e.target.value)}
        placeholder="New folder name"
      />
      <button
        onClick={handleCreate}
        disabled={loading}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        {loading ? "Creating..." : "Create Folder"}
      </button>
    </div>
  );
};

export default CreateFolder;