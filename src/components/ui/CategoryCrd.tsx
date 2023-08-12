import { ICategory } from '@/types/globalTypes';
import { Link } from 'react-router-dom';
interface FAQAccordionProps {
  item: ICategory;
}
export default function CategoryCrd({ item }: FAQAccordionProps) {
  const { image, genra } = item;
  return (
    <div className=" my-1 md:my-0 md:w-1/3  static  cursor-pointer ">
      {' '}
      <Link to={`/books/category/${genra}`}>
        {' '}
        <div className=" relative h-[200px]">
          {' '}
          <img
            src={image}
            alt=""
            className="  hover:border-main hover:border-2 hover:-z-10 h-[200px] w-full"
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
