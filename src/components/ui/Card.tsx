import { AiFillStar, AiOutlineHeart } from 'react-icons/ai';
// import { BsFillHeartFill } from 'react-icons/bs';
import book6 from '../../assets/images/book-mockup6.png';

export default function Card() {
  return (
    <div className="pr-3 my-3">
      <img src={book6} />
      <p>personality, science</p>
      <h5 className="text-xl font-semibold">The Glitterign Stars Book</h5>
      <div className="flex justify-between">
        {' '}
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
        <AiOutlineHeart></AiOutlineHeart>
      </div>
    </div>
  );
}