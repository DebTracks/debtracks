'use client';

import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { PlayIcon, PauseIcon } from '@heroicons/react/24/solid';

interface MusicPlayerProps {
  audioSrc: string;
}

export function MusicPlayer({ audioSrc }: MusicPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="relative">
      <audio ref={audioRef} src={audioSrc} loop />
      <motion.button
        onClick={togglePlay}
        className="p-2 rounded-full bg-gradient-to-r from-yellow-400/20 to-orange-500/20 backdrop-blur-sm border border-yellow-500/20 hover:border-yellow-500/40 transition-all duration-300"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        {isPlaying ? (
          <PauseIcon className="w-6 h-6 text-yellow-400" />
        ) : (
          <PlayIcon className="w-6 h-6 text-yellow-400" />
        )}
      </motion.button>
      {isPlaying && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-yellow-400 text-sm"
        >
          Now Playing
        </motion.div>
      )}
    </div>
  );
} 