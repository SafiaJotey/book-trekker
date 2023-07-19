import { AiOutlineHeart } from 'react-icons/ai';
// import { BsFillHeartFill } from 'react-icons/bs';
import { IBook } from '@/types/globalTypes';
import { Link } from 'react-router-dom';
import Review from '../Review';

export default function Card({ book }: { book: IBook }) {
  return (
    <div className="pr-3 my-3 w-1/3 p-2">
      <Link to={`/books/${book?._id}`}>
        <img src={book?.image} />
        <h5 className="text-xl font-semibold">{book?.title}</h5>{' '}
        <i className="text-base">- {book?.genre}</i>
        <p>{book?.author}</p>
        <div className="flex justify-between">
          {' '}
          <Review key={book?._id} book={book} />
          <AiOutlineHeart></AiOutlineHeart>
        </div>
      </Link>
    </div>
  );
}
