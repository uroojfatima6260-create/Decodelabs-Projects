import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Terminal as TerminalIcon, X, Maximize2, Minimize2, CornerDownLeft, Sparkles } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

interface InteractiveTerminalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface TerminalLog {
  type: 'input' | 'output' | 'system';
  content: string;
}

export const InteractiveTerminal: React.FC<InteractiveTerminalProps> = ({ isOpen, onClose }) => {
  const [logs, setLogs] = useState<TerminalLog[]>([
    { type: 'system', content: 'Urooj Fatima Portfolio CLI v2.4 (x86_64-pc-linux-gnu)' },
    { type: 'system', content: 'Type "help" or click command shortcuts below to explore.' }
  ]);
  const [command, setCommand] = useState('');
  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logs]);

  const handleRunCommand = (cmdToRun?: string) => {
    const rawCmd = (cmdToRun || command).trim();
    if (!rawCmd) return;

    const cmd = rawCmd.toLowerCase();
    const newLogs: TerminalLog[] = [...logs, { type: 'input', content: rawCmd }];

    switch (cmd) {
      case 'help':
        newLogs.push({
          type: 'output',
          content: `Available Commands:
- bio         : Print full bio & background
- skills      : Show technical skills matrix
- projects    : View GitHub projects & links
- internship  : DecodeLabs software internship details
- education   : University of Gujrat academic track
- contact     : Get email & GitHub profile
- clear       : Clear terminal screen
- exit        : Close terminal window`
        });
        break;

      case 'bio':
        newLogs.push({
          type: 'output',
          content: `${PERSONAL_INFO.name} - ${PERSONAL_INFO.title}
University: ${PERSONAL_INFO.university}
Current Internship: ${PERSONAL_INFO.currentRole}

Bio: ${PERSONAL_INFO.bio}`
        });
        break;

      case 'skills':
        newLogs.push({
          type: 'output',
          content: `Technical Skills Matrix:
- AI & ML       : Python, Rule Engines, Scikit-Learn, NLP, Data Classification
- Web & Frontend : JavaScript, React, HTML5, Tailwind CSS, REST APIs
- Core Engineering: SQL Databases, Computer Engineering Technology, Embedded Systems`
        });
        break;

      case 'projects':
        newLogs.push({
          type: 'output',
          content: `DecodeLabs & Personal AI Projects Showcase:

1. Project 4: Computer Vision - Machine's Optic Nerve Pipeline
   Highlights: pytesseract OCR (PSM 3/7/11 tuning) + MobileNet-SSD deep learning object detection + 80% Confidence Gatekeeper filter + 4-step pre-processing pipeline.
   GitHub: https://github.com/uroojfatima6260-create/Decodelabs-project4

2. Project 3: AI Recommendation System
   Highlights: Logical pattern matching engine, user preference & skill-level filtering, JSON dataset handling (items.json, users.json).
   GitHub: https://github.com/uroojfatima6260-create/DecodeLabs_Project3_AI_Recommendation

3. Project 1: Rule-Based Intelligent Chatbot
   Highlights: Dynamic Regex pattern matching, multi-intent NLP classification & context state.
   GitHub: https://github.com/uroojfatima6260-create/Project1_RuleBased_Chatbot/tree/7228fb418e2e454cd7648be2b8711d683702bd56/Project1_RuleBased_Chatbot

4. Project 2: Supervised ML Data Classification System
   Highlights: Dataset pre-processing, Scikit-Learn models comparison, confusion matrix heatmap.
   GitHub: https://github.com/uroojfatima6260-create/Project2_Data_Classification`
        });
        break;

      case 'internship':
        newLogs.push({
          type: 'output',
          content: `DecodeLabs Internship Details:
Role: Software Engineering & AI Intern
Activities: Building responsive web UIs, rule-based NLP intent engines, hardware/telemetry dashboards, and software design patterns.`
        });
        break;

      case 'education':
        newLogs.push({
          type: 'output',
          content: `Academic Qualification:
Degree: B.S. Computer Engineering Technology (Undergraduate)
Institute: University of Gujrat, Main Campus`
        });
        break;

      case 'contact':
        newLogs.push({
          type: 'output',
          content: `Contact Information:
Email: ${PERSONAL_INFO.email}
GitHub: ${PERSONAL_INFO.github}
Location: ${PERSONAL_INFO.location}`
        });
        break;

      case 'clear':
        setLogs([]);
        setCommand('');
        return;

      case 'exit':
        onClose();
        return;

      default:
        newLogs.push({
          type: 'output',
          content: `zsh: command not found: ${rawCmd}. Type "help" for a list of valid commands.`
        });
        break;
    }

    setLogs(newLogs);
    setCommand('');
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className="relative w-full max-w-3xl bg-slate-950 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden font-mono text-xs flex flex-col h-[520px]"
        >
          {/* Header Bar */}
          <div className="flex items-center justify-between px-4 py-3 bg-slate-900 border-b border-slate-800 select-none">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-rose-500/90 inline-block cursor-pointer" onClick={onClose} />
              <span className="w-3 h-3 rounded-full bg-amber-500/90 inline-block" />
              <span className="w-3 h-3 rounded-full bg-emerald-500/90 inline-block" />
              <span className="ml-2 text-slate-300 font-semibold flex items-center gap-1.5">
                <TerminalIcon className="w-3.5 h-3.5 text-cyan-400" />
                <span>urooj@uog-decodelabs:~</span>
              </span>
            </div>

            <button onClick={onClose} className="text-slate-400 hover:text-white transition-colors">
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Quick Command Buttons */}
          <div className="px-4 py-2 bg-slate-900/60 border-b border-slate-800/80 flex flex-wrap gap-1.5">
            {['help', 'bio', 'projects', 'internship', 'skills', 'education', 'contact', 'clear'].map((cmd) => (
              <button
                key={cmd}
                onClick={() => handleRunCommand(cmd)}
                className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-cyan-300 hover:text-white text-[11px] font-mono border border-slate-700/60 transition-colors"
              >
                ${cmd}
              </button>
            ))}
          </div>

          {/* Terminal Screen Output */}
          <div className="flex-1 p-4 overflow-y-auto space-y-2 text-slate-300">
            {logs.map((log, idx) => (
              <div key={idx} className="space-y-1">
                {log.type === 'system' && (
                  <p className="text-slate-500">{log.content}</p>
                )}
                {log.type === 'input' && (
                  <p className="flex items-center gap-2 text-cyan-400 font-semibold">
                    <span>urooj@uog:~$</span>
                    <span>{log.content}</span>
                  </p>
                )}
                {log.type === 'output' && (
                  <pre className="text-slate-200 whitespace-pre-wrap leading-relaxed font-mono bg-slate-900/40 p-2.5 rounded-lg border border-slate-800/50">
                    {log.content}
                  </pre>
                )}
              </div>
            ))}
            <div ref={bottomRef} />
          </div>

          {/* Input Prompt */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleRunCommand();
            }}
            className="flex items-center gap-2 px-4 py-3 bg-slate-900 border-t border-slate-800"
          >
            <span className="text-cyan-400 font-bold">urooj@uog:~$</span>
            <input
              type="text"
              value={command}
              onChange={(e) => setCommand(e.target.value)}
              placeholder="Type command (e.g. 'bio', 'projects', 'help')..."
              className="flex-1 bg-transparent text-slate-100 focus:outline-none font-mono text-xs"
              autoFocus
            />
            <button type="submit" className="text-slate-400 hover:text-cyan-400">
              <CornerDownLeft className="w-4 h-4" />
            </button>
          </form>

        </motion.div>
      </div>
    </AnimatePresence>
  );
};
