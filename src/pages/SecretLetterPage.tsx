import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface SecretLetterPageProps {
  onBackToStart?: () => void;
}

interface PolaroidItem {
  id: number;
  image: string;
  song: string;
  artist: string;
  audio: string;
}

const polaroids: PolaroidItem[] = [
  {
    id: 1,
    image: 'https://files.catbox.moe/utgqfg.jpg',
    song: 'Senja Sudut Kota',
    artist: 'Samuel Cipta',
    audio: 'https://files.catbox.moe/hde6rr.mp3'
  },
  {
    id: 2,
    image: 'https://files.catbox.moe/nodi0u.jpg',
    song: 'Kota Ini Tak Sama Tanpamu',
    artist: 'Nadhif Basamalah',
    audio: 'https://files.catbox.moe/zkuvy0.mp4'
  },
  {
    id: 3,
    image: 'https://files.catbox.moe/4bqiez.jpg',
    song: 'Everything U Are',
    artist: 'Hindia',
    audio: 'https://files.catbox.moe/29qkzp.mp3'
  }
];

const SecretLetterPage: React.FC<SecretLetterPageProps> = ({ onBackToStart }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [showFinalMessage, setShowFinalMessage] = useState(false);

  const fullText = `Happy birthday to You!!

First, thank you for your time buat buka gift sederhana dari aku ini (and i hope u like it hehe). I just wanna say, happy birthday buat cantikku yang hebat, keren.. aku mau mintaa maaf ya sayangg karena habis kecelakaan aku jadi jarang ada waktu buat kamu, terus suka ilang-ilang dan susah buat luangin waktu apalagi sleepcall sama kamu karena sibuk juga. aku benerann mintaa yaaa, terus juga maaff karena aku telat kasii gift buat kamu ;(

Then, i wanna say thank you for everything u did to me, it means a lot to me fr. makasihh udah mau nge-treat aku sebaik ituu, makasih udah mau dengerin semua keluh kesah aku, cerita random aku. aku jugaa makasih banget selama ini kamu selalu sabar sama aku, jarang marah intinya u treated me like a princess. thank you, sayang.

And bcs it's your special day, aku harap semua keinginan kamu terwujud satu persatu, terus selalu dikelilingi sama hal-hal baik dan dijauhin dari yang jahat-jahat. Semua goals atau impian kamu bisa tercapai dan sukses untuk semua hal yang sedang kamu upayakan sekarang dan yang akan datang. thenn, i just wanna say that kamu gak sendirian, kamu harus percaya kalau kamu selalu dikelilingi orang-orang yang sayang sama kamu, utamanya aku yang selalu disini buat tempat kamu pulang. bahagia terus yaa sayang, jangan sedih-sedihh, jangan capek-capek jugaa.. semoga setiap masalah yang kamu hadapi selalu diberi jalan keluar dan dipermudah.

Happy birthday Febri.
With all my heart, Aull.`;

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
    <div className="text-center space-y-6 max-w-5xl mx-auto px-4">

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="p-6 sm:p-10 bg-gradient-to-br from-white/90 to-pink-50/90 rounded-3xl border-2 border-pink-200 backdrop-blur-lg shadow-2xl relative overflow-hidden">

          <div className="absolute top-2 left-2 w-4 h-4 bg-pink-300 rounded-full"/>
          <div className="absolute top-2 right-2 w-3 h-3 bg-pink-300 rotate-45"/>
          <div className="absolute bottom-2 left-2 w-4 h-4 border-2 border-pink-300 rounded-full"/>
          <div className="absolute bottom-2 right-2 w-3 h-3 bg-gradient-to-br from-pink-300 to-rose-300 rounded-lg"/>

          <div className="text-left">
            <div className="text-sm sm:text-base text-pink-900 whitespace-pre-wrap leading-relaxed font-medium">
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
        </div>
      </motion.div>

      <AnimatePresence>
        {showFinalMessage && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >

            <h3 className="text-xl sm:text-2xl font-bold text-pink-900">
              Our Songs & Memories 🎧
            </h3>

            <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
              {polaroids.map((item, i) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, rotate: -8, y: 40 }}
                  animate={{ opacity: 1, rotate: i % 2 ? 6 : -6, y: 0 }}
                  transition={{ delay: i * 0.2, type: 'spring' }}
                  whileHover={{ scale: 1.05, rotate: 0 }}
                  className="bg-white p-3 rounded-xl shadow-xl w-60"
                >
                  <img
                    src={item.image}
                    alt="memory"
                    className="rounded-lg mb-3 object-cover w-full h-48"
                  />

                  <div className="text-left mb-2">
                    <p className="font-semibold text-pink-900 text-sm">
                      {item.song}
                    </p>
                    <p className="text-xs text-pink-600">
                      {item.artist}
                    </p>
                  </div>

                  <audio controls className="w-full accent-pink-500">
                    <source src={item.audio} type="audio/mpeg" />
                  </audio>

                </motion.div>
              ))}
            </div>

            {onBackToStart && (
              <button
                onClick={onBackToStart}
                className="px-5 py-2 bg-gradient-to-r from-pink-500 via-rose-500 to-pink-500 text-white rounded-xl shadow-md hover:shadow-pink-300/50 transition"
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

export default SecretLetterPage;      clearInterval(typingInterval);
      setTimeout(() => {
        setShowFinalMessage(true);
      }, 2000);
    }
  }, 30);
    
    return () => clearInterval(typingInterval);
  }, []);

  return (
    <div className="text-center space-y-6 max-w-5xl mx-auto px-4">

      {/* LETTER BOX */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="p-6 sm:p-10 bg-gradient-to-br from-white/90 to-pink-50/90 rounded-3xl border-2 border-pink-200 backdrop-blur-lg shadow-2xl relative overflow-hidden">

          {/* corners */}
          <div className="absolute top-2 left-2 w-4 h-4 bg-pink-300 rounded-full"/>
          <div className="absolute top-2 right-2 w-3 h-3 bg-pink-300 rotate-45"/>
          <div className="absolute bottom-2 left-2 w-4 h-4 border-2 border-pink-300 rounded-full"/>
          <div className="absolute bottom-2 right-2 w-3 h-3 bg-gradient-to-br from-pink-300 to-rose-300 rounded-lg"/>

          {/* TEXT */}
          <div className="text-left">
            <div className="text-sm sm:text-base text-pink-900 whitespace-pre-wrap leading-relaxed font-medium">
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
        </div>
      </motion.div>

      {/* POLAROID */}
      <AnimatePresence>
        {showFinalMessage && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >

            <h3 className="text-xl sm:text-2xl font-bold text-pink-900">
              Our Songs & Memories 🎧
            </h3>

            <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
              {polaroids.map((item, i) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, rotate: -8, y: 40 }}
                  animate={{ opacity: 1, rotate: i % 2 ? 6 : -6, y: 0 }}
                  transition={{ delay: i * 0.2, type: 'spring' }}
                  whileHover={{ scale: 1.05, rotate: 0 }}
                  className="bg-white p-3 rounded-xl shadow-xl w-60"
                >
                  <img
                    src={item.image}
                    alt="memory"
                    className="rounded-lg mb-3 object-cover w-full h-48"
                  />

                  <div className="text-left mb-2">
                    <p className="font-semibold text-pink-900 text-sm">
                      {item.song}
                    </p>
                    <p className="text-xs text-pink-600">
                      {item.artist}
                    </p>
                  </div>

                  {/* AUDIO */}
                  <audio controls className="w-full accent-pink-500">
                    <source src={item.audio} type="audio/mpeg" />
                  </audio>

                </motion.div>
              ))}
            </div>

            {onBackToStart && (
              <button
                onClick={onBackToStart}
                className="px-5 py-2 bg-gradient-to-r from-pink-500 via-rose-500 to-pink-500 text-white rounded-xl shadow-md hover:shadow-pink-300/50 transition"
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

export default SecretLetterPage;        setTimeout(() => {
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




