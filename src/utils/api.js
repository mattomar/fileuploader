const API_BASE = "http://localhost:5018";

export const getToken = () => localStorage.getItem("token");

export const uploadFile = async (file) => {
  const formData = new FormData();
  formData.append("file", file);

  const res = await fetch(`${API_BASE}/api/upload`, {
    method: "POST",
    headers: { Authorization: `Bearer ${getToken()}` },
    body: formData,
  });

  return res.json();
};

export const fetchFolders = async () => {
  const res = await fetch(`${API_BASE}/api/folders`, {
    headers: { Authorization: `Bearer ${getToken()}` },
  });
  return res.json();
};

export const fetchFiles = async () => {
  const res = await fetch(`${API_BASE}/api/files`, {
    headers: { Authorization: `Bearer ${getToken()}` },
  });
  return res.json();
};

export const createFolder = async (name) => {
  const res = await fetch(`${API_BASE}/api/folders`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
    body: JSON.stringify({ name }),
  });
  return res.json();
};

export const uploadFileToFolder = async (file, folderId) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("folderId", folderId);
  
    const res = await fetch(`${API_BASE}/api/upload`, {
      method: "POST",
      headers: { Authorization: `Bearer ${getToken()}` },
      body: formData,
    });
  
    return res.json();
  };


  export const createSubFolder = async (name, parentFolderId) => {
    const res = await fetch(`${API_BASE}/api/folders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken()}`,
      },
      body: JSON.stringify({ name, parentFolderId }),
    });
  
    return res.json();
  };

  export const getFolderById = async (id) => {
    const res = await fetch(`${API_BASE}/api/folders/${id}`, {
      headers: { Authorization: `Bearer ${getToken()}` },
    });
    return res.json();
  };
  

  export const deleteFolder = async (folderId) => {
    const res = await fetch(`${API_BASE}/api/folders/${folderId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    });

    
  
    return res.json();
  };

  export const deleteFile = async (fileId) => {
    const res = await fetch(`${API_BASE}/api/files/${fileId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });
    if (!res.ok) throw new Error("Failed to delete file");
    return await res.json();
  };


  export const moveFile = async (fileId, targetFolderId) => {
    return fetch(`${API_BASE}/api/files/${fileId}/move`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken()}`,
      },
      body: JSON.stringify({ targetFolderId }),
    });
  };
  
  export const moveFolder = async (folderId, targetFolderId) => {
    return fetch(`${API_BASE}/api/folders/${folderId}/move`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken()}`,
      },
      body: JSON.stringify({ parentFolderId: targetFolderId }),
    });
  };