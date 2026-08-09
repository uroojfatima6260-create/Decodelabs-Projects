import React from 'react';
import { motion } from 'motion/react';
import { Award, CheckCircle2, ShieldCheck, Sparkles, ExternalLink, BookOpen, GraduationCap } from 'lucide-react';
import { CERTIFICATIONS } from '../data/portfolioData';

export const Certifications: React.FC = () => {
  return (
    <section id="certifications" className="py-20 relative bg-slate-950/30 border-y border-slate-800/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800/80 border border-slate-700 text-xs font-mono text-cyan-400">
            <Award className="w-3.5 h-3.5" />
            <span>Job Simulations & Global Credentials</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Industry <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-violet-400">Certifications & Simulations</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            Completed industry-aligned job simulations and rigorous certifications from Forage, Coddy, Alison, and leading global organizations.
          </p>
        </div>

        {/* Certifications Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {CERTIFICATIONS.map((cert) => (
            <motion.div
              key={cert.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="p-6 rounded-2xl bg-slate-900 border border-slate-800 hover:border-slate-700 transition-all duration-300 shadow-xl space-y-4 flex flex-col justify-between group"
            >
              <div className="space-y-3">
                
                {/* Top Badge Bar */}
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 rounded-lg bg-cyan-950/80 border border-cyan-800 text-cyan-300 font-mono text-[11px] font-bold">
                    {cert.logoText}
                  </span>
                  <span className="text-xs text-slate-400 font-mono">{cert.issueDate}</span>
                </div>

                <div className="space-y-1">
                  <h3 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors">
                    {cert.title}
                  </h3>
                  <p className="text-xs text-slate-400 font-medium">Issued by: <span className="text-slate-200">{cert.organization}</span></p>
                </div>

                <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                  {cert.description}
                </p>

                {/* Skills Learned Badges */}
                <div className="space-y-1.5 pt-1">
                  <span className="text-[11px] font-mono text-slate-400 block uppercase">Core Competencies:</span>
                  <div className="flex flex-wrap gap-1.5">
                    {cert.skillsLearned.map((sk, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-1 rounded-md bg-slate-950 border border-slate-800 text-slate-300 text-xs font-mono"
                      >
                        {sk}
                      </span>
                    ))}
                  </div>
                </div>

              </div>

              {/* Card Footer Verification */}
              <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs font-mono text-slate-400">
                <span className="flex items-center gap-1.5 text-emerald-400">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Verified Credential</span>
                </span>
                <span className="text-violet-300">{cert.credentialCategory}</span>
              </div>

            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
