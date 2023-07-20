import { addToWishListOrRemove } from '@/redux/feature/wishList/wishlisttSlice';
import { useAppDispatch } from '@/redux/hooks';
import { IBook } from '@/types/globalTypes';
import { useState } from 'react';
import { AiOutlineHeart } from 'react-icons/ai';
import { BsEyeFill, BsFillHeartFill } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import Review from '../Review';

export default function Card({ book }: { book: IBook }) {
  const [wishlisted, setWishListed] = useState(false);
  const dispatch = useAppDispatch();
  const handleWishList = () => {
    setWishListed(!wishlisted);
    dispatch(addToWishListOrRemove(book));
  };
  return (
    <div className="pr-3 my-3 p-2 w-1/3">
      <img src={book?.image} />
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
            <BsEyeFill className="text-main " />
          </Link>
          {wishlisted ? (
            <BsFillHeartFill
              onClick={handleWishList}
              className="text-lg mx-2 text-red-600"
            ></BsFillHeartFill>
          ) : (
            <AiOutlineHeart
              onClick={handleWishList}
              className="text-xl mx-2"
            ></AiOutlineHeart>
          )}
        </div>
      </div>
    </div>
  );
}
