import React from "react";
import "../styles/buttons.css";

const UploadButton = ({ uploading, onChange, disabled }) => {
  return (
    <>
      <input 
        type="file" 
        id="file-upload" 
        onChange={onChange} 
        hidden 
        disabled={disabled}
      />
      <label htmlFor="file-upload" className="upload-btn">
        {uploading ? "Uploading..." : "Upload"}
      </label>
    </>
  );
};

export default UploadButton;
