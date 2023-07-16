import { Link } from 'react-router-dom';
import Card from '../components/ui/Card';

export default function RecentlyAdded() {
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
      <div className="w-full flex justify-between my-[50px]">
        <div className="w-3/12  ">
          <Card></Card>
        </div>
        <div className="w-3/12  ">
          <Card></Card>
        </div>
        <div className="w-3/12  ">
          <Card></Card>
        </div>
        <div className="w-3/12  ">
          <Card></Card>
        </div>
      </div>
    </div>
  );
}
