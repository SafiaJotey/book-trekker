import { useRecentBookQuery } from '@/redux/feature/books/bookApi';
import { IBook } from '@/types/globalTypes';
import { Link } from 'react-router-dom';
import Card from '../components/ui/Card';

export default function RecentlyAdded() {
  const { data } = useRecentBookQuery(undefined);
  console.log(data);
  return (
    <div className="container mx-auto p-[100px]">
      <div className="flex justify-between items-center">
        <div>
          {' '}
          <h6 className="text-lg font-semibold  ">Recently Added</h6>
          <h3 className="text-4xl font-bold ">
            Explore Recently Added 10 Books
          </h3>
        </div>{' '}
        <Link
          to="/allBooks"
          className="bg-main p-2 px-5 rounded-full text-white "
        >
          {' '}
          Find More in Shop
        </Link>
      </div>
      <div className="flex justify-start flex-wrap items-center w-full">
        {data?.data?.map((book: IBook) => (
          <Card key={book._id} book={book}></Card>
        ))}
      </div>
    </div>
  );
}
