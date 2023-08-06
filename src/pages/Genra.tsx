import AdditionalPageCover from '@/components/ui/AdditionalPageCover';

import Header from '@/components/ui/Header';
import { useGetBooksQuery } from '@/redux/feature/books/bookApi';
import { IBook } from '@/types/globalTypes';
import { Link, useParams } from 'react-router-dom';
import Card from '../components/ui/Card';

export default function Genra() {
  const { genre } = useParams();

  const { data } = useGetBooksQuery(undefined, {
    refetchOnMountOrArgChange: true,
    pollingInterval: 30000,
  });

  const filteredData = data?.data.filter((book: IBook) => book.genre === genre);

  return (
    <div className=" ">
      <AdditionalPageCover
        title="Books were safer than other people anyway."
        author="Neil Gaiman, The Ocean at the End of the Lane"
      />
      <div className="container py-[10px] md:px-[80px]">
        {' '}
        <div className="flex flex-col justify-center md:flex-row md:justify-between items-center">
          <Header
            header={`Explore  The Books Of Genre-${genre}`}
            subHeader="Genre Of Book"
          ></Header>

          <Link
            to="/allBooks"
            className="bg-main p-2 px-5 rounded-full text-white my-2 "
          >
            {' '}
            See More
          </Link>
        </div>
        <div className="w-full flex flex-col-reverse md:flex-row md:justify-between md:items-start ">
          {/* cards */}
          <div className="flex justify-start flex-wrap items-center w-full">
            {filteredData?.map((book: IBook) => (
              <Card key={book._id} book={book}></Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
