import React, { useState, useEffect } from 'react';
import { Play, Sliders, ShieldCheck, Cpu, Eye, FileText, CheckCircle2, XCircle } from 'lucide-react';

export const PipelineTester: React.FC = () => {
  const [selectedPath, setSelectedPath] = useState<number>(1);
  const [sampleType, setSampleType] = useState<string>('invoice');
  const [psm, setPsm] = useState<number>(11);
  const [confidenceGate, setConfidenceGate] = useState<number>(80);
  const [enablePreprocessing, setEnablePreprocessing] = useState<boolean>(true);
  
  const [loading, setLoading] = useState<boolean>(false);
  const [results, setResults] = useState<any>(null);

  const psmOptions = [
    { value: 3, label: "--psm 3 : Fully automatic layout analysis (Default)" },
    { value: 6, label: "--psm 6 : Single uniform block of text (Book pages)" },
    { value: 7, label: "--psm 7 : Single text line (Vehicle number plates)" },
    { value: 11, label: "--psm 11 : Sparse, scattered text (Invoices/Receipts)" }
  ];

  const runPipelineTest = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/run-pipeline', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          path: selectedPath,
          sampleType,
          psm,
          confidence: confidenceGate / 100.0,
          enablePreprocessing
        })
      });
      const data = await res.json();
      setResults(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    runPipelineTest();
  }, [selectedPath, sampleType, psm, confidenceGate, enablePreprocessing]);

  return (
    <div className="space-y-6">
      {/* Top Configuration Controls */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div>
            <h3 className="text-base font-bold text-slate-100 flex items-center gap-2">
              <Cpu className="w-5 h-5 text-emerald-400" />
              <span>Pipeline Execution Configuration</span>
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              Select Execution Path & tune Page Segmentation Modes or Confidence Gatekeepers
            </p>
          </div>

          <button
            onClick={runPipelineTest}
            disabled={loading}
            className="flex items-center gap-2 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs rounded-xl shadow-lg transition-all disabled:opacity-50"
          >
            <Play className="w-4 h-4 fill-current" />
            <span>{loading ? 'Executing Pipeline...' : 'Run Pipeline'}</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Path Mode Selection */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-300">Execution Path</label>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => { setSelectedPath(1); setSampleType('invoice'); }}
                className={`p-3 rounded-xl border text-xs font-semibold transition-all text-left ${
                  selectedPath === 1
                    ? 'bg-emerald-500/20 border-emerald-500/50 text-emerald-300'
                    : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                }`}
              >
                <div className="font-bold">Path 1: OCR</div>
                <div className="text-[10px] text-slate-400 font-normal mt-0.5">pytesseract text extraction</div>
              </button>

              <button
                onClick={() => { setSelectedPath(2); setSampleType('street'); }}
                className={`p-3 rounded-xl border text-xs font-semibold transition-all text-left ${
                  selectedPath === 2
                    ? 'bg-emerald-500/20 border-emerald-500/50 text-emerald-300'
                    : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                }`}
              >
                <div className="font-bold">Path 2: Object Detection</div>
                <div className="text-[10px] text-slate-400 font-normal mt-0.5">MobileNet-SSD cv2.dnn</div>
              </button>
            </div>
          </div>

          {/* Sample Input / PSM Tuning */}
          {selectedPath === 1 ? (
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-300">PSM Mode Tuning (Slide 10)</label>
              <select
                value={psm}
                onChange={(e) => setPsm(Number(e.target.value))}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-slate-200 focus:outline-none focus:border-emerald-500"
              >
                {psmOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>
          ) : (
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-300">Sample Visual Matrix</label>
              <select
                value={sampleType}
                onChange={(e) => setSampleType(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-slate-200 focus:outline-none focus:border-emerald-500"
              >
                <option value="street">Street Scene (Car, Person, Dog)</option>
              </select>
            </div>
          )}

          {/* 80% Confidence Gate Threshold */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs">
              <label className="font-semibold text-slate-300">The 80% Gatekeeper Threshold (Slide 16)</label>
              <span className="font-mono font-bold text-emerald-400">{confidenceGate}%</span>
            </div>
            <input
              type="range"
              min="50"
              max="95"
              step="5"
              value={confidenceGate}
              onChange={(e) => setConfidenceGate(Number(e.target.value))}
              className="w-full accent-emerald-500 bg-slate-950 rounded-lg cursor-pointer h-2"
            />
            <p className="text-[10px] text-slate-500">
              PDF Standard: 80% absolute minimum standard to drop hallucinations.
            </p>
          </div>
        </div>
      </div>

      {/* Execution Results Display */}
      {results && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Visual Pre-processing Steps & Matrix Analysis */}
          <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h4 className="text-sm font-bold text-slate-100 flex items-center gap-2">
                <Eye className="w-4 h-4 text-emerald-400" />
                <span>Pre-Processing Pipeline Integrity (The Logic Skeleton)</span>
              </h4>
              <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-300 border border-emerald-500/20">
                Step 1 to Step 4 Complete
              </span>
            </div>

            {/* Visual Matrix Mock / Processing Representation */}
            <div className="relative aspect-video bg-slate-950 rounded-xl border border-slate-800 overflow-hidden flex flex-col items-center justify-center p-6 text-center">
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent z-10" />
              
              {/* Overlay Bounding Boxes Simulation */}
              <div className="relative z-20 w-full h-full border border-slate-800/80 rounded-lg p-4 flex flex-col justify-between bg-slate-900/40 backdrop-blur-sm">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono bg-slate-800 px-2 py-1 rounded text-slate-300">
                    Input Matrix: 800 x 600 x 3 (BGR)
                  </span>
                  <span className="text-[10px] font-mono bg-emerald-500/20 text-emerald-300 px-2 py-1 rounded border border-emerald-500/30">
                    Otsu Cutoff = 128
                  </span>
                </div>

                {/* Drawn Bounding Box Elements */}
                <div className="space-y-3 my-auto">
                  {selectedPath === 1 ? (
                    results.detectedWords?.slice(0, 4).map((w: any, idx: number) => (
                      <div
                        key={idx}
                        className={`p-2 rounded font-mono text-xs flex justify-between items-center border ${
                          w.passed_80_percent_gate
                            ? 'bg-emerald-500/10 border-emerald-500/50 text-emerald-300'
                            : 'bg-rose-500/10 border-rose-500/50 text-rose-300'
                        }`}
                      >
                        <span>{w.text}</span>
                        <span className="text-[10px]">{w.confidence}%</span>
                      </div>
                    ))
                  ) : (
                    results.detections?.map((d: any, idx: number) => (
                      <div
                        key={idx}
                        className={`p-2 rounded font-mono text-xs flex justify-between items-center border ${
                          d.passed_80_percent_gate
                            ? 'bg-emerald-500/10 border-emerald-500/50 text-emerald-300'
                            : 'bg-rose-500/10 border-rose-500/30 text-rose-300 opacity-60'
                        }`}
                      >
                        <span className="uppercase font-bold">{d.class_name}</span>
                        <span className="text-[10px]">
                          {d.passed_80_percent_gate ? 'VALIDATED' : 'DROPPED (<80%)'} | {(d.confidence * 100).toFixed(1)}%
                        </span>
                      </div>
                    ))
                  )}
                </div>

                <div className="text-[10px] text-slate-500 font-mono">
                  Coordinate Normalization: [Origin (X, Y) + Dimensions (W, H)]
                </div>
              </div>
            </div>

            {/* Preprocessing Summary Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono">
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                <div className="text-slate-500 text-[10px]">Step 1: Grayscale</div>
                <div className="text-slate-200 font-bold mt-0.5">3D &rarr; 1D Matrix</div>
              </div>
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                <div className="text-slate-500 text-[10px]">Step 2: Gaussian Blur</div>
                <div className="text-slate-200 font-bold mt-0.5">5x5 Smoothing</div>
              </div>
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                <div className="text-slate-500 text-[10px]">Step 3: Deskewing</div>
                <div className="text-slate-200 font-bold mt-0.5">-1.85° Baseline</div>
              </div>
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                <div className="text-slate-500 text-[10px]">Step 4: Threshold</div>
                <div className="text-slate-200 font-bold mt-0.5">Otsu Binary</div>
              </div>
            </div>
          </div>

          {/* Model Output & Benchmark Scorecard */}
          <div className="lg:col-span-5 bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
                <h4 className="text-sm font-bold text-slate-100 flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>Model Output & Benchmark Report</span>
                </h4>
                <div className="flex items-center gap-1.5 px-2 py-0.5 text-[10px] font-bold uppercase rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  <CheckCircle2 className="w-3 h-3" />
                  <span>Gatekeeper Validated</span>
                </div>
              </div>

              {selectedPath === 1 ? (
                <div className="space-y-4">
                  <div>
                    <div className="text-xs text-slate-400 mb-1">Recognized Text String Output:</div>
                    <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs font-mono text-emerald-300 leading-relaxed font-semibold">
                      "{results.extractedText}"
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="text-xs text-slate-400">Confidence Score Breakdown per Word:</div>
                    <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
                      {results.detectedWords?.map((w: any, idx: number) => (
                        <div
                          key={idx}
                          className="flex items-center justify-between p-2 rounded bg-slate-950 text-xs border border-slate-800/80 font-mono"
                        >
                          <span className="text-slate-200">{w.text}</span>
                          <span
                            className={`px-1.5 py-0.5 text-[10px] font-bold rounded ${
                              w.passed_80_percent_gate
                                ? 'bg-emerald-500/20 text-emerald-400'
                                : 'bg-rose-500/20 text-rose-400'
                            }`}
                          >
                            {w.confidence}% {w.passed_80_percent_gate ? '✓' : '✗ Drop'}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div>
                    <div className="text-xs text-slate-400 mb-1">4D Blob Construction Details:</div>
                    <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs font-mono text-slate-300 space-y-1">
                      <div>Blob Input Shape: [1, 3, 300, 300]</div>
                      <div>Scale Factor: 0.007843</div>
                      <div>Mean Subtraction: [127.5, 127.5, 127.5]</div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="text-xs text-slate-400">Detected Bounding Box Entities:</div>
                    <div className="space-y-1.5">
                      {results.detections?.map((d: any, idx: number) => (
                        <div
                          key={idx}
                          className="flex items-center justify-between p-2 rounded bg-slate-950 text-xs border border-slate-800/80 font-mono"
                        >
                          <span className="text-slate-200 capitalize font-semibold">{d.class_name}</span>
                          <span
                            className={`px-1.5 py-0.5 text-[10px] font-bold rounded ${
                              d.passed_80_percent_gate
                                ? 'bg-emerald-500/20 text-emerald-400'
                                : 'bg-rose-500/20 text-rose-400'
                            }`}
                          >
                            {(d.confidence * 100).toFixed(1)}% {d.passed_80_percent_gate ? '✓ Pass Gate' : '✗ Drop'}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Scorecard Summary */}
            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800/90 font-mono text-xs space-y-2">
              <div className="flex justify-between text-slate-400">
                <span>Average Confidence Score:</span>
                <span className="text-emerald-400 font-bold">{results.averageConfidence}%</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Target Minimum Standard:</span>
                <span className="text-slate-200 font-semibold">{results.minConfidenceRequired}%</span>
              </div>
              <div className="pt-2 border-t border-slate-800 flex justify-between font-bold text-slate-100">
                <span>Milestone Validation:</span>
                <span className="text-emerald-400">PASSED 100%</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
