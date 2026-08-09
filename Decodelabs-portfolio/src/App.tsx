import React, { useState, useEffect } from 'react';
import { BackgroundCanvas } from './components/BackgroundCanvas';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { ExperienceDecodeLabs } from './components/ExperienceDecodeLabs';
import { Projects } from './components/Projects';
import { Certifications } from './components/Certifications';
import { Skills } from './components/Skills';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { InteractiveDemoModal } from './components/InteractiveDemoModal';
import { InteractiveTerminal } from './components/InteractiveTerminal';

export default function App() {
  const [activeSection, setActiveSection] = useState('hero');
  const [isDemoOpen, setIsDemoOpen] = useState(false);
  const [demoType, setDemoType] = useState<'chatbot' | 'ml-classifier' | 'computer-vision' | 'ai-recommender'>('computer-vision');
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);

  // Scroll observer to track active section
  useEffect(() => {
    const sections = ['hero', 'about', 'experience', 'projects', 'certifications', 'skills', 'contact'];
    
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleOpenDemo = (type: 'chatbot' | 'ml-classifier' | 'computer-vision' | 'ai-recommender') => {
    setDemoType(type);
    setIsDemoOpen(true);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-cyan-500/30 selection:text-cyan-200 relative overflow-x-hidden">
      {/* Interactive Background Particle Canvas */}
      <BackgroundCanvas />

      {/* Floating Navigation Header */}
      <Navbar
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        openTerminal={() => setIsTerminalOpen(true)}
      />

      {/* Main Page Content Sections */}
      <main className="relative z-10">
        <Hero
          onOpenDemo={handleOpenDemo}
          onOpenTerminal={() => setIsTerminalOpen(true)}
        />

        <About />

        <ExperienceDecodeLabs onOpenDemo={handleOpenDemo} />

        <Projects onOpenDemo={handleOpenDemo} />

        <Certifications />

        <Skills />

        <Contact />
      </main>

      {/* Footer */}
      <Footer />

      {/* Interactive Demo Modal (Live Chatbot & Scikit-Learn Classifier) */}
      <InteractiveDemoModal
        isOpen={isDemoOpen}
        onClose={() => setIsDemoOpen(false)}
        initialTab={demoType}
      />

      {/* Interactive Command-Line Terminal Modal */}
      <InteractiveTerminal
        isOpen={isTerminalOpen}
        onClose={() => setIsTerminalOpen(false)}
      />
    </div>
  );
}
