import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home } from 'lucide-react';

export const NotFound: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, filter: 'blur(10px)' }}
      animate={{ opacity: 1, filter: 'blur(0px)' }}
      exit={{ opacity: 0, filter: 'blur(10px)' }}
      className="min-h-[60vh] flex flex-col items-center justify-center text-center space-y-6"
    >
      <h1 className="text-9xl font-black text-zinc-800 select-none">404</h1>
      <div className="space-y-4 relative z-10">
        <h2 className="text-2xl font-bold">העמוד לא נמצא</h2>
        <p className="text-zinc-500">מה אתה מנסה לחפש בדיוק?</p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 bg-white text-black px-6 py-3 rounded-lg font-bold hover:bg-zinc-200 transition-colors mt-4"
        >
          <Home className="w-4 h-4" />
          חזרה הביתה
        </Link>
      </div>
    </motion.div>
  );
};