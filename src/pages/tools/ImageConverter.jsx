import React, { useState, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '../../components/ui/card';
import { FaImage, FaTrash, FaDownload } from 'react-icons/fa';

const FORMATS = [
  { value: 'image/png', label: 'PNG' },
  { value: 'image/jpeg', label: 'JPG' },
  { value: 'image/webp', label: 'WebP' },
];

const ACCEPT = 'image/png,image/jpeg,image/webp,.png,.jpg,.jpeg,.webp';

function getExtension(mime) {
  if (mime === 'image/jpeg') return 'jpg';
  if (mime === 'image/png') return 'png';
  return 'webp';
}

function stripExtension(name) {
  return name.replace(/\.(png|jpe?g|webp)$/i, '');
}

function ImageConverter() {
  const navigate = useNavigate();
  const [files, setFiles] = useState([]);
  const [targetFormat, setTargetFormat] = useState('image/png');
  const [isDraggingOver, setIsDraggingOver] = useState(false);
  const [converting, setConverting] = useState(false);
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
        type: f.type,
        preview: URL.createObjectURL(f),
        converted: null,
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
      if (removed.converted) URL.revokeObjectURL(removed.converted);
      return prev.filter((_, i) => i !== index);
    });
  };

  const convertImage = (file, format) => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = img.naturalWidth;
        canvas.height = img.naturalHeight;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0);
        canvas.toBlob(
          (blob) => {
            if (blob) resolve(blob);
            else reject(new Error('Conversion failed'));
          },
          format,
          0.92
        );
      };
      img.onerror = () => reject(new Error('Failed to load image'));
      img.src = URL.createObjectURL(file);
    });
  };

  const convertAll = async () => {
    setConverting(true);
    try {
      const updated = await Promise.all(
        files.map(async (f) => {
          const blob = await convertImage(f.file, targetFormat);
          const url = URL.createObjectURL(blob);
          return { ...f, converted: url, convertedBlob: blob };
        })
      );
      setFiles(updated);
    } catch (err) {
      console.error('Conversion error:', err);
    } finally {
      setConverting(false);
    }
  };

  const downloadFile = (f) => {
    if (!f.converted) return;
    const a = document.createElement('a');
    a.href = f.converted;
    a.download = `${stripExtension(f.name)}.${getExtension(targetFormat)}`;
    a.click();
  };

  const downloadAll = async () => {
    for (const f of files) {
      if (f.converted) {
        downloadFile(f);
        // Small delay between downloads so the browser doesn't block them
        await new Promise((r) => setTimeout(r, 300));
      }
    }
  };

  const formatSize = (bytes) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  const formatLabel = (mime) => {
    const f = FORMATS.find((fmt) => fmt.value === mime);
    return f ? f.label : mime;
  };

  const hasConverted = files.some((f) => f.converted);

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-3xl mx-auto space-y-6">
        {/* Header */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-3xl md:text-4xl text-primary">
                Image Converter
              </CardTitle>
              <button
                onClick={() => navigate('/')}
                className="text-sm text-primary bg-primary/15 px-4 py-1 rounded-full"
              >
                Back Home
              </button>
            </div>
            <p className="text-muted-foreground mt-2">
              Convert between PNG, JPG, and WebP. Everything runs locally in
              your browser — no uploads, no ads, no tracking.
            </p>
          </CardHeader>
        </Card>

        {/* Format selector */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4 flex-wrap">
              <span className="font-medium">Convert to:</span>
              {FORMATS.map((fmt) => (
                <button
                  key={fmt.value}
                  onClick={() => {
                    setTargetFormat(fmt.value);
                    // Clear previous conversions when format changes
                    setFiles((prev) =>
                      prev.map((f) => {
                        if (f.converted) URL.revokeObjectURL(f.converted);
                        return { ...f, converted: null, convertedBlob: null };
                      })
                    );
                  }}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    targetFormat === fmt.value
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-accent/50 hover:bg-accent text-foreground'
                  }`}
                >
                  {fmt.label}
                </button>
              ))}
            </div>
          </CardContent>
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
            <CardContent className="space-y-2">
              {files.map((f, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-3 p-3 rounded-lg border border-border hover:bg-accent/30 transition-colors"
                >
                  <img
                    src={f.preview}
                    alt={f.name}
                    className="w-12 h-12 object-cover rounded shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="truncate font-medium">{f.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {formatSize(f.size)} · {formatLabel(f.type)}
                      {f.converted && (
                        <span className="text-primary ml-2">
                          → {formatLabel(targetFormat)}
                        </span>
                      )}
                    </p>
                  </div>
                  <div className="flex items-center gap-1">
                    {f.converted && (
                      <button
                        onClick={() => downloadFile(f)}
                        className="p-1.5 rounded hover:bg-accent transition-colors text-primary"
                        aria-label="Download converted file"
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
              ))}

              <div className="flex gap-3 mt-4">
                <button
                  onClick={convertAll}
                  disabled={files.length === 0 || converting}
                  className="flex-1 py-3 rounded-lg bg-primary text-primary-foreground font-semibold hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {converting
                    ? 'Converting...'
                    : `Convert ${files.length} image${files.length !== 1 ? 's' : ''} to ${formatLabel(targetFormat)}`}
                </button>
                {hasConverted && (
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

export default ImageConverter;
