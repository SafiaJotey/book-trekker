import AdditionalPageCover from '@/components/ui/AdditionalPageCover';
import { useRecentBookQuery } from '@/redux/feature/books/bookApi';
import { IBook } from '@/types/globalTypes';
import { AiOutlineHeart } from 'react-icons/ai';
import { BiBookAdd } from 'react-icons/bi';
import { MdDeleteOutline } from 'react-icons/md';

export default function WishList() {
  const { data } = useRecentBookQuery(undefined);
  return (
    <div>
      <AdditionalPageCover
        title="The whole world opened to me when I learned to read."
        author="―Mary McLeod Bethune"
      ></AdditionalPageCover>
      <div className="container mx-auto px-[100px] my-20">
        <div>
          {' '}
          <h6 className="text-lg font-semibold  ">My Wishlist</h6>
          <h3 className="text-4xl font-bold ">
            Explore Recently Added wishlist
          </h3>
          <div className="flex justify-center items-center border p-3 mb-1  mt-10 rounded-md">
            <h5 className="font-bold w-2/12  ">Book</h5>

            <h5 className="font-bold w-2/12">Title</h5>
            <h5 className="font-bold w-2/12">Author</h5>
            <h5 className="font-bold w-2/12">Genre</h5>
            <h5 className="font-bold w-2/12">Publish</h5>

            <h5 className="font-bold w-2/12 text-center">Action</h5>
          </div>
          {data?.data.map((book: IBook) => {
            return (
              <div className="flex justify-center items-center border p-3 my-1 rounded-md">
                <div className="w-2/12 ">
                  {' '}
                  <img src={book.image} alt="" className="w-10" />
                </div>{' '}
                <h6 className="w-2/12 ">{book.title}</h6>
                <p className="w-2/12 ">{book.author}</p>
                <p className="w-2/12 ">{book.genre}</p>
                <p className="w-2/12">{book.publication_date}</p>
                <div className="w-2/12 p-3 flex justify-center items-center cursor-pointer">
                  <AiOutlineHeart className="text-2xl mx-2 text-main  cursor-pointer"></AiOutlineHeart>
                  <BiBookAdd className="text-2xl mx-2  text-main cursor-pointer"></BiBookAdd>
                  <MdDeleteOutline className="text-2xl mx-2  text-main cursor-pointer"></MdDeleteOutline>
                </div>
              </div>
            );
          })}
        </div>{' '}
      </div>
    </div>
  );
}
