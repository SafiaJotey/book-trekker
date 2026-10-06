import { headerSubtitle } from '@/animates/header';
import { RecentVarient } from '@/animates/home';
import { motion } from 'framer-motion';
import { FaQuoteLeft } from 'react-icons/fa';
import { HiSparkles } from 'react-icons/hi2';
import allBooksCover_image from '../../assets/images/allBooksCover_image.png';

interface AdditionalPageCoverProps {
  isInView: boolean;
  title: string;
  author: string;
}

export default function AdditionalPageCover({
  isInView,
  title,
  author,
}: AdditionalPageCoverProps) {
  return (
    <div className="relative w-full bg-slate-950 overflow-hidden bg-hero-pattern bg-cover bg-center">
      {/* 1. Atmospheric Ambient Lighting / Gradients */}
      <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-900/85 to-slate-950/90 backdrop-blur-[3px] pointer-events-none" />
      
      {/* Ambient radial glow orbs */}
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-main/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 right-10 -translate-y-1/2 w-80 h-80 bg-subsidiary/15 rounded-full blur-3xl pointer-events-none" />

      {/* 2. Main Banner Content */}
      <div className="relative z-10 container mx-auto px-6 md:px-12 lg:px-16 py-12 md:py-16 lg:py-20 max-w-7xl">
        <div className="flex flex-col-reverse md:flex-row justify-between items-center gap-10 md:gap-14">
          
          {/* Left Column: Literary Quote */}
          <motion.div
            variants={headerSubtitle}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            className="w-full md:w-7/12 text-center md:text-left space-y-4 relative"
          >
            {/* Curated Pill Tag */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 border border-white/15 backdrop-blur-md text-[11px] font-semibold uppercase tracking-wider text-slate-200">
              <HiSparkles className="text-amber-400 text-xs" />
              <span>Words of Wisdom</span>
            </div>

            {/* Decorative watermark quotation icon */}
            <div className="relative">
              <FaQuoteLeft className="absolute -top-5 -left-6 text-white/5 text-6xl pointer-events-none select-none hidden md:block" />
              
              <blockquote className="relative z-10 text-2xl sm:text-3xl lg:text-4xl font-serif italic text-slate-100 font-normal leading-snug tracking-tight">
                “{title}”
              </blockquote>
            </div>

            {/* Author Credit */}
            <div className="flex items-center justify-center md:justify-start gap-3 pt-1">
              <div className="h-px w-8 bg-amber-400/60 hidden sm:block" />
              <p className="text-slate-300 font-sans text-xs sm:text-sm font-medium tracking-widest uppercase">
                {author}
              </p>
            </div>
          </motion.div>

          {/* Right Column: Hero Illustration & Spotlight */}
          <div className="w-full md:w-5/12 flex justify-center md:justify-end relative">
            {/* Spotlight directly behind the book artwork */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 md:w-72 md:h-72 bg-main/30 rounded-full blur-2xl pointer-events-none" />

            {/* Floating Artwork Container */}
            <motion.div
              variants={RecentVarient}
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
              className="relative z-10"
            >
              <motion.img
                animate={{ y: [-6, 6, -6] }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                src={allBooksCover_image}
                alt="Book Collection Cover"
                loading="eager"
                fetchPriority="high"
                className="max-h-52 sm:max-h-64 md:max-h-72 lg:max-h-80 object-contain drop-shadow-[0_20px_35px_rgba(0,0,0,0.6)]"
              />
            </motion.div>
          </div>

        </div>
      </div>

      {/* 3. Sleek Hairline Gradient Border at the Bottom */}
      <div className="relative z-10 h-px w-full bg-gradient-to-r from-transparent via-white/15 to-transparent" />
    </div>
  );
}