import React, { useState } from "react";
import "../styles/home.css";
import hardisckIcon from "../assets/hardisck.png"; 

const Home = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadedURL, setUploadedURL] = useState("");
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setSelectedFile(file);
    setUploading(true);
    setError("");
    setUploadedURL("");

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("http://localhost:5019/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      console.log("Upload response:", data);

      if (data.url) {
        setUploadedURL(data.url);
      } else {
        setError("Upload succeeded, but no URL returned.");
      }
    } catch (err) {
      console.error("Upload failed:", err);
      setError("Upload failed. Check your server.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="jumbotron">
      <div className="file-uploader">File Uploader</div>
      <div className="on-chain">Your Stuff, On-Chain.</div>
      <div className="desc">
        Upload a file to <strong>Shadow Drive</strong> and get a sharable link
      </div>

      <div className="upload-folder">
        <img src={hardisckIcon} alt="Storage" className="storage-icon" />
        
        <input 
          type="file" 
          id="file-upload" 
          onChange={handleFileChange} 
          hidden 
        />
        
        <label htmlFor="file-upload" className="upload-btn">
          {uploading
            ? "Uploading..."
            : selectedFile
            ? "File Selected"
            : "Upload"}
        </label>

        {selectedFile && !uploading && (
          <p className="file-name">{selectedFile.name}</p>
        )}

        {uploadedURL && (
          <div className="uploaded-url">
            <p>Uploaded URL:</p>
            <a href={uploadedURL} target="_blank" rel="noopener noreferrer">
              {uploadedURL}
            </a>
          </div>
        )}

        {error && <p className="upload-error">{error}</p>}
      </div>
    </div>
  );
};

export default Home;