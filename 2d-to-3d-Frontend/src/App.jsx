// src/App.jsx
import React, { useState } from "react";
import "./App.css";
const App = () => {
  const [previews, setPreviews] = useState([]);

  const handleDragEnter = (e) => e.preventDefault();
  const handleDragLeave = (e) => e.preventDefault();
  const handleDragOver = (e) => e.preventDefault();
  const handleDrop = (e) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFileUpload(files);
    }
  };

  const handleFileChange = (e) => {
    const files = e.target.files;
    if (files.length > 0) {
      handleFileUpload(files);
    }
  };

  const handleFileUpload = (files) => {
    Array.from(files).forEach((file) => {
      if (file.type.startsWith("image/")) {
        const formData = new FormData();
        formData.append("image", file);

        fetch("http://localhost:8080/api/image/upload", {
          method: "POST",
          body: formData,
        })
          .then((response) => response.json())
          .then((data) => {
            if (data.url) {
              setPreviews((prev) => [...prev, data.url]);
            } else {
              alert("Failed to upload image.");
            }
          })
          .catch(() => alert("An error occurred while uploading the image."));
      } else {
        alert("Please upload a valid image file.");
      }
    });
  };

  const handleRemove = (url) => {
    setPreviews(previews.filter((preview) => preview !== url));
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gradient-to-b from-purple-100 to-purple-200 text-purple-800">
      <h1 className="text-3xl font-bold mb-6 text-center">2D to 3D Converter</h1>
      <div className="w-11/12 max-w-2xl bg-white p-6 rounded-lg shadow-md flex flex-col gap-4">
        <div
          className="border-4 border-dashed border-purple-400 rounded-lg p-6 text-center transition hover:border-purple-600"
          onDragEnter={handleDragEnter}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <p className="text-lg">Drag and drop images here, or <label htmlFor="fileInput" className="text-purple-800 underline cursor-pointer">browse</label> to upload.</p>
          <input
            type="file"
            id="fileInput"
            accept="image/*"
            multiple
            className="hidden"
            onChange={handleFileChange}
          />
        </div>
        <div className="flex flex-wrap justify-center gap-4">
          {previews.map((url) => (
            <div
              key={url}
              className="w-32 h-40 relative bg-purple-100 border-2 border-purple-400 rounded-lg shadow-md"
            >
              <img
                src={url}
                alt="Preview"
                className="w-full h-full object-cover rounded-lg"
              />
              <button
                className="absolute bottom-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded-md"
                onClick={() => handleRemove(url)}
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;
