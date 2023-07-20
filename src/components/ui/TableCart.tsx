import { IBook } from '@/types/globalTypes';
import { AiOutlineHeart } from 'react-icons/ai';
import { BiBookAdd } from 'react-icons/bi';
import { MdDeleteOutline } from 'react-icons/md';

export default function TableCart({ book }: { book: IBook }) {
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
        <AiOutlineHeart className="text-2xl mx-2 text-main  cursor-pointer"></AiOutlineHeart>
        <BiBookAdd className="text-2xl mx-2  text-main cursor-pointer"></BiBookAdd>
        <MdDeleteOutline className="text-2xl mx-2  text-main cursor-pointer"></MdDeleteOutline>
      </div>
    </div>
  );
}
