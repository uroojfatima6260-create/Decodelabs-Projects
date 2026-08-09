import React from 'react';
import { motion } from 'motion/react';
import { BrainCircuit, Code2, Cpu, CheckCircle2, Sparkles } from 'lucide-react';
import { SKILL_CATEGORIES } from '../data/portfolioData';

export const Skills: React.FC = () => {
  return (
    <section id="skills" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800/80 border border-slate-700 text-xs font-mono text-cyan-400">
            <Cpu className="w-3.5 h-3.5" />
            <span>Technical Capabilities</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Engineering & <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-violet-400">AI Skillset</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            Comprehensive breakdown of my programming languages, machine learning frameworks, database tools, and software engineering practices.
          </p>
        </div>

        {/* Skill Category Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {SKILL_CATEGORIES.map((cat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="p-6 rounded-3xl bg-slate-900 border border-slate-800 hover:border-slate-700 transition-all duration-300 shadow-xl space-y-6 flex flex-col justify-between"
            >
              <div className="space-y-4">
                
                {/* Header */}
                <div className="flex items-center gap-3 pb-3 border-b border-slate-800">
                  <div className="p-3 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
                    {idx === 0 && <BrainCircuit className="w-6 h-6" />}
                    {idx === 1 && <Code2 className="w-6 h-6" />}
                    {idx === 2 && <Cpu className="w-6 h-6" />}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white">{cat.title}</h3>
                    <p className="text-xs text-slate-400 leading-tight">{cat.description}</p>
                  </div>
                </div>

                {/* Progress bars list */}
                <div className="space-y-3 pt-2">
                  {cat.skills.map((skill, sIdx) => (
                    <div key={sIdx} className="space-y-1">
                      <div className="flex justify-between items-center text-xs">
                        <span className="font-semibold text-slate-200">{skill.name}</span>
                        <span className="font-mono text-cyan-400">{skill.level}%</span>
                      </div>
                      <div className="w-full h-2 rounded-full bg-slate-950 overflow-hidden p-[1px] border border-slate-800">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.level}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.8, delay: 0.2 }}
                          className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-violet-500"
                        />
                      </div>
                    </div>
                  ))}
                </div>

              </div>

              {/* Tag Footer */}
              <div className="pt-4 border-t border-slate-800/80 text-[11px] font-mono text-slate-400 flex items-center justify-between">
                <span>Domain Focus</span>
                <span className="text-cyan-300 font-medium">UoG & DecodeLabs</span>
              </div>

            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
