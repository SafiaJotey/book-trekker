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
    <div className="md:px-1 my-1 md:my-3  w-full p-3 md:w-1/4  ">
      <div className="shadow-md rounded-md md:p-1 bg-white">
        <Link to={`/books/${book?._id}`}>
          <div className="h-[350px] md:h-[270px] w-full p-2 md:p-0">
            {' '}
            <img
              src={`${import.meta.env.VITE_BASE_FOR_FILE}${
                book?.image?.filename
              }`}
              className="h-[350px] md:h-[270px] w-full"
            />
          </div>
        </Link>

        <div className="  p-2 md:p-1">
          {' '}
          <Link to={`/books/${book?._id}`}>
            <h6 className="text-base font-semibold  h-6 mb-5 ">{book.title}</h6>
          </Link>
          <p className=" font-semibold text-base h-6 ">{book?.author}</p>
          <div className="flex justify-between h-12">
            <i className="text-sm"> {book?.genre}</i>
            <i className="text-sm"> {book?.publication_date}</i>
          </div>
          <div className="flex justify-between ">
            <Review key={book?._id} book={book} />

            <div className="flex justify-end items-center text-base ">
              {wishlist?.data?.find(
                (list: IWishlist) => list?.book?._id === book?._id
              ) && (
                <BsFillHeartFill
                  onClick={handleRemoveFromWishList}
                  className="text-lg mx-1 text-red-600"
                ></BsFillHeartFill>
              )}
              {!wishlist?.data?.find(
                (list: IReadinglist) => list?.book?._id === book?._id
              ) && (
                <AiOutlineHeart
                  onClick={handleAddWishList}
                  className="text-xl mx-1 text-main"
                ></AiOutlineHeart>
              )}
              {readinglist?.data?.find(
                (list: IWishlist) => list?.book?._id === book?._id
              ) && (
                <MdBookmarkAdded
                  onClick={handleRemoveFromAddreadingList}
                  className="text-lg mx-1 text-green-600"
                ></MdBookmarkAdded>
              )}
              {!readinglist?.data?.find(
                (list: IReadinglist) => list?.book?._id === book?._id
              ) && (
                <BiBookAdd
                  onClick={handleAddreadingList}
                  className="text-xl mx-1 text-main"
                ></BiBookAdd>
              )}
              {completedlist?.data?.find(
                (list: ICompletelist) => list?.book?._id === book?._id
              ) && (
                <TiTick
                  onClick={handleRemoveFCompleted}
                  className="text-xl mx-1 text-review"
                ></TiTick>
              )}
              {!completedlist?.data?.find(
                (list: ICompletelist) => list?.book?._id === book?._id
              ) && (
                <TiTickOutline
                  onClick={handleCompleted}
                  className="text-xl mx-1 text-review"
                ></TiTickOutline>
              )}
            </div>
          </div>
          <a
            href={`${import.meta.env.VITE_BASE_FOR_FILE}${
              book?.bookPdf?.filename
            }`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <button className="flex justify-center items-center text-white bg-main p-1  my-1 w-full rounded-sm text-sm">
              <FaReadme className="mx-2 "></FaReadme> Start Reading
            </button>
          </a>
        </div>
      </div>
    </div>
  );
}
