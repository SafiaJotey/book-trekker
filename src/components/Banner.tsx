import { motion } from 'framer-motion';
import {
  FollowingVarient,
  bannerVarient,
  startVarient,
} from '../animates/home.ts';
import banner_image from '../assets/images/banner_image.png';

export default function Banner() {
  return (
    <div className="relative overflow-hidden bg-main py-12 md:py-20 lg:py-24">
      {/* Ambient background glows for depth */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-subsidiary/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -top-10 -left-10 w-72 h-72 bg-white/5 rounded-full blur-2xl pointer-events-none" />

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <motion.div
          variants={bannerVarient}
          initial="hidden"
          animate="visible"
          className="flex flex-col-reverse md:flex-row items-center justify-between gap-10 lg:gap-16"
        >
          {/* Left Column: Text & Content */}
          <div className="w-full md:w-1/2 text-center md:text-left">
          

            {/* Main Headline */}
            <motion.div variants={FollowingVarient} className="space-y-4">
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.15]">
                A reader lives <br className="hidden sm:inline" />
                <span className="text-subsidiary drop-shadow-sm">
                  a thousand lives
                </span>{' '}
                before he dies.
              </h1>

              {/* Supporting Quote */}
              <p className="text-gray-300 text-base sm:text-lg md:text-xl font-light italic max-w-lg mx-auto md:mx-0">
                “The man who never reads lives  only one.”
                <span className="block text-xs sm:text-sm text-gray-400 not-italic mt-1.5 font-normal">
                  — George R.R. Martin
                </span>
              </p>
            </motion.div>

            {/* Interactive Call to Action buttons */}
            <motion.div
              variants={FollowingVarient}
              className="mt-8 flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4"
            >
              <button className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-subsidiary text-main font-bold shadow-lg shadow-subsidiary/20 hover:shadow-subsidiary/40 hover:-translate-y-0.5 active:translate-y-0 transition-all cursor-pointer">
                Explore Library
              </button>
              <button className="w-full sm:w-auto px-7 py-3.5 rounded-xl border border-white/20 text-white font-medium hover:bg-white/10 hover:border-white/40 transition-all cursor-pointer backdrop-blur-sm">
                Top Rated Books
              </button>
            </motion.div>

            {/* Quick Stats / Trust Indicators */}
            <motion.div
              variants={FollowingVarient}
              className="mt-10 pt-6 border-t border-white/10 flex justify-center md:justify-start items-center gap-8 text-white/80"
            >
              <div>
                <p className="text-xl md:text-2xl font-bold text-white">10k+</p>
                <p className="text-xs text-gray-400 font-light">Books</p>
              </div>
              <div className="h-8 w-px bg-white/10" />
              <div>
                <p className="text-xl md:text-2xl font-bold text-white">500+</p>
                <p className="text-xs text-gray-400 font-light">Authors</p>
              </div>
              <div className="h-8 w-px bg-white/10" />
              <div>
                <p className="text-xl md:text-2xl font-bold text-white">4.9 ★</p>
                <p className="text-xs text-gray-400 font-light">Community</p>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Hero Image with Floating Animation & Glow */}
          <div className="w-full md:w-1/2 flex justify-center relative">
            {/* Radial glow spotlight behind image */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 bg-subsidiary/25 rounded-full blur-3xl pointer-events-none" />

            {/* Smooth gentle floating motion */}
            <motion.div
              animate={{ y: [-10, 10, -10] }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="relative z-10 w-4/5 max-w-sm sm:max-w-md lg:max-w-lg"
            >
              <img
                src={banner_image}
                alt="Book Trekker Banner"
                className="w-full h-auto object-contain drop-shadow-[0_25px_35px_rgba(0,0,0,0.5)] transition-transform duration-500 hover:scale-[1.03]"
              />
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}