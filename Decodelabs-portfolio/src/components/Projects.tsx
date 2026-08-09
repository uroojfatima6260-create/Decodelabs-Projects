import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  Github,
  ExternalLink,
  Sparkles,
  Code2,
  Brain,
  Play,
  Layers,
  Star,
  GitFork,
  ArrowUpRight
} from 'lucide-react';
import { PROJECTS } from '../data/portfolioData';
import { Project } from '../types';

interface ProjectsProps {
  onOpenDemo: (demoType: 'chatbot' | 'ml-classifier' | 'computer-vision' | 'ai-recommender' | 'decodelabs' | 'none') => void;
}

export const Projects: React.FC<ProjectsProps> = ({ onOpenDemo }) => {
  const [filter, setFilter] = useState<'All' | 'Computer Vision' | 'AI & ML' | 'DecodeLabs Work'>('All');

  const filteredProjects = PROJECTS.filter((proj) => {
    if (filter === 'All') return true;
    return proj.category === filter;
  });

  return (
    <section id="projects" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800/80 border border-slate-700 text-xs font-mono text-cyan-400">
            <Code2 className="w-3.5 h-3.5" />
            <span>Featured AI, Computer Vision & Machine Learning Projects</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Engineering & <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-violet-400">DecodeLabs Projects</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            Explore my Computer Vision pipeline, AI recommendation engine, rule-based chatbot, and machine learning models with full source code & live interactive simulators.
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex justify-center mb-10 overflow-x-auto">
          <div className="flex p-1.5 rounded-2xl bg-slate-900/90 border border-slate-800 gap-1.5">
            {(['All', 'Computer Vision', 'AI & ML', 'DecodeLabs Work'] as const).map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all whitespace-nowrap ${
                  filter === cat
                    ? 'bg-gradient-to-r from-cyan-500/20 to-violet-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredProjects.map((project) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="rounded-3xl bg-slate-900 border border-slate-800 overflow-hidden flex flex-col justify-between group hover:border-slate-700 transition-all duration-300 shadow-xl"
            >
              <div>
                {/* Thumbnail Image Container */}
                <div className="relative aspect-video overflow-hidden border-b border-slate-800 bg-slate-950">
                  <img
                    src={project.imageUrl}
                    alt={project.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90 group-hover:opacity-100"
                  />
                  
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent" />

                  {/* Badges */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                    <span className="px-3 py-1 rounded-full bg-slate-950/80 backdrop-blur-md border border-cyan-500/40 text-cyan-300 font-mono text-[11px] font-semibold">
                      {project.category}
                    </span>

                    {project.featured && (
                      <span className="px-2.5 py-1 rounded-full bg-violet-950/90 backdrop-blur-md border border-violet-500/40 text-violet-300 font-mono text-[11px] flex items-center gap-1">
                        <Sparkles className="w-3 h-3 text-violet-400" />
                        <span>Featured</span>
                      </span>
                    )}
                  </div>
                </div>

                {/* Content Details */}
                <div className="p-6 space-y-4">
                  <div className="space-y-1.5">
                    <h3 className="text-xl font-bold text-white group-hover:text-cyan-300 transition-colors flex items-center justify-between">
                      <span>{project.title}</span>
                    </h3>
                    <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                      {project.description}
                    </p>
                  </div>

                  {/* Key Highlights Bullet points */}
                  <div className="space-y-1.5 pt-1">
                    <span className="text-[11px] font-mono uppercase text-slate-400 tracking-wider">Key Architecture & Highlights:</span>
                    <ul className="space-y-1 text-xs text-slate-300">
                      {project.highlights.map((h, idx) => (
                        <li key={idx} className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0" />
                          <span className="truncate">{h}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Tech Stack Pills */}
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {project.techStack.map((tech, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-1 rounded-md bg-slate-800/80 border border-slate-700/60 text-slate-300 text-xs font-mono"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Card Footer Action Bar */}
              <div className="p-6 pt-0 border-t border-slate-800/60 mt-4 flex flex-wrap items-center justify-between gap-3">
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium border border-slate-700 transition-colors"
                >
                  <Github className="w-4 h-4 text-cyan-400" />
                  <span>GitHub Repository</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-slate-400" />
                </a>

                {project.demoType !== 'none' && (
                  <button
                    onClick={() => onOpenDemo(project.demoType)}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-violet-600 hover:from-cyan-400 hover:to-violet-500 text-white text-xs font-semibold shadow-md shadow-cyan-500/20 transition-all"
                  >
                    <Play className="w-3.5 h-3.5 fill-current" />
                    <span>Launch Interactive Demo</span>
                  </button>
                )}
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
