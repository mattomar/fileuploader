import React from "react";
import "../styles/buttons.css";

const UploadButton = ({ uploading, selectedFile, onChange }) => {
  return (
    <>
      <input 
        type="file" 
        id="file-upload" 
        onChange={onChange} 
        hidden 
      />
      <label htmlFor="file-upload" className="upload-btn">
        {uploading
          ? "Uploading..."
          : selectedFile
          ? "File Selected"
          : "Upload"}
      </label>
    </>
  );
};

export default UploadButton;
