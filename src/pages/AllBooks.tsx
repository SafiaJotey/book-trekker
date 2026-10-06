import AdditionalPageCover from '@/components/ui/AdditionalPageCover';
import { RecentVarient, bannerVarient } from '@/animates/home';
import Header from '@/components/ui/Header';
import MiniCards from '@/components/ui/MiniCards';
import Card from '../components/ui/Card';
import {
  useGetBooksQuery,
  useRecentBookQuery,
} from '@/redux/feature/books/bookApi';
import {
  updateGenreSelectedValue,
  updateSearchTerm,
} from '@/redux/feature/books/books.slice';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { IGetBook } from '@/types/globalTypes';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { ChangeEvent, useMemo, useRef } from 'react';
import { BiSearchAlt2, BiPlus, BiBookOpen, BiFilterAlt } from 'react-icons/bi';
import { FaFacebookF, FaLinkedinIn, FaTwitter } from 'react-icons/fa';
import { FiInstagram } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const GENRE_OPTIONS = [
  'Fantasy',
  'Fiction',
  'Dystopian',
  'Classic Literature',
  'Adventure',
  'Coming-of-age',
  'Epic',
  'Gothic Literature',
  'Mystery',
  'Romance',
];

export default function AllBooks() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const dispatch = useAppDispatch();

  const { data, isLoading } = useGetBooksQuery(undefined, {
    refetchOnMountOrArgChange: true,
    pollingInterval: 30000,
  });

  const { data: recentBook } = useRecentBookQuery(undefined, {
    refetchOnMountOrArgChange: true,
    pollingInterval: 30000,
  });

  const selectedGenreValue = useAppSelector((state) => state.book.genre);
  const selectedPublishYearValue = useAppSelector(
    (state) => state.book.publishYear
  );
  const searchTerm = useAppSelector((state) => state.book.searchTerm);

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(updateSearchTerm(e.target.value));
  };

  // Clean, single-pass filtering using useMemo
  const filteredData = useMemo(() => {
    if (!data?.data) return [];

    const search = searchTerm.trim().toLowerCase();
    const genre = selectedGenreValue.trim().toLowerCase();
    const year = selectedPublishYearValue.trim();

    return data.data.filter((item: IGetBook) => {
      const matchesSearch =
        !search ||
        item.title?.toLowerCase().includes(search) ||
        item.author?.toLowerCase().includes(search) ||
        item.genre?.toLowerCase().includes(search);

      const matchesGenre = !genre || item.genre?.toLowerCase() === genre;

      const matchesYear =
        !year ||
        Boolean(item.publication_date && item.publication_date.includes(year));

      return matchesSearch && matchesGenre && matchesYear;
    });
  }, [data?.data, searchTerm, selectedGenreValue, selectedPublishYearValue]);

  const hasActiveFilters =
    Boolean(searchTerm) || Boolean(selectedGenreValue) || Boolean(selectedPublishYearValue);

  return (
    <motion.div ref={ref} className="min-h-screen bg-slate-50/50 pb-16">
      {/* Hero Quote Header */}
      <AdditionalPageCover
        isInView={isInView}
        title="Books were safer than other people anyway."
        author="Neil Gaiman, The Ocean at the End of the Lane"
      />

      <div className="container mx-auto px-4 md:px-8 lg:px-16 pt-8">
        {/* Section Top Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4 border-b border-slate-200/60 pb-6">
          <Header
            isInView={isInView}
            header="Explore All The Books"
            subHeader="Curated Collection"
          />

          <Link
            to="/addBook"
            className="inline-flex items-center gap-2 bg-main text-white px-6 py-2.5 rounded-full font-medium shadow-md shadow-main/20 hover:shadow-lg hover:brightness-105 active:scale-95 transition-all text-sm tracking-wide"
          >
            <BiPlus className="text-lg" />
            Add New Book
          </Link>
        </div>

        {/* Main Content Layout */}
        <div className="flex flex-col-reverse lg:flex-row gap-8 items-start">
          {/* Books Grid */}
          <div className="w-full lg:w-3/4">
            {isLoading ? (
              <div className="flex justify-center items-center py-24 text-slate-400">
                <span className="loading-spinner">Loading books...</span>
              </div>
            ) : filteredData.length > 0 ? (
              <motion.div
                variants={bannerVarient}
                initial="hidden"
                animate={isInView ? 'visible' : 'hidden'}
                className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6"
              >
                {filteredData.map((book: IGetBook) => (
                  <Card key={book._id} book={book} />
                ))}
              </motion.div>
            ) : (
              /* Polished Empty State */
              <div className="flex flex-col items-center justify-center p-12 text-center bg-white rounded-2xl border border-dashed border-slate-200 my-8 shadow-sm">
                <div className="p-4 bg-slate-100 rounded-full text-slate-400 mb-3 text-3xl">
                  <BiBookOpen />
                </div>
                <h4 className="text-lg font-semibold text-slate-700">No books found</h4>
                <p className="text-slate-500 text-sm max-w-sm mt-1">
                  We couldn't find any books matching your query. Try searching for something else or clearing filters.
                </p>
                {hasActiveFilters && (
                  <button
                    onClick={() => {
                      dispatch(updateSearchTerm(''));
                      dispatch(updateGenreSelectedValue(''));
                    }}
                    className="mt-4 text-xs font-semibold uppercase tracking-wider text-main hover:underline"
                  >
                    Reset all filters
                  </button>
                )}
              </div>
            )}
          </div>

          {/* Sidebar / Filters */}
          <aside className="w-full lg:w-1/4 lg:sticky lg:top-6">
            <motion.div
              variants={RecentVarient}
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
              className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm space-y-6"
            >
              {/* Search Bar */}
              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2 block">
                  Search
                </label>
                <div className="relative flex items-center">
                  <input
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-main/20 focus:border-main transition-all"
                    placeholder="Title, author, or genre..."
                    type="text"
                    value={searchTerm}
                    onChange={handleSearch}
                  />
                  <BiSearchAlt2 className="absolute left-3.5 text-slate-400 text-lg pointer-events-none" />
                </div>
              </div>

              {/* Genre Filter */}
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <BiFilterAlt className="text-main" />
                  <label className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Category Filter
                  </label>
                </div>
                <select
                  name="genre"
                  className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-700 focus:bg-white focus:outline-none focus:ring-2 focus:ring-main/20 focus:border-main transition-all cursor-pointer"
                  value={selectedGenreValue}
                  onChange={(e) =>
                    dispatch(updateGenreSelectedValue(e.target.value))
                  }
                >
                  <option value="">All Genres</option>
                  {GENRE_OPTIONS.map((genre) => (
                    <option key={genre} value={genre}>
                      {genre}
                    </option>
                  ))}
                </select>
              </div>

              {/* Recently Added Books */}
              {recentBook?.data && recentBook.data.length > 0 && (
                <div>
                  <div className="flex items-center justify-between pb-2 mb-3 border-b border-slate-100">
                    <h3 className="text-sm font-bold text-slate-800">
                      Recently Added
                    </h3>
                    <span className="text-[11px] font-medium text-slate-400 uppercase tracking-wide">
                      Latest
                    </span>
                  </div>
                  <div className="flex flex-col gap-3">
                    {recentBook.data.slice(0, 3).map((book: IGetBook) => (
                      <MiniCards key={book._id} book={book} />
                    ))}
                  </div>
                </div>
              )}

              {/* Social Follow */}
              <div>
                <div className="pb-2 mb-3 border-b border-slate-100">
                  <h3 className="text-sm font-bold text-slate-800 text-center">
                    Follow Us
                  </h3>
                </div>
                <div className="flex justify-center items-center gap-3">
                  {[
                    { icon: FaFacebookF, href: '#' },
                    { icon: FaTwitter, href: '#' },
                    { icon: FaLinkedinIn, href: '#' },
                    { icon: FiInstagram, href: '#' },
                  ].map(({ icon: Icon, href }, idx) => (
                    <a
                      key={idx}
                      href={href}
                      className="p-2.5 rounded-full bg-slate-50 border border-slate-200/60 text-slate-600 hover:text-white hover:bg-main hover:border-main shadow-xs transition-all duration-200 hover:-translate-y-0.5"
                    >
                      <Icon className="text-sm" />
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>
          </aside>
        </div>
      </div>
    </motion.div>
  );
}