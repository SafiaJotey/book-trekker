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
import { BsEyeFill, BsFillHeartFill } from 'react-icons/bs';
import { MdBookmarkAdded } from 'react-icons/md';
import { Link } from 'react-router-dom';
import Review from '../Review';

export default function Card({ book }: { book: IBook }) {
  const { user, isLoading } = useAppSelector((state) => state.user);
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
    <div className="px-3 my-3  w-1/3 bg-white ">
      <div className="shadow-md rounded-md p-2">
        <div className="h-{200px} ">
          {' '}
          <img src={book?.image} />
        </div>

        <div className="h-36 ">
          <h6 className="text-xl font-semibold">{book.title}</h6>
          <p className=" font-semibold">{book?.author}</p>
          <div className="flex justify-between">
            <i className="text-base"> {book?.genre}</i>
            <i className="text-base"> {book?.publication_date}</i>
          </div>

          <div className="flex justify-between">
            <Review key={book?._id} book={book} />

            <div className="flex justify-end items-center text-base ">
              <Link to={`/books/${book?._id}`}>
                <BsEyeFill className="text-main text-xl " />
              </Link>
              {wishlist?.data?.find(
                (list: IWishlist) => list?.book?._id === book?._id
              ) && (
                <BsFillHeartFill
                  onClick={handleRemoveFromWishList}
                  className="text-lg mx-2 text-red-600"
                ></BsFillHeartFill>
              )}
              {!wishlist?.data?.find(
                (list: IReadinglist) => list?.book?._id === book?._id
              ) && (
                <AiOutlineHeart
                  onClick={handleAddWishList}
                  className="text-xl mx-2 text-main"
                ></AiOutlineHeart>
              )}
              {readinglist?.data?.find(
                (list: IWishlist) => list?.book?._id === book?._id
              ) && (
                <MdBookmarkAdded
                  onClick={handleRemoveFromAddreadingList}
                  className="text-lg mx-2 text-green-600"
                ></MdBookmarkAdded>
              )}
              {!readinglist?.data?.find(
                (list: IReadinglist) => list?.book?._id === book?._id
              ) && (
                <BiBookAdd
                  onClick={handleAddreadingList}
                  className="text-xl mx-2 text-main"
                ></BiBookAdd>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
