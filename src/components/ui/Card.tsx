import { useGetUserQuery } from '@/redux/feature/user/userApi';
import { useAppSelector } from '@/redux/hooks';
import {
  ICompletelist,
  IGetBook,
  IReadinglist,
  IWishlist,
} from '@/types/globalTypes';
import { toast } from 'react-hot-toast';
import { AiOutlineHeart } from 'react-icons/ai';
import { BiBookAdd, BiCheck } from 'react-icons/bi';
import { BsFillHeartFill } from 'react-icons/bs';
import { FaReadme } from 'react-icons/fa';
import { MdBookmarkAdded } from 'react-icons/md';
import { TiTickOutline } from 'react-icons/ti';
import { Link } from 'react-router-dom';
import {
  useAddToCompletedListMutation,
  useAddToReadingListMutation,
  useAddToWishlistMutation,
  useGetCompleteListQuery,
  useGetReadinglistQuery,
  useGetWishlistQuery,
  useRemoveFromCompletedListMutation,
  useRemoveFromReadingListMutation,
  useRemoveFromWishlistMutation,
} from '../../redux/feature/books/bookApi';
import Review from '../Review';

export default function Card({ book }: { book: IGetBook }) {
  const { user } = useAppSelector((state) => state.user);

  // User details
  const { data: userData } = useGetUserQuery(user?.email, {
    skip: !user?.email,
  });
  const userId = userData?.data?._id;

  // Book lists (Skipped if not logged in to save network requests)
  const { data: wishlist } = useGetWishlistQuery(userId, {
    skip: !userId,
    refetchOnMountOrArgChange: true,
  });

  const { data: readinglist } = useGetReadinglistQuery(userId, {
    skip: !userId,
    refetchOnMountOrArgChange: true,
  });

  const { data: completedlist } = useGetCompleteListQuery(userId, {
    skip: !userId,
    refetchOnMountOrArgChange: true,
  });

  // Mutations
  const [removeFromWishlist] = useRemoveFromWishlistMutation();
  const [addToWishlist] = useAddToWishlistMutation();
  const [removeFromReadingList] = useRemoveFromReadingListMutation();
  const [addToReadingList] = useAddToReadingListMutation();
  const [removeFromCompletedList] = useRemoveFromCompletedListMutation();
  const [addToCompletedList] = useAddToCompletedListMutation();

  // Find corresponding list entries directly (O(n) once, instead of multiple some + forEach)
  const wishlistItem = wishlist?.data?.find(
    (item: IWishlist) => item?.book?._id === book?._id
  );
  const readingItem = readinglist?.data?.find(
    (item: IReadinglist) => item?.book?._id === book?._id
  );
  const completedItem = completedlist?.data?.find(
    (item: ICompletelist) => item?.book?._id === book?._id
  );

  const isWishlisted = Boolean(wishlistItem);
  const isReading = Boolean(readingItem);
  const isCompleted = Boolean(completedItem);

  // --- Handlers ---
  const handleToggleWishlist = () => {
    if (!user?.email || !userId) {
      toast.error('Please login first');
      return;
    }

    if (isWishlisted) {
      removeFromWishlist(wishlistItem._id);
      toast.success('Removed from wishlist');
    } else {
      addToWishlist({ userId, bookId: book?._id });
      if (readingItem) removeFromReadingList(readingItem._id);
      if (completedItem) removeFromCompletedList(completedItem._id);
      toast.success('Added to wishlist');
    }
  };

  const handleToggleReadingList = () => {
    if (!user?.email || !userId) {
      toast.error('Please login first');
      return;
    }

    if (isReading) {
      removeFromReadingList(readingItem._id);
      toast.success('Removed from reading list');
    } else {
      addToReadingList({ userId, bookId: book?._id });
      if (wishlistItem) removeFromWishlist(wishlistItem._id);
      if (completedItem) removeFromCompletedList(completedItem._id);
      toast.success('Added to reading list');
    }
  };

  const handleToggleCompleted = () => {
    if (!user?.email || !userId) {
      toast.error('Please login first');
      return;
    }

    if (isCompleted) {
      removeFromCompletedList(completedItem._id);
      toast.success('Removed from completed list');
    } else {
      addToCompletedList({ userId, bookId: book?._id });
      if (wishlistItem) removeFromWishlist(wishlistItem._id);
      if (readingItem) removeFromReadingList(readingItem._id);
      toast.success('Marked as completed!');
    }
  };

  const coverImageUrl = book?.image?.filename
    ? `${import.meta.env.VITE_BASE_FOR_FILE}${book.image.filename}`
    : 'https://placehold.co/400x600?text=No+Cover';

  const pdfUrl = book?.bookPdf?.filename
    ? `${import.meta.env.VITE_BASE_FOR_FILE}${book.bookPdf.filename}`
    : null;

  return (
    <div className="group flex flex-col justify-between h-full bg-white rounded-2xl border border-slate-200/80 hover:border-slate-300 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden">
      
      {/* Top Cover Image Area */}
      <div className="relative aspect-[3/4] w-full overflow-hidden bg-slate-100">
        <Link to={`/books/${book?._id}`} className="block w-full h-full">
          <img
            src={coverImageUrl}
            alt={book?.title || 'Book cover'}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          {/* Subtle gradient vignette on hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </Link>

        {/* Genre Pill Tag */}
        {book?.genre && (
          <span className="absolute top-3 left-3 bg-white/95 backdrop-blur-md text-slate-800 text-[11px] font-semibold px-2.5 py-1 rounded-full shadow-sm tracking-wide">
            {book.genre}
          </span>
        )}

        {/* Floating Wishlist Button */}
        <button
          type="button"
          aria-label={isWishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'}
          onClick={handleToggleWishlist}
          className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md shadow-md transition-all duration-200 active:scale-90 ${
            isWishlisted
              ? 'bg-rose-500 text-white hover:bg-rose-600'
              : 'bg-white/90 text-slate-600 hover:text-rose-500 hover:bg-white'
          }`}
        >
          {isWishlisted ? (
            <BsFillHeartFill className="text-sm" />
          ) : (
            <AiOutlineHeart className="text-base" />
          )}
        </button>
      </div>

      {/* Card Body */}
      <div className="p-4 flex flex-col flex-grow justify-between gap-3">
        <div>
          {/* Title */}
          <Link to={`/books/${book?._id}`}>
            <h3
              title={book?.title}
              className="text-base font-bold text-slate-800 hover:text-main line-clamp-1 transition-colors leading-snug"
            >
              {book?.title}
            </h3>
          </Link>

          {/* Author */}
          <p
            title={book?.author}
            className="text-xs font-medium text-slate-500 line-clamp-1 mt-1"
          >
            by <span className="text-slate-700">{book?.author || 'Unknown'}</span>
          </p>

          {/* Meta details */}
          <div className="flex items-center justify-between text-[11px] text-slate-400 mt-2.5 pb-2.5 border-b border-slate-100">
            <span>Published</span>
            <span className="font-semibold text-slate-600">
              {book?.publication_date || 'N/A'}
            </span>
          </div>
        </div>

        {/* Middle Toolbar: Rating & Status Buttons */}
        <div className="flex items-center justify-between gap-2">
          <div className="flex-shrink-0">
            <Review key={book?._id} book={book} />
          </div>

          <div className="flex items-center gap-1.5">
            {/* Reading List Toggle */}
            <button
              type="button"
              title={isReading ? 'In your Reading List' : 'Add to Reading List'}
              onClick={handleToggleReadingList}
              className={`p-2 rounded-xl text-sm transition-all active:scale-95 ${
                isReading
                  ? 'bg-emerald-500 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-600 hover:bg-emerald-50 hover:text-emerald-600'
              }`}
            >
              {isReading ? <MdBookmarkAdded className="text-base" /> : <BiBookAdd className="text-base" />}
            </button>

            {/* Completed Toggle */}
            <button
              type="button"
              title={isCompleted ? 'Marked as Completed' : 'Mark as Completed'}
              onClick={handleToggleCompleted}
              className={`p-2 rounded-xl text-sm transition-all active:scale-95 ${
                isCompleted
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-600 hover:bg-blue-50 hover:text-blue-600'
              }`}
            >
              {isCompleted ? <BiCheck className="text-base stroke-1" /> : <TiTickOutline className="text-base" />}
            </button>
          </div>
        </div>

        {/* Action Button: Start Reading PDF */}
        {pdfUrl ? (
          <a
            href={pdfUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full mt-1 block"
          >
            <button
              type="button"
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-main text-white font-medium text-xs tracking-wide shadow-sm hover:shadow-md hover:brightness-105 active:scale-[0.98] transition-all cursor-pointer"
            >
              <FaReadme className="text-sm" />
              <span>Start Reading</span>
            </button>
          </a>
        ) : (
          <button
            type="button"
            disabled
            className="w-full mt-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-slate-100 text-slate-400 font-medium text-xs cursor-not-allowed"
          >
            <span>No PDF Available</span>
          </button>
        )}
      </div>
    </div>
  );
}