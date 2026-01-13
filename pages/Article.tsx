import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Calendar, Tag, ExternalLink, Copy, Check, AlertTriangle, Languages } from 'lucide-react';
import { guides } from '../data';
import { NotFound } from './NotFound';

const pageVariants = {
  initial: { opacity: 0, filter: 'blur(12px)' },
  animate: { opacity: 1, filter: 'blur(0px)' },
  exit: { opacity: 0, filter: 'blur(12px)' }
};

const CopyButton = ({ text }: { text: string }) => {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={handleCopy}
      className="absolute top-3 left-3 p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-all backdrop-blur-sm border border-white/5"
    >
      {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
    </button>
  );
};

const HebrewBadge = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsOpen(!isOpen);
  };

  return (
    <div 
      className="relative inline-block z-10"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <span
        onClick={toggle}
        className="
          inline-flex items-center gap-1 
          text-[10px] px-2 py-0.5 rounded border 
          transition-colors cursor-help
          bg-white/10 text-white border-white/20
          group-hover:bg-black/5 group-hover:text-black group-hover:border-black/10
        "
      >
        <Languages className="w-3 h-3" />
        נתמך בעברית
      </span>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, x: "-50%" }}
            animate={{ opacity: 1, y: 0, x: "-50%" }}
            exit={{ opacity: 0, y: 10, x: "-50%" }}
            transition={{ duration: 0.2 }}
            className="absolute bottom-full left-1/2 mb-3 w-max max-w-[220px] p-3
                       bg-zinc-900/95 backdrop-blur-sm text-white text-xs rounded-xl shadow-2xl 
                       border border-white/10 text-center z-50 leading-relaxed font-medium"
          >
             האתר או האפליקציה הזאת תומכת באיזה שהוא צורה בעברית בין אם זה בתוכן או בממשק וכדומה
             <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-zinc-900/95"></div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const ArchiveInput = () => {
  const [url, setUrl] = useState('');
  const [error, setError] = useState('');

  const handleSearch = () => {
    const trimmedUrl = url.trim();
    if (!trimmedUrl) {
      setError('אנא הכנס כתובת אתר.');
      return;
    }
    try {
      new URL(trimmedUrl);
      setError('');
      window.open(`https://archive.md/${trimmedUrl}`, '_blank');
    } catch (e) {
      setError('אנא הכנס כתובת אתר חוקית.');
    }
  };

  return (
    <div className="space-y-3">
      <div className="flex gap-2">
        <input 
          type="text" 
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="הדבק קישור למאמר כאן..." 
          className="flex-1 bg-black border border-zinc-700 rounded-lg px-4 py-3 focus:border-white outline-none transition-colors dir-ltr text-left"
          style={{ direction: 'ltr' }}
        />
        <button 
          onClick={handleSearch}
          className="bg-white text-black font-bold px-6 rounded-lg hover:bg-zinc-200 transition-colors shrink-0"
        >
          חפש!
        </button>
      </div>
      {error && <p className="text-red-500 text-sm font-medium">{error}</p>}
    </div>
  );
};

export const Article: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const guide = guides.find(g => g.id === Number(id));

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!guide) return <NotFound />;

  return (
    <motion.article
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.6 }}
      className="max-w-3xl mx-auto space-y-12"
    >
      <header className="space-y-6 border-b border-zinc-800 pb-8">
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-zinc-500 hover:text-white transition-colors group mb-8"
        >
          <ArrowRight className="w-4 h-4 group-hover:-mr-1 transition-all" />
          <span>חזרה לרשימה</span>
        </button>

        <div className="flex flex-wrap gap-4 text-sm text-zinc-500">
          <span className="flex items-center gap-2 px-3 py-1 rounded-full border border-zinc-800 bg-zinc-900/50">
            <Calendar className="w-3 h-3" />
            {guide.date}
          </span>
          <span className="flex items-center gap-2 px-3 py-1 rounded-full border border-zinc-800 bg-zinc-900/50">
            <Tag className="w-3 h-3" />
            {guide.category}
          </span>
        </div>

        <h1 className="text-3xl md:text-5xl font-black leading-tight">
          {guide.title}
        </h1>

        <p className="text-xl text-zinc-400 leading-relaxed">
          {guide.description}
        </p>

        {guide.warning && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-zinc-900/80 border border-white/20 p-6 rounded-2xl flex items-start gap-4 shadow-[0_0_30px_rgba(255,255,255,0.05)]"
          >
            <div className="bg-white/10 p-3 rounded-full shrink-0">
               <AlertTriangle className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="font-bold text-white text-lg mb-1">שים לב</h3>
              <p className="text-zinc-400 leading-relaxed">{guide.warning}</p>
            </div>
          </motion.div>
        )}
      </header>

      <div className="space-y-16">
        {guide.sections.map((section, idx) => (
          <motion.section 
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            {section.title && (
              <h2 className="text-2xl font-bold flex items-center gap-3">
                <span className="w-1.5 h-6 bg-white rounded-full"></span>
                {section.title}
              </h2>
            )}

            {section.content && (
              <p className="text-zinc-300 leading-8 whitespace-pre-wrap text-lg">
                {section.content}
              </p>
            )}

            {section.code && (
              <div className="relative group rounded-xl overflow-hidden border border-zinc-800 bg-[#0a0a0a]">
                <div className="bg-zinc-900/50 border-b border-zinc-800 px-4 py-2 flex items-center gap-2">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-zinc-700" />
                    <div className="w-3 h-3 rounded-full bg-zinc-700" />
                    <div className="w-3 h-3 rounded-full bg-zinc-700" />
                  </div>
                  <span className="ml-auto text-xs text-zinc-500 font-mono">Terminal</span>
                </div>
                <div className="p-6 overflow-x-auto">
                  <pre className="font-mono text-sm text-zinc-300">
                    <code>{section.code}</code>
                  </pre>
                </div>
                <CopyButton text={section.code} />
              </div>
            )}

            {section.links && (
              <div className="grid gap-3">
                {section.links.map((link, linkIdx) => (
                  <a
                    key={linkIdx}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-4 rounded-xl border border-zinc-800 bg-zinc-900/30 hover:bg-white hover:text-black hover:border-white transition-all duration-300 group"
                  >
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-bold text-lg">{link.title}</span>
                        {link.supportsHebrew && <HebrewBadge />}
                      </div>
                      <span className="text-sm opacity-60 group-hover:opacity-80">{link.description}</span>
                    </div>
                    <ExternalLink className="w-5 h-5 opacity-50 group-hover:opacity-100" />
                  </a>
                ))}
              </div>
            )}

            {section.image && (
              <div className="rounded-2xl overflow-hidden border border-zinc-800 bg-zinc-900 relative">
                 <img 
                   src={section.image} 
                   alt={section.title || "Section image"} 
                   className="w-full h-auto grayscale hover:grayscale-0 transition-all duration-700 ease-in-out"
                 />
              </div>
            )}
            
            {section.isInputSection && <ArchiveInput />}
          </motion.section>
        ))}
      </div>
      
      <div className="pt-12 border-t border-zinc-800">
         <div className="flex flex-wrap gap-2">
            {guide.tags.map(tag => (
                <span key={tag} className="text-sm text-zinc-500">#{tag}</span>
            ))}
         </div>
      </div>
    </motion.article>
  );
};