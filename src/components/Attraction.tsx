import { RecentVarient } from '@/animates/home';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { BsSearchHeart } from 'react-icons/bs';
import { GiBookCover } from 'react-icons/gi';
import { HiUserGroup } from 'react-icons/hi';

const features = [
  {
    icon: BsSearchHeart,
    badge: 'Discovery',
    title: 'Deciding what to read next?',
    description:
      'Tell us what titles or genres you’ve loved in the past, and get personalized, insightful recommendations tailored to your taste.',
  },
  {
    icon: HiUserGroup,
    badge: 'Community',
    title: 'See what friends are reading',
    description:
      'Follow your reading circle, compare bookshelves, and join conversations about the latest trending bestsellers and hidden gems.',
  },
  {
    icon: GiBookCover,
    badge: 'Authors',
    title: 'Showcase your own book',
    description:
      'Are you an author? Present your work directly to an active community of passionate readers eager to discover new voices.',
  },
];

export default function Attraction() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <section className="py-16 md:py-24 px-5 sm:px-8">
      <div className="container mx-auto max-w-6xl">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 md:mb-16">
          <span className="text-xs md:text-sm font-semibold uppercase tracking-wider text-main/80 bg-main/10 px-3.5 py-1 rounded-full inline-block mb-3">
            Why Book Trekker
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-main tracking-tight">
            Everything you need for your reading journey
          </h2>
        </div>

        {/* Feature Cards Grid */}
        <motion.div
          ref={ref}
          variants={RecentVarient}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch"
        >
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="group relative bg-white/70 dark:bg-zinc-900/50 backdrop-blur-sm border border-black/5 dark:border-white/10 rounded-2xl p-7 lg:p-8 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-main/5 hover:border-main/30"
              >
                <div>
                  {/* Icon Badge */}
                  <div className="w-14 h-14 rounded-xl bg-main/10 flex items-center justify-center text-main text-2xl mb-6 transition-transform duration-300 group-hover:scale-110 group-hover:bg-main group-hover:text-white">
                    <Icon />
                  </div>

                  {/* Category Pill */}
                  <span className="text-xs font-medium text-main/70 uppercase tracking-widest block mb-2">
                    {feature.badge}
                  </span>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-main mb-3 leading-snug">
                    {feature.title}
                  </h3>

                  {/* Description */}
                  <p className="text-zinc-600 dark:text-zinc-400 text-sm md:text-base leading-relaxed">
                    {feature.description}
                  </p>
                </div>

                {/* Subtle bottom accent line on hover */}
                <div className="h-1 w-0 bg-main rounded-full mt-6 transition-all duration-300 group-hover:w-12" />
              </div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}