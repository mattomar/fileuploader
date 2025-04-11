import React, { useState, useEffect } from "react";
import "../styles/home.css";
import hardisckIcon from "../assets/hardisck.png";
import UploadButton from "../components/uploadFileButton";
import {
  fetchFolders,
  uploadFileToFolder,
  uploadFile,
  getToken
} from "../utils/api";
import { Link } from "react-router-dom";

const Home = () => {
  const [selectedFolder, setSelectedFolder] = useState("");
  const [folders, setFolders] = useState([]);
  const [uploadedURL, setUploadedURL] = useState("");
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadFolders = async () => {
      try {
        const data = await fetchFolders();
        setFolders(data);
      } catch (err) {
        console.error("Failed to fetch folders:", err);
      }
    };
    loadFolders();
  }, []);

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setError("");
    setUploadedURL("");
    setUploading(true);

    try {
      const data = selectedFolder
        ? await uploadFileToFolder(file, selectedFolder)
        : await uploadFile(file);

      if (data?.url) {
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
        {!getToken() && (
          <div className="blur-overlay">
            <p>
              Please <Link to="/login">sign in</Link> or{" "}
              <Link to="/signup">sign up</Link> to upload files.
            </p>
          </div>
        )}

        <img src={hardisckIcon} alt="Storage" className="storage-icon" />

        <select
          value={selectedFolder}
          onChange={(e) => setSelectedFolder(e.target.value)}
          className="folder-dropdown"
          disabled={!getToken()}
        >
          <option value="">Select folder (or save outside)</option>
          {Array.isArray(folders) &&
            folders.map((folder) => (
              <option key={folder.id} value={folder.id}>
                {folder.name}
              </option>
            ))}
        </select>

        <UploadButton
          uploading={uploading}
          onChange={handleFileChange}
          disabled={!getToken()}
        />

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
