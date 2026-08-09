import React, { useState, useEffect } from 'react';
import { FileText, Folder, Copy, Check, Download, Code2, Terminal } from 'lucide-react';

export const FileExplorer: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<string>("main.py");
  const [fileContent, setFileContent] = useState<string>("");
  const [copied, setCopied] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const files = [
    { name: "main.py", path: "main.py", desc: "Primary CLI Pipeline Launcher" },
    { name: "preprocessing.py", path: "preprocessing.py", desc: "Systematic Image Pre-Processing (Grayscale, Blur, Deskew, Otsu)" },
    { name: "ocr_engine.py", path: "ocr_engine.py", desc: "Path 1: pytesseract OCR & PSM Mode Tuning" },
    { name: "object_detector.py", path: "object_detector.py", desc: "Path 2: MobileNet-SSD Object Detection & 80% Gate" },
    { name: "test_pipeline.py", path: "test_pipeline.py", desc: "Milestone Validation Suite (The 4 Gatekeepers)" },
    { name: "generate_samples.py", path: "generate_samples.py", desc: "Test Input Image Matrix Generator" },
    { name: "download_models.py", path: "download_models.py", desc: "Caffe Model Architecture Download Script" },
    { name: "requirements.txt", path: "requirements.txt", desc: "Python Package Dependencies" },
    { name: "README.md", path: "README.md", desc: "DecodeLabs Project 4 Documentation" }
  ];

  useEffect(() => {
    fetchFileContent(selectedFile);
  }, [selectedFile]);

  const fetchFileContent = async (filePath: string) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/file-content?path=${encodeURIComponent(filePath)}`);
      const data = await res.json();
      if (data.content) {
        setFileContent(data.content);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(fileContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
      {/* File List */}
      <div className="lg:col-span-4 space-y-2 border-r border-slate-800 pr-0 lg:pr-6">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-3">
          <div className="flex items-center gap-2 text-slate-200 font-semibold text-sm">
            <Folder className="w-4 h-4 text-emerald-400" />
            <span>project4_ai_recognition/</span>
          </div>
          <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-400">
            {files.length} Files
          </span>
        </div>

        {files.map((file) => (
          <button
            key={file.path}
            onClick={() => setSelectedFile(file.path)}
            className={`w-full text-left p-3 rounded-xl transition-all flex items-start gap-3 border ${
              selectedFile === file.path
                ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-300'
                : 'bg-slate-950/60 border-slate-800/80 text-slate-400 hover:bg-slate-800/60 hover:text-slate-200'
            }`}
          >
            <FileText className={`w-4 h-4 mt-0.5 shrink-0 ${selectedFile === file.path ? 'text-emerald-400' : 'text-slate-500'}`} />
            <div className="overflow-hidden">
              <div className="font-mono text-xs font-semibold truncate">{file.name}</div>
              <div className="text-[11px] text-slate-500 truncate mt-0.5">{file.desc}</div>
            </div>
          </button>
        ))}

        <div className="pt-4 border-t border-slate-800/80">
          <a
            href="/api/download-zip"
            download="DecodeLabs_Project4_AI_Recognition.zip"
            className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs rounded-xl shadow-lg transition-all"
          >
            <Download className="w-4 h-4" />
            <span>Download All Files (.zip)</span>
          </a>
        </div>
      </div>

      {/* Code Viewer */}
      <div className="lg:col-span-8 flex flex-col h-[580px]">
        <div className="flex items-center justify-between bg-slate-950 px-4 py-3 rounded-t-xl border border-slate-800 border-b-0">
          <div className="flex items-center gap-2 font-mono text-xs text-slate-300">
            <Code2 className="w-4 h-4 text-emerald-400" />
            <span>{selectedFile}</span>
          </div>
          <button
            onClick={copyToClipboard}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition-all"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied!' : 'Copy Code'}</span>
          </button>
        </div>

        <div className="flex-1 bg-slate-950/90 p-4 rounded-b-xl border border-slate-800 font-mono text-xs overflow-auto text-slate-300 leading-relaxed scrollbar-thin">
          {loading ? (
            <div className="flex items-center justify-center h-full text-slate-500">Loading code contents...</div>
          ) : (
            <pre className="whitespace-pre">{fileContent}</pre>
          )}
        </div>
      </div>
    </div>
  );
};
