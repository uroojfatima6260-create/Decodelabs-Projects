import React from 'react';
import { motion } from 'motion/react';
import { Briefcase, Building2, Calendar, MapPin, CheckCircle, Code, Cpu, ExternalLink, Sparkles, Layers } from 'lucide-react';
import { EXPERIENCES } from '../data/portfolioData';

interface ExperienceDecodeLabsProps {
  onOpenDemo: (demoType: 'chatbot' | 'ml-classifier' | 'computer-vision' | 'ai-recommender' | 'decodelabs' | 'none') => void;
}

export const ExperienceDecodeLabs: React.FC<ExperienceDecodeLabsProps> = ({ onOpenDemo }) => {
  const decodelabs = EXPERIENCES[0];

  return (
    <section id="experience" className="py-20 relative bg-slate-950/40 border-y border-slate-800/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-xs font-mono text-cyan-400">
            <Briefcase className="w-3.5 h-3.5" />
            <span>Active Internship Showcase</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Software & AI Internship at <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-violet-400">DecodeLabs</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            Applying computer engineering technology, machine learning algorithms, and modern frontend practices in an active professional environment.
          </p>
        </div>

        {/* DecodeLabs Main Internship Spotlight Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative rounded-3xl bg-slate-900 border border-slate-800 p-6 sm:p-10 shadow-2xl overflow-hidden group"
        >
          {/* Background Ambient Glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-cyan-500/10 via-indigo-500/10 to-transparent rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start relative z-10">
            
            {/* Left Info Column (7 cols) */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Badge & Role */}
              <div className="space-y-2">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="px-3 py-1 rounded-lg bg-gradient-to-r from-cyan-500/20 to-violet-500/20 border border-cyan-500/40 text-cyan-300 font-mono text-xs font-semibold">
                    {decodelabs.type}
                  </span>
                  <span className="text-slate-400 text-xs font-mono flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-slate-500" />
                    {decodelabs.period}
                  </span>
                  <span className="text-slate-400 text-xs font-mono flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-slate-500" />
                    {decodelabs.location}
                  </span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-extrabold text-white flex items-center gap-3">
                  {decodelabs.role}
                  <span className="text-cyan-400 text-lg font-normal">@ DecodeLabs</span>
                </h3>
              </div>

              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                {decodelabs.description}
              </p>

              {/* Responsibilities List */}
              <div className="space-y-3 pt-2">
                <h4 className="text-xs font-mono uppercase tracking-wider text-cyan-400 flex items-center gap-2">
                  <Layers className="w-4 h-4 text-cyan-400" />
                  <span>Key Deliverables & Responsibilities</span>
                </h4>

                <div className="grid grid-cols-1 gap-2.5">
                  {decodelabs.responsibilities.map((resp, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-3 p-3 rounded-xl bg-slate-950/60 border border-slate-800/80 hover:border-slate-700/80 transition-colors"
                    >
                      <CheckCircle className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                      <span className="text-xs sm:text-sm text-slate-300 leading-snug">{resp}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Technologies Used Pill Grid */}
              <div className="space-y-2 pt-2">
                <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400">Tech Stack & Tools Utilized</h4>
                <div className="flex flex-wrap gap-2">
                  {decodelabs.skills.map((skill, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 rounded-lg bg-slate-800/80 border border-slate-700/60 text-slate-200 text-xs font-mono"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

            </div>

            {/* Right Visual / Project Card Column (5 cols) */}
            <div className="lg:col-span-5 flex flex-col justify-between space-y-4 h-full">
              
              {/* DecodeLabs Project Card Frame */}
              <div className="p-5 rounded-2xl bg-slate-950/90 border border-slate-800 space-y-4 shadow-xl">
                <div className="flex items-center justify-between pb-3 border-b border-slate-800 font-mono text-xs">
                  <span className="text-cyan-400 font-semibold flex items-center gap-1.5">
                    <Building2 className="w-4 h-4" />
                    <span>DecodeLabs Workspace</span>
                  </span>
                  <span className="px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-800 text-[10px]">
                    Active Project
                  </span>
                </div>

                <div className="space-y-2">
                  <h4 className="text-base font-bold text-white">AI Web Interface & NLP Module</h4>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Integrated intelligent rule-based intent routing, Python NLP models, and dynamic data visualizations into DecodeLabs web applications.
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800/80 space-y-2 text-xs">
                  <div className="flex justify-between text-slate-400 font-mono">
                    <span>Target Outcome:</span>
                    <span className="text-emerald-400 font-medium">Production Ready</span>
                  </div>
                  <div className="flex justify-between text-slate-400 font-mono">
                    <span>Architecture:</span>
                    <span className="text-violet-300">React + Python Microservices</span>
                  </div>
                </div>

                {/* Quick Action Button */}
                <div className="pt-2">
                  <button
                    onClick={() => onOpenDemo('chatbot')}
                    className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-violet-600 hover:from-cyan-400 hover:to-violet-500 text-white font-medium text-xs shadow-md shadow-cyan-500/20 transition-all"
                  >
                    <Sparkles className="w-4 h-4" />
                    <span>Test AI Chatbot Feature</span>
                  </button>
                </div>
              </div>

              {/* Quote Card */}
              <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800/80 text-xs text-slate-300 italic leading-relaxed">
                "Working at DecodeLabs has enabled me to translate academic theory from the University of Gujrat into industry-grade software solutions."
              </div>

            </div>

          </div>
        </motion.div>

      </div>
    </section>
  );
};
