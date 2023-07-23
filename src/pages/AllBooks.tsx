import AdditionalPageCover from '@/components/ui/AdditionalPageCover';
import { YearDropdown } from '@/components/ui/DropDown';
import MiniCards from '@/components/ui/MiniCards';
import {
  useGetBooksQuery,
  useRecentBookQuery,
} from '@/redux/feature/books/bookApi';
import {
  updateGenreSelectedValue,
  updatePublishYearSelectedValue,
  updateSearchTerm,
} from '@/redux/feature/books/books.slice';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { IBook } from '@/types/globalTypes';
import { ChangeEvent } from 'react';
import { BiSearchAlt2 } from 'react-icons/bi';
import { FaFacebookF, FaLinkedinIn, FaTwitter } from 'react-icons/fa';
import { FiInstagram } from 'react-icons/fi';
import { TiTick } from 'react-icons/ti';
import { Link } from 'react-router-dom';
import Card from '../components/ui/Card';
export default function AllBooks() {
  const { data} = useGetBooksQuery(undefined, {
    refetchOnMountOrArgChange: true,
    pollingInterval: 30000,
  });
  const { data: recentBook } = useRecentBookQuery(undefined, {
    refetchOnMountOrArgChange: true,
    pollingInterval: 30000,
  });

  const selectedGenreValue = useAppSelector((state) => state.book.genre);
  const selectedPublishYearValue = useAppSelector(
    (state) => state.book.publishYear
  );
  const searchTerm = useAppSelector((state) => state.book.searchTerm);
  let filteredData;

  const dispatch = useAppDispatch();
  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(updateSearchTerm(e.target.value));
  };

  if (
    selectedGenreValue === '' &&
    selectedPublishYearValue === '' &&
    searchTerm !== ''
  ) {
    filteredData = data?.data?.filter(
      (item: IBook) =>
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.genre.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }
  if (
    selectedGenreValue !== '' &&
    selectedPublishYearValue !== '' &&
    searchTerm !== ''
  ) {
    filteredData = data?.data
      ?.filter(
        (item: IBook) =>
          item.genre.toLowerCase() === selectedGenreValue.toLowerCase()
      )
      .filter((item: IBook) =>
        item.publication_date.includes(selectedPublishYearValue)
      )
      .filter(
        (item: IBook) =>
          item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.genre.toLowerCase().includes(searchTerm.toLowerCase())
      );
  }
  if (
    selectedGenreValue !== '' &&
    selectedPublishYearValue === '' &&
    searchTerm !== ''
  ) {
    filteredData = data?.data
      ?.filter(
        (item: IBook) =>
          item.genre.toLowerCase() === selectedGenreValue.toLowerCase()
      )
      .filter(
        (item: IBook) =>
          item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.genre.toLowerCase().includes(searchTerm.toLowerCase())
      );
  }
  if (
    selectedGenreValue === '' &&
    selectedPublishYearValue !== '' &&
    searchTerm !== ''
  ) {
    filteredData = data?.data
      ?.filter((item: IBook) =>
        item.publication_date.includes(selectedPublishYearValue)
      )
      .filter(
        (item: IBook) =>
          item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.genre.toLowerCase().includes(searchTerm.toLowerCase())
      );
  }
  if (
    selectedGenreValue !== '' &&
    selectedPublishYearValue !== '' &&
    searchTerm === ''
  ) {
    filteredData = data?.data
      ?.filter(
        (item: IBook) =>
          item.genre.toLowerCase() === selectedGenreValue.toLowerCase()
      )
      .filter((item: IBook) =>
        item.publication_date.includes(selectedPublishYearValue)
      );
  }
  if (
    selectedGenreValue !== '' &&
    selectedPublishYearValue === '' &&
    searchTerm === ''
  ) {
    filteredData = data?.data?.filter(
      (item: IBook) =>
        item.genre.toLowerCase() === selectedGenreValue.toLowerCase()
    );
  }
  if (
    selectedGenreValue === '' &&
    selectedPublishYearValue !== '' &&
    searchTerm === ''
  ) {
    filteredData = data?.data?.filter((item: IBook) =>
      item.publication_date.includes(selectedPublishYearValue)
    );
  }
  if (
    selectedGenreValue === '' &&
    searchTerm === '' &&
    selectedPublishYearValue === ''
  ) {
    filteredData = data?.data;
  }

  return (
    <div className=" ">
      <AdditionalPageCover
        title="Books were safer than other people anyway."
        author="Neil Gaiman, The Ocean at the End of the Lane"
      />
      <div className="container py-[10px] px-[80px]">
        {' '}
        <div className="flex justify-between items-center">
          <div>
            {' '}
            <h6 className="text-lg font-semibold  ">By The Authors</h6>
            <h3 className="text-4xl font-bold ">Explore All The Books</h3>
          </div>{' '}
          <Link
            to="/addBook"
            className="bg-main p-2 px-5 rounded-full text-white "
          >
            {' '}
            Add New
          </Link>
        </div>
        <div className="w-full flex justify-between items-start ">
          {/* cards */}
          <div className="flex justify-center flex-wrap items-center w-3/4">
            {filteredData?.map((book: IBook) => (
              <Card key={book._id} book={book}></Card>
            ))}
          </div>
          {/* search and filters */}
          <div className="w-1/4 pl-3">
            <div className="p-3  border rounded-md  ">
              {/* search field */}
              <div className="flex justify-between items-center border ">
                {' '}
                <input
                  className="p-3 w-10/12 border-none"
                  placeholder="Search..."
                  type="text"
                  value={searchTerm}
                  onChange={(e) => handleSearch(e)}
                />
                <BiSearchAlt2 className="w-2/12 text-2xl"></BiSearchAlt2>
              </div>
              {/* filters */}
              <div>
                <div className="border-b-2 border-main mt-[20px] mb-5">
                  {' '}
                  <h3 className="text-xl font-bold my-4 text-center">
                    Popular Category
                  </h3>
                </div>
                <div>
                  <div className="flex justify-start items-center  mt-[10px] border-b my-2 ">
                    <TiTick className="text-2xl"></TiTick>
                    <p className="text-xl font-semibold px-3 "> Genre</p>
                  </div>
                  <div className="flex  flex-wrap items-center">
                    <select
                      name="genre"
                      className="border w-full py-1"
                      value={selectedGenreValue}
                      onChange={(e) =>
                        dispatch(updateGenreSelectedValue(e.target.value))
                      }
                    >
                      <option value="">Select a genre</option>
                      <option value="Fantasy">Fantasy</option>
                      <option value="Fiction">Fiction</option>
                      <option value="Dystopian">Dystopian</option>
                      <option value="Classic Literature">
                        Classic Literature
                      </option>
                      <option value="Adventure">Adventure</option>
                      <option value="Coming-of-age">Coming-of-age</option>
                      <option value="Epic">Epic</option>
                      <option value="Gothic Literature">
                        Gothic Literature
                      </option>
                      <option value="Mystery">Mystery</option>
                      <option value="Romance genre">Romance genre</option>
                    </select>
                  </div>
                </div>

                <div>
                  <div className="flex justify-start items-center  border-b my-2 ">
                    <TiTick className="text-xl"></TiTick>
                    <p className="text-xl font-semibold px-3 my-1">
                      {' '}
                      publication year
                    </p>
                  </div>
                  <div className="flex flex-wrap items-center">
                    <select
                      name="year"
                      className="border w-full py-1"
                      value={selectedPublishYearValue}
                      onChange={(e) =>
                        dispatch(updatePublishYearSelectedValue(e.target.value))
                      }
                    >
                      <option value="">select a year</option>
                      {YearDropdown().map((year) => (
                        <option key={year} value={year}>
                          {year}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
              {/* recently added books */}
              <div>
                <div className="border-b-2 border-main mt-[10px] mb-5">
                  {' '}
                  <h3 className="text-xl font-bold my-4 text-center">
                    Recantly Added Books{' '}
                  </h3>
                </div>
                {/* mini cards */}
                <div className="flex flex-col justify-start flex-wrap items-center w-full">
                  {recentBook?.data?.slice(0, 3).map((book: IBook) => (
                    <MiniCards key={book._id} book={book}></MiniCards>
                  ))}
                </div>
                {/* social */}
                <div>
                  <div className="border-b-2 border-main mt-[10px] mb-5">
                    {' '}
                    <h3 className="text-xl font-bold my-4 text-center">
                      Follow Us{' '}
                    </h3>
                  </div>
                  <div className="flex justify-center ">
                    <span>
                      <FaFacebookF className="text-main text-2xl mx-1"></FaFacebookF>
                    </span>
                    <span>
                      <FaTwitter className="text-main text-2xl mx-1"></FaTwitter>
                    </span>
                    <span>
                      <FaLinkedinIn className="text-main text-2xl mx-1"></FaLinkedinIn>
                    </span>
                    <span>
                      <FiInstagram className="text-main text-2xl mx-1"></FiInstagram>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
