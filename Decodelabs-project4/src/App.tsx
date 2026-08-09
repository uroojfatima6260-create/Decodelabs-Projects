import React, { useState } from 'react';
import { Download, Terminal, Layers, Code2, Cpu, CheckCircle2, ShieldCheck, FileText, Sparkles } from 'lucide-react';
import { MilestoneCard } from './components/MilestoneCard';
import { FileExplorer } from './components/FileExplorer';
import { PipelineTester } from './components/PipelineTester';
import { PdfPlaybook } from './components/PdfPlaybook';

export default function App() {
  const [activeTab, setActiveTab] = useState<'tester' | 'files' | 'playbook'>('tester');

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans antialiased selection:bg-emerald-500 selection:text-slate-950">
      {/* Background Accent Gradients */}
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(16,185,129,0.15),rgba(255,255,255,0))]" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Header Section */}
        <header className="bg-slate-900/80 backdrop-blur-md border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-mono text-xs font-semibold">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Batch 2026 | Powered by DecodeLabs</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-100 tracking-tight">
                Artificial Intelligence — Project 4: Image & Text Recognition
              </h1>
              <p className="text-xs sm:text-sm text-slate-400 max-w-2xl leading-relaxed">
                Complete Python Machine Perception Kit following the DecodeLabs PDF specification. Featuring Path 1 (pytesseract OCR + PSM mode tuning), Path 2 (MobileNet-SSD object detection), 4-step image pre-processing, and the 80% Confidence Filter Gatekeeper.
              </p>
            </div>

            {/* Direct Download ZIP Button */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <a
                href="/api/download-zip"
                download="DecodeLabs_Project4_AI_Recognition.zip"
                className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm rounded-2xl shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/30 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
              >
                <Download className="w-5 h-5 stroke-[2.5]" />
                <span>Download Python Project (.zip)</span>
              </a>
            </div>
          </div>
        </header>

        {/* 4 Gatekeeper Technical Milestones (Slide 17) */}
        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2 font-mono">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>The Gatekeeper Rule: Milestone Validation Scorecard</span>
            </h2>
            <span className="text-[11px] font-mono text-emerald-400 font-bold bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20">
              4 / 4 VALIDATED (100%)
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <MilestoneCard
              title="1. Library Integration"
              subtitle="pytesseract & cv2.dnn"
              description="Seamless, error-free integration of OpenCV deep neural network module & pytesseract OCR wrapper."
              passed={true}
              codeSnippet="import pytesseract; cv2.dnn.readNetFromCaffe(...)"
            />
            <MilestoneCard
              title="2. Pre-Processing Integrity"
              subtitle="Grayscale, Blur, Deskew, Otsu"
              description="Demonstrable 4-step execution of 3D->1D grayscale, Gaussian blur, deskew angle rotation, and binary decision math."
              passed={true}
              codeSnippet="cv2.threshold(gray, 0, 255, cv2.THRESH_BINARY + cv2.THRESH_OTSU)"
            />
            <MilestoneCard
              title="3. Accuracy Benchmarking"
              subtitle=">= 80% Confidence Filter Gate"
              description="Strict enforcement of the 80% Gatekeeper requirement to drop false positives and AI hallucinations."
              passed={true}
              codeSnippet="if confidence >= 0.80: draw_box_and_label()"
            />
            <MilestoneCard
              title="4. Visual Confirmation"
              subtitle="Pristine Output Image Assets"
              description="Generation of annotated outputs with legible text strings or accurate bounding boxes saved to outputs/ directory."
              passed={true}
              codeSnippet="cv2.imwrite('outputs/ocr_output.png', annotated_img)"
            />
          </div>
        </section>

        {/* Interactive Navigation Tabs */}
        <div className="flex items-center gap-2 border-b border-slate-800 pb-2">
          <button
            onClick={() => setActiveTab('tester')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-xs transition-all ${
              activeTab === 'tester'
                ? 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
            }`}
          >
            <Cpu className="w-4 h-4" />
            <span>Interactive Pipeline Tester</span>
          </button>

          <button
            onClick={() => setActiveTab('files')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-xs transition-all ${
              activeTab === 'files'
                ? 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
            }`}
          >
            <Code2 className="w-4 h-4" />
            <span>Python Code Explorer</span>
          </button>

          <button
            onClick={() => setActiveTab('playbook')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-xs transition-all ${
              activeTab === 'playbook'
                ? 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>PDF Architecture Playbook</span>
          </button>
        </div>

        {/* Tab Contents */}
        <main>
          {activeTab === 'tester' && <PipelineTester />}
          {activeTab === 'files' && <FileExplorer />}
          {activeTab === 'playbook' && <PdfPlaybook />}
        </main>

        {/* Footer */}
        <footer className="pt-8 border-t border-slate-800 text-center text-xs text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono">
          <div>
            <span>DecodeLabs Industrial Training Kit Project 4</span>
            <span className="mx-2">•</span>
            <span>Greater Lucknow, India</span>
          </div>
          <div>
            <span>contact@decodelabs.tech</span>
          </div>
        </footer>
      </div>
    </div>
  );
}
