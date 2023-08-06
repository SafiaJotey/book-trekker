import { ICategory } from '@/types/globalTypes';
import { Link } from 'react-router-dom';

export default function CategoryCrd({ item }: ICategory) {
  const { image, genra } = item;
  return (
    <div className=" my-1 md:my-0 md:w-1/3  static  cursor-pointer ">
      {' '}
      <Link to={`/books/${genra}`}>
        {' '}
        <div className=" relative">
          {' '}
          <img
            src={image}
            alt=""
            className="  hover:border-main hover:border-2 hover:-z-10"
          />
          <div className="absolute top-0 bg-main px-1 rounded-md m-1">
            {' '}
            <p className="text-white z-40">{genra}</p>
          </div>
        </div>
      </Link>
    </div>
  );
}
