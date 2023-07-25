import { useRecentBookQuery } from '@/redux/feature/books/bookApi';
import { IBook } from '@/types/globalTypes';
import { Link } from 'react-router-dom';
import Card from './ui/Card';
import Header from './ui/Header';

export default function RecentlyAdded() {
  const { data } = useRecentBookQuery(undefined);
  console.log(data);
  return (
    <div className="container mx-auto p-5 md:p-[100px]">
      <div className="flex flex-col justify-center md:flex-row md:justify-between items-center">
        <Header
          header="  Explore Recently Added 10 Books"
          subHeader="Recently Added"
        ></Header>
        <Link
          to="/allBooks"
          className="bg-main p-2 px-5 rounded-full text-white my-2 "
        >
          {' '}
          Find More
        </Link>
      </div>
      <div className="flex flex-col md:flex-row justify-start flex-wrap items-center w-full">
        {data?.data?.map((book: IBook) => (
          <Card key={book._id} book={book}></Card>
        ))}
      </div>
    </div>
  );
}
