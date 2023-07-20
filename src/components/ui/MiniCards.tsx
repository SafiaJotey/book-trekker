import { AiOutlineHeart } from 'react-icons/ai';
// import { BsFillHeartFill } from 'react-icons/bs';
import { IBook } from '@/types/globalTypes';
import { Link } from 'react-router-dom';
import Review from '../Review';
export default function MiniCards({ book }: { book: IBook }) {
  return (
    <div>
      <Link to={`/books/${book?._id}`}>
        <div className="flex justify-center items-center border p-2 ">
          <div className="w-4/12">
            <img src={book.image} />
          </div>
          <div className="w-8/12 px-2">
            <h5 className="text-md font-bold">{book.title}</h5>
            <i>{book?.author}</i>
            <div className="flex justify-between">
              {' '}
              <Review key={book?._id} book={book} />
              <AiOutlineHeart></AiOutlineHeart>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}
