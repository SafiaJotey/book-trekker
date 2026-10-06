import { RecentVarient } from '@/animates/home';
import { useRecentBookQuery } from '@/redux/feature/books/bookApi';
import { IGetBook } from '@/types/globalTypes';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Link } from 'react-router-dom';
import Card from './ui/Card';
import Header from './ui/Header';

export default function RecentlyAdded() {
  const { data, isLoading } = useRecentBookQuery(undefined);
  
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });

  const books: IGetBook[] = Array.isArray(data?.data)
    ? data.data
    : Array.isArray(data)
    ? data
    : [];

  return (
    <section className="py-12 md:py-20 overflow-hidden bg-slate-50/40">
      <motion.div
        ref={ref}
        className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl"
      >
        {/* Section Header & Call to Action */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 md:mb-12">
          <Header
            isInView={isInView}
            header="Explore Recently Added Books"
            subHeader="Recently Added"
          />

          <Link
            to="/allBooks"
            className="group self-start sm:self-auto inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-main text-white text-xs sm:text-sm font-semibold shadow-sm hover:shadow-md hover:brightness-105 active:scale-95 transition-all"
          >
            <span>Explore All Books</span>
            <span className="transition-transform duration-200 group-hover:translate-x-1">
              →
            </span>
          </Link>
        </div>

        {/* Books Cards Grid / Skeletons */}
        <motion.div
          variants={RecentVarient}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          /* 
            FIX: Changed from flex to responsive CSS Grid with 'gap-6'.
            This gives 24px spacing and limits columns so cards are never squished.
          */
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4  gap-6 w-full"
        >
          {isLoading ? (
            // Shimmer Loading Skeletons
            Array.from({ length: 5 }).map((_, index) => (
              <div
                key={index}
                className="w-full h-full bg-white rounded-2xl border border-slate-100 p-4 shadow-sm animate-pulse flex flex-col gap-3"
              >
                <div className="aspect-[3/4] w-full bg-slate-200 rounded-xl" />
                <div className="h-4 bg-slate-200 rounded w-3/4 mt-2" />
                <div className="h-3 bg-slate-100 rounded w-1/2" />
                <div className="h-9 bg-slate-100 rounded-xl mt-auto" />
              </div>
            ))
          ) : books.length > 0 ? (
            // Render Books (limits to 5 or 6 cleanly spaced cards)
            books.slice(0, 10).map((book: IGetBook) => (
              <Card key={book._id} book={book} />
            ))
          ) : (
            // Empty State
            <div className="col-span-full py-16 text-center text-slate-500 bg-white rounded-2xl border border-dashed border-slate-200">
              <p className="text-base font-medium">No recently added books found.</p>
            </div>
          )}
        </motion.div>
      </motion.div>
    </section>
  );
}