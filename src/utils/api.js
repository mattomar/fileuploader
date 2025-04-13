const API_BASE = "https://fileuploader-server-production.up.railway.app";

// Get token from localStorage
export const getToken = () => {
  return localStorage.getItem("token");
};

// Handle unauthorized access globally
const handleUnauthorized = () => {
  localStorage.removeItem("token");
  window.location.href = "/login";
};

// Custom fetch wrapper
const fetchWithAuth = async (url, options = {}) => {
  const token = getToken();
  const headers = options.headers || {};

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const res = await fetch(url, { ...options, headers });

  if (res.status === 401) {
    handleUnauthorized();
    throw new Error("Unauthorized. Please log in again.");
  }

  return res;
};

// Upload file
export const uploadFile = async (file) => {
  if (file.size > 100 * 1024 * 1024) {
    throw new Error("File too large. Max allowed size is 100MB.");
  }

  const formData = new FormData();
  formData.append("file", file);

  const res = await fetchWithAuth(`${API_BASE}/api/upload`, {
    method: "POST",
    body: formData,
  });
  return res.json();
};

// Upload file to folder
export const uploadFileToFolder = async (file, folderId) => {
  if (file.size > 100 * 1024 * 1024) {
    throw new Error("File too large. Max allowed size is 100MB.");
  }

  const formData = new FormData();
  formData.append("file", file);
  formData.append("folderId", folderId);

  const res = await fetchWithAuth(`${API_BASE}/api/upload`, {
    method: "POST",
    body: formData,
  });
  return res.json();
};

// Fetch folders
export const fetchFolders = async () => {
  const res = await fetchWithAuth(`${API_BASE}/api/folders`);
  return res.json();
};

// Fetch files
export const fetchFiles = async () => {
  const res = await fetchWithAuth(`${API_BASE}/api/files`);
  return res.json();
};

// Create folder
export const createFolder = async (name) => {
  const res = await fetchWithAuth(`${API_BASE}/api/folders`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name }),
  });
  return res.json();
};

// Create subfolder
export const createSubFolder = async (name, parentFolderId) => {
  const res = await fetchWithAuth(`${API_BASE}/api/folders`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, parentFolderId }),
  });
  return res.json();
};

// Get folder by ID
export const getFolderById = async (id) => {
  const res = await fetchWithAuth(`${API_BASE}/api/folders/${id}`);
  return res.json();
};

// Delete folder
export const deleteFolder = async (folderId) => {
  const res = await fetchWithAuth(`${API_BASE}/api/folders/${folderId}`, {
    method: "DELETE",
  });
  return res.json();
};

// Delete file
export const deleteFile = async (fileId) => {
  const res = await fetchWithAuth(`${API_BASE}/api/files/${fileId}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Failed to delete file");
  return await res.json();
};

// Move file
export const moveFile = async (fileId, targetFolderId) => {
  return fetchWithAuth(`${API_BASE}/api/files/${fileId}/move`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ targetFolderId }),
  });
};

// Move folder
export const moveFolder = async (folderId, targetFolderId) => {
  return fetchWithAuth(`${API_BASE}/api/folders/${folderId}/move`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ parentFolderId: targetFolderId }),
  });
};

// Auth: Signup
export const signup = async ({ firstName, lastName, email, password }) => {
  const res = await fetch(`${API_BASE}/api/auth/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ firstName, lastName, email, password }),
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message || "Signup failed.");
  }

  return data;
};

// Auth: Login
export const login = async ({ email, password }) => {
  const res = await fetch(`${API_BASE}/api/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message || "Login failed.");
  }

  return data;
};


export const renameFolder = async (folderId, newName) => {
  const response = await fetchWithAuth(`${API_BASE}/api/folders/${folderId}/rename`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name: newName }), // Use 'name' as per your backend API
  });

  if (!response.ok) {
    throw new Error("Failed to rename folder");
  }

  return await response.json();
};


export const renameFile = async (fileId, newName) => {
  const response = await fetchWithAuth(`${API_BASE}/api/files/${fileId}/rename`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ newName }), // Use 'newName' instead of 'name'
  });

  if (!response.ok) {
    throw new Error("Failed to rename file");
  }

  return await response.json();
};