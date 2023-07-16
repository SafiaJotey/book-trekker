import { AiFillStar } from 'react-icons/ai';
import book6 from '../../assets/images/book-mockup6.png';
export default function MiniCards() {
  return (
    <div className="flex justify-center border p-2 ">
      <div className="w-5/12">
        <img src={book6} />
      </div>
      <div className="w-7/12 px-1">
        <p>personality, science</p>
        <h5 className="text-lg font-bold">The Glitterign Stars Book</h5>
        <div className="flex ">
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
          <span>
            <AiFillStar className="text-review"></AiFillStar>
          </span>
        </div>
      </div>
    </div>
  );
}
