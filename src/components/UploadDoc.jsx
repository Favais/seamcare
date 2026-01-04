import React, { useCallback, useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Button } from "./ui/button";
import {
  UploadCloud,
  X,
  FileIcon,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import { BsUpload } from "react-icons/bs";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { useDropzone } from "react-dropzone";
import { toast } from "sonner";
import { useDocUploader } from "@/hooks/useDocUploader";
import { useAppContext } from "@/context/AppContext";

const UploadDoc = ({}) => {
  const [open, setOpen] = useState(false);
  const [fileTitle, setFileTitle] = useState("");
  // only bulk upload supported
  const { user } = useAppContext();

  // Bulk upload state
  const [bulkFileType, setBulkFileType] = useState("");
  const [bulkPatientId, setBulkPatientId] = useState("");

  // (No per-file metadata state; bulk-only)

  // Use the custom upload hook
  const {
    files,
    uploading,
    error,
    addFiles,
    removeFile,
    uploadAllFiles,
    reset,
    hasFiles,
    canUpload,
    getStats,
  } = useDocUploader({
    maxSize: 5 * 1024 * 1024,
    maxFiles: 10,
    uploadEndpoint: "/uploadDocs",
  });

  // Dropzone configuration
  const onDrop = useCallback(
    (acceptedFiles, rejectedFiles) => {
      // defensive: ensure arrays (some callers may pass null)
      addFiles(acceptedFiles ?? [], rejectedFiles ?? []);
    },
    [addFiles]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: true,
    accept: {
      "image/*": [".png", ".jpg", ".jpeg", ".gif"],
      "application/pdf": [".pdf"],
    },
    maxSize: 5 * 1024 * 1024,
    disabled: uploading,
  });

  // (No per-file metadata functions required for bulk-only)

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!hasFiles) {
      toast.error("Please select at least one file");
      return;
    }

    let result;

    // Bulk upload: same metadata for all files
    if (!bulkFileType) {
      toast.error("Please select a document type");
      return;
    }
    if (!bulkPatientId.trim()) {
      toast.error("Please enter a patient ID");
      return;
    }

    result = await uploadAllFiles({
      fileName: fileTitle.trim(),
      fileType: bulkFileType,
      patientId: bulkPatientId.trim(),
      uploadedBy: user?.userId || "unknown",
    });

    if (result.success) {
      toast.success(`${result.successCount} file(s) uploaded successfully!`);
      handleReset();
      setOpen(false);
    } else {
      toast.error(
        `Upload completed with errors: ${result.successCount} succeeded, ${result.failCount} failed`
      );
    }
  };

  // Reset form
  const handleReset = () => {
    reset();
    setBulkFileType("");
    setBulkPatientId("");
  };

  // Handle dialog close
  const handleDialogChange = (isOpen) => {
    setOpen(isOpen);
    if (!isOpen && !uploading) {
      handleReset();
    }
  };

  const stats = getStats();

  const formatFileSize = (bytes) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + " " + sizes[i];
  };

  return (
    <div className="flex justify-end items-center py-3">
      <Dialog open={open} onOpenChange={handleDialogChange}>
        <DialogTrigger asChild>
          <Button variant="outline">
            <UploadCloud className="mr-2 h-4 w-4" />
            Upload Documents
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <form onSubmit={handleSubmit} className="w-full">
            <DialogHeader>
              <DialogTitle>Upload Documents</DialogTitle>
              <DialogDescription>
                Bulk upload: same document type for all files.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 mt-4">
              <Input
                id="fileTitle"
                value={fileTitle}
                onChange={(e) => setFileTitle(e.target.value)}
                placeholder="File Title (optional)"
                disabled={uploading}
              />
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="bulkFileType">
                    Document Type <span className="text-red-500">*</span>
                  </Label>
                  <Select
                    value={bulkFileType}
                    onValueChange={setBulkFileType}
                    disabled={uploading}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select type (applies to all)" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="prescription">Prescription</SelectItem>
                      <SelectItem value="labReport">Lab Report</SelectItem>
                      <SelectItem value="notes">Notes</SelectItem>
                      <SelectItem value="referral">Referral</SelectItem>
                      <SelectItem value="xRay">X-Ray</SelectItem>
                      <SelectItem value="mri">MRI</SelectItem>
                      <SelectItem value="ctScan">CT Scan</SelectItem>
                      <SelectItem value="bloodTest">Blood Test</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bulkPatientID">
                    Patient ID <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="bulkPatientID"
                    value={bulkPatientId}
                    onChange={(e) => setBulkPatientId(e.target.value)}
                    placeholder="Applies to all files"
                    disabled={uploading}
                  />
                </div>
              </div>
            </div>

            {/* Dropzone */}
            <div
              {...getRootProps()}
              className={`border-2 border-dashed h-40 p-6 rounded-2xl text-center flex flex-col items-center justify-center cursor-pointer transition-all mt-4
                                ${isDragActive ? "border-blue-500 bg-blue-50 scale-105" : "border-gray-300 hover:border-blue-400 hover:bg-gray-50"}
                                ${uploading ? "opacity-50 cursor-not-allowed" : ""}`}
            >
              <input {...getInputProps()} />
              <UploadCloud className="h-10 w-10 text-gray-400 mb-2" />
              {isDragActive ? (
                <p className="text-blue-600 font-medium text-sm">
                  Drop files here...
                </p>
              ) : (
                <>
                  <p className="text-gray-700 font-medium text-sm mb-1">
                    Drag & drop files or click to browse
                  </p>
                  <p className="text-xs text-gray-400">
                    Images, PDF • Max 5MB • Up to 10 files
                  </p>
                </>
              )}
            </div>

            {/* Upload Statistics */}
            {hasFiles && (
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200 mt-4">
                <div className="text-sm text-gray-600">
                  <span className="font-medium">{stats.total}</span> file(s)
                  {stats.uploaded > 0 && (
                    <>
                      {" "}
                      •{" "}
                      <span className="text-green-600 font-medium">
                        {stats.uploaded}
                      </span>{" "}
                      uploaded
                    </>
                  )}
                </div>
                {stats.uploadedPercentage > 0 && (
                  <div className="text-sm font-medium text-gray-700">
                    {Math.round(stats.uploadedPercentage)}%
                  </div>
                )}
              </div>
            )}

            {/* Selected Files */}
            {hasFiles && (
              <div className="space-y-2 mt-4">
                <Label>Selected Files</Label>
                <div className="space-y-3 max-h-64 overflow-y-auto pr-2">
                  {files.map((fileObj) => (
                    <div
                      key={fileObj.id}
                      className={`border rounded-lg p-3 transition-all
                                                ${
                                                  fileObj.uploaded
                                                    ? "bg-green-50 border-green-200"
                                                    : fileObj.error
                                                      ? "bg-red-50 border-red-200"
                                                      : "bg-white border-gray-200"
                                                }`}
                    >
                      <div className="flex items-start gap-3">
                        {/* Preview */}
                        <div className="flex-shrink-0">
                          {fileObj.preview ? (
                            <img
                              src={fileObj.preview}
                              alt={fileObj.name}
                              className="h-12 w-12 object-cover rounded"
                            />
                          ) : (
                            <div className="h-12 w-12 bg-gray-100 rounded flex items-center justify-center">
                              <FileIcon className="h-6 w-6 text-gray-400" />
                            </div>
                          )}
                        </div>

                        {/* File Info */}
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 truncate">
                            {fileObj.name}
                          </p>
                          <p className="text-xs text-gray-500 mb-2">
                            {formatFileSize(fileObj.size)}
                          </p>

                          {/* Per-file metadata removed — bulk-only mode */}

                          {/* Progress Bar */}
                          {fileObj.uploading && (
                            <div className="mt-2 w-full bg-gray-200 rounded-full h-1.5">
                              <div
                                className="bg-blue-600 h-1.5 rounded-full transition-all"
                                style={{ width: `${fileObj.progress}%` }}
                              />
                            </div>
                          )}

                          {fileObj.error && (
                            <p className="text-xs text-red-600 mt-1">
                              {fileObj.error}
                            </p>
                          )}
                        </div>

                        {/* Status / Remove */}
                        <div className="flex-shrink-0">
                          {fileObj.uploaded ? (
                            <CheckCircle className="h-5 w-5 text-green-500" />
                          ) : fileObj.error ? (
                            <AlertCircle className="h-5 w-5 text-red-500" />
                          ) : fileObj.uploading ? (
                            <div className="animate-spin h-5 w-5 border-2 border-blue-500 border-t-transparent rounded-full" />
                          ) : (
                            <button
                              type="button"
                              onClick={() => removeFile(fileObj.id)}
                              className="text-gray-400 hover:text-red-500"
                              disabled={uploading}
                            >
                              <X className="h-5 w-5" />
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Error Message */}
            {error && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg flex items-start gap-2 mt-4">
                <AlertCircle className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-red-600">{error}</p>
              </div>
            )}

            <DialogFooter className="gap-2 mt-6">
              <DialogClose asChild>
                <Button type="button" variant="outline" disabled={uploading}>
                  Cancel
                </Button>
              </DialogClose>

              {hasFiles && !uploading && (
                <Button type="button" variant="ghost" onClick={handleReset}>
                  Clear All
                </Button>
              )}

              <Button
                type="submit"
                disabled={!canUpload}
                className="min-w-[120px]"
              >
                {uploading ? (
                  <>
                    <div className="animate-spin mr-2 h-4 w-4 border-2 border-white border-t-transparent rounded-full" />
                    Uploading...
                  </>
                ) : (
                  <>
                    <BsUpload className="mr-2" />
                    Upload {hasFiles && `(${files.length})`}
                  </>
                )}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UploadDoc;
