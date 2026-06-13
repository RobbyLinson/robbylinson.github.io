import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { QRCodeSVG } from 'qrcode.react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '../../components/ui/card';
import { FaDownload } from 'react-icons/fa';

const SIZES = [128, 256, 512, 1024];
const EC_LEVELS = [
  { value: 'L', label: 'Low (7%)' },
  { value: 'M', label: 'Medium (15%)' },
  { value: 'Q', label: 'Quartile (25%)' },
  { value: 'H', label: 'High (30%)' },
];

function QrGenerator() {
  const navigate = useNavigate();
  const [input, setInput] = useState('');
  const [size, setSize] = useState(256);
  const [ecLevel, setEcLevel] = useState('M');
  const svgRef = useRef(null);

  const hasContent = input.trim().length > 0;

  const downloadPng = () => {
    if (!hasContent) return;
    const svg = svgRef.current?.querySelector('svg');
    if (!svg) return;

    const serializer = new XMLSerializer();
    const svgStr = serializer.serializeToString(svg);
    const blob = new Blob([svgStr], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);

    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = size;
      canvas.height = size;
      const ctx = canvas.getContext('2d');
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, size, size);
      ctx.drawImage(img, 0, 0, size, size);
      URL.revokeObjectURL(url);
      canvas.toBlob((pngBlob) => {
        const a = document.createElement('a');
        a.href = URL.createObjectURL(pngBlob);
        a.download = 'qr-code.png';
        a.click();
      }, 'image/png');
    };
    img.src = url;
  };

  const downloadSvg = () => {
    if (!hasContent) return;
    const svg = svgRef.current?.querySelector('svg');
    if (!svg) return;
    const serializer = new XMLSerializer();
    const svgStr = serializer.serializeToString(svg);
    const blob = new Blob([svgStr], { type: 'image/svg+xml' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'qr-code.svg';
    a.click();
  };

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-2xl mx-auto space-y-6">
        {/* Header */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-3xl md:text-4xl text-primary">
                QR Generator
              </CardTitle>
              <button
                onClick={() => navigate('/')}
                className="text-sm text-primary bg-primary/15 px-4 py-1 rounded-full"
              >
                Back Home
              </button>
            </div>
            <p className="text-muted-foreground mt-2">
              Generate QR codes for any URL or text — entirely in your browser.
            </p>
          </CardHeader>
        </Card>

        {/* Input */}
        <Card>
          <CardContent className="p-6 space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                URL or text
              </label>
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="https://example.com"
                rows={3}
                className="w-full rounded-lg border border-border bg-background px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Export size (px)
                </label>
                <div className="flex gap-2 flex-wrap">
                  {SIZES.map((s) => (
                    <button
                      key={s}
                      onClick={() => setSize(s)}
                      className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                        size === s
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-accent/50 hover:bg-accent text-foreground'
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Error correction
                </label>
                <select
                  value={ecLevel}
                  onChange={(e) => setEcLevel(e.target.value)}
                  className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                >
                  {EC_LEVELS.map((ec) => (
                    <option key={ec.value} value={ec.value}>
                      {ec.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Preview */}
        <Card>
          <CardContent className="p-6 flex flex-col items-center gap-6">
            <div
              ref={svgRef}
              className={`p-4 bg-white rounded-xl transition-opacity ${
                hasContent ? 'opacity-100' : 'opacity-30'
              }`}
            >
              <QRCodeSVG
                value={hasContent ? input : 'placeholder'}
                size={220}
                level={ecLevel}
                marginSize={1}
              />
            </div>

            {!hasContent && (
              <p className="text-sm text-muted-foreground -mt-2">
                Enter text above to generate a QR code
              </p>
            )}

            <div className="flex gap-3">
              <button
                onClick={downloadPng}
                disabled={!hasContent}
                className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-primary text-primary-foreground font-semibold hover:bg-primary/90 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              >
                <FaDownload className="text-sm" />
                Download PNG
              </button>
              <button
                onClick={downloadSvg}
                disabled={!hasContent}
                className="flex items-center gap-2 px-5 py-2.5 rounded-lg border border-primary text-primary font-semibold hover:bg-primary/10 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              >
                <FaDownload className="text-sm" />
                Download SVG
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default QrGenerator;
