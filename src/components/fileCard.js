import React from "react";

const FileCard = ({ file, small }) => {
  return (
    <div className={`bg-white ${small ? "text-sm" : "text-base"} p-2 rounded shadow`}>
      <a href={`http://localhost:5019/${file.path}`} target="_blank" rel="noreferrer">
        {file.name}
      </a>
    </div>
  );
};

export default FileCard;