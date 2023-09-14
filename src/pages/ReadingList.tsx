import AdditionalPageCover from '@/components/ui/AdditionalPageCover';
import Header from '@/components/ui/Header';
import TableCart from '@/components/ui/TableCart';
import { useGetReadinglistQuery } from '@/redux/feature/books/bookApi';
import { useGetUserQuery } from '@/redux/feature/user/userApi';
import { useAppSelector } from '@/redux/hooks';
import Spinner from '@/shared/Spinner';
import { IList } from '@/types/globalTypes';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

export default function ReadingList() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const { user, isLoading } = useAppSelector((state) => state.user);
  const { data } = useGetUserQuery(user?.email);

  const { data: readingList } = useGetReadinglistQuery(data?.data?._id, {
    refetchOnMountOrArgChange: true,
    pollingInterval: 30000,
  });
  return (
    <>
      {!isLoading ? (
        <motion.div ref={ref}>
          <AdditionalPageCover
            isInView={isInView}
            title="Once I began to read, I began to exist. I am what I read."
            author="Walter Dean Myers, Open a World of Possible"
          ></AdditionalPageCover>
          <div className="container mx-auto md:px-[100px] my-20">
            <div>
              <Header
                isInView={isInView}
                header="Explore Recently Added readlist"
                subHeader="My Reading list"
              ></Header>
              <div className="hidden md:flex justify-center items-center border p-3 mb-1  mt-10 rounded-md  text-main  ">
                <h5 className="font-bold md:w-2/12  ">Book</h5>

                <h5 className="font-bold md:w-2/12">Title</h5>
                <h5 className="font-bold md:w-2/12">Author</h5>
                <h5 className="font-bold md:w-2/12">Genre</h5>
                <h5 className="font-bold md:w-2/12">Publish</h5>

                <h5 className="font-bold md:w-2/12 text-center">Action</h5>
              </div>
              {readingList?.data.map((booklist: IList) => (
                <TableCart
                  key={booklist._id}
                  book={booklist.book}
                  isInView={isInView}
                ></TableCart>
              ))}
            </div>{' '}
          </div>
        </motion.div>
      ) : (
        <Spinner />
      )}
    </>
  );
}
