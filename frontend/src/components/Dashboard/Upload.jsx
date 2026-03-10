import React, { useState, memo } from "react";

const Upload = memo(({ label, onChange, accept = "image/*", multiple = false }) => {
  const [files, setFiles] = useState([]);
  const [previews, setPreviews] = useState([]);

  function handleChange(e) {
    const selectedFiles = Array.from(e.target.files || []);
    if (!selectedFiles.length) return;

    if (multiple) {
      const mergedFiles = [...files, ...selectedFiles];
      const nextPreviews = mergedFiles.map((file) => URL.createObjectURL(file));

      setFiles(mergedFiles);
      setPreviews(nextPreviews);
      onChange(mergedFiles);

      // Allow selecting the same filename again in the next pick.
      e.target.value = "";
      return;
    }

    const nextPreviews = selectedFiles.map((file) => URL.createObjectURL(file));
    setFiles(selectedFiles);
    onChange(selectedFiles[0]);
    setPreviews(nextPreviews);
  }

  return (
    <div className="space-y-2">
      <label className="block font-semibold">{label}</label>

      {!!previews.length && (
        <div className="grid grid-cols-3 gap-2">
          {previews.map((preview, index) => (
            <img
              key={`${preview}-${index}`}
              src={preview}
              alt={`preview-${index + 1}`}
              loading="lazy"
              className="w-full h-24 object-cover rounded"
            />
          ))}
        </div>
      )}

      <input
        type="file"
        accept={accept}
        multiple={multiple}
        onChange={handleChange}
      />
    </div>
  );
});

Upload.displayName = 'Upload';

export default Upload;
