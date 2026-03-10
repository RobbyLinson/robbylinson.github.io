import React, { useState, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { removeBackground } from '@imgly/background-removal';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '../../components/ui/card';
import { FaImage, FaTrash, FaDownload } from 'react-icons/fa';

const ACCEPT = 'image/png,image/jpeg,image/webp,.png,.jpg,.jpeg,.webp';

function stripExtension(name) {
  return name.replace(/\.(png|jpe?g|webp)$/i, '');
}

function BackgroundRemover() {
  const navigate = useNavigate();
  const [files, setFiles] = useState([]);
  const [isDraggingOver, setIsDraggingOver] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [progress, setProgress] = useState('');
  const fileInputRef = useRef(null);

  const addFiles = useCallback((newFiles) => {
    const images = Array.from(newFiles).filter((f) =>
      ['image/png', 'image/jpeg', 'image/webp'].includes(f.type)
    );
    if (images.length === 0) return;
    setFiles((prev) => [
      ...prev,
      ...images.map((f) => ({
        file: f,
        name: f.name,
        size: f.size,
        preview: URL.createObjectURL(f),
        result: null,
        resultUrl: null,
      })),
    ]);
  }, []);

  const handleFileChange = (e) => {
    addFiles(e.target.files);
    e.target.value = '';
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDraggingOver(false);
    addFiles(e.dataTransfer.files);
  };

  const removeFile = (index) => {
    setFiles((prev) => {
      const removed = prev[index];
      URL.revokeObjectURL(removed.preview);
      if (removed.resultUrl) URL.revokeObjectURL(removed.resultUrl);
      return prev.filter((_, i) => i !== index);
    });
  };

  const processAll = async () => {
    setProcessing(true);
    try {
      const updated = [];
      for (let i = 0; i < files.length; i++) {
        const f = files[i];
        if (f.result) {
          updated.push(f);
          continue;
        }
        setProgress(`Processing image ${i + 1} of ${files.length}...`);
        const blob = await removeBackground(f.file);
        const url = URL.createObjectURL(blob);
        updated.push({ ...f, result: blob, resultUrl: url });
      }
      setFiles(updated);
      setProgress('');
    } catch (err) {
      console.error('Background removal error:', err);
      setProgress('An error occurred. Please try again.');
    } finally {
      setProcessing(false);
    }
  };

  const downloadFile = (f) => {
    if (!f.resultUrl) return;
    const a = document.createElement('a');
    a.href = f.resultUrl;
    a.download = `${stripExtension(f.name)}-no-bg.png`;
    a.click();
  };

  const downloadAll = async () => {
    for (const f of files) {
      if (f.resultUrl) {
        downloadFile(f);
        await new Promise((r) => setTimeout(r, 300));
      }
    }
  };

  const formatSize = (bytes) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  const hasResults = files.some((f) => f.resultUrl);

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-3xl mx-auto space-y-6">
        {/* Header */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-3xl md:text-4xl text-primary">
                Background Remover
              </CardTitle>
              <button
                onClick={() => navigate('/')}
                className="text-sm text-primary bg-primary/15 px-4 py-1 rounded-full"
              >
                Back Home
              </button>
            </div>
            <p className="text-muted-foreground mt-2">
              Remove backgrounds from images using AI.
            </p>
            <p className="text-muted-foreground text-xs mt-1">
              The AI model (~40 MB) downloads once on first use and is cached by
              your browser for subsequent use.
            </p>
          </CardHeader>
        </Card>

        {/* Drop zone */}
        <Card>
          <CardContent className="p-6">
            <div
              onDrop={handleDrop}
              onDragOver={(e) => {
                e.preventDefault();
                setIsDraggingOver(true);
              }}
              onDragLeave={() => setIsDraggingOver(false)}
              onClick={() => fileInputRef.current?.click()}
              className={`border-2 border-dashed rounded-lg p-12 text-center cursor-pointer transition-colors ${
                isDraggingOver
                  ? 'border-primary bg-primary/10'
                  : 'border-muted-foreground/30 hover:border-primary/50'
              }`}
            >
              <FaImage className="text-5xl text-primary mx-auto mb-4" />
              <p className="text-lg font-medium">
                Drop images here or click to browse
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                PNG, JPG, and WebP files accepted
              </p>
              <input
                ref={fileInputRef}
                type="file"
                accept={ACCEPT}
                multiple
                onChange={handleFileChange}
                className="hidden"
              />
            </div>
          </CardContent>
        </Card>

        {/* File list */}
        {files.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Images ({files.length})</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {files.map((f, idx) => (
                <div
                  key={idx}
                  className="rounded-lg border border-border hover:bg-accent/30 transition-colors overflow-hidden"
                >
                  <div className="flex items-center gap-3 p-3">
                    <img
                      src={f.preview}
                      alt={f.name}
                      className="w-12 h-12 object-cover rounded shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="truncate font-medium">{f.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {formatSize(f.size)}
                        {f.resultUrl && (
                          <span className="text-primary ml-2">
                            ✓ Background removed
                          </span>
                        )}
                      </p>
                    </div>
                    <div className="flex items-center gap-1">
                      {f.resultUrl && (
                        <button
                          onClick={() => downloadFile(f)}
                          className="p-1.5 rounded hover:bg-accent transition-colors text-primary"
                          aria-label="Download result"
                        >
                          <FaDownload className="text-sm" />
                        </button>
                      )}
                      <button
                        onClick={() => removeFile(idx)}
                        className="p-1.5 rounded hover:bg-destructive/20 text-destructive transition-colors"
                        aria-label="Remove file"
                      >
                        <FaTrash className="text-sm" />
                      </button>
                    </div>
                  </div>

                  {/* Before / After preview */}
                  {f.resultUrl && (
                    <div className="grid grid-cols-2 gap-px bg-border">
                      <div className="bg-card p-3">
                        <p className="text-xs text-muted-foreground mb-2 text-center">
                          Original
                        </p>
                        <img
                          src={f.preview}
                          alt="Original"
                          className="w-full h-40 object-contain rounded"
                        />
                      </div>
                      <div
                        className="p-3"
                        style={{
                          background:
                            'repeating-conic-gradient(hsl(var(--muted)) 0% 25%, hsl(var(--card)) 0% 50%) 50% / 16px 16px',
                        }}
                      >
                        <p className="text-xs text-muted-foreground mb-2 text-center">
                          Result
                        </p>
                        <img
                          src={f.resultUrl}
                          alt="Background removed"
                          className="w-full h-40 object-contain rounded"
                        />
                      </div>
                    </div>
                  )}
                </div>
              ))}

              {progress && (
                <p className="text-sm text-primary text-center animate-pulse">
                  {progress}
                </p>
              )}

              <div className="flex gap-3 mt-2">
                <button
                  onClick={processAll}
                  disabled={files.length === 0 || processing}
                  className="flex-1 py-3 rounded-lg bg-primary text-primary-foreground font-semibold hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {processing
                    ? 'Processing...'
                    : `Remove background${files.length !== 1 ? 's' : ''}`}
                </button>
                {hasResults && (
                  <button
                    onClick={downloadAll}
                    className="py-3 px-6 rounded-lg border border-primary text-primary font-semibold hover:bg-primary/10 transition-colors"
                  >
                    Download All
                  </button>
                )}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}

export default BackgroundRemover;
