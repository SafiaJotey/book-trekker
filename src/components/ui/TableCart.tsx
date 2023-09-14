import { RecentVarient } from '@/animates/home';
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
} from '@/redux/feature/books/bookApi';
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
import { MdBookmarkAdded } from 'react-icons/md';
import {motion} from "framer-motion"
import { TiTick, TiTickOutline } from 'react-icons/ti';
export default function TableCart({ book,isInView }: { book: IGetBook ,isInView:boolean}) {
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
    const options = { userId: data?.data?._id, bookId: book?._id };

    addToReadingList(options);
    handleRemoveFromWishList();
    handleRemoveFCompleted();

    toast.success('Added To Readinglist.');
  };
  const handleRemoveFromAddreadingList = () => {
    readinglist?.data?.forEach((list: IReadinglist) => {
      if (list?.book?._id === book?._id) {
        removeFromReadingList(list?._id);
        toast.error('Removed From readinglist');
      }
    });
  };
  const handleAddWishList = () => {
    const options = { userId: data?.data?._id, bookId: book?._id };

    addToWishlist(options);
    handleRemoveFromAddreadingList();
    handleRemoveFCompleted();
    toast.success('Added To Wishlist.');
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
    <motion.div
    variants={RecentVarient}
    initial="hidden"
    animate={isInView ? 'visible' : 'hidden'}
    
    className="flex flex-col md:flex-row justify-center items-center border md:p-1 my-1 rounded-md">
      <div className="w-full md:w-2/12 ">
        {' '}
        <img
          src={`${import.meta.env.VITE_BASE_FOR_FILE}${book?.image?.filename}`}
          alt=""
          className="w-full m-2 md:w-10 md:my-0"
        />
      </div>{' '}
      <h6 className="text-2xl text-center font-semibold md:font-normal md:text-base md:w-2/12 ">
        {book?.title}
      </h6>
      <p className=" text-xl md:text-base  md:w-2/12 ">{book?.author}</p>
      <p className=" text-lg md:text-base md:w-2/12 ">{book?.genre}</p>
      <p className=" text-lg md:text-base md:w-2/12">
        {book?.publication_date}
      </p>
      <div className="md:w-2/12 p-3 flex justify-center items-center cursor-pointer">
        {wishlist?.data?.find(
          (list: IWishlist) => list?.book?._id === book?._id
        ) && (
          <BsFillHeartFill
            onClick={handleRemoveFromWishList}
            className="text-lg mx-1 text-red-600"
          ></BsFillHeartFill>
        )}
        {!wishlist?.data?.find(
          (list: IWishlist) => list?.book?._id === book?._id
        ) && (
          <AiOutlineHeart
            onClick={handleAddWishList}
            className="text-xl mx-1"
          ></AiOutlineHeart>
        )}
        {readinglist?.data?.find(
          (list: IReadinglist) => list?.book?._id === book?._id
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
    </motion.div>
  );
}
