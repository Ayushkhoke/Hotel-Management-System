import React, { useState } from "react";

const Upload = ({ label, onChange, accept = "image/*" }) => {
  const [preview, setPreview] = useState(null);

  function handleChange(e) {
    const file = e.target.files[0];
    if (!file) return;

    setPreview(URL.createObjectURL(file));
    onChange(file); // ✅ send file to parent
  }

  return (
    <div className="space-y-2">
      <label className="block font-semibold">{label}</label>

      {preview && (
        <img
          src={preview}
          alt="preview"
          className="w-full h-40 object-cover rounded"
        />
      )}

      <input
        type="file"
        accept={accept}
        onChange={handleChange}
      />
    </div>
  );
};

export default Upload;
