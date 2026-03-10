import React, { useState, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { PDFDocument } from 'pdf-lib';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '../../components/ui/card';
import { FaFilePdf, FaTrash, FaArrowUp, FaArrowDown } from 'react-icons/fa';

function PdfCombiner() {
  const navigate = useNavigate();
  const [files, setFiles] = useState([]);
  const [combining, setCombining] = useState(false);
  const [dragOverIndex, setDragOverIndex] = useState(null);
  const [isDraggingOver, setIsDraggingOver] = useState(false);
  const fileInputRef = useRef(null);
  const dragItem = useRef(null);

  const addFiles = useCallback((newFiles) => {
    const pdfFiles = Array.from(newFiles).filter(
      (f) => f.type === 'application/pdf'
    );
    if (pdfFiles.length === 0) return;
    setFiles((prev) => [
      ...prev,
      ...pdfFiles.map((f) => ({ file: f, name: f.name, size: f.size })),
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

  const handleDropZoneDragOver = (e) => {
    e.preventDefault();
    setIsDraggingOver(true);
  };

  const handleDropZoneDragLeave = () => {
    setIsDraggingOver(false);
  };

  const removeFile = (index) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const moveFile = (index, direction) => {
    setFiles((prev) => {
      const next = [...prev];
      const target = index + direction;
      if (target < 0 || target >= next.length) return prev;
      [next[index], next[target]] = [next[target], next[index]];
      return next;
    });
  };

  // Drag-to-reorder handlers
  const handleDragStart = (index) => {
    dragItem.current = index;
  };

  const handleDragEnter = (index) => {
    setDragOverIndex(index);
  };

  const handleDragEnd = () => {
    if (
      dragItem.current !== null &&
      dragOverIndex !== null &&
      dragItem.current !== dragOverIndex
    ) {
      setFiles((prev) => {
        const next = [...prev];
        const [removed] = next.splice(dragItem.current, 1);
        next.splice(dragOverIndex, 0, removed);
        return next;
      });
    }
    dragItem.current = null;
    setDragOverIndex(null);
  };

  const combinePdfs = async () => {
    if (files.length < 2) return;
    setCombining(true);
    try {
      const mergedPdf = await PDFDocument.create();

      for (const { file } of files) {
        const arrayBuffer = await file.arrayBuffer();
        const pdf = await PDFDocument.load(arrayBuffer);
        const pages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
        pages.forEach((page) => mergedPdf.addPage(page));
      }

      const mergedBytes = await mergedPdf.save();
      const blob = new Blob([mergedBytes], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'combined.pdf';
      a.click();
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error('Failed to combine PDFs:', err);
    } finally {
      setCombining(false);
    }
  };

  const formatSize = (bytes) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-3xl mx-auto space-y-6">
        {/* Header */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-3xl md:text-4xl text-primary">
                PDF Combiner
              </CardTitle>
              <button
                onClick={() => navigate('/')}
                className="text-sm text-primary bg-primary/15 px-4 py-1 rounded-full"
              >
                Back Home
              </button>
            </div>
            <p className="text-muted-foreground mt-2">
              Combine multiple PDFs into one.
            </p>
          </CardHeader>
        </Card>

        {/* Drop zone */}
        <Card>
          <CardContent className="p-6">
            <div
              onDrop={handleDrop}
              onDragOver={handleDropZoneDragOver}
              onDragLeave={handleDropZoneDragLeave}
              onClick={() => fileInputRef.current?.click()}
              className={`border-2 border-dashed rounded-lg p-12 text-center cursor-pointer transition-colors ${
                isDraggingOver
                  ? 'border-primary bg-primary/10'
                  : 'border-muted-foreground/30 hover:border-primary/50'
              }`}
            >
              <FaFilePdf className="text-5xl text-primary mx-auto mb-4" />
              <p className="text-lg font-medium">
                Drop PDF files here or click to browse
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                Only .pdf files are accepted
              </p>
              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf,application/pdf"
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
              <CardTitle className="text-xl">Files ({files.length})</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {files.map((f, idx) => (
                <div
                  key={idx}
                  draggable
                  onDragStart={() => handleDragStart(idx)}
                  onDragEnter={() => handleDragEnter(idx)}
                  onDragEnd={handleDragEnd}
                  onDragOver={(e) => e.preventDefault()}
                  className={`flex items-center gap-3 p-3 rounded-lg border transition-colors cursor-grab active:cursor-grabbing ${
                    dragOverIndex === idx
                      ? 'border-primary bg-primary/10'
                      : 'border-border hover:bg-accent/30'
                  }`}
                >
                  <span className="text-muted-foreground text-sm font-mono w-6 text-center">
                    {idx + 1}
                  </span>
                  <FaFilePdf className="text-primary text-lg shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="truncate font-medium">{f.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {formatSize(f.size)}
                    </p>
                  </div>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => moveFile(idx, -1)}
                      disabled={idx === 0}
                      className="p-1.5 rounded hover:bg-accent disabled:opacity-30 transition-colors"
                      aria-label="Move up"
                    >
                      <FaArrowUp className="text-sm" />
                    </button>
                    <button
                      onClick={() => moveFile(idx, 1)}
                      disabled={idx === files.length - 1}
                      className="p-1.5 rounded hover:bg-accent disabled:opacity-30 transition-colors"
                      aria-label="Move down"
                    >
                      <FaArrowDown className="text-sm" />
                    </button>
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

              <button
                onClick={combinePdfs}
                disabled={files.length < 2 || combining}
                className="w-full mt-4 py-3 rounded-lg bg-primary text-primary-foreground font-semibold hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {combining ? 'Combining...' : `Combine ${files.length} PDFs`}
              </button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}

export default PdfCombiner;
