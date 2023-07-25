import AdditionalPageCover from '@/components/ui/AdditionalPageCover';
import Header from '@/components/ui/Header';
import TableCart from '@/components/ui/TableCart';
import { useGetWishlistQuery } from '@/redux/feature/books/bookApi';
import { useGetUserQuery } from '@/redux/feature/user/userApi';

import { useAppSelector } from '@/redux/hooks';
import { IBook } from '@/types/globalTypes';

export default function WishList() {
  const { user } = useAppSelector((state) => state.user);
  const { data } = useGetUserQuery(user?.email);

  const { data: wishlist } = useGetWishlistQuery(data?.data?._id, {
    refetchOnMountOrArgChange: true,
    pollingInterval: 30000,
  });

  return (
    <div>
      <AdditionalPageCover
        title="The whole world opened to me when I learned to read."
        author="Mary McLeod Bethune"
      ></AdditionalPageCover>
      <div className="container mx-auto md:px-[100px] my-20">
        <div>
          {' '}
          <Header
            header="Explore Recently Added wishlist"
            subHeader="My Wishlist"
          ></Header>
          <div className="flex justify-center items-center border p-3 mb-1  mt-10 rounded-md  text-main ">
            <h5 className="font-bold w-2/12  ">Book</h5>

            <h5 className="font-bold w-2/12">Title</h5>
            <h5 className="font-bold w-2/12">Author</h5>
            <h5 className="font-bold w-2/12">Genre</h5>
            <h5 className="font-bold w-2/12">Publish</h5>

            <h5 className="font-bold w-2/12 text-center">Action</h5>
          </div>
          {wishlist?.data?.map((bookList: IBook) => (
            <TableCart key={bookList._id} book={bookList?.book}></TableCart>
          ))}
        </div>{' '}
      </div>
    </div>
  );
}
