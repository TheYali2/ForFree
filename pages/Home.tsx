import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { Search, ChevronLeft, Calendar, Tag, Monitor, Gamepad2, Disc, Smartphone, Cpu, Shield, Layers } from 'lucide-react';
import { guides } from '../data';

const pageVariants: Variants = {
  initial: { opacity: 0, filter: 'blur(12px)' },
  animate: { opacity: 1, filter: 'blur(0px)' },
  exit: { opacity: 0, filter: 'blur(12px)' }
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.05,
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1] as const
    }
  })
};

const CATEGORIES = [
  { id: 'all', label: 'הכל', icon: Layers },
  { id: 'games', label: 'משחקים', icon: Gamepad2 },
  { id: 'software', label: 'תוכנות', icon: Monitor },
  { id: 'media', label: 'מדיה', icon: Disc },
  { id: 'android', label: 'אנדרואיד', icon: Smartphone },
  { id: 'tools', label: 'כלים', icon: Shield },
];

export const Home: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');

  const filteredGuides = useMemo(() => {
    return guides.filter(guide => {
      const matchesSearch =
        guide.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        guide.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));

      if (!matchesSearch) return false;

      const combinedData = (guide.tags.join(' ') + ' ' + guide.category + ' ' + guide.title).toLowerCase();

      switch (activeCategory) {
        case 'all': return true;
        case 'games':
          return combinedData.includes('משחקים') || combinedData.includes('games');
        case 'software':
          return combinedData.includes('תוכנות') || combinedData.includes('windows') || combinedData.includes('office') || combinedData.includes('ווינדוס');
        case 'media':
          return combinedData.includes('סרטים') || combinedData.includes('סדרות') || combinedData.includes('מוזיקה') || combinedData.includes('שירים') || combinedData.includes('טלוויזיה') || combinedData.includes('youtube') || combinedData.includes('spotify');
        case 'android':
          return combinedData.includes('android') || combinedData.includes('אנדרואיד');
        case 'tools':
          return combinedData.includes('vpn') || combinedData.includes('פרסומות') || combinedData.includes('סיסמאות') || combinedData.includes('אימייל') || combinedData.includes('כרטיסי') || combinedData.includes('וירוס') || combinedData.includes('מאמרים');
        default: return true;
      }
    });
  }, [searchTerm, activeCategory]);

  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.6 }}
      className="space-y-12"
    >
      <section className="space-y-6 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-6xl md:text-8xl font-black tracking-tight text-white"
        >
          For Free!
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-zinc-400 text-lg max-w-xl mx-auto"
        >
          מאגר מידע חופשי למדריכים, תוכנות בחינם וכלים שימושיים. הכל בחינם.
        </motion.p>
      </section>

      <div className="space-y-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="relative max-w-xl mx-auto"
        >
          <input
            type="text"
            placeholder="חיפוש..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-zinc-900/50 border border-zinc-800 text-white px-12 py-4 rounded-xl focus:border-white focus:bg-black focus:ring-1 focus:ring-white/20 transition-all duration-300 outline-none placeholder:text-zinc-600"
          />
          <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="flex flex-wrap justify-center gap-2 md:gap-3"
        >
          {CATEGORIES.map((cat) => {
            const Icon = cat.icon;
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`
                  relative flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300
                  ${isActive ? 'text-black' : 'text-zinc-400 hover:text-white hover:bg-zinc-900'}
                `}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeCategory"
                    className="absolute inset-0 bg-white rounded-full"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <Icon className={`w-4 h-4 relative z-10 ${isActive ? 'text-black' : ''}`} />
                <span className={`relative z-10 ${isActive ? 'text-black' : ''}`}>{cat.label}</span>
              </button>
            );
          })}
        </motion.div>
      </div>

      <motion.div
        layout
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        <AnimatePresence mode="popLayout">
          {filteredGuides.map((guide, index) => (
            <motion.div
              key={guide.id}
              custom={index}
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              exit={{ opacity: 0, scale: 0.9 }}
              layoutId={`card-${guide.id}`}
            >
              <Link
                to={`/article/${guide.id}`}
                className="group block h-full bg-zinc-900/30 border border-zinc-800 hover:border-white hover:bg-zinc-900/80 rounded-2xl p-6 transition-all duration-300 relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="relative z-10 space-y-4">
                  <div className="flex items-start justify-between">
                    <span className="text-xs font-mono text-zinc-500 border border-zinc-800 px-2 py-1 rounded bg-black">
                      {guide.date}
                    </span>
                    <div className="bg-white text-black rounded-full p-2 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                      <ChevronLeft className="w-4 h-4" />
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold mb-2 group-hover:text-white transition-colors">{guide.title}</h3>
                    <p className="text-zinc-400 text-sm line-clamp-2 leading-relaxed">
                      {guide.description}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-2 pt-2">
                    {guide.tags.slice(0, 3).map(tag => (
                      <span key={tag} className="text-xs text-zinc-500 flex items-center gap-1">
                        <Tag className="w-3 h-3" />
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {filteredGuides.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center text-zinc-500 py-20"
        >
          <p>לא נמצאו מדריכים בקטגוריה זו.</p>
        </motion.div>
      )}
    </motion.div>
  );
};