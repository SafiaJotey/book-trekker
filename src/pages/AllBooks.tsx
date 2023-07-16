import AdditionalPageCover from '@/components/ui/AdditionalPageCover';
import MiniCards from '@/components/ui/MiniCards';
import { BiSearchAlt2 } from 'react-icons/bi';
import { FaFacebookF, FaLinkedinIn, FaTwitter } from 'react-icons/fa';
import { FiInstagram } from 'react-icons/fi';
import { TiTick } from 'react-icons/ti';
import { useLocation } from 'react-router-dom';
import Card from '../components/ui/Card';
export default function AllBooks() {
  const location = useLocation();
  console.log(location);
  return (
    <div className=" mb-[50px]">
      <AdditionalPageCover title="Authors Books" />

      <div className="w-full flex justify-between items-start container  px-[100px]">
        {/* cards */}
        <div className="flex justify-start flex-wrap items-center w-3/4">
          <div className="w-1/3 p-2">
            <Card></Card>
          </div>
          <div className="w-1/3 p-2">
            <Card></Card>
          </div>
          <div className="w-1/3 p-2">
            <Card></Card>
          </div>
          <div className="w-1/3 p-2">
            <Card></Card>
          </div>
          <div className="w-1/3 p-2">
            <Card></Card>
          </div>
          <div className="w-1/3 p-2">
            <Card></Card>
          </div>
          <div className="w-1/3 p-2">
            <Card></Card>
          </div>
          <div className="w-1/3 p-2">
            <Card></Card>
          </div>
          <div className="w-1/3 p-2">
            <Card></Card>
          </div>
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
                  <div className="border border-main px-3 m-1 rounded-sm flex justify-center items-center">
                    genre
                  </div>
                  <div className="border  border-main px-3  m-1 rounded-sm flex  items-center">
                    genre
                  </div>{' '}
                  <div className="border  border-main px-3 m-1 rounded-sm flex items-center">
                    genre
                  </div>{' '}
                  <div className="border  border-main px-3 m-1 rounded-sm flex items-center">
                    genre
                  </div>
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
                  <div className="border border-main px-3 m-1 rounded-sm flex  items-center">
                    2018
                  </div>
                  <div className="border  border-main px-3  m-1 rounded-sm flex justify-center items-center">
                    2018
                  </div>{' '}
                  <div className="border  border-main px-3 m-1 rounded-sm flex  items-center">
                    2018
                  </div>{' '}
                  <div className="border  border-main px-3 m-1 rounded-sm flex items-center">
                    2018
                  </div>
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
              <div>
                <MiniCards></MiniCards>
                <MiniCards></MiniCards>
                <MiniCards></MiniCards>
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
  );
}
