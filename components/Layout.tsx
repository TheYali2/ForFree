import React from 'react';
import { useLocation } from 'react-router-dom';
import { MonitorDown, Mail } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col selection:bg-white selection:text-black">
      <main className="flex-grow pt-12 pb-20 px-6">
        <div className="max-w-5xl mx-auto w-full">
          {children}
        </div>
      </main>

      <footer className="border-t border-white/5 py-12 bg-zinc-950/30">
        <div className="max-w-5xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-3 opacity-50 hover:opacity-100 transition-opacity duration-300">
            <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center">
              <MonitorDown className="w-4 h-4" />
            </div>
            <span className="text-sm font-mono">FOR FREE © 2026</span>
          </div>

          <a
            href="mailto:theyali@duck.com"
            className="flex items-center gap-2 text-sm text-zinc-500 hover:text-white transition-colors duration-300 group px-4 py-2 rounded-full hover:bg-white/5"
          >
            <Mail className="w-4 h-4 group-hover:scale-110 transition-transform" />
            <span>theyali@duck.com</span>
          </a>
        </div>
      </footer>
    </div>
  );
};