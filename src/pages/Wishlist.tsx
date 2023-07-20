import AdditionalPageCover from '@/components/ui/AdditionalPageCover';
import TableCart from '@/components/ui/TableCart';
import { useRecentBookQuery } from '@/redux/feature/books/bookApi';
import { IBook } from '@/types/globalTypes';

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
          <div className="flex justify-center items-center border p-3 mb-1  mt-10 rounded-md  text-main ">
            <h5 className="font-bold w-2/12  ">Book</h5>

            <h5 className="font-bold w-2/12">Title</h5>
            <h5 className="font-bold w-2/12">Author</h5>
            <h5 className="font-bold w-2/12">Genre</h5>
            <h5 className="font-bold w-2/12">Publish</h5>

            <h5 className="font-bold w-2/12 text-center">Action</h5>
          </div>
          {data?.data.map((book: IBook) => (
            <TableCart key={book._id} book={book}></TableCart>
          ))}
        </div>{' '}
      </div>
    </div>
  );
}
