import React, { useCallback } from "react";
import { id } from "zod/v4/locales";

export const useDocUploader = ({ maxSize, maxFiles }) => {
  const [files, setFiles] = React.useState([]);
  const [uploading, setUploading] = React.useState(false);
  const [error, setError] = React.useState(null);

  const addFiles = useCallback(
    (selectedFiles, rejectedFiles) => {
      if (!selectedFiles || selectedFiles.length === 0) return;
      //Handle Rejected Files
      if (rejectedFiles && rejectedFiles.length > 0) {
        const rejectionReasons = rejectedFiles
          .map((file) => {
            const errors = file.errors.map((e) => e.message).join(", ");
            return `${file.file.name}: ${errors}`;
          })
          .join("; ");
        setError(`Some files were rejected: ${rejectionReasons}`);
      }
      console.log(files, selectedFiles);

      if (files.length + selectedFiles.length > maxFiles) {
        setError(`Maximum ${maxFiles} files allowed`);
        return;
      }

      const filesWithMetaData = selectedFiles.map((file) => {
        if (file.size > maxSize) {
          setError((prev) =>
            prev
              ? `${prev}; ${file.name} exceeds size limit`
              : `${file.name} exceeds size limit`
          );
          return null;
        }

        return {
          id: `${file.name}-${Date.now()}-${Math.random()}`,
          file,
          name: file.name,
          size: file.size,
          type: file.type,
          preview: file.type.startsWith("image/")
            ? URL.createObjectURL(file)
            : null,
          progress: 0,
          uploading: false,
          uploaded: false,
          error: null,
        };
      });
      const validFiles = filesWithMetaData.filter((f) => f !== null);
      setFiles((prev) => [...(prev || []), ...validFiles]);
    },
    [files, maxFiles, maxSize]
  );

  const removeFile = useCallback((id) => {
    setFiles((prev) => {
      const fileToRemove = prev.find((f) => f.id === id);
      if (fileToRemove?.preview) {
        URL.revokeObjectURL(fileToRemove.preview);
      }
      return prev.filter((f) => f.id !== id);
    });
  }, []);
  return {
    addFiles,
    removeFile,
  };
};
