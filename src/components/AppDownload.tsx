import { RecentVarient, bannerVarient } from '@/animates/home';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import aStore from '../assets/images/aStore.webp';
import appImage from '../assets/images/app.png';
import gPlay from '../assets/images/gPlay.webp';

export default function AppDownload() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });

  const featureBadges = [
    'Free Download',
    'All Genres',
    'Bestsellers',
    'Full Catalog',
  ];

  return (
    <section className="py-12 md:py-20 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-7xl">
        <motion.div
          ref={ref}
          className="relative overflow-hidden bg-main rounded-3xl shadow-2xl p-8 sm:p-12 lg:p-16 border border-white/10"
        >
          {/* Ambient Lighting Orbs for Depth */}
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-subsidiary/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-white/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-10 lg:gap-16">
            
            {/* Left: Mobile App Mockup */}
            <motion.div
              variants={bannerVarient}
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
              className="w-full md:w-1/2 flex justify-center items-center"
            >
              <img
                src={appImage}
                alt="Book Trekker Mobile App Mockup"
                className="w-full max-w-[260px] sm:max-w-[320px] md:max-w-[380px] lg:max-w-[420px] object-contain drop-shadow-[0_25px_35px_rgba(0,0,0,0.5)] transition-transform duration-500 hover:scale-[1.03]"
              />
            </motion.div>

            {/* Right: Copy & Store Downloads */}
            <motion.div
              variants={RecentVarient}
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
              className="w-full md:w-1/2 text-center md:text-left flex flex-col items-center md:items-start"
            >
              {/* Badge Pill */}
              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 text-subsidiary text-xs sm:text-sm font-semibold tracking-wide uppercase mb-4 backdrop-blur-sm">
                📱 Take Your Library Anywhere
              </span>

              {/* Title & Headline */}
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
                Book Trekker
              </h2>
              <p className="text-base sm:text-lg text-white/90 font-medium mt-2 max-w-lg">
                Introducing your e-reader mobile app. Experience seamless reading, tailored recommendations, and offline access right from your pocket.
              </p>

              {/* Feature Chips */}
              <div className="flex flex-wrap justify-center md:justify-start gap-2 my-5">
                {featureBadges.map((badge, idx) => (
                  <span
                    key={idx}
                    className="text-[11px] sm:text-xs font-semibold px-3 py-1 rounded-full bg-white/10 text-white/90 border border-white/10 backdrop-blur-sm"
                  >
                    ✓ {badge}
                  </span>
                ))}
              </div>

              {/* App Store Links */}
              <div className="mt-3 w-full">
                <span className="text-xs font-bold uppercase tracking-widest text-white/70 block mb-3 text-center md:text-left">
                  Now Available On
                </span>
                <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 sm:gap-4">
                  <a
                    href="#app-store"
                    aria-label="Download Book Trekker on Apple App Store"
                    className="transition-all duration-200 hover:-translate-y-1 hover:opacity-95 active:scale-95 inline-block"
                  >
                    <img
                      src={aStore}
                      alt="Download on the App Store"
                      className="h-10 sm:h-11 w-auto object-contain drop-shadow-md"
                    />
                  </a>
                  <a
                    href="#google-play"
                    aria-label="Download Book Trekker on Google Play"
                    className="transition-all duration-200 hover:-translate-y-1 hover:opacity-95 active:scale-95 inline-block"
                  >
                    <img
                      src={gPlay}
                      alt="Get it on Google Play"
                      className="h-10 sm:h-11 w-auto object-contain drop-shadow-md"
                    />
                  </a>
                </div>
              </div>
            </motion.div>

          </div>
        </motion.div>
      </div>
    </section>
  );
}