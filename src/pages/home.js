import React, { useState } from "react";
import "../styles/home.css";
import hardisckIcon from "../assets/hardisck.png"; 

const Home = () => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  return (
    <div className="jumbotron">
      <div className="file-uploader">File Uploader</div>
      <div className="on-chain">Your Stuff, On-Chain.</div>
      <div className="desc">
        Upload a file to <strong>Shadow Drive</strong> and get a sharable link
      </div>

      {/* Upload Folder Section */}
      <div className="upload-folder">
        <img src={hardisckIcon} alt="Storage" className="storage-icon" />
        
        <input 
          type="file" 
          id="file-upload" 
          onChange={handleFileChange} 
          hidden 
        />
        
        <label htmlFor="file-upload" className="upload-btn">
          {selectedFile ? "File Selected" : "Upload"}
        </label>
        
        {selectedFile && <p className="file-name">{selectedFile.name}</p>}
      </div>
    </div>
  );
};

export default Home;