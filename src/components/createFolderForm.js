import React, { useState } from "react";

const CreateFolder = ({ onFolderCreated }) => {
  const [folderName, setFolderName] = useState("");
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("token");

  const handleCreate = async () => {
    if (!folderName.trim()) return;

    try {
      setLoading(true);
      const res = await fetch("http://localhost:5014/api/folders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ name: folderName }),
      });

      if (!res.ok) {
        throw new Error("Failed to create folder");
      }

      const newFolder = await res.json();
      onFolderCreated(newFolder); // notify parent
      setFolderName(""); // clear input
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