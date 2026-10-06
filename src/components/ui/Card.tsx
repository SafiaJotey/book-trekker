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
import { BiBookAdd } from 'react-icons/bi';
import { BsFillHeartFill } from 'react-icons/bs';
import { FaReadme } from 'react-icons/fa';
import { MdBookmarkAdded } from 'react-icons/md';
import { TiTick, TiTickOutline } from 'react-icons/ti';
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

  const { data } = useGetUserQuery(user?.email);

  const { data: wishlist } = useGetWishlistQuery(data?.data?._id, {
    refetchOnMountOrArgChange: true,
    pollingInterval: 30000,
  });

  const { data: readinglist } = useGetReadinglistQuery(data?.data?._id, {
    refetchOnMountOrArgChange: true,
    pollingInterval: 30000,
  });

  const [removeFromWishlist] = useRemoveFromWishlistMutation();
  const [addToWishlist] = useAddToWishlistMutation();
  const [removeFromReadingList] = useRemoveFromReadingListMutation();
  const [addToReadingList] = useAddToReadingListMutation();

  const { data: completedlist } = useGetCompleteListQuery(data?.data?._id, {
    refetchOnMountOrArgChange: true,
    pollingInterval: 30000,
  });

  const [removeFromCompletedList] = useRemoveFromCompletedListMutation();
  const [addToCompletedList] = useAddToCompletedListMutation();

  // Helper flags for status checks
  const isWishlisted = wishlist?.data?.some(
    (list: IWishlist) => list?.book?._id === book?._id
  );
  const isReading = readinglist?.data?.some(
    (list: IReadinglist) => list?.book?._id === book?._id
  );
  const isCompleted = completedlist?.data?.some(
    (list: ICompletelist) => list?.book?._id === book?._id
  );

  const handleAddreadingList = () => {
    if (user.email) {
      const options = { userId: data?.data?._id, bookId: book?._id };
      addToReadingList(options);
      handleRemoveFromWishList();
      toast.success('Added To Readinglist.');
    } else {
      toast.error('Please Login First');
    }
  };

  const handleRemoveFromAddreadingList = () => {
    readinglist?.data?.forEach((list: IReadinglist) => {
      if (list?.book?._id === book?._id) {
        removeFromReadingList(list?._id);
        handleRemoveFCompleted();
        toast.error('Removed From readinglist');
      }
    });
  };

  const handleAddWishList = () => {
    if (user.email) {
      const options = { userId: data?.data?._id, bookId: book?._id };
      addToWishlist(options);
      handleRemoveFromAddreadingList();
      handleRemoveFCompleted();
      toast.success('Added To Wishlist.');
    } else {
      toast.error('Please Login First');
    }
  };

  const handleRemoveFromWishList = () => {
    wishlist?.data?.forEach((list: IWishlist) => {
      if (list?.book?._id === book?._id) {
        removeFromWishlist(list?._id);
        toast.error('Removed From Wishlist');
      }
    });
  };

  const handleCompleted = () => {
    if (user.email) {
      const options = { userId: data?.data?._id, bookId: book?._id };
      addToCompletedList(options);
      handleRemoveFromAddreadingList();
      handleRemoveFromWishList();
      toast.success('Completed.');
    } else {
      toast.error('Please Login First');
    }
  };

  const handleRemoveFCompleted = () => {
    completedlist?.data?.forEach((list: ICompletelist) => {
      if (list?.book?._id === book?._id) {
        removeFromCompletedList(list?._id);
        toast.error('Removed From CompletedList');
      }
    });
  };

  return (
    <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-2.5">
      <div className="group flex flex-col justify-between h-full bg-white rounded-2xl border border-slate-100 hover:border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden">
        
        {/* Book Cover Image with Zoom Effect */}
        <Link to={`/books/${book?._id}`} className="relative block overflow-hidden bg-slate-50 aspect-[3/4]">
          <img
            src={`${import.meta.env.VITE_BASE_FOR_FILE}${book?.image?.filename}`}
            alt={book?.title || 'Book cover'}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          {/* Subtle overlay gradient on hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          {/* Genre Tag on image */}
          {book?.genre && (
            <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm text-slate-800 text-[11px] font-semibold px-2.5 py-1 rounded-full shadow-sm">
              {book?.genre}
            </span>
          )}
        </Link>

        {/* Card Content */}
        <div className="p-4 flex flex-col flex-grow justify-between gap-3">
          <div>
            {/* Title */}
            <Link to={`/books/${book?._id}`}>
              <h3 
                title={book?.title}
                className="text-base font-bold text-slate-800 hover:text-main line-clamp-1 transition-colors"
              >
                {book?.title}
              </h3>
            </Link>

            {/* Author */}
            <p 
              title={book?.author}
              className="text-xs font-medium text-slate-500 line-clamp-1 mt-0.5"
            >
              by {book?.author}
            </p>

            {/* Metadata (Publication Date) */}
            <div className="flex items-center justify-between text-[11px] text-slate-400 mt-2 pb-2 border-b border-slate-100">
              <span>Published</span>
              <span className="font-medium text-slate-600">{book?.publication_date || 'N/A'}</span>
            </div>
          </div>

          {/* Action Row: Review & Interactive Action Buttons */}
          <div className="flex items-center justify-between pt-1">
            <div className="flex-shrink-0">
              <Review key={book?._id} book={book} />
            </div>

            {/* Action Buttons Toolbar */}
            <div className="flex items-center gap-1.5">
              {/* Wishlist Button */}
              {isWishlisted ? (
                <button
                  type="button"
                  title="Remove from Wishlist"
                  onClick={handleRemoveFromWishList}
                  className="p-1.5 rounded-lg bg-red-50 text-red-500 hover:bg-red-100 transition-colors"
                >
                  <BsFillHeartFill className="text-base" />
                </button>
              ) : (
                <button
                  type="button"
                  title="Add to Wishlist"
                  onClick={handleAddWishList}
                  className="p-1.5 rounded-lg bg-slate-50 text-slate-600 hover:text-main hover:bg-slate-100 transition-colors"
                >
                  <AiOutlineHeart className="text-base" />
                </button>
              )}

              {/* Reading List Button */}
              {isReading ? (
                <button
                  type="button"
                  title="Remove from Reading List"
                  onClick={handleRemoveFromAddreadingList}
                  className="p-1.5 rounded-lg bg-emerald-50 text-emerald-600 hover:bg-emerald-100 transition-colors"
                >
                  <MdBookmarkAdded className="text-base" />
                </button>
              ) : (
                <button
                  type="button"
                  title="Add to Reading List"
                  onClick={handleAddreadingList}
                  className="p-1.5 rounded-lg bg-slate-50 text-slate-600 hover:text-main hover:bg-slate-100 transition-colors"
                >
                  <BiBookAdd className="text-base" />
                </button>
              )}

              {/* Completed Button */}
              {isCompleted ? (
                <button
                  type="button"
                  title="Mark as Incomplete"
                  onClick={handleRemoveFCompleted}
                  className="p-1.5 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors"
                >
                  <TiTick className="text-base" />
                </button>
              ) : (
                <button
                  type="button"
                  title="Mark as Completed"
                  onClick={handleCompleted}
                  className="p-1.5 rounded-lg bg-slate-50 text-slate-600 hover:text-blue-500 hover:bg-slate-100 transition-colors"
                >
                  <TiTickOutline className="text-base" />
                </button>
              )}
            </div>
          </div>

          {/* CTA: Start Reading PDF Button */}
          <a
            href={`${import.meta.env.VITE_BASE_FOR_FILE}${book?.bookPdf?.filename}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full mt-1 block"
          >
            <button 
              type="button"
              className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-main text-white font-medium text-xs tracking-wide shadow-sm hover:opacity-90 hover:shadow active:scale-[0.98] transition-all cursor-pointer"
            >
              <FaReadme className="text-sm" />
              <span>Start Reading</span>
            </button>
          </a>
        </div>
      </div>
    </div>
  );
}