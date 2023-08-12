import { IGetBook } from '@/types/globalTypes';
import { Link } from 'react-router-dom';
import Review from '../Review';
export default function MiniCards({ book }: { book: IGetBook }) {
  return (
    <Link to={`/books/${book?._id}`} className="my-1">
      <div className="flex justify-center items-center border p-2 ">
        <div className="w-5/12 ">
          <img
            src={`${import.meta.env.VITE_BASE_FOR_FILE}${book?.image?.filename}`}
            className=" w-full"
          />
        </div>
        <div className="w-7/12 px-2">
          <h5 className="text-base text-justify font-bold">{book.title}</h5>
          <i>{book?.author}</i>
          <div className="flex justify-between">
            {' '}
            <Review key={book?._id} book={book} />
          </div>
        </div>
      </div>
    </Link>
  );
}
