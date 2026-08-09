import React from 'react';
import { BookOpen, Layers, Cpu, ShieldCheck, ArrowRight, CheckCircle2 } from 'lucide-react';

export const PdfPlaybook: React.FC = () => {
  const slides = [
    {
      page: "Page 1 - Title",
      title: "Artificial Intelligence - Project 4 Industrial Training Kit",
      subtitle: "Batch: 2026 | Powered by DecodeLabs",
      content: "Optic Nerve Machine Perception playbook covering Image & Text Recognition."
    },
    {
      page: "Page 6 - Mission Parameters",
      title: "Objective, Toolkit & Deliverable",
      subtitle: "The Core Blueprint",
      content: "Objective: Engineer a Python script capable of ingesting raw visual data and extracting accurate machine-readable intelligence. Toolkit: pytesseract, OpenCV, MobileNet-SSD."
    },
    {
      page: "Page 7 - The IPO Model",
      title: "Deconstructing Visual Input",
      subtitle: "3D Image Array Matrix Anatomy",
      content: "Height (H) & Width (W) spatial resolution x Depth (C) 3 color channels (BGR/RGB). Every pixel channel holds a value from 0 to 255. A single 512x512 image generates 786,432 distinct data points."
    },
    {
      page: "Page 9 - The Perception Matrix",
      title: "Path 1 (OCR) vs Path 2 (Object Detection)",
      subtitle: "Execution Path Comparison",
      content: "Path 1: pytesseract for string extraction with Grayscale, blur, adaptive thresholding. Path 2: cv2.dnn + MobileNet-SSD for bounding boxes (X,Y,W,H) with 4D Blob Construction."
    },
    {
      page: "Page 11 & 12 - Systematic Pre-Processing",
      title: "The Logic Skeleton & Adaptive Thresholding",
      subtitle: "Step 1 to Step 4 Pipeline",
      content: "Step 1: Grayscale Conversion (3D -> 1D). Step 2: Gaussian Blur (Smoothing noise). Step 3: Deskewing (Baseline rotation angle). Step 4: Otsu's Thresholding (Cutoff math: IF pixel >= Cutoff THEN 255 ELSE 0)."
    },
    {
      page: "Page 13 & 14 - MobileNet-SSD",
      title: "Blob Construction & Bounding Box Coordinates",
      subtitle: "Deep Learning Architecture",
      content: "4D Blob via cv2.dnn.blobFromImage (300x300, mean subtraction, 0.007843 scaling). Coordinate scaling multiplies normalized outputs by actual pixel dimensions."
    },
    {
      page: "Page 16 - The 80% Threshold Gate",
      title: "The Confidence Filter Standard",
      subtitle: "if confidence >= 0.80: draw_box_and_label() else: drop_detection()",
      content: "High thresholds minimize False Positives and eliminate AI hallucinations. 80% is the absolute minimum standard in Project 4."
    },
    {
      page: "Page 17 - The Gatekeeper Rule",
      title: "Milestone Technical Validations",
      subtitle: "100% Compliance Required",
      content: "1. Library Integration (pytesseract or cv2.dnn). 2. Pre-Processing Integrity. 3. Accuracy Benchmarking (>= 80%). 4. Visual Confirmation (Pristine outputs saved)."
    }
  ];

  return (
    <div className="space-y-6">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
        <div className="flex items-center gap-3 border-b border-slate-800 pb-4 mb-6">
          <div className="p-2 bg-emerald-500/10 text-emerald-400 rounded-xl">
            <BookOpen className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-100">
              DecodeLabs Project 4 PDF Architecture Playbook
            </h3>
            <p className="text-xs text-slate-400">
              Complete specification breakdown directly extracted from Industrial Training Kit slides
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {slides.map((s, idx) => (
            <div
              key={idx}
              className="bg-slate-950/80 border border-slate-800/80 p-5 rounded-xl hover:border-emerald-500/40 transition-all space-y-2"
            >
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-emerald-400 font-semibold">{s.page}</span>
                <span className="text-slate-500">DecodeLabs Batch 2026</span>
              </div>
              <h4 className="text-sm font-bold text-slate-200">{s.title}</h4>
              <p className="text-xs text-slate-400 leading-relaxed">{s.content}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
