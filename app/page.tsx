'use client';

import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { MusicalNoteIcon, MicrophoneIcon, VideoCameraIcon, SparklesIcon } from '@heroicons/react/24/outline';
import NextImage from 'next/image';
import { Playfair_Display } from 'next/font/google';
import { useEffect, useState } from 'react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { MusicPlayer } from '../components/MusicPlayer';
import Link from 'next/link';

const playfair = Playfair_Display({ subsets: ['latin'] });

export default function Home() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [musicSymbols, setMusicSymbols] = useState<Array<{ id: number; x: number; y: number }>>([]);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const { scrollYProgress } = useScroll();
  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.5, 0]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      
      // Create new music symbol at mouse position
      if (Math.random() > 0.7) { // 30% chance to create a new symbol
        const newSymbol = {
          id: Date.now(),
          x: e.clientX,
          y: e.clientY,
        };
        setMusicSymbols(prev => [...prev, newSymbol]);
        
        // Remove symbol after animation
        setTimeout(() => {
          setMusicSymbols(prev => prev.filter(s => s.id !== newSymbol.id));
        }, 3000);
      }
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <main className="min-h-screen">
      <Navbar />
      
      {/* Floating Music Symbols */}
      <AnimatePresence>
        {musicSymbols.map((symbol) => (
          <motion.div
            key={symbol.id}
            className="music-symbol"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ 
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
              x: symbol.x,
              y: symbol.y - 50,
            }}
            exit={{ opacity: 0, scale: 0 }}
            transition={{ duration: 3, ease: "easeOut" }}
          >
            ♪
          </motion.div>
        ))}
      </AnimatePresence>
      
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Animated Background */}
        <motion.div 
          className="absolute inset-0"
          style={{ y: backgroundY }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-secondary/20 to-dark z-10" />
          <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))] z-0" />
          <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/50 to-transparent z-20" />
        </motion.div>

        {/* Interactive Particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-yellow-400/50 rounded-full"
              animate={{
                x: [
                  mousePosition.x + Math.random() * 200 - 100,
                  mousePosition.x + Math.random() * 200 - 100
                ],
                y: [
                  mousePosition.y + Math.random() * 200 - 100,
                  mousePosition.y + Math.random() * 200 - 100
                ],
                scale: [0, 1.5, 0],
                opacity: [0, 1, 0]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.1,
              }}
            />
          ))}
        </div>

        {/* Main Logo */}
        <motion.div
          style={{ opacity: 0.6 }}
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
        >
          <motion.div 
            className="relative w-[600px] h-[600px] pulse-glow"
            animate={{
              scale: [1, 1.05, 1],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <NextImage
              src="/debdip-logo.png.jpg"
              alt="Debtracks Logo Background"
              fill
              className="object-contain"
              priority
            />
          </motion.div>
        </motion.div>

        <div className="container-custom relative z-30 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="inline-block"
          >
            <motion.span 
              className="text-primary font-bold text-sm uppercase tracking-widest mb-4 block music-wave"
              whileHover={{ scale: 1.05 }}
            >
              <span className="inline-block mr-2 glitch-icon">♪</span>
              Music Creator
            </motion.span>
          </motion.div>
          
          <div className="relative w-full max-w-4xl mx-auto">
            {/* Left Guitar Strings */}
            <div className="strings-container left">
              {[...Array(3)].map((_, i) => (
                <div 
                  key={`left-${i}`}
                  className="guitar-string"
                  style={{ 
                    animationDelay: `${i * 0.2}s`,
                    height: `${200 - i * 30}px`
                  }}
                />
              ))}
            </div>

            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-6xl md:text-8xl font-bold font-display mb-6 bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 via-orange-400 to-red-500 hover:from-orange-400 hover:via-red-400 hover:to-yellow-400 transition-all duration-300 text-reveal inline-block"
            >
              Debtracks
            </motion.h1>

            {/* Right Guitar Strings */}
            <div className="strings-container right">
              {[...Array(3)].map((_, i) => (
                <div 
                  key={`right-${i}`}
                  className="guitar-string"
                  style={{ 
                    animationDelay: `${i * 0.2 + 0.3}s`,
                    height: `${200 - i * 30}px`
                  }}
                />
              ))}
            </div>
          </div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex justify-center"
          >
            <motion.a 
              href="https://instagram.com/debtracks" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="relative group gradient-border"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="absolute -inset-4 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full blur-lg opacity-75 group-hover:opacity-100 transition-opacity duration-300"></span>
              <span className="relative inline-block px-8 py-3 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full text-black font-bold shadow-lg transform transition-all duration-300">
                Follow on Instagram
              </span>
            </motion.a>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section ref={ref} className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-dark via-dark/95 to-dark pointer-events-none"></div>
        <div className="container-custom relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <motion.h2 
              className={`section-title text-center bg-gradient-to-r from-yellow-400 via-orange-400 to-orange-500 bg-clip-text text-transparent ${playfair.className} text-reveal`}
              whileHover={{ scale: 1.05 }}
            >
              About Debtracks
            </motion.h2>
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="space-y-8">
                <motion.p 
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className={`text-lg leading-relaxed ${playfair.className} text-yellow-100/90 hover:text-yellow-100 transition-colors duration-300 text-reveal`}
                >
                  Debtracks is an emerging music composer dedicated to crafting high-quality, emotionally resonant music experiences. As an entry-level creator, I blend human creativity with the power of AI-assisted tools to compose original tracks that connect with listeners on a deeper level.
                </motion.p>
                <motion.p 
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  className={`text-lg leading-relaxed ${playfair.className} text-yellow-100/90 hover:text-yellow-100 transition-colors duration-300 text-reveal`}
                >
                  Driven by a passion for innovation, I strive to explore new sonic landscapes and deliver compositions that stand out in today's evolving music industry. My work has been building meaningful bridges within the global music community.
                </motion.p>
                <div className="flex gap-4 pt-4">
                  {[
                    { 
                      icon: MusicalNoteIcon, 
                      text: "Original Music",
                      href: "/music" // This will link to your music page
                    }
                  ].map((item, index) => (
                    <Link href={item.href} key={index}>
                      <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={inView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.5, delay: 0.6 + (index * 0.1) }}
                        className="p-4 rounded-xl enhanced-glass hover-lift cursor-pointer"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <div className="flex flex-col items-center gap-4">
                          <div className="glitch-icon">
                            <item.icon className="w-8 h-8 text-yellow-400" />
                          </div>
                          <p className={`font-medium text-yellow-200 ${playfair.className}`}>{item.text}</p>
                        </div>
                      </motion.div>
                    </Link>
                  ))}
                </div>
              </div>
              <motion.div 
                className="relative aspect-square rounded-2xl overflow-hidden group gradient-border"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/20 to-orange-500/20 group-hover:opacity-40 transition-opacity duration-300" />
                <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-10 group-hover:opacity-20 transition-opacity duration-300" />
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 1 }}
                  className="relative w-full h-full p-8 group-hover:scale-110 transition-transform duration-700"
                >
                  <NextImage
                    src="/debdip-logo.png.jpg"
                    alt="Debtracks Logo"
                    fill
                    className="object-contain"
                    priority
                  />
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
} 