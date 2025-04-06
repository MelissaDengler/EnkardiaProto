import { useState, useRef } from 'react';
import { X, Upload, FileText, File, AlertCircle } from 'lucide-react';

interface UploadDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export function UploadDialog({ isOpen, onClose }: UploadDialogProps) {
  const [dragActive, setDragActive] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const droppedFiles = Array.from(e.dataTransfer.files);
    validateAndAddFiles(droppedFiles);
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files);
      validateAndAddFiles(selectedFiles);
    }
  };

  const validateAndAddFiles = (newFiles: File[]) => {
    setError(null);
    
    // Validate file types
    const allowedTypes = ['application/pdf', 'image/jpeg', 'image/png', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    const invalidFiles = newFiles.filter(file => !allowedTypes.includes(file.type));
    
    if (invalidFiles.length > 0) {
      setError('Some files are not supported. Please upload PDF, Word, or image files.');
      return;
    }

    // Validate file sizes (10MB limit)
    const maxSize = 10 * 1024 * 1024; // 10MB in bytes
    const oversizedFiles = newFiles.filter(file => file.size > maxSize);

    if (oversizedFiles.length > 0) {
      setError('Some files exceed the 10MB size limit.');
      return;
    }

    setFiles(prev => [...prev, ...newFiles]);
  };

  const removeFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleUpload = async () => {
    // Mock upload process
    try {
      // In a real app, you would send files to your server here
      await new Promise(resolve => setTimeout(resolve, 1500));
      onClose();
      // You might want to refresh the documents list after upload
    } catch (err) {
      setError('Upload failed. Please try again.');
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-2xl overflow-hidden">
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-900">Upload Documents</h2>
            <button 
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div className="p-6">
          {error && (
            <div className="mb-4 p-4 bg-red-50 border-l-4 border-red-500 rounded-r-lg">
              <div className="flex items-center gap-2 text-red-700">
                <AlertCircle className="h-5 w-5" />
                <p className="text-sm">{error}</p>
              </div>
            </div>
          )}

          <div 
            className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors
                      ${dragActive ? 'border-[hsl(var(--primary))] bg-[hsl(var(--primary))]/5' : 'border-gray-300'}
                      ${files.length === 0 ? 'cursor-pointer' : ''}`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            onClick={() => files.length === 0 && inputRef.current?.click()}
          >
            <input
              ref={inputRef}
              type="file"
              multiple
              onChange={handleFileInput}
              className="hidden"
              accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
            />
            
            {files.length === 0 ? (
              <div className="flex flex-col items-center gap-2">
                <Upload className="h-8 w-8 text-gray-400" />
                <p className="text-gray-600">
                  Drag and drop your files here, or{' '}
                  <span className="text-[hsl(var(--primary))] hover:underline">browse</span>
                </p>
                <p className="text-sm text-gray-500">
                  Supported formats: PDF, Word, Images (up to 10MB each)
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {files.map((file, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <FileText className="h-5 w-5 text-[hsl(var(--primary))]" />
                      <div className="text-left">
                        <p className="font-medium text-gray-900">{file.name}</p>
                        <p className="text-sm text-gray-500">
                          {(file.size / (1024 * 1024)).toFixed(2)} MB
                        </p>
                      </div>
                    </div>
                    <button 
                      onClick={() => removeFile(index)}
                      className="text-gray-400 hover:text-red-500 transition-colors"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="p-6 bg-gray-50 border-t border-gray-100 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-700 hover:text-gray-900 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleUpload}
            disabled={files.length === 0}
            className="px-4 py-2 bg-[hsl(var(--primary))] text-white rounded-lg
                     hover:bg-[hsl(var(--primary))/.9] transition-colors
                     disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Upload {files.length > 0 && `(${files.length} ${files.length === 1 ? 'file' : 'files'})`}
          </button>
        </div>
      </div>
    </div>
  );
} 