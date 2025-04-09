import React from "react";
import { useNavigate } from "react-router-dom";

const FolderCard = ({ folder }) => {
  const navigate = useNavigate();
  const fileCount = Array.isArray(folder.files) ? folder.files.length : 0;

  const handleClick = () => {
    navigate(`/folder/${folder.id}`);
  };

  return (
    <div onClick={handleClick} className="folder-card cursor-pointer hover:shadow-lg transition">
      <h3>{folder.name}</h3>
      <p>Files: {fileCount}</p>
    </div>
  );
};

export default FolderCard;