import { useGetUserQuery } from '@/redux/feature/user/userApi';
import { useAppSelector } from '@/redux/hooks';
import {
  IBook,
  ICompletelist,
  IReadinglist,
  IWishlist,
} from '@/types/globalTypes';
import { toast } from 'react-hot-toast';
import { AiOutlineHeart } from 'react-icons/ai';
import { BiBookAdd } from 'react-icons/bi';
import { BsFillHeartFill } from 'react-icons/bs';
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

export default function Card({ book }: { book: IBook }) {
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
      console.log(options);

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
    <div className="md:px-2 my-1 md:my-3  w-full p-3 md:w-1/3  ">
      <div className="shadow-md rounded-md md:p-3 bg-white">
        <Link to={`/books/${book?._id}`}>
          <div className="h-[400px] w-full p-2 md:p-0">
            {' '}
            <img src={book?.image} className="h-[400px] w-full" />
          </div>
        </Link>

        <div className="h-32  p-2 md:p-0">
          {' '}
          <Link to={`/books/${book?._id}`}>
            <h6 className="text-lg font-semibold  h-10">{book.title}</h6>
          </Link>
          <p className=" font-semibold  h-6 ">{book?.author}</p>
          <div className="flex justify-between">
            <i className="text-base"> {book?.genre}</i>
            <i className="text-base"> {book?.publication_date}</i>
          </div>
          <div className="flex justify-between">
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
        </div>
      </div>
    </div>
  );
}
