import React, { useState } from "react";
import { createSubFolder } from "../utils/api"; // using createSubFolder, not createFolder
import "../styles/buttons.css";

const CreateFolder = ({ parentId, onFolderCreated }) => {
  const [folderName, setFolderName] = useState("");
  const [showInput, setShowInput] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleCreate = async () => {
    if (!folderName.trim()) return;

    try {
      setLoading(true);
      const newFolder = await createSubFolder(folderName, parentId); // pass parentId
      onFolderCreated(newFolder);
      setFolderName("");
      setShowInput(false);
    } catch (err) {
      console.error("Error creating folder:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {!showInput ? (
        <button onClick={() => setShowInput(true)} className="upload-btn">
          New Folder
        </button>
      ) : (
        <div className="folder-create-container">
          <input
            type="text"
            value={folderName}
            onChange={(e) => setFolderName(e.target.value)}
            placeholder="Folder name"
          />
          <button onClick={handleCreate} disabled={loading} className="upload-btn">
            {loading ? "Creating..." : "Create"}
          </button>
        </div>
      )}
    </div>
  );
};

export default CreateFolder;