'use client';

import { motion, AnimatePresence, useAnimationControls } from 'framer-motion';
import { Playfair_Display } from 'next/font/google';
import { Navbar } from '../../components/Navbar';
import { Footer } from '../../components/Footer';
import Link from 'next/link';
import { ArrowLeftIcon, PlayIcon, PauseIcon, MusicalNoteIcon } from '@heroicons/react/24/outline';
import { useState, useRef, useEffect } from 'react';
const playfair = Playfair_Display({ subsets: ['latin'] });

const tracks = [
  {
    title: "Sinistervelvet",
    file: "/music/Sinistervelvet-debtracks.mp3",
    description: "A dark and atmospheric composition",
    color: "from-purple-500/20 to-indigo-500/20",
    accent: "text-purple-400",
    waveColor: "#a855f7" // Purple
  },
  {
    title: "Knives",
    file: "/music/Knives-debtracks.mp3",
    description: "Sharp and intense musical journey",
    color: "from-red-500/20 to-orange-500/20",
    accent: "text-red-400",
    waveColor: "#ef4444" // Red
  },
  {
    title: "Astranova",
    file: "/music/Astranova-debtracks.mp3",
    description: "Celestial and expansive soundscape",
    color: "from-blue-500/20 to-cyan-500/20",
    accent: "text-blue-400",
    waveColor: "#3b82f6" // Blue
  },
  {
    title: "Masked",
    file: "/music/Masked-debtracks.mp3",
    description: "Mysterious and layered composition",
    color: "from-gray-500/20 to-slate-500/20",
    accent: "text-gray-400",
    waveColor: "#9ca3af" // Gray
  },
  {
    title: "Shadows",
    file: "/music/Shadows-debtracks.mp3",
    description: "Deep and evocative musical piece",
    color: "from-zinc-500/20 to-neutral-500/20",
    accent: "text-zinc-400",
    waveColor: "#71717a" // Zinc
  },
  {
    title: "Whispers",
    file: "/music/Whispers-debtracks.mp3",
    description: "Subtle and intimate musical experience",
    color: "from-emerald-500/20 to-teal-500/20",
    accent: "text-emerald-400",
    waveColor: "#10b981" // Emerald
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 10
    }
  }
};

const visualizerVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      staggerChildren: 0.1
    }
  }
};

const barVariants = {
  hidden: { scaleY: 0.3 },
  visible: (i: number) => ({
    scaleY: [0.3, 1, 0.3],
    transition: {
      duration: 1,
      repeat: Infinity,
      delay: i * 0.1,
      ease: "easeInOut"
    }
  })
};

export default function MusicPage() {
  const [currentTrack, setCurrentTrack] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const controls = useAnimationControls();
  const [hoveredTrack, setHoveredTrack] = useState<number | null>(null);

  useEffect(() => {
    if (isPlaying) {
      controls.start("visible");
    } else {
      controls.start("hidden");
    }
  }, [isPlaying, controls]);

  const togglePlay = async (index: number) => {
    if (currentTrack === index && isPlaying) {
      audioRef.current?.pause();
      setIsPlaying(false);
      await controls.start("hidden");
    } else {
      if (audioRef.current) {
        audioRef.current.src = tracks[index].file;
        await audioRef.current.play();
        setCurrentTrack(index);
        setIsPlaying(true);
        await controls.start("visible");
      }
    }
  };

  return (
    <main className="min-h-screen">
      <Navbar />
      
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-dark via-dark/95 to-dark pointer-events-none"></div>
        <motion.div 
          className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-yellow-400/10 via-transparent to-transparent opacity-0"
          animate={{
            opacity: isPlaying ? 0.3 : 0,
            scale: isPlaying ? 1.2 : 1,
          }}
          transition={{ duration: 1 }}
        />
        <div className="container-custom relative z-10">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link href="/" className="inline-flex items-center gap-2 text-yellow-400 hover:text-yellow-300 transition-colors mb-8 group">
              <motion.div
                whileHover={{ x: -5 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
              >
                <ArrowLeftIcon className="w-5 h-5" />
              </motion.div>
              <span>Back to Home</span>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.h2 
              className={`section-title text-center bg-gradient-to-r from-yellow-400 via-orange-400 to-orange-500 bg-clip-text text-transparent ${playfair.className} text-reveal mb-12`}
              whileHover={{ scale: 1.05 }}
            >
              My Music
            </motion.h2>

            <motion.div 
              className="grid gap-6"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {tracks.map((track, index) => (
                <motion.div 
                  key={index}
                  variants={itemVariants}
                  className={`p-6 rounded-xl enhanced-glass hover-lift relative overflow-hidden ${
                    currentTrack === index && isPlaying ? 'ring-2 ring-yellow-400/50' : ''
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onHoverStart={() => setHoveredTrack(index)}
                  onHoverEnd={() => setHoveredTrack(null)}
                >
                  <motion.div 
                    className={`absolute inset-0 bg-gradient-to-r ${track.color} opacity-0`}
                    animate={{
                      opacity: hoveredTrack === index ? 0.3 : 0,
                    }}
                    transition={{ duration: 0.3 }}
                  />
                  <div className="flex items-center justify-between relative z-10">
                    <div>
                      <motion.h3 
                        className={`text-2xl font-bold ${track.accent} mb-2 ${playfair.className}`}
                        whileHover={{ x: 5 }}
                      >
                        {track.title}
                      </motion.h3>
                      <motion.p 
                        className="text-yellow-100/90"
                        whileHover={{ x: 5 }}
                      >
                        {track.description}
                      </motion.p>
                    </div>
                    <div className="flex items-center gap-4">
                      <AnimatePresence>
                        {currentTrack === index && isPlaying && (
                          <motion.div 
                            className="music-visualizer"
                            variants={visualizerVariants}
                            initial="hidden"
                            animate="visible"
                            exit="hidden"
                          >
                            {[...Array(8)].map((_, i) => (
                              <motion.div
                                key={i}
                                className="visualizer-bar"
                                custom={i}
                                variants={barVariants}
                                style={{ 
                                  height: `${40 + (i * 5)}px`,
                                  '--wave-color': track.waveColor
                                } as React.CSSProperties}
                              />
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                      <motion.button
                        onClick={() => togglePlay(index)}
                        className={`play-button p-3 rounded-full bg-gradient-to-r ${track.color} backdrop-blur-sm border border-yellow-500/20 hover:border-yellow-500/40 transition-all duration-300 ${
                          currentTrack === index && isPlaying ? 'playing' : ''
                        }`}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        style={{ color: track.waveColor }}
                      >
                        {currentTrack === index && isPlaying ? (
                          <PauseIcon className="w-6 h-6" />
                        ) : (
                          <PlayIcon className="w-6 h-6" />
                        )}
                      </motion.button>
                    </div>
                  </div>
                  <AnimatePresence>
                    {currentTrack === index && isPlaying && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                        className="track-progress"
                        style={{ 
                          '--progress-color': track.waveColor,
                          background: `linear-gradient(to right, ${track.waveColor}, transparent)`
                        } as React.CSSProperties}
                      />
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>

        <audio ref={audioRef} onEnded={() => setIsPlaying(false)} />
        <Footer />
      </section>
    </main>
  );
} 