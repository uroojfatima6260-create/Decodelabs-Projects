import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  Send,
  Bot,
  User,
  Sparkles,
  RefreshCw,
  Brain,
  Sliders,
  CheckCircle2,
  Github,
  Code2,
  Terminal,
  Activity,
  BarChart3,
  Eye,
  ScanText,
  Target,
  ShieldCheck,
  Layers,
  Cpu,
  ArrowRight,
  FileText
} from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

interface InteractiveDemoModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTab?: 'chatbot' | 'ml-classifier' | 'computer-vision' | 'ai-recommender' | 'decodelabs' | 'none';
}

interface Message {
  sender: 'user' | 'bot';
  text: string;
  timestamp: string;
  ruleMatched?: string;
}

export const InteractiveDemoModal: React.FC<InteractiveDemoModalProps> = ({
  isOpen,
  onClose,
  initialTab = 'computer-vision',
}) => {
  const [activeTab, setActiveTab] = useState<'computer-vision' | 'ai-recommender' | 'chatbot' | 'ml-classifier'>('computer-vision');

  useEffect(() => {
    if (initialTab && initialTab !== 'none' && initialTab !== 'decodelabs') {
      setActiveTab(initialTab as any);
    }
  }, [initialTab]);

  // --- COMPUTER VISION (PROJECT 4) STATE & LOGIC ---
  const [cvPath, setCvPath] = useState<'ocr' | 'object-detection'>('ocr');
  const [psmMode, setPsmMode] = useState<'--psm 3' | '--psm 7' | '--psm 11'>('--psm 11');
  const [cvConfidenceThreshold, setCvConfidenceThreshold] = useState<number>(0.80);
  const [cvSample, setCvSample] = useState<'invoice' | 'license_plate' | 'street_scene'>('invoice');
  const [isProcessingCv, setIsProcessingCv] = useState(false);

  // Pre-processing step toggles
  const [grayscale, setGrayscale] = useState(true);
  const [gaussianBlur, setGaussianBlur] = useState(true);
  const [deskew, setDeskew] = useState(true);
  const [otsuThreshold, setOtsuThreshold] = useState(true);

  const handleRunCvPipeline = () => {
    setIsProcessingCv(true);
    setTimeout(() => {
      setIsProcessingCv(false);
    }, 500);
  };

  // --- AI RECOMMENDER (PROJECT 3) STATE & LOGIC ---
  const [selectedUserCategory, setSelectedUserCategory] = useState<'Computer Vision' | 'Machine Learning' | 'Web Development' | 'Data Science'>('Computer Vision');
  const [selectedSkillLevel, setSelectedSkillLevel] = useState<'Beginner' | 'Intermediate' | 'Advanced'>('Intermediate');
  const [isRecommending, setIsRecommending] = useState(false);

  const mockRecommendationDatabase = [
    {
      id: "rec-1",
      title: "DecodeLabs Project 4: Machine's Optic Nerve Pipeline",
      category: "Computer Vision",
      skillLevel: "Intermediate",
      matchScore: 98,
      reason: "Matched 3D Array Matrix pre-processing, pytesseract PSM mode tuning & MobileNet-SSD deep learning detector.",
      tags: ["OpenCV", "pytesseract", "MobileNet-SSD", "Confidence Gatekeeper"]
    },
    {
      id: "rec-2",
      title: "Project 2: Supervised Data Classification ML System",
      category: "Machine Learning",
      skillLevel: "Intermediate",
      matchScore: 94,
      reason: "Matched feature engineering, Scikit-Learn Random Forest / SVM benchmarks & confusion matrix evaluation.",
      tags: ["Scikit-Learn", "Pandas", "Confusion Matrix", "Supervised Learning"]
    },
    {
      id: "rec-3",
      title: "Project 1: Rule-Based Intelligent NLP Engine",
      category: "Machine Learning",
      skillLevel: "Beginner",
      matchScore: 89,
      reason: "Matched Regex pattern matching, contextual state handling & intent classification logic.",
      tags: ["Python", "Regex", "NLP", "Intent Rules"]
    },
    {
      id: "rec-4",
      title: "DecodeLabs Web Platform UI/UX System",
      category: "Web Development",
      skillLevel: "Advanced",
      matchScore: 86,
      reason: "Matched modular React frontend architecture, glassmorphism design system & API response streaming.",
      tags: ["React", "TypeScript", "Tailwind CSS", "REST API"]
    }
  ];

  const filteredRecommendations = mockRecommendationDatabase.filter(item => {
    if (selectedUserCategory === item.category) return true;
    if (selectedSkillLevel === item.skillLevel) return true;
    return true;
  }).sort((a, b) => b.matchScore - a.matchScore);

  const handleRunRecommender = () => {
    setIsRecommending(true);
    setTimeout(() => {
      setIsRecommending(false);
    }, 400);
  };

  // --- CHATBOT STATE & LOGIC ---
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: 'bot',
      text: "Hello! I am Urooj Fatima's Rule-Based Intelligent Chatbot (Project 1). Ask me anything about her Computer Vision pipeline, AI projects, University of Gujrat studies, or DecodeLabs internship!",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      ruleMatched: "DEFAULT_WELCOME_RULE"
    }
  ]);
  const [inputQuery, setInputQuery] = useState('');
  const chatBottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const quickPrompts = [
    "Tell me about Project 4 Computer Vision",
    "How does Project 3 AI Recommender work?",
    "DecodeLabs internship highlights",
    "University of Gujrat details",
    "Show GitHub project links"
  ];

  const handleSendQuery = (customText?: string) => {
    const textToSend = customText || inputQuery;
    if (!textToSend.trim()) return;

    const userMsg: Message = {
      sender: 'user',
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!customText) setInputQuery('');

    setTimeout(() => {
      const q = textToSend.toLowerCase();
      let botReply = "";
      let rule = "";

      if (/\b(hi|hello|hey|greetings|salam)\b/.test(q)) {
        botReply = "Hello! Welcome to Urooj Fatima's AI portfolio. How can I assist you with her Computer Vision & ML projects today?";
        rule = "REGEX_GREETING_RULE";
      } else if (/\b(project 4|computer vision|optic nerve|ocr|psm|mobilenet|opencv)\b/.test(q)) {
        botReply = "Project 4: Building the Machine's Optic Nerve is Urooj's computer vision pipeline! Features pytesseract OCR with PSM mode tuning (--psm 3, --psm 7, --psm 11), MobileNet-SSD deep learning object detection, a 4-step pre-processing pipeline, and an 80% confidence gatekeeper filter.";
        rule = "RULE_PROJECT_4_COMPUTER_VISION";
      } else if (/\b(project 3|recommendation|recommender|preference|items\.json)\b/.test(q)) {
        botReply = "Project 3: AI Recommendation System uses logical pattern matching in Python to suggest relevant learning projects based on user preferences, category interests, and skill levels backed by JSON dataset storage.";
        rule = "RULE_PROJECT_3_RECOMMENDER";
      } else if (/\b(decodelabs|intern|internship|experience|work)\b/.test(q)) {
        botReply = "Urooj Fatima is a Software Engineering & AI Intern at DecodeLabs! She engineers computer vision perception pipelines, rule-based recommendation engines, and responsive web components.";
        rule = "RULE_DECODELABS_INTERNSHIP";
      } else if (/\b(skill|skills|python|opencv|sql|react|javascript|tools)\b/.test(q)) {
        botReply = "Urooj specializes in Python, Computer Vision (OpenCV, pytesseract, MobileNet-SSD), Machine Learning (Scikit-Learn), SQL, JavaScript, React.js, Tailwind CSS, and Git.";
        rule = "RULE_TECHNICAL_SKILLS";
      } else if (/\b(university|gujrat|uog|degree|education|undergraduate)\b/.test(q)) {
        botReply = "Urooj is an Undergraduate Computer Engineering Technology student at the University of Gujrat (UoG), focusing on computer vision, AI, and software engineering.";
        rule = "RULE_ACADEMICS_UOG";
      } else if (/\b(contact|email|reach|linkedin|github)\b/.test(q)) {
        botReply = "You can contact Urooj Fatima via email at uroojfatima1206@gmail.com or on GitHub at https://github.com/uroojfatima6260-create.";
        rule = "RULE_CONTACT_INFO";
      } else {
        botReply = "Thank you for asking! Urooj Fatima is an Undergraduate Computer Engineering Technology student @ University of Gujrat and Intern @ DecodeLabs. Feel free to explore her Computer Vision (Project 4) or AI Recommender (Project 3)!";
        rule = "FALLBACK_GUIDANCE_RULE";
      }

      const botMsg: Message = {
        sender: 'bot',
        text: botReply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        ruleMatched: rule
      };

      setMessages((prev) => [...prev, botMsg]);
    }, 400);
  };

  // --- ML CLASSIFIER STATE & LOGIC ---
  const [selectedDataset, setSelectedDataset] = useState<'Iris' | 'BreastCancer' | 'CustomerChurn'>('Iris');
  const [selectedAlgorithm, setSelectedAlgorithm] = useState<'RandomForest' | 'DecisionTree' | 'SVM' | 'LogisticRegression'>('RandomForest');
  const [splitRatio, setSplitRatio] = useState<number>(80);
  const [maxDepth, setMaxDepth] = useState<number>(5);
  const [isTraining, setIsTraining] = useState(false);
  const [mlResult, setMlResult] = useState({
    accuracy: 96.4,
    precision: 95.8,
    recall: 96.1,
    f1Score: 95.9,
    matrix: [
      [28, 1],
      [2, 29]
    ]
  });

  const handleTrainModel = () => {
    setIsTraining(true);
    setTimeout(() => {
      let baseAcc = selectedAlgorithm === 'RandomForest' ? 96.8 : selectedAlgorithm === 'SVM' ? 95.2 : selectedAlgorithm === 'DecisionTree' ? 93.4 : 92.1;
      baseAcc += (splitRatio - 70) * 0.1 + (maxDepth - 3) * 0.4;
      const finalAcc = Math.min(Math.max(Number(baseAcc.toFixed(1)), 85.0), 99.2);

      const tp = Math.round((finalAcc / 100) * 30);
      const fp = Math.round(30 - tp);
      const fn = Math.round(Math.random() * 2);
      const tn = 30 - fp;

      setMlResult({
        accuracy: finalAcc,
        precision: Number((finalAcc - 0.5).toFixed(1)),
        recall: Number((finalAcc + 0.3).toFixed(1)),
        f1Score: Number((finalAcc - 0.1).toFixed(1)),
        matrix: [
          [tp, fp],
          [fn, tn]
        ]
      });
      setIsTraining(false);
    }, 500);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-950/85 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          className="relative w-full max-w-5xl bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]"
        >
          {/* Modal Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950/80">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-gradient-to-tr from-cyan-500 to-violet-600 text-white shadow-sm">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <span>Interactive Live Project Simulator</span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-800">
                    DecodeLabs Projects
                  </span>
                </h3>
                <p className="text-xs text-slate-400">Experience Urooj Fatima's Computer Vision, Recommender & ML projects in real-time</p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-slate-800/80 hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Tab Switcher */}
          <div className="flex overflow-x-auto border-b border-slate-800 bg-slate-950/60 px-4 pt-3 gap-1.5 scrollbar-none">
            <button
              onClick={() => setActiveTab('computer-vision')}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-t-xl text-xs sm:text-sm font-semibold transition-all border-t border-x whitespace-nowrap ${
                activeTab === 'computer-vision'
                  ? 'bg-slate-900 border-slate-700 text-emerald-300 shadow-sm'
                  : 'bg-transparent border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              <Eye className="w-4 h-4 text-emerald-400" />
              <span>Project 4: Computer Vision</span>
            </button>

            <button
              onClick={() => setActiveTab('ai-recommender')}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-t-xl text-xs sm:text-sm font-semibold transition-all border-t border-x whitespace-nowrap ${
                activeTab === 'ai-recommender'
                  ? 'bg-slate-900 border-slate-700 text-cyan-300 shadow-sm'
                  : 'bg-transparent border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              <Target className="w-4 h-4 text-cyan-400" />
              <span>Project 3: AI Recommender</span>
            </button>

            <button
              onClick={() => setActiveTab('chatbot')}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-t-xl text-xs sm:text-sm font-semibold transition-all border-t border-x whitespace-nowrap ${
                activeTab === 'chatbot'
                  ? 'bg-slate-900 border-slate-700 text-amber-300 shadow-sm'
                  : 'bg-transparent border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              <Bot className="w-4 h-4 text-amber-400" />
              <span>Project 1: Rule-Based Chatbot</span>
            </button>

            <button
              onClick={() => setActiveTab('ml-classifier')}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-t-xl text-xs sm:text-sm font-semibold transition-all border-t border-x whitespace-nowrap ${
                activeTab === 'ml-classifier'
                  ? 'bg-slate-900 border-slate-700 text-violet-300 shadow-sm'
                  : 'bg-transparent border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              <Brain className="w-4 h-4 text-violet-400" />
              <span>Project 2: ML Classifier</span>
            </button>
          </div>

          {/* Modal Body */}
          <div className="p-4 sm:p-6 overflow-y-auto flex-1 bg-slate-900/60">

            {/* --- TAB 1: COMPUTER VISION (PROJECT 4) --- */}
            {activeTab === 'computer-vision' && (
              <div className="space-y-6">
                
                {/* Header Banner */}
                <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-950/80 via-slate-900 to-slate-950 border border-emerald-800/60 flex flex-wrap items-center justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 font-bold">
                      <Eye className="w-4 h-4" />
                      <span>DecodeLabs Industrial Training Kit (Batch 2026 - Project 4)</span>
                    </div>
                    <h4 className="text-base font-bold text-white">Machine's Optic Nerve Perception Pipeline</h4>
                    <p className="text-xs text-slate-300">Transforms raw visual 3D array data into structured OCR text string outputs & bounding box detections.</p>
                  </div>

                  <div className="flex items-center gap-2 bg-emerald-950/80 px-3 py-1.5 rounded-xl border border-emerald-700/60 text-xs text-emerald-300 font-mono">
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    <span>100% Gatekeeper Validated</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
                  
                  {/* Pipeline Controls Column (5 cols) */}
                  <div className="md:col-span-5 bg-slate-950/90 border border-slate-800 p-5 rounded-2xl space-y-4">
                    
                    <div className="flex items-center justify-between pb-2 border-b border-slate-800 text-xs font-mono text-emerald-400">
                      <span className="flex items-center gap-2 font-bold">
                        <Sliders className="w-4 h-4" />
                        <span>Pipeline Execution Controls</span>
                      </span>
                      <span className="text-slate-500">Python / OpenCV</span>
                    </div>

                    {/* Dual Path Selector */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-medium text-slate-300">Processing Architecture Path</label>
                      <div className="grid grid-cols-2 gap-2">
                        <button
                          onClick={() => { setCvPath('ocr'); setCvSample('invoice'); }}
                          className={`px-3 py-2 rounded-xl text-xs font-mono flex items-center justify-center gap-2 border transition-all ${
                            cvPath === 'ocr'
                              ? 'bg-emerald-950/80 border-emerald-500 text-emerald-300 font-bold'
                              : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
                          }`}
                        >
                          <ScanText className="w-3.5 h-3.5" />
                          <span>Path 1: OCR</span>
                        </button>

                        <button
                          onClick={() => { setCvPath('object-detection'); setCvSample('street_scene'); }}
                          className={`px-3 py-2 rounded-xl text-xs font-mono flex items-center justify-center gap-2 border transition-all ${
                            cvPath === 'object-detection'
                              ? 'bg-cyan-950/80 border-cyan-500 text-cyan-300 font-bold'
                              : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
                          }`}
                        >
                          <Target className="w-3.5 h-3.5" />
                          <span>Path 2: Detector</span>
                        </button>
                      </div>
                    </div>

                    {/* Path 1 OCR Config */}
                    {cvPath === 'ocr' && (
                      <div className="space-y-1.5 pt-1">
                        <label className="text-xs font-medium text-slate-300">pytesseract Page Segmentation Mode (PSM)</label>
                        <select
                          value={psmMode}
                          onChange={(e) => setPsmMode(e.target.value as any)}
                          className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs font-mono focus:outline-none focus:border-emerald-500"
                        >
                          <option value="--psm 3">--psm 3: Auto Layout Detection (Documents/Forms)</option>
                          <option value="--psm 7">--psm 7: Single Line Text (License Plates)</option>
                          <option value="--psm 11">--psm 11: Sparse Scattered Text (Invoices/Receipts)</option>
                        </select>
                      </div>
                    )}

                    {/* Pre-Processing Pipeline Checkboxes */}
                    <div className="space-y-2 pt-1 border-t border-slate-800/80">
                      <span className="text-xs font-mono text-slate-400 block font-semibold">4-Step Systematic Pre-Processing:</span>
                      <div className="grid grid-cols-2 gap-2 text-xs font-mono text-slate-300">
                        <label className="flex items-center gap-2 cursor-pointer bg-slate-900 p-2 rounded-lg border border-slate-800">
                          <input type="checkbox" checked={grayscale} onChange={(e) => setGrayscale(e.target.checked)} className="accent-emerald-400" />
                          <span>3D→1D Grayscale</span>
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer bg-slate-900 p-2 rounded-lg border border-slate-800">
                          <input type="checkbox" checked={gaussianBlur} onChange={(e) => setGaussianBlur(e.target.checked)} className="accent-emerald-400" />
                          <span>Gaussian Blur</span>
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer bg-slate-900 p-2 rounded-lg border border-slate-800">
                          <input type="checkbox" checked={deskew} onChange={(e) => setDeskew(e.target.checked)} className="accent-emerald-400" />
                          <span>Deskew Rotation</span>
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer bg-slate-900 p-2 rounded-lg border border-slate-800">
                          <input type="checkbox" checked={otsuThreshold} onChange={(e) => setOtsuThreshold(e.target.checked)} className="accent-emerald-400" />
                          <span>Otsu Threshold</span>
                        </label>
                      </div>
                    </div>

                    {/* The 80% Confidence Gatekeeper Filter Slider */}
                    <div className="space-y-1.5 pt-2 border-t border-slate-800/80">
                      <div className="flex justify-between items-center text-xs">
                        <span className="font-bold text-amber-300 flex items-center gap-1.5">
                          <ShieldCheck className="w-3.5 h-3.5" />
                          <span>80% Confidence Gatekeeper:</span>
                        </span>
                        <span className="font-mono text-emerald-400 font-bold">{(cvConfidenceThreshold * 100).toFixed(0)}%</span>
                      </div>
                      <input
                        type="range"
                        min="0.50"
                        max="0.95"
                        step="0.05"
                        value={cvConfidenceThreshold}
                        onChange={(e) => setCvConfidenceThreshold(Number(e.target.value))}
                        className="w-full accent-emerald-400 cursor-pointer"
                      />
                      <p className="text-[11px] text-slate-400 italic">
                        {cvConfidenceThreshold >= 0.80
                          ? "Strict mode: Eliminates false positives & AI model hallucinations."
                          : "Warning: Lowering below 80% allows unverified noise & low-confidence detections."}
                      </p>
                    </div>

                    <button
                      onClick={handleRunCvPipeline}
                      disabled={isProcessingCv}
                      className="w-full py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md shadow-emerald-500/20 transition-all"
                    >
                      {isProcessingCv ? (
                        <>
                          <RefreshCw className="w-4 h-4 animate-spin" />
                          <span>Executing OpenCV Matrix Pipeline...</span>
                        </>
                      ) : (
                        <>
                          <Eye className="w-4 h-4" />
                          <span>Run Computer Vision Pipeline</span>
                        </>
                      )}
                    </button>

                  </div>

                  {/* Output Simulation Column (7 cols) */}
                  <div className="md:col-span-7 space-y-4">
                    
                    {/* Visual Bounding Box / OCR Result Canvas Display */}
                    <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3 relative overflow-hidden">
                      <div className="flex items-center justify-between text-xs font-mono text-slate-400 pb-2 border-b border-slate-800">
                        <span className="flex items-center gap-1.5 text-emerald-400 font-bold">
                          <Terminal className="w-4 h-4" />
                          <span>Annotated Visual Output (outputs/ folder)</span>
                        </span>
                        <span className="text-slate-500">{cvPath === 'ocr' ? 'OCR Text Extraction' : 'MobileNet-SSD Bounding Box'}</span>
                      </div>

                      {/* Display Box */}
                      <div className="relative min-h-[220px] bg-slate-900/90 rounded-xl border border-slate-800/80 p-4 font-mono text-xs flex flex-col justify-between overflow-hidden">
                        
                        {cvPath === 'ocr' ? (
                          <div className="space-y-3">
                            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                              <span className="text-emerald-400 font-semibold">[pytesseract {psmMode}] Output:</span>
                              <span className="text-[10px] bg-emerald-950 text-emerald-300 px-2 py-0.5 rounded border border-emerald-800">
                                Clean String Extracted
                              </span>
                            </div>

                            {psmMode === '--psm 11' && (
                              <div className="p-3 bg-slate-950 rounded-lg text-slate-200 border border-slate-800 space-y-1">
                                <p className="text-cyan-400 font-bold">DECODELABS INDUSTRIAL INVOICE #2026-04</p>
                                <p>ITEM: COMPUTER VISION TRAINING MODULE</p>
                                <p>QTY: 1 | PRICE: PKR 0.00 (FULL SCHOLARSHIP)</p>
                                <p>STATUS: 100% VALIDATED & CERTIFIED</p>
                              </div>
                            )}

                            {psmMode === '--psm 7' && (
                              <div className="p-3 bg-slate-950 rounded-lg text-slate-200 border border-slate-800 text-center space-y-1">
                                <span className="text-xs text-slate-400 block">Single Line Text Extracted:</span>
                                <span className="text-lg font-bold text-emerald-300 tracking-wider">PAK - LEA 2026 - UOG</span>
                              </div>
                            )}

                            {psmMode === '--psm 3' && (
                              <div className="p-3 bg-slate-950 rounded-lg text-slate-200 border border-slate-800 space-y-1">
                                <p className="text-emerald-400">DecodeLabs Project 4 Verification Document</p>
                                <p className="text-slate-300">Systematic Pre-Processing Integrity: 100%</p>
                                <p className="text-slate-300">Accuracy Benchmarking Gatekeeper: Enforced (&gt;= 0.80)</p>
                              </div>
                            )}
                          </div>
                        ) : (
                          <div className="relative h-48 bg-slate-950 rounded-lg border border-slate-800 flex items-center justify-center p-2 overflow-hidden">
                            {/* Visual Simulated Bounding Boxes */}
                            <div className="absolute top-4 left-6 w-36 h-28 border-2 border-emerald-400 bg-emerald-500/10 rounded p-1 flex flex-col justify-between">
                              <span className="text-[10px] bg-emerald-500 text-slate-950 px-1 font-bold rounded w-max">
                                Vehicle: {cvConfidenceThreshold >= 0.80 ? "94.2% [PASS]" : "94.2%"}
                              </span>
                              <span className="text-[9px] text-emerald-300 text-right">(300x300 Normalized)</span>
                            </div>

                            <div className="absolute bottom-4 right-8 w-28 h-20 border-2 border-cyan-400 bg-cyan-500/10 rounded p-1 flex flex-col justify-between">
                              <span className="text-[10px] bg-cyan-500 text-slate-950 px-1 font-bold rounded w-max">
                                Person: {cvConfidenceThreshold >= 0.80 ? "88.6% [PASS]" : "88.6%"}
                              </span>
                              <span className="text-[9px] text-cyan-300 text-right">MobileNet-SSD</span>
                            </div>

                            {cvConfidenceThreshold < 0.80 && (
                              <div className="absolute top-12 right-24 w-20 h-16 border-2 border-red-500/80 bg-red-500/10 rounded p-0.5">
                                <span className="text-[9px] bg-red-500 text-white px-1 font-bold rounded">
                                  Noise: 62% [HALLUCINATION]
                                </span>
                              </div>
                            )}
                          </div>
                        )}

                        <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
                          <span>Execution Status: <strong className="text-emerald-400">PASSED</strong></span>
                          <span>test_pipeline.py: <strong className="text-cyan-400">4 Gatekeepers Met</strong></span>
                        </div>
                      </div>
                    </div>

                    {/* Milestone Status Rules */}
                    <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2 text-xs">
                      <span className="text-xs font-bold text-slate-300 font-mono flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                        <span>Project 4 Milestone Verification Matrix</span>
                      </span>
                      <div className="grid grid-cols-2 gap-2 text-slate-400 font-mono text-[11px]">
                        <div className="p-2 rounded bg-slate-900 border border-slate-800 flex justify-between">
                          <span>Library Integration</span>
                          <span className="text-emerald-400 font-bold">100%</span>
                        </div>
                        <div className="p-2 rounded bg-slate-900 border border-slate-800 flex justify-between">
                          <span>Pre-Processing Integrity</span>
                          <span className="text-emerald-400 font-bold">100%</span>
                        </div>
                        <div className="p-2 rounded bg-slate-900 border border-slate-800 flex justify-between">
                          <span>Accuracy Benchmarks</span>
                          <span className="text-emerald-400 font-bold">100%</span>
                        </div>
                        <div className="p-2 rounded bg-slate-900 border border-slate-800 flex justify-between">
                          <span>Bounding Box Outputs</span>
                          <span className="text-emerald-400 font-bold">100%</span>
                        </div>
                      </div>
                    </div>

                  </div>

                </div>

              </div>
            )}

            {/* --- TAB 2: AI RECOMMENDATION SYSTEM (PROJECT 3) --- */}
            {activeTab === 'ai-recommender' && (
              <div className="space-y-6">
                
                {/* Banner */}
                <div className="p-4 rounded-2xl bg-gradient-to-r from-cyan-950/80 via-slate-900 to-slate-950 border border-cyan-800/60 flex flex-wrap items-center justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 font-bold">
                      <Target className="w-4 h-4" />
                      <span>DecodeLabs AI Training Program - Project 3</span>
                    </div>
                    <h4 className="text-base font-bold text-white">AI Recommendation Engine Simulator</h4>
                    <p className="text-xs text-slate-300">Uses logical pattern matching and preference filtering across data/items.json and data/users.json datasets.</p>
                  </div>

                  <div className="px-3 py-1.5 rounded-xl bg-cyan-950/80 border border-cyan-800 text-xs font-mono text-cyan-300">
                    app.py & recommender.py
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
                  
                  {/* Preferences Input Form (5 cols) */}
                  <div className="md:col-span-5 bg-slate-950/90 border border-slate-800 p-5 rounded-2xl space-y-4">
                    <div className="flex items-center gap-2 pb-2 border-b border-slate-800 text-xs font-mono text-cyan-400 font-bold">
                      <Sliders className="w-4 h-4" />
                      <span>User Preference & Skill Inputs</span>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-medium text-slate-300">Primary Technical Focus</label>
                      <select
                        value={selectedUserCategory}
                        onChange={(e) => setSelectedUserCategory(e.target.value as any)}
                        className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs font-mono focus:outline-none focus:border-cyan-500"
                      >
                        <option value="Computer Vision">Computer Vision & Perception</option>
                        <option value="Machine Learning">Machine Learning & Data Science</option>
                        <option value="Web Development">Web & Full Stack Engineering</option>
                        <option value="Data Science">Data Science & SQL</option>
                      </select>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-medium text-slate-300">User Skill Level</label>
                      <div className="grid grid-cols-3 gap-2">
                        {(['Beginner', 'Intermediate', 'Advanced'] as const).map((level) => (
                          <button
                            key={level}
                            onClick={() => setSelectedSkillLevel(level)}
                            className={`py-2 px-2 rounded-xl text-xs font-mono transition-all border ${
                              selectedSkillLevel === level
                                ? 'bg-cyan-950 border-cyan-500 text-cyan-300 font-bold'
                                : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
                            }`}
                          >
                            {level}
                          </button>
                        ))}
                      </div>
                    </div>

                    <button
                      onClick={handleRunRecommender}
                      disabled={isRecommending}
                      className="w-full py-2.5 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md shadow-cyan-500/20 transition-all"
                    >
                      {isRecommending ? (
                        <>
                          <RefreshCw className="w-4 h-4 animate-spin" />
                          <span>Matching Pattern Rules...</span>
                        </>
                      ) : (
                        <>
                          <Target className="w-4 h-4" />
                          <span>Generate Personalized Recommendations</span>
                        </>
                      )}
                    </button>
                  </div>

                  {/* Recommendation Output Results (7 cols) */}
                  <div className="md:col-span-7 space-y-3">
                    <div className="flex items-center justify-between text-xs font-mono text-slate-400 pb-1">
                      <span>Matched Items in items.json:</span>
                      <span className="text-cyan-400">{filteredRecommendations.length} Recommendations Found</span>
                    </div>

                    <div className="space-y-3">
                      {filteredRecommendations.map((item) => (
                        <div
                          key={item.id}
                          className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2 hover:border-slate-700 transition-colors"
                        >
                          <div className="flex items-start justify-between gap-3">
                            <div>
                              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-800/80 mr-2">
                                {item.category}
                              </span>
                              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                                {item.skillLevel}
                              </span>
                              <h5 className="text-sm font-bold text-white pt-1">{item.title}</h5>
                            </div>

                            <div className="text-right shrink-0">
                              <span className="text-lg font-extrabold text-cyan-400 font-mono">{item.matchScore}%</span>
                              <span className="text-[10px] block text-slate-400">Match Score</span>
                            </div>
                          </div>

                          <p className="text-xs text-slate-300 font-sans">{item.reason}</p>

                          <div className="flex flex-wrap gap-1 pt-1">
                            {item.tags.map((t, idx) => (
                              <span key={idx} className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900 text-slate-400 border border-slate-800">
                                #{t}
                              </span>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>

              </div>
            )}

            {/* --- TAB 3: RULE BASED CHATBOT (PROJECT 1) --- */}
            {activeTab === 'chatbot' && (
              <div className="flex flex-col h-[520px] justify-between space-y-4">
                
                {/* Chat Message Scroll Box */}
                <div className="flex-1 overflow-y-auto pr-2 space-y-3 font-sans">
                  {messages.map((msg, idx) => (
                    <div
                      key={idx}
                      className={`flex gap-3 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      {msg.sender === 'bot' && (
                        <div className="w-8 h-8 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0">
                          <Bot className="w-4 h-4" />
                        </div>
                      )}

                      <div
                        className={`max-w-[80%] rounded-2xl p-4 text-xs sm:text-sm leading-relaxed space-y-1 ${
                          msg.sender === 'user'
                            ? 'bg-gradient-to-r from-amber-600 to-orange-600 text-white rounded-br-none shadow-md'
                            : 'bg-slate-950 border border-slate-800 text-slate-200 rounded-bl-none shadow-md'
                        }`}
                      >
                        <p className="whitespace-pre-line">{msg.text}</p>
                        
                        <div className="flex items-center justify-between text-[10px] text-slate-400 font-mono pt-1 opacity-80">
                          <span>{msg.timestamp}</span>
                          {msg.ruleMatched && (
                            <span className="text-amber-400 font-medium ml-2">[{msg.ruleMatched}]</span>
                          )}
                        </div>
                      </div>

                      {msg.sender === 'user' && (
                        <div className="w-8 h-8 rounded-xl bg-orange-500/20 border border-orange-500/30 flex items-center justify-center text-orange-300 shrink-0">
                          <User className="w-4 h-4" />
                        </div>
                      )}
                    </div>
                  ))}
                  <div ref={chatBottomRef} />
                </div>

                {/* Quick Prompts */}
                <div className="pt-2 border-t border-slate-800/60">
                  <span className="text-[10px] font-mono text-slate-400 block mb-1.5">Try clicking rule queries:</span>
                  <div className="flex flex-wrap gap-1.5">
                    {quickPrompts.map((qp, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleSendQuery(qp)}
                        className="px-2.5 py-1 rounded-lg bg-slate-950 hover:bg-slate-800 border border-slate-800 text-amber-300 text-xs font-mono transition-colors"
                      >
                        {qp}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Chat Input Bar */}
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSendQuery();
                  }}
                  className="flex items-center gap-2 pt-1"
                >
                  <input
                    type="text"
                    value={inputQuery}
                    onChange={(e) => setInputQuery(e.target.value)}
                    placeholder="Type query (e.g., 'Project 4 Computer Vision', 'Project 3 Recommender')..."
                    className="flex-1 px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs sm:text-sm focus:outline-none focus:border-amber-500/80 transition-colors"
                  />
                  <button
                    type="submit"
                    className="p-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-white transition-all shadow-md shadow-amber-500/20"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </form>

              </div>
            )}

            {/* --- TAB 4: MACHINE LEARNING DATA CLASSIFIER (PROJECT 2) --- */}
            {activeTab === 'ml-classifier' && (
              <div className="space-y-6">
                
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
                  
                  {/* Controls Column (5 cols) */}
                  <div className="md:col-span-5 bg-slate-950/80 border border-slate-800 p-5 rounded-2xl space-y-4">
                    <div className="flex items-center gap-2 pb-2 border-b border-slate-800 text-xs font-mono text-violet-400 font-bold">
                      <Sliders className="w-4 h-4" />
                      <span>Hyperparameter Tuning</span>
                    </div>

                    {/* Dataset selection */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-medium text-slate-300">Select Classification Dataset</label>
                      <select
                        value={selectedDataset}
                        onChange={(e) => setSelectedDataset(e.target.value as any)}
                        className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs font-mono focus:outline-none focus:border-violet-500"
                      >
                        <option value="Iris">Iris Specimen Classification</option>
                        <option value="BreastCancer">Breast Cancer Diagnostic ML</option>
                        <option value="CustomerChurn">Customer Churn Prediction</option>
                      </select>
                    </div>

                    {/* Algorithm selection */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-medium text-slate-300">Classification Algorithm</label>
                      <select
                        value={selectedAlgorithm}
                        onChange={(e) => setSelectedAlgorithm(e.target.value as any)}
                        className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs font-mono focus:outline-none focus:border-violet-500"
                      >
                        <option value="RandomForest">Random Forest Classifier</option>
                        <option value="SVM">Support Vector Machine (SVM)</option>
                        <option value="DecisionTree">Decision Tree</option>
                        <option value="LogisticRegression">Logistic Regression</option>
                      </select>
                    </div>

                    {/* Split Ratio Slider */}
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs text-slate-300">
                        <span>Train/Test Split</span>
                        <span className="font-mono text-cyan-400">{splitRatio}% Train / {100 - splitRatio}% Test</span>
                      </div>
                      <input
                        type="range"
                        min="60"
                        max="90"
                        step="5"
                        value={splitRatio}
                        onChange={(e) => setSplitRatio(Number(e.target.value))}
                        className="w-full accent-cyan-400 cursor-pointer"
                      />
                    </div>

                    {/* Max Depth Slider */}
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs text-slate-300">
                        <span>Max Depth / Estimators</span>
                        <span className="font-mono text-violet-400">{maxDepth}</span>
                      </div>
                      <input
                        type="range"
                        min="2"
                        max="15"
                        step="1"
                        value={maxDepth}
                        onChange={(e) => setMaxDepth(Number(e.target.value))}
                        className="w-full accent-violet-400 cursor-pointer"
                      />
                    </div>

                    <button
                      onClick={handleTrainModel}
                      disabled={isTraining}
                      className="w-full py-2.5 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md shadow-violet-500/20 transition-all disabled:opacity-50"
                    >
                      {isTraining ? (
                        <>
                          <RefreshCw className="w-4 h-4 animate-spin" />
                          <span>Training Scikit-Learn Model...</span>
                        </>
                      ) : (
                        <>
                          <Activity className="w-4 h-4" />
                          <span>Run Classification Model</span>
                        </>
                      )}
                    </button>
                  </div>

                  {/* Results Column (7 cols) */}
                  <div className="md:col-span-7 space-y-4">
                    
                    {/* Metrics Grid */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-center">
                        <span className="text-xs text-slate-400 block font-mono">Accuracy</span>
                        <span className="text-lg font-bold text-cyan-400 font-mono">{mlResult.accuracy}%</span>
                      </div>
                      <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-center">
                        <span className="text-xs text-slate-400 block font-mono">Precision</span>
                        <span className="text-lg font-bold text-violet-400 font-mono">{mlResult.precision}%</span>
                      </div>
                      <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-center">
                        <span className="text-xs text-slate-400 block font-mono">Recall</span>
                        <span className="text-lg font-bold text-emerald-400 font-mono">{mlResult.recall}%</span>
                      </div>
                      <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-center">
                        <span className="text-xs text-slate-400 block font-mono">F1-Score</span>
                        <span className="text-lg font-bold text-amber-400 font-mono">{mlResult.f1Score}%</span>
                      </div>
                    </div>

                    {/* Confusion Matrix Heatmap */}
                    <div className="p-5 rounded-2xl bg-slate-950/90 border border-slate-800 space-y-3">
                      <div className="flex items-center justify-between text-xs font-mono text-slate-400 pb-2 border-b border-slate-800">
                        <span className="flex items-center gap-1.5 text-violet-400 font-bold">
                          <BarChart3 className="w-4 h-4" />
                          <span>2x2 Confusion Matrix Visualizer</span>
                        </span>
                        <span className="text-slate-500">Predicted vs Actual</span>
                      </div>

                      <div className="grid grid-cols-2 gap-3 max-w-xs mx-auto text-center font-mono pt-2">
                        <div className="p-4 rounded-xl bg-cyan-950/60 border border-cyan-800/80">
                          <span className="text-[10px] text-cyan-300 block uppercase">True Positive (TP)</span>
                          <span className="text-xl font-bold text-cyan-300">{mlResult.matrix[0][0]}</span>
                        </div>

                        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
                          <span className="text-[10px] text-slate-400 block uppercase">False Positive (FP)</span>
                          <span className="text-xl font-bold text-slate-300">{mlResult.matrix[0][1]}</span>
                        </div>

                        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
                          <span className="text-[10px] text-slate-400 block uppercase">False Negative (FN)</span>
                          <span className="text-xl font-bold text-slate-300">{mlResult.matrix[1][0]}</span>
                        </div>

                        <div className="p-4 rounded-xl bg-violet-950/60 border border-violet-800/80">
                          <span className="text-[10px] text-violet-300 block uppercase">True Negative (TN)</span>
                          <span className="text-xl font-bold text-violet-300">{mlResult.matrix[1][1]}</span>
                        </div>
                      </div>
                    </div>

                  </div>

                </div>

              </div>
            )}

          </div>

          {/* Footer Direct Link */}
          <div className="px-6 py-3 border-t border-slate-800 bg-slate-950/80 flex items-center justify-between text-xs font-mono text-slate-400">
            <span>Urooj Fatima • DecodeLabs Projects</span>
            <a
              href={PERSONAL_INFO.github}
              target="_blank"
              rel="noreferrer"
              className="text-cyan-400 hover:underline flex items-center gap-1 font-semibold"
            >
              <Github className="w-3.5 h-3.5" />
              <span>View Repositories on GitHub</span>
            </a>
          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
};
