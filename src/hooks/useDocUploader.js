"use client";

import api from "@/lib/axios";
import { useState, useCallback, useRef, useEffect } from "react";

/**
 * Custom hook for handling file uploads with metadata
 * Since the backend accepts file + metadata in one request, we upload directly
 * @param {Object} options - Configuration options
 * @param {number} options.maxSize - Maximum file size in bytes (default: 5MB)
 * @param {number} options.maxFiles - Maximum number of files allowed
 * @param {string} options.uploadEndpoint - API endpoint for file upload
 * @returns {Object} Upload state and handlers
 */
export function useDocUploader({
  maxSize = 5 * 1024 * 1024, // 5MB default
  maxFiles = 10,
  uploadEndpoint = "/api/uploadDocs",
} = {}) {
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const abortControllerRef = useRef(null);

  /**
   * Add files to the upload queue
   */
  const addFiles = useCallback(
    (newFiles, rejectedFiles = []) => {
      setError("");

      // Handle rejected files
      if (rejectedFiles.length > 0) {
        const errorMessages = rejectedFiles.map((rejection) => {
          const errors = rejection.errors.map((e) => e.message).join(", ");
          return `${rejection.file.name}: ${errors}`;
        });
        setError(errorMessages.join("; "));
      }

      // Check total file count
      if (files.length + newFiles.length > maxFiles) {
        setError(`Maximum ${maxFiles} files allowed`);
        return;
      }

      // Process and add valid files
      const filesWithMetadata = newFiles
        .map((file) => {
          // Validate file size
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
            uploaded: false,
            uploading: false,
            error: null,
            url: null,
          };
        })
        .filter(Boolean);

      setFiles((prev) => [...prev, ...filesWithMetadata]);
    },
    [files.length, maxFiles, maxSize]
  );

  /**
   * Remove a file from the queue
   */
  const removeFile = useCallback((fileId) => {
    setFiles((prev) => {
      const fileToRemove = prev.find((f) => f.id === fileId);

      // Clean up preview URL
      if (fileToRemove?.preview) {
        URL.revokeObjectURL(fileToRemove.preview);
      }

      return prev.filter((f) => f.id !== fileId);
    });
  }, []);

  /**
   * Clear all files
   */
  const clearFiles = useCallback(() => {
    // Clean up all preview URLs
    files.forEach((f) => {
      if (f.preview) {
        URL.revokeObjectURL(f.preview);
      }
    });

    setFiles([]);
    setError("");
  }, [files]);

  /**
   * Upload a single file with metadata
   */
  const uploadSingleFile = useCallback(
    async (fileObj, metadata = {}) => {
      const formData = new FormData();
      formData.append("file", fileObj.file);

      // Add metadata to FormData
      Object.keys(metadata).forEach((key) => {
        if (metadata[key] !== null && metadata[key] !== undefined) {
          formData.append(key, metadata[key]);
        }
      });

      try {
        // Update file status to uploading (progress will be updated via onUploadProgress)
        setFiles((prev) =>
          prev.map((f) =>
            f.id === fileObj.id ? { ...f, uploading: true, progress: 0 } : f
          )
        );

        const response = await api.post(uploadEndpoint, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          onUploadProgress: (progressEvent) => {
            const total = progressEvent.total || fileObj.size || 1;
            const percent = Math.round((progressEvent.loaded * 100) / total);
            setFiles((prev) =>
              prev.map((f) =>
                f.id === fileObj.id ? { ...f, progress: percent } : f
              )
            );
          },
        });

        const data = response?.data;

        if (response.status < 200 || response.status >= 300) {
          throw new Error((data && data.message) || "Upload failed");
        }

        // Update file with upload result
        setFiles((prev) =>
          prev.map((f) =>
            f.id === fileObj.id
              ? {
                  ...f,
                  uploaded: true,
                  uploading: false,
                  progress: 100,
                  url: data?.url || null,
                  error: null,
                }
              : f
          )
        );

        return {
          success: true,
          fileName: fileObj.name,
          url: data?.url || null,
        };
      } catch (err) {
        const message =
          err?.response?.data?.message || err?.message || "Upload failed";

        // Handle error
        setFiles((prev) =>
          prev.map((f) =>
            f.id === fileObj.id
              ? {
                  ...f,
                  uploading: false,
                  progress: 0,
                  error: message,
                }
              : f
          )
        );

        return {
          success: false,
          error: message,
          fileName: fileObj.name,
        };
      }
    },
    [uploadEndpoint]
  );

  /**
   * Upload all files with shared metadata
   * Each file is uploaded with the same metadata (patientId, fileType, uploadedBy, etc.)
   */
  const uploadAllFiles = useCallback(
    async (sharedMetadata = {}) => {
      if (files.length === 0) {
        setError("No files to upload");
        return { success: false, results: [] };
      }
      console.log(sharedMetadata);

      // Filter only non-uploaded files
      const filesToUpload = files.filter((f) => !f.uploaded);

      if (filesToUpload.length === 0) {
        setError("All files already uploaded");
        return { success: false, results: [] };
      }

      setUploading(true);
      setError("");

      const results = [];

      try {
        // Upload files sequentially with the same metadata
        for (const fileObj of filesToUpload) {
          const result = await uploadSingleFile(fileObj, sharedMetadata);
          results.push(result);
        }

        const successCount = results.filter((r) => r.success).length;
        const failCount = results.filter((r) => !r.success).length;

        if (failCount > 0) {
          setError(
            `${successCount} uploaded successfully, ${failCount} failed`
          );
        }

        return {
          success: failCount === 0,
          results,
          successCount,
          failCount,
        };
      } catch (error) {
        setError(error.message);
        return { success: false, results, error: error.message };
      } finally {
        setUploading(false);
      }
    },
    [files, uploadSingleFile]
  );

  /**
   * Reset hook state
   */
  const reset = useCallback(() => {
    clearFiles();
    setUploading(false);
    setError("");
  }, [clearFiles]);

  /**
   * Validate files before adding
   */
  const validateFiles = useCallback(
    (filesToValidate) => {
      const errors = [];

      filesToValidate.forEach((file) => {
        if (file.size > maxSize) {
          errors.push(
            `${file.name} exceeds maximum size of ${(maxSize / (1024 * 1024)).toFixed(2)}MB`
          );
        }
      });

      if (files.length + filesToValidate.length > maxFiles) {
        errors.push(`Maximum ${maxFiles} files allowed`);
      }

      return {
        valid: errors.length === 0,
        errors,
      };
    },
    [files.length, maxFiles, maxSize]
  );

  /**
   * Get upload statistics
   */
  const getStats = useCallback(() => {
    const total = files.length;
    const uploaded = files.filter((f) => f.uploaded).length;
    const failed = files.filter((f) => f.error).length;
    const pending = total - uploaded - failed;
    const currentlyUploading = files.filter((f) => f.uploading).length;

    return {
      total,
      uploaded,
      failed,
      pending,
      currentlyUploading,
      uploadedPercentage: total > 0 ? (uploaded / total) * 100 : 0,
    };
  }, [files]);

  // Cleanup previews on unmount (and when files change)
  useEffect(() => {
    return () => {
      files.forEach((f) => {
        if (f.preview) URL.revokeObjectURL(f.preview);
      });
    };
  }, [files]);

  return {
    // State
    files,
    uploading,
    error,

    // Actions
    addFiles,
    removeFile,
    clearFiles,
    uploadAllFiles,
    reset,

    // Utilities
    validateFiles,
    getStats,

    // Computed
    hasFiles: files.length > 0,
    hasUploadedFiles: files.some((f) => f.uploaded),
    allFilesUploaded: files.length > 0 && files.every((f) => f.uploaded),
    canUpload:
      files.length > 0 && !uploading && !files.every((f) => f.uploaded),
  };
}

export default useDocUploader;
