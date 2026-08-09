import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import {
  Brain,
  Code2,
  Sparkles,
  ArrowRight,
  Github,
  Mail,
  Terminal,
  Cpu,
  GraduationCap,
  Briefcase,
  Play,
  CheckCircle2
} from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

interface HeroProps {
  onOpenDemo: (demoType: 'chatbot' | 'ml-classifier' | 'computer-vision' | 'ai-recommender' | 'decodelabs' | 'none') => void;
  onOpenTerminal: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenDemo, onOpenTerminal }) => {
  const roles = [
    "AI & Machine Learning Enthusiast",
    "Computer Engineering Student",
    "Software Engineer @ DecodeLabs Intern",
    "Python & SQL Specialist",
    "Web & React Developer"
  ];

  const [roleIndex, setRoleIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentRole = roles[roleIndex];
    const typingSpeed = isDeleting ? 40 : 80;

    const timer = setTimeout(() => {
      if (!isDeleting) {
        setDisplayText(currentRole.substring(0, displayText.length + 1));
        if (displayText.length === currentRole.length) {
          setTimeout(() => setIsDeleting(true), 1800);
        }
      } else {
        setDisplayText(currentRole.substring(0, displayText.length - 1));
        if (displayText.length === 0) {
          setIsDeleting(false);
          setRoleIndex((prev) => (prev + 1) % roles.length);
        }
      }
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [displayText, isDeleting, roleIndex]);

  return (
    <section id="hero" className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
      {/* Glow Effects */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-tr from-cyan-500/15 via-indigo-500/10 to-violet-500/15 rounded-full blur-[120px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Hero Text Column */}
          <div className="lg:col-span-7 flex flex-col items-start space-y-6">
            
            {/* Status Pills */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex flex-wrap items-center gap-2"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/90 border border-cyan-500/30 text-xs font-mono text-cyan-300 shadow-md shadow-cyan-500/10">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                <Briefcase className="w-3.5 h-3.5 text-cyan-400" />
                <span>Intern @ DecodeLabs</span>
              </div>

              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-900/80 border border-slate-800 text-xs text-slate-300">
                <GraduationCap className="w-3.5 h-3.5 text-violet-400" />
                <span>Univ of Gujrat</span>
              </div>
            </motion.div>

            {/* Name Heading */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="space-y-2"
            >
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white leading-tight">
                Hi, I'm <br className="hidden sm:inline" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-indigo-300 to-violet-400">
                  {PERSONAL_INFO.name}
                </span>
              </h1>

              {/* Dynamic Typewriter Role */}
              <div className="h-10 flex items-center font-mono text-lg sm:text-xl text-cyan-400/90 font-medium">
                <span className="text-slate-500 mr-2">&gt;</span>
                <span>{displayText}</span>
                <span className="w-2 h-5 bg-cyan-400 ml-1 inline-block animate-pulse" />
              </div>
            </motion.div>

            {/* Concise Bio Teaser */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-slate-300 text-base sm:text-lg max-w-2xl leading-relaxed"
            >
              Undergraduate Computer Engineering Technology student at the{' '}
              <span className="text-cyan-300 font-medium">University of Gujrat</span> & AI Software Engineer Intern at{' '}
              <span className="text-violet-300 font-medium">DecodeLabs</span>. Turning ideas into real-world solutions with Python, Machine Learning, SQL, and modern Web Stack.
            </motion.p>

            {/* Quick Interactive Demo Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-wrap items-center gap-3 pt-2 w-full sm:w-auto"
            >
              <a
                href="#projects"
                className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-violet-600 hover:from-cyan-400 hover:to-violet-500 text-white font-semibold text-sm shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 transition-all duration-300 group w-full sm:w-auto"
              >
                <span>View Projects</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>

              <button
                onClick={() => onOpenDemo('chatbot')}
                className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-slate-200 hover:text-cyan-300 border border-slate-700/80 hover:border-cyan-500/50 text-sm font-medium transition-all duration-200 shadow-md w-full sm:w-auto"
              >
                <Play className="w-4 h-4 text-cyan-400 fill-cyan-400/20" />
                <span>Test Live Chatbot</span>
              </button>

              <button
                onClick={() => onOpenDemo('ml-classifier')}
                className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-slate-200 hover:text-violet-300 border border-slate-700/80 hover:border-violet-500/50 text-sm font-medium transition-all duration-200 shadow-md w-full sm:w-auto"
              >
                <Brain className="w-4 h-4 text-violet-400" />
                <span>ML Classifier Demo</span>
              </button>
            </motion.div>

            {/* Key Skill Tags */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="pt-3 flex flex-wrap items-center gap-2 text-xs text-slate-400 font-mono"
            >
              <span className="text-slate-500">Focus:</span>
              <span className="px-2.5 py-1 rounded-md bg-slate-800/60 border border-slate-700/50 text-cyan-300">
                AI & ML
              </span>
              <span className="px-2.5 py-1 rounded-md bg-slate-800/60 border border-slate-700/50 text-purple-300">
                Python
              </span>
              <span className="px-2.5 py-1 rounded-md bg-slate-800/60 border border-slate-700/50 text-emerald-300">
                SQL
              </span>
              <span className="px-2.5 py-1 rounded-md bg-slate-800/60 border border-slate-700/50 text-sky-300">
                React.js
              </span>
              <span className="px-2.5 py-1 rounded-md bg-slate-800/60 border border-slate-700/50 text-amber-300">
                DecodeLabs Projects
              </span>
            </motion.div>

          </div>

          {/* Right Hero Image / Visual Widget Column */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative w-full max-w-sm sm:max-w-md"
            >
              {/* Outer Decorative Gradient Halo */}
              <div className="absolute -inset-1.5 bg-gradient-to-r from-cyan-500 via-indigo-500 to-violet-600 rounded-3xl blur-md opacity-40 group-hover:opacity-70 transition duration-1000 animate-pulse" />

              {/* Main Visual Box */}
              <div className="relative rounded-2xl bg-slate-900 border border-slate-800 p-4 shadow-2xl overflow-hidden">
                
                {/* Header bar of visual box */}
                <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-800 font-mono text-xs text-slate-400">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                    <span className="ml-2 text-slate-300 font-medium">urooj_profile.py</span>
                  </div>
                  <span className="text-cyan-400 text-[10px]">UoG & DecodeLabs</span>
                </div>

                {/* Avatar Image Frame */}
                <div className="relative rounded-xl overflow-hidden aspect-square border border-slate-700/80 shadow-inner group">
                  <img
                    src="/src/assets/images/hero_avatar_preview_1785947654432.jpg"
                    alt="Urooj Fatima"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                  />

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-80" />

                  {/* Overlay Badges */}
                  <div className="absolute bottom-3 left-3 right-3 flex flex-col gap-1.5">
                    <div className="flex items-center justify-between text-xs">
                      <span className="px-2.5 py-1 rounded-md bg-slate-900/90 border border-cyan-500/40 text-cyan-300 font-medium font-mono flex items-center gap-1.5 backdrop-blur-md">
                        <Cpu className="w-3.5 h-3.5 text-cyan-400" />
                        <span>Comp. Eng. Tech</span>
                      </span>
                      <span className="px-2.5 py-1 rounded-md bg-slate-900/90 border border-violet-500/40 text-violet-300 font-medium font-mono backdrop-blur-md">
                        AI & ML
                      </span>
                    </div>

                    <div className="p-2.5 rounded-lg bg-slate-950/85 border border-slate-800 text-xs text-slate-200 backdrop-blur-md flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span className="truncate">Active AI Software Intern @ DecodeLabs</span>
                    </div>
                  </div>
                </div>

                {/* Interactive CLI Trigger Banner */}
                <div className="mt-3 pt-3 border-t border-slate-800/80 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
                    <Terminal className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Run <code className="text-cyan-300">urooj --status</code></span>
                  </div>

                  <button
                    onClick={onOpenTerminal}
                    className="px-2.5 py-1 rounded-md bg-slate-800 hover:bg-slate-700 text-cyan-300 text-xs font-mono border border-slate-700 transition-colors"
                  >
                    Open Terminal &gt;
                  </button>
                </div>

              </div>
            </motion.div>
          </div>

        </div>

        {/* Quick Highlights / Stats Grid Banner */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 p-6 rounded-2xl bg-slate-900/60 border border-slate-800 backdrop-blur-md"
        >
          {PERSONAL_INFO.stats.map((stat, idx) => (
            <div key={idx} className="flex flex-col items-center text-center p-3 rounded-xl bg-slate-950/40 border border-slate-800/50">
              <span className="text-2xl sm:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-violet-400 font-mono">
                {stat.value}
              </span>
              <span className="text-xs text-slate-400 mt-1 font-medium">{stat.label}</span>
            </div>
          ))}
        </motion.div>

      </div>
    </section>
  );
};
