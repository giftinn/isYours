import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { soundEffects } from '../utils/soundEffects';

interface SecretLetterPageProps {
  onBackToStart?: () => void;
}

const SecretLetterPage: React.FC<SecretLetterPageProps> = ({ onBackToStart }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [showFinalMessage, setShowFinalMessage] = useState(false);

  const fullText = `Happy 3rd Anniversary to the person who owns my heart, even from miles apart.
  
First of all, thank you for taking the time to open this little gift. I know it’s small, but it comes from a really genuine place in my heart. I just wanted to give you something that holds a piece of how grateful i am for you and for us.

Thank you for being here, for staying, and for choosing to walk through these days with me. I appreciate the patience you show, the effort you give, and the way you keep showing up, even when things aren’t always smooth. Having you in my life brings a kind of comfort i didn’t know i needed.

On our special day, i hope you take a little break and remember that you're so loved not just by the people around you, but especially by me.

As we move into the months ahead, i hope we keep choosing each other. Through busy days, tired nights, small arguments, and happy moments. I hope we grow stronger, understand each other deeper, and keep building something that feels safe and real.

You're my peace, my favorite person, and the one i always root for. I hope this message makes you feel how much I love and miss you.
 
Happy Anniversary, my love Khabil.. thank you for everything
Your baby bear, Adena.`;

  useEffect(() => {
    let currentIndex = 0;
    
    const typingInterval = setInterval(() => {
      if (currentIndex < fullText.length) {
        setDisplayedText(fullText.slice(0, currentIndex + 1));
        currentIndex++;
      } else {
        clearInterval(typingInterval);
        setTimeout(() => {
          setShowFinalMessage(true);
        }, 2000);
      }
    }, 30);

    return () => clearInterval(typingInterval);
  }, []);

  return (
    <div className="text-center space-y-4 sm:space-y-6 max-w-md mx-auto px-4">
      {/* Letter box with glow effect */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="relative"
      >
        <motion.div
          className="p-6 sm:p-8 md:p-10 bg-gradient-to-br from-white/90 to-pink-50/90 rounded-2xl sm:rounded-3xl border-2 border-pink-200 backdrop-blur-lg shadow-2xl relative overflow-hidden"
        >
          {/* Decorative corner elements */}
          <div className="absolute top-2 left-2">
            <div className="w-4 h-4 bg-pink-300 rounded-full" />
          </div>
          <div className="absolute top-2 right-2">
            <div className="w-3 h-3 bg-pink-300 rounded-sm rotate-45" />
          </div>
          <div className="absolute bottom-2 left-2">
            <div className="w-4 h-4 border-2 border-pink-300 rounded-full" />
          </div>
          <div className="absolute bottom-2 right-2">
            <div className="w-3 h-3 bg-gradient-to-br from-pink-300 to-rose-300 rounded-lg" />
          </div>

          {/* Letter content */}
          <div className="text-left space-y-4">
            <div className="text-sm sm:text-base text-pink-800 leading-relaxed whitespace-pre-wrap font-medium">
              {displayedText}
              {displayedText.length < fullText.length && (
                <motion.span
                  animate={{ opacity: [1, 0] }}
                  transition={{ duration: 0.5, repeat: Infinity }}
                  className="inline-block w-2 h-4 bg-pink-400 ml-1"
                />
              )}
            </div>
          </div>
        </motion.div>
      </motion.div>
      <AnimatePresence>
        {showFinalMessage && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <motion.div
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-xl sm:text-2xl font-bold text-pink-800 px-4"
            ></motion.div>

            {/* Final decorative hearts */}
            <motion.div
              className="flex justify-center space-x-2 text-2xl"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <div className="flex gap-2 justify-center">





              </div>
            </motion.div>

            {onBackToStart && (
            <button
                onClick={onBackToStart}
                className="px-4 py-2 bg-pink-600 text-white rounded-xl shadow-md hover:bg-pink-700 transition"
            >
                Back to Start
            </button>
            )}

          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};


export default SecretLetterPage;




