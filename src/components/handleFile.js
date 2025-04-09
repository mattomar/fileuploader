const handleFileChange = async (event) => {
  const file = event.target.files[0];
  setSelectedFile(file);

  const formData = new FormData();
  formData.append("file", file);

  try {
    const res = await fetch("http://localhost:5014/api/upload", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    setUploadedURL(data.url);
  } catch (err) {
    console.error("Upload failed:", err);
  }
};