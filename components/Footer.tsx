'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import NextImage from 'next/image';
import { SocialIcon } from 'react-social-icons';

export function Footer() {
  return (
    <footer className="bg-dark/50 backdrop-blur-md border-t border-yellow-400/10">
      <div className="container-custom py-12">
        {/* Logo and Social Links */}
        <div className="max-w-2xl mx-auto text-center space-y-6">
          <Link href="/" className="inline-block">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative w-16 h-16 mx-auto"
            >
              <NextImage
                src="/logo.svg"
                alt="Debtracks Logo"
                fill
                className="object-contain"
                priority
              />
            </motion.div>
          </Link>
          <div className="flex justify-center space-x-4">
            {[
              'https://instagram.com/debtracks',
              'https://twitter.com/debtracks',
              'https://youtube.com/debtracks',
              'https://soundcloud.com/debtracks'
            ].map((url) => (
              <motion.div
                key={url}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <SocialIcon
                  url={url}
                  className="hover:opacity-80 transition-opacity"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ height: 35, width: 35 }}
                />
              </motion.div>
            ))}
          </div>
        </div>

        {/* Copyright and Description */}
        <div className="mt-12 pt-8 border-t border-yellow-400/10 text-center">
          <p className="text-xl text-light/80 mb-4">
            Creating unforgettable musical experiences and connecting with top creators worldwide.
          </p>
          <p className="text-light/40">
            &copy; {new Date().getFullYear()} Debtracks. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
} 