import React, { useState } from "react";
import { deleteFile, renameFile } from "../utils/api";
import "../styles/cardStyles.css";

const getFileIcon = (filename) => {
  const ext = filename.split(".").pop().toLowerCase();

  if (["png", "jpg", "jpeg", "gif", "bmp"].includes(ext))
    return "https://cdn-icons-png.flaticon.com/512/337/337940.png";
  if (["mp3", "wav", "ogg", "m4a"].includes(ext))
    return "https://cdn-icons-png.flaticon.com/512/727/727245.png";
  if (ext === "pdf")
    return "https://cdn-icons-png.flaticon.com/512/337/337946.png";
  if (["mp4", "mov", "webm"].includes(ext))
    return "https://cdn-icons-png.flaticon.com/512/1384/1384060.png";

  return "https://cdn-icons-png.flaticon.com/512/136/136530.png";
};

const getViewableUrl = (file) => {
  let url = file.path;

  // Remove any forced download or inline flags
  url = url.replace("/upload/fl_attachment/", "/upload/");
  url = url.replace("/upload/fl_inline/", "/upload/");

  return url;
};

const FileCard = ({ file, onDelete, refresh }) => {
  const handleDelete = async (e) => {
    e.stopPropagation();
    const confirmDelete = window.confirm(`Delete file "${file.name}"?`);
    if (confirmDelete) {
      await deleteFile(file.id);
      if (onDelete) onDelete(file.id);
    }
  };

  const handleRename = async (e) => {
    e.stopPropagation();
    const newName = prompt("Enter new file name:", file.name);
    if (newName && newName.trim() !== "" && newName !== file.name) {
      try {
        await renameFile(file.id, newName.trim());
        if (refresh) refresh(); // ✅ trigger a refresh after rename
      } catch (error) {
        alert("Failed to rename the file");
      }
    }
  };

  const handleDragStart = (e) => {
    e.dataTransfer.setData("type", "file");
    e.dataTransfer.setData("id", file.id);
    e.dataTransfer.setData("name", file.name);
  };

  const handleOpenFile = (e) => {
    e.stopPropagation();

    const ext = file.name.split(".").pop().toLowerCase();
    const viewableUrl = getViewableUrl(file);

    if (["png", "jpg", "jpeg", "gif", "bmp"].includes(ext)) {
      window.open(viewableUrl, "_blank", "noopener,noreferrer");
    } else {
      const link = document.createElement("a");
      link.href = viewableUrl.replace("/upload/", "/upload/fl_attachment:");
      link.download = file.name;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <div
      className="card file-card"
      draggable
      onDragStart={handleDragStart}
      onClick={handleOpenFile}
      style={{ cursor: "pointer" }}
    >
      <img className="file-icon" src={getFileIcon(file.name)} alt="file type" />
      <div className="card-name">{file.name}</div>

      <img
        className="rename-btn"
        src="https://cdn-icons-png.flaticon.com/512/1159/1159633.png"
        alt="Rename"
        title="Rename File"
        onClick={handleRename}
      />

      <img
        className="delete-btn"
        src="https://cdn-icons-png.flaticon.com/512/1214/1214428.png"
        alt="Delete"
        title="Delete File"
        onClick={handleDelete}
      />
    </div>
  );
};

export default FileCard;