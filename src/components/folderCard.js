import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { deleteFolder, moveFile, moveFolder, renameFolder } from "../utils/api";
import "../styles/cardStyles.css";

const FolderCard = ({ folder, onDelete, refresh }) => {
  const navigate = useNavigate();
  const [isDragOver, setIsDragOver] = useState(false);

  const handleClick = () => {
    navigate(`/folder/${folder.id}`);
  };

  const handleDelete = async (e) => {
    e.stopPropagation();
    const confirmDelete = window.confirm(`Are you sure you want to delete "${folder.name}" and all its contents?`);
    if (confirmDelete) {
      await deleteFolder(folder.id);
      if (onDelete) onDelete(folder.id);
    }
  };

  const handleRename = async (e) => {
    e.stopPropagation();
    const newName = prompt("Enter new folder name:", folder.name);
    if (newName && newName.trim() !== "" && newName !== folder.name) {
      try {
        await renameFolder(folder.id, newName.trim());
        if (refresh) refresh();
      } catch (err) {
        alert("Failed to rename folder: " + err.message);
      }
    }
  };

  const handleDragStart = (e) => {
    e.dataTransfer.setData("type", "folder");
    e.dataTransfer.setData("id", folder.id);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleDrop = async (e) => {
    e.preventDefault();
    setIsDragOver(false);

    const type = e.dataTransfer.getData("type");
    const id = e.dataTransfer.getData("id");

    if (type === "file") {
      await moveFile(id, folder.id);
      if (refresh) refresh();
    } else if (type === "folder" && id !== folder.id) {
      await moveFolder(id, folder.id);
      if (refresh) refresh();
    }
  };

  return (
    <div
      className={`card folder-card ${isDragOver ? "drag-over" : ""}`}
      onClick={handleClick}
      draggable
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <img
        className="card-icon"
        src="https://cdn-icons-png.flaticon.com/512/716/716784.png"
        alt="Folder"
      />
      <div className="card-name">{folder.name}</div>

      <img
        className="rename-btn"
        src="https://cdn-icons-png.flaticon.com/512/1159/1159633.png"
        alt="Rename"
        title="Rename Folder"
        onClick={handleRename}
      />

      <img
        className="delete-btn"
        src="https://cdn-icons-png.flaticon.com/512/1214/1214428.png"
        alt="Delete"
        title="Delete Folder"
        onClick={handleDelete}
      />
    </div>
  );
};

export default FolderCard;