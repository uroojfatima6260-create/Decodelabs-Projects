import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  GraduationCap,
  Briefcase,
  Brain,
  Code,
  Award,
  Sparkles,
  BookOpen,
  Cpu,
  Target,
  CheckCircle2
} from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

export const About: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'bio' | 'academics' | 'mindset'>('bio');

  return (
    <section id="about" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800/80 border border-slate-700 text-xs font-mono text-cyan-400">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Background & Engineering Journey</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            About <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-violet-400">{PERSONAL_INFO.name}</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            Undergraduate Computer Engineering Technology student passionate about AI, Machine Learning, and building impactful technology.
          </p>
        </div>

        {/* Interactive Content Tabs */}
        <div className="flex justify-center mb-8">
          <div className="flex p-1.5 rounded-2xl bg-slate-900/90 border border-slate-800 gap-1.5">
            <button
              onClick={() => setActiveTab('bio')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all ${
                activeTab === 'bio'
                  ? 'bg-gradient-to-r from-cyan-500/20 to-violet-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
              }`}
            >
              <Brain className="w-4 h-4 text-cyan-400" />
              <span>Bio & Mission</span>
            </button>

            <button
              onClick={() => setActiveTab('academics')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all ${
                activeTab === 'academics'
                  ? 'bg-gradient-to-r from-cyan-500/20 to-violet-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
              }`}
            >
              <GraduationCap className="w-4 h-4 text-violet-400" />
              <span>University of Gujrat</span>
            </button>

            <button
              onClick={() => setActiveTab('mindset')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all ${
                activeTab === 'mindset'
                  ? 'bg-gradient-to-r from-cyan-500/20 to-violet-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
              }`}
            >
              <Target className="w-4 h-4 text-emerald-400" />
              <span>Engineering Goals</span>
            </button>
          </div>
        </div>

        {/* Tab Content Display */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Main Info Card (8 cols) */}
          <div className="lg:col-span-8 bg-slate-900/80 border border-slate-800 rounded-2xl p-6 sm:p-8 backdrop-blur-md shadow-xl">
            {activeTab === 'bio' && (
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-6"
              >
                <div className="flex items-center gap-3 pb-4 border-b border-slate-800">
                  <div className="p-2.5 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
                    <Brain className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">Full Professional Profile</h3>
                    <p className="text-xs text-slate-400 font-mono">Computer Engineering Technology & AI/ML Focus</p>
                  </div>
                </div>

                <div className="space-y-4 text-slate-300 text-sm sm:text-base leading-relaxed">
                  <p>
                    I am an Undergraduate Computer Engineering Technology student at the{' '}
                    <strong className="text-cyan-300">University of Gujrat</strong> with a strong passion for Artificial Intelligence, Machine Learning, Software Development, and Emerging Technologies.
                  </p>
                  <p>
                    I enjoy turning ideas into practical solutions by building responsive websites, web applications, and programming projects while continuously expanding my knowledge in <strong className="text-violet-300">Python, SQL, JavaScript, React</strong>, and modern software development practices.
                  </p>
                  <p>
                    Currently, I am serving as an AI & Software Engineering Intern at <strong className="text-cyan-300">DecodeLabs</strong>, applying my technical skills to build real-world intelligent software products and responsive web applications.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                    <div className="text-xs">
                      <span className="font-semibold text-slate-200 block">Practical AI Solutions</span>
                      <span className="text-slate-400">Rule-based chatbots & supervised ML models</span>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-violet-400 shrink-0 mt-0.5" />
                    <div className="text-xs">
                      <span className="font-semibold text-slate-200 block">Industry Simulations</span>
                      <span className="text-slate-400">Forage, Coddy, Alison certifications</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'academics' && (
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-6"
              >
                <div className="flex items-center gap-3 pb-4 border-b border-slate-800">
                  <div className="p-2.5 rounded-xl bg-violet-500/10 border border-violet-500/30 text-violet-400">
                    <GraduationCap className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">University of Gujrat</h3>
                    <p className="text-xs text-slate-400 font-mono">Undergraduate Engineering Degree</p>
                  </div>
                </div>

                <div className="space-y-4 text-slate-300 text-sm leading-relaxed">
                  <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2">
                    <div className="flex justify-between items-center text-xs font-mono text-cyan-400">
                      <span>DEGREE PROGRAM</span>
                      <span>CURRENT ENROLLMENT</span>
                    </div>
                    <h4 className="text-lg font-bold text-white">B.S. Computer Engineering Technology</h4>
                    <p className="text-slate-400 text-xs">University of Gujrat, Main Campus</p>
                  </div>

                  <p className="text-slate-300">
                    The Computer Engineering Technology curriculum at University of Gujrat combines computer science principles, hardware-software interfacing, database systems, and modern AI engineering concepts.
                  </p>

                  <div className="space-y-2">
                    <h5 className="text-xs font-mono text-slate-400 uppercase tracking-wider">Key Coursework Focus</h5>
                    <div className="flex flex-wrap gap-2 text-xs">
                      {['Artificial Intelligence', 'Machine Learning', 'Data Structures & Algorithms', 'Database Systems (SQL)', 'Software Engineering Practices', 'Embedded Systems', 'Computer Networks & Security'].map((course, idx) => (
                        <span key={idx} className="px-3 py-1 rounded-lg bg-slate-800 text-slate-300 border border-slate-700/60">
                          {course}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'mindset' && (
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-6"
              >
                <div className="flex items-center gap-3 pb-4 border-b border-slate-800">
                  <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
                    <Target className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">Continuous Growth & Career Aims</h3>
                    <p className="text-xs text-slate-400 font-mono">Future Computer Engineer & AI Professional</p>
                  </div>
                </div>

                <div className="space-y-4 text-slate-300 text-sm leading-relaxed">
                  <p>
                    I believe in continuous learning, hands-on practice, and creating impactful technology that solves real-world problems.
                  </p>
                  <p>
                    I am currently seeking <strong className="text-cyan-300">internship opportunities, collaborative projects, and networking opportunities</strong> where I can contribute, learn from experienced professionals, and grow as a future computer engineer and AI professional.
                  </p>

                  <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2">
                    <h5 className="text-xs font-mono text-emerald-400 uppercase tracking-wider">What I Bring to Teams</h5>
                    <ul className="space-y-1.5 text-xs text-slate-300">
                      <li className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                        <span>Hands-on Python, ML & Rule-based NLP implementation skills</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-violet-400" />
                        <span>Industry-aligned workflows from Forage & DecodeLabs internships</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                        <span>Strong problem-solving mindset and dedication to clean engineering</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </motion.div>
            )}
          </div>

          {/* Side Cards (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            
            {/* DecodeLabs Badge Card */}
            <div className="p-5 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800 shadow-xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-24 h-24 bg-cyan-500/10 rounded-full blur-2xl group-hover:bg-cyan-500/20 transition-all" />
              <div className="flex items-center justify-between mb-3">
                <span className="px-2.5 py-1 rounded-md bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 text-[11px] font-mono">
                  ACTIVE INTERNSHIP
                </span>
                <Briefcase className="w-4 h-4 text-cyan-400" />
              </div>
              <h4 className="text-lg font-bold text-white mb-1">DecodeLabs</h4>
              <p className="text-xs text-slate-400 mb-3">Software Engineering & AI Intern</p>
              <p className="text-xs text-slate-300 leading-relaxed">
                Building AI integrations, rule-based web tools, and full-stack interfaces as an active team contributor.
              </p>
            </div>

            {/* Quick Education Card */}
            <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-xl">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 rounded-lg bg-violet-500/10 text-violet-400 border border-violet-500/20">
                  <GraduationCap className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">Univ of Gujrat</h4>
                  <p className="text-[11px] text-slate-400">Computer Engineering Tech</p>
                </div>
              </div>
              <div className="text-xs text-slate-300 space-y-1 font-mono">
                <p className="text-slate-400">Degree: <span className="text-slate-200">B.S. Eng Technology</span></p>
                <p className="text-slate-400">Focus: <span className="text-violet-300">AI & Embedded Systems</span></p>
              </div>
            </div>

            {/* Core Tech Interests */}
            <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-xl">
              <h4 className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                <Cpu className="w-3.5 h-3.5 text-cyan-400" />
                <span>Technical Domains</span>
              </h4>
              <div className="flex flex-wrap gap-1.5 text-[11px]">
                {['AI & ML', 'Python', 'SQL', 'React', 'JavaScript', 'Cybersecurity', 'Embedded Systems', 'Data Science'].map((skill, idx) => (
                  <span key={idx} className="px-2.5 py-1 rounded-md bg-slate-800 text-slate-200 border border-slate-700/50">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
