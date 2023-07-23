import {
  useAddToReadingListMutation,
  useAddToWishlistMutation,
  useGetReadinglistQuery,
  useGetWishlistQuery,
  useRemoveFromReadingListMutation,
  useRemoveFromWishlistMutation,
} from '@/redux/feature/books/bookApi';
import { useGetUserQuery } from '@/redux/feature/user/userApi';
import { useAppSelector } from '@/redux/hooks';
import { IBook, IReadinglist, IWishlist } from '@/types/globalTypes';
import { toast } from 'react-hot-toast';
import { AiOutlineHeart } from 'react-icons/ai';
import { BiBookAdd } from 'react-icons/bi';
import { BsFillHeartFill } from 'react-icons/bs';
import { MdBookmarkAdded } from 'react-icons/md';
import { TiTickOutline } from 'react-icons/ti';
export default function TableCart({ book }: { book: IBook }) {
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

  const handleAddreadingList = () => {
    const options = { userId: data?.data?._id, bookId: book?._id };

    addToReadingList(options);
    handleRemoveFromWishList();

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
    console.log(options);

    addToWishlist(options);
    handleRemoveFromAddreadingList();
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
  return (
    <div className="flex justify-center items-center border p-3 my-1 rounded-md">
      <div className="w-2/12 ">
        {' '}
        <img src={book?.image} alt="" className="w-10" />
      </div>{' '}
      <h6 className="w-2/12 ">{book?.title}</h6>
      <p className="w-2/12 ">{book?.author}</p>
      <p className="w-2/12 ">{book?.genre}</p>
      <p className="w-2/12">{book?.publication_date}</p>
      <div className="w-2/12 p-3 flex justify-center items-center cursor-pointer">
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
        <TiTickOutline className="text-xl mx-1 text-main"></TiTickOutline>
      </div>
    </div>
  );
}
