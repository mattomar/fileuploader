import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import FileCard from "../components/fileCard";

const FolderDetails = () => {
  const { id } = useParams();
  const [folder, setFolder] = useState(null);
  const [files, setFiles] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchFolder = async () => {
      try {
        const res = await fetch(`http://localhost:5019/api/folders/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        const data = await res.json();
        setFolder(data.folder);
        setFiles(data.files);
      } catch (err) {
        console.error("Error fetching folder details:", err);
      }
    };

    fetchFolder();
  }, [id]);

  if (!folder) return <p>Loading...</p>;

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">{folder.name}</h1>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {files.map(file => (
          <FileCard key={file.id} file={file} />
        ))}
      </div>
    </div>
  );
};

export default FolderDetails;