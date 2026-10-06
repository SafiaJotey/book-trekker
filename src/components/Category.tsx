import { ICategory } from '@/types/globalTypes';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import CategoryCrd from './ui/CategoryCrd';
import Header from './ui/Header';

export default function Category() {
  const ref = useRef(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  const categories: ICategory[] = [
    { image: 'https://i.ibb.co/rQdbJ8b/ezgif-com-webp-to-jpg-6.jpg', genra: 'Classic Literature' },
    { image: 'https://i.ibb.co/WWPY1bb/ezgif-com-webp-to-jpg-3.jpg', genra: 'Coming-of-age' },
    { image: 'https://i.ibb.co/3zd6XGj/ezgif-com-webp-to-jpg-4.jpg', genra: 'Dystopian' },
    { image: 'https://i.ibb.co/CVDNtDS/ezgif-com-webp-to-jpg-2.jpg', genra: 'Epic' },
    { image: 'https://i.ibb.co/yntRMXm/ezgif-com-webp-to-jpg-1.jpg', genra: 'Fantasy' },
    { image: 'https://i.ibb.co/yswDSVG/ezgif-com-webp-to-jpg-5.jpg', genra: 'Fiction' },
    { image: 'https://i.ibb.co/pWgL09h/ezgif-com-webp-to-jpg-7.jpg', genra: 'Gothic Literature' },
    { image: 'https://i.ibb.co/XyyTJxM/ezgif-com-webp-to-jpg-8.jpg', genra: 'Mystery' },
    { image: 'https://i.ibb.co/zNvdCZF/ezgif-com-webp-to-jpg-9.jpg', genra: 'Romance' },
    { image: 'https://i.ibb.co/z490J3m/ezgif-com-webp-to-jpg-10.jpg', genra: 'Sci-Fi & Thriller' },
    { image: 'https://i.ibb.co/xDZRTv6/ezgif-com-webp-to-jpg-11.jpg', genra: 'Adventure' },
  ];

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const offset = direction === 'left' ? -320 : 320;
      scrollRef.current.scrollBy({ left: offset, behavior: 'smooth' });
    }
  };

  return (
    <section className="py-12 md:py-20 px-4 sm:px-6 lg:px-8">
      <div ref={ref} className="container mx-auto max-w-7xl">
        
        {/* Header with Carousel Navigation Arrows */}
        <div className="flex items-end justify-between mb-8">
          <Header
            isInView={isInView}
            header="Explore Popular Genres"
            subHeader="Browse Collections"
          />

          <div className="flex items-center gap-2">
            <button
              onClick={() => scroll('left')}
              className="p-2.5 rounded-full border border-slate-200 dark:border-white/10 hover:bg-slate-100 dark:hover:bg-white/10 transition-colors cursor-pointer"
              aria-label="Scroll left"
            >
              <FiChevronLeft className="text-xl" />
            </button>
            <button
              onClick={() => scroll('right')}
              className="p-2.5 rounded-full border border-slate-200 dark:border-white/10 hover:bg-slate-100 dark:hover:bg-white/10 transition-colors cursor-pointer"
              aria-label="Scroll right"
            >
              <FiChevronRight className="text-xl" />
            </button>
          </div>
        </div>

        {/* Carousel Track Rendering CategoryCrd */}
        <div
          ref={scrollRef}
          className="flex gap-5 overflow-x-auto scrollbar-none scroll-smooth pb-4"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {categories.map((item, index) => (
            <CategoryCrd
              key={`${item.genra}-${index}`}
              item={item}
            />
          ))}
        </div>

      </div>
    </section>
  );
}