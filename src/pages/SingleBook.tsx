import AdditionalPageCover from '@/components/ui/AdditionalPageCover';
import { AiFillStar } from 'react-icons/ai';
import { BiSolidEditAlt } from 'react-icons/bi';
import { MdDelete } from 'react-icons/md';
import { TiTick } from 'react-icons/ti';
import book6 from '../assets/images/book-mockup6.png';
export default function SingleBook() {
  return (
    <div className=" mb-[50px]">
      <AdditionalPageCover title="Single Book" />

      <div className="container my-[100px] px-[100px]">
        <div className="w-full border rounded-md flex p-2 ">
          <img src={book6} className="w-1/3" />

          <div className="w-2/3 p-5 ">
            <div className="border-b-2 pb-3">
              {' '}
              <p className="text-xl ">personality, science</p>
              <h5 className="text-5xl font-semibold my-2">
                The Glitterign Stars Book
              </h5>
              <div className="flex text-3xl ">
                <span>
                  <AiFillStar className="text-review "></AiFillStar>
                </span>
                <span>
                  <AiFillStar className="text-review"></AiFillStar>
                </span>
                <span>
                  <AiFillStar className="text-review"></AiFillStar>
                </span>
                <span>
                  <AiFillStar className="text-review"></AiFillStar>
                </span>
                <span>
                  <AiFillStar className="text-review"></AiFillStar>
                </span>
              </div>
            </div>
            <p className="p-2">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. At,
              quaerat cupiditate. Recusandae, molestias, consequuntur sequi
              explicabo quibusdam voluptatem dolore dolorum, officiis quo hic
              pariatur temporibus nobis delectus facilis ea fugiat qui earum
              impedit quaerat odit deserunt assumenda ipsa veniam? Molestiae
              itaque blanditiis veniam fugiat atque facilis culpa delectus
              aliquam laboriosam
            </p>
            <div className="flex justify-start items-center ">
              <TiTick className="text-xl"></TiTick>
              <p className="text-lg font-semibold px-3 my-1">
                {' '}
                publication year: 2020
              </p>
            </div>
            <div className="flex justify-start items-center ">
              <TiTick className="text-xl"></TiTick>
              <p className="text-lg font-semibold px-3 my-1">
                {' '}
                publication year: 2020
              </p>
            </div>
            <div className="flex justify-start items-center ">
              <TiTick className="text-xl"></TiTick>
              <p className="text-lg font-semibold px-3 my-1">
                {' '}
                publication year: 2020
              </p>
            </div>
            <div className="flex justify-start mt-5">
              <button className="bg-main text-white border border-main w-[200px] py-2 rounded-sm m-1 flex justify-center items-center">
                <BiSolidEditAlt className="text-lg font-bold"></BiSolidEditAlt>
                <span className="mx-2"> Edit</span>{' '}
              </button>
              <button className="bg-red-600 text-white border border-red-600 w-[200px] py-2 rounded-sm m-1 flex justify-center items-center">
                <MdDelete className="text-lg font-bold"></MdDelete>
                <span className="mx-2"> Delete</span>{' '}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
