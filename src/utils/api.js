const API_BASE = "http://localhost:5014";

const getToken = () => localStorage.getItem("token");

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