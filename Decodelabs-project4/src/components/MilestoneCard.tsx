import React from 'react';
import { CheckCircle2, FileCode, ShieldCheck, Layers, Award } from 'lucide-react';

interface MilestoneCardProps {
  title: string;
  subtitle: string;
  description: string;
  passed: boolean;
  codeSnippet: string;
}

export const MilestoneCard: React.FC<MilestoneCardProps> = ({
  title,
  subtitle,
  description,
  passed,
  codeSnippet
}) => {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 shadow-sm hover:border-emerald-500/50 transition-all">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-sm font-semibold text-slate-100">{title}</h4>
            <p className="text-xs text-emerald-400 font-mono font-medium">{subtitle}</p>
          </div>
        </div>
        <span className="px-2 py-0.5 text-[10px] uppercase tracking-wider font-bold rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
          PASSED 100%
        </span>
      </div>
      
      <p className="text-xs text-slate-400 mt-2.5 leading-relaxed">{description}</p>
      
      <div className="mt-3 p-2 bg-slate-950 rounded-lg border border-slate-800/80 font-mono text-[11px] text-slate-300 overflow-x-auto">
        <code>{codeSnippet}</code>
      </div>
    </div>
  );
};
