import React, { useEffect, useState } from "react";
import FolderCard from "./folderCard";
import FileCard from "./fileCard";

const FolderFileView = () => {
  const [folders, setFolders] = useState([]);
  const [orphanFiles, setOrphanFiles] = useState([]);

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchFoldersAndFiles();
  }, []);

  const fetchFoldersAndFiles = async () => {
    try {
      const folderRes = await fetch("http://localhost:5019/api/folders", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      if (!folderRes.ok) {
        throw new Error("Failed to fetch folders");
      }
  
      const folderData = await folderRes.json();
  
      console.log("Fetched Folders:", folderData); // Log the folder data
  
      setFolders(folderData); // Set folders without worrying about files for now
  
    } catch (err) {
      console.error("Error fetching data", err);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">My Folders</h1>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {folders.map(folder => (
          <FolderCard key={folder.id} folder={folder} />
        ))}
      </div>

      {orphanFiles.length > 0 && (
        <>
          <h2 className="text-lg font-semibold mt-6 mb-2">Unsorted Files</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {orphanFiles.map(file => (
              <FileCard key={file.id} file={file} />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default FolderFileView;