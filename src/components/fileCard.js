import React from "react";
import { deleteFile } from "../utils/api";
import "../styles/cardStyles.css";

const getFileIcon = (filename) => {
  const ext = filename.split(".").pop().toLowerCase();

  if (["png", "jpg", "jpeg", "gif", "bmp"].includes(ext))
    return "https://cdn-icons-png.flaticon.com/512/337/337940.png";
  if (["mp3", "wav", "ogg"].includes(ext))
    return "https://cdn-icons-png.flaticon.com/512/727/727245.png";
  if (ext === "pdf")
    return "https://cdn-icons-png.flaticon.com/512/337/337946.png";

  return "https://cdn-icons-png.flaticon.com/512/136/136530.png";
};

const FileCard = ({ file, onDelete }) => {
  const handleDelete = async (e) => {
    e.stopPropagation();
    const confirmDelete = window.confirm(`Delete file "${file.name}"?`);
    if (confirmDelete) {
      await deleteFile(file.id);
      if (onDelete) onDelete(file.id);
    }
  };

  const handleDragStart = (e) => {
    e.dataTransfer.setData("type", "file");
    e.dataTransfer.setData("id", file.id);
    e.dataTransfer.setData("name", file.name);
  };

  return (
    <div
      className="card file-card"
      draggable
      onDragStart={handleDragStart}
    >
      <img className="file-icon" src={getFileIcon(file.name)} alt="file type" />
      <a
        className="card-name"
        href={`${file.path}`}
        target="_blank"
        rel="noreferrer"
      >
        {file.name}
      </a>
      <img
        className="delete-btn"
        src="https://cdn-icons-png.flaticon.com/512/1214/1214428.png"
        alt="Delete"
        onClick={handleDelete}
      />
    </div>
  );
};

export default FileCard;
