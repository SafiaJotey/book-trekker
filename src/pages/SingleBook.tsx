import AdditionalPageCover from '@/components/ui/AdditionalPageCover';

import { MdRateReview } from 'react-icons/md';
// import { BsFillHeartFill } from 'react-icons/bs';
import Review from '@/components/Review';
import AddReviewModal from '@/components/ui/AddModalReview';
import DeleteConfirmationModal from '@/components/ui/DeleteConfirmationModal';
import ReviewCard from '@/components/ui/ReviewCard';
import {
  useAddReviewMutation,
  useAddToCompletedListMutation,
  useAddToReadingListMutation,
  useAddToWishlistMutation,
  useDeleteBookMutation,
  useGetCompleteListQuery,
  useGetReadinglistQuery,
  useGetReviewsQuery,
  useGetWishlistQuery,
  useRemoveFromCompletedListMutation,
  useRemoveFromReadingListMutation,
  useRemoveFromWishlistMutation,
  useSingleBookQuery,
} from '@/redux/feature/books/bookApi';
import { ICompletelist, IReadinglist, IWishlist } from '@/types/globalTypes';
import { FaReadme } from 'react-icons/fa';

import { AiOutlineHeart } from 'react-icons/ai';
import { BiBookAdd } from 'react-icons/bi';
import { BsFillHeartFill } from 'react-icons/bs';
import { MdBookmarkAdded } from 'react-icons/md';

import { RecentVarient, bannerVarient } from '@/animates/home';
import { useGetUserQuery } from '@/redux/feature/user/userApi';
import { useAppSelector } from '@/redux/hooks';
import { IReview } from '@/types/globalTypes';
import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { toast } from 'react-hot-toast';
import { BiSolidEditAlt } from 'react-icons/bi';
import { MdDelete } from 'react-icons/md';
import { TiTick, TiTickOutline } from 'react-icons/ti';
import { useNavigate, useParams } from 'react-router-dom';
export default function SingleBook() {
  const { id } = useParams();
  const { data: book } = useSingleBookQuery(id);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const { user } = useAppSelector((state) => state.user);
  const navigate = useNavigate();
  const { data: reviews } = useGetReviewsQuery(id);

  const { data: currentUser } = useGetUserQuery(user?.email);
  const [addReview] = useAddReviewMutation();
  const [deleteBook] = useDeleteBookMutation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);

  const { data } = useGetUserQuery(user?.email);
  const { data: wishlist } = useGetWishlistQuery(data?.data?._id, {
    refetchOnMountOrArgChange: true,
    pollingInterval: 30000,
  });
  const { data: readinglist } = useGetReadinglistQuery(data?.data?._id, {
    refetchOnMountOrArgChange: true,
    pollingInterval: 30000,
  });
  const [removeFromWishlist] = useRemoveFromWishlistMutation();

  const [addToWishlist] = useAddToWishlistMutation();
  const [removeFromReadingList] = useRemoveFromReadingListMutation();

  const [addToReadingList] = useAddToReadingListMutation();
  const { data: completedlist } = useGetCompleteListQuery(data?.data?._id, {
    refetchOnMountOrArgChange: true,
    pollingInterval: 30000,
  });

  const [removeFromCompletedList] = useRemoveFromCompletedListMutation();

  const [addToCompletedList] = useAddToCompletedListMutation();

  const handleAddreadingList = () => {
    const options = { userId: data?.data?._id, bookId: book?.data?._id };

    addToReadingList(options);
    handleRemoveFromWishList();
    handleRemoveFCompleted();

    toast.success('Added To Readinglist.');
  };
  const handleRemoveFromAddreadingList = () => {
    readinglist?.data?.forEach((list: IReadinglist) => {
      if (list?.book?._id === book?.data?._id) {
        removeFromReadingList(list?._id);
        toast.error('Removed From readinglist');
      }
    });
  };

  const handleAddWishList = () => {
    const options = { userId: data?.data?._id, bookId: book?.data?._id };

    addToWishlist(options);
    handleRemoveFromAddreadingList();
    handleRemoveFCompleted();
    toast.success('Added To Wishlist.');
  };
  const handleRemoveFromWishList = () => {
    wishlist?.data?.forEach((list: IWishlist) => {
      if (list?.book?._id === book?.data?._id) {
        removeFromWishlist(list?._id);

        toast.error('Removed From Wishlist');
      }
    });
  };

  const handleCompleted = () => {
    if (user.email) {
      const options = { userId: data?.data?._id, bookId: book?.data?._id };

      addToCompletedList(options);
      handleRemoveFromAddreadingList();
      handleRemoveFromWishList();
      toast.success('Completed.');
    } else {
      toast.error('Please Login First');
    }
  };
  const handleRemoveFCompleted = () => {
    completedlist?.data?.forEach((list: ICompletelist) => {
      if (list?.book?._id === book?.data?._id) {
        removeFromCompletedList(list?._id);

        toast.error('Removed From CompletedList');
      }
    });
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleAddReview = (data: IReview) => {
    const options = {
      data: data,
      id: id,
    };
    addReview(options);
    toast.success('Review Added. Thanks for your feedback!');
  };
  const handleEditRoute = () => {
    if (currentUser?.data?._id === book?.data?.user) {
      navigate(`/books/edit/${id}`);
    } else {
      toast.error(' Forbidden! You can only edit book that added by you');
    }
  };

  const handleDelete = () => {
    if (currentUser?.data?._id === book?.data?.user) {
      deleteBook(id);
      toast.success('Book Deleted');
      navigate('/allBooks');
    } else {
      toast.error(' Forbidden! You can only Delete book that  added by you');
    }
  };

  const handleDeleteOpenModal = () => {
    setDeleteModalOpen(true);
  };

  const handleDeleteCloseModal = () => {
    setDeleteModalOpen(false);
  };

  // const handleDelete = () => {

  // };
  return (
    <motion.div ref={ref} className=" mb-[50px]">
      <AdditionalPageCover
        isInView={isInView}
        title="Books are a uniquely portable magic"
        author="Stephen King, On Writing: A Memoir of the Craft"
      />

      <div className="container my-[100px] md:px-[100px]">
        <div className="w-full border rounded-md flex flex-col md:flex-row p-2 ">
          <motion.img
            variants={bannerVarient}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            src={`${import.meta.env.VITE_BASE_FOR_FILE}${
              book?.data?.image?.filename
            }`}
            className="md:w-1/3"
          />

          <motion.div
            variants={RecentVarient}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            className="md:w-2/3 p-5 "
          >
            <div className="border-b-2 pb-3">
              {' '}
              <p className="text-xl ">{book?.data?.author}</p>
              <h5 className="text-5xl font-semibold my-2">
                {book?.data?.title}
              </h5>
              <div className="flex justify-between">
                {' '}
                <Review key={book?.data?._id} book={book?.data} />
                <div className="flex ">
                  {' '}
                  {wishlist?.data?.find(
                    (list: IWishlist) => list?.book?._id === book?.data?._id
                  ) && (
                    <BsFillHeartFill
                      onClick={handleRemoveFromWishList}
                      className="text-lg mx-1 text-red-600"
                    ></BsFillHeartFill>
                  )}
                  {!wishlist?.data?.find(
                    (list: IWishlist) => list?.book?._id === book?.data?._id
                  ) && (
                    <AiOutlineHeart
                      onClick={handleAddWishList}
                      className="text-xl mx-1"
                    ></AiOutlineHeart>
                  )}
                  {readinglist?.data?.find(
                    (list: IReadinglist) => list?.book?._id === book?.data?._id
                  ) && (
                    <MdBookmarkAdded
                      onClick={handleRemoveFromAddreadingList}
                      className="text-lg mx-1 text-green-600"
                    ></MdBookmarkAdded>
                  )}
                  {!readinglist?.data?.find(
                    (list: IReadinglist) => list?.book?._id === book?.data?._id
                  ) && (
                    <BiBookAdd
                      onClick={handleAddreadingList}
                      className="text-xl mx-1 text-main"
                    ></BiBookAdd>
                  )}
                  {completedlist?.data?.find(
                    (list: ICompletelist) => list?.book?._id === book?.data?._id
                  ) && (
                    <TiTick
                      onClick={handleRemoveFCompleted}
                      className="text-xl mx-1 text-review"
                    ></TiTick>
                  )}
                  {!completedlist?.data?.find(
                    (list: ICompletelist) => list?.book?._id === book?.data?._id
                  ) && (
                    <TiTickOutline
                      onClick={handleCompleted}
                      className="text-xl mx-1 text-review"
                    ></TiTickOutline>
                  )}
                </div>
              </div>
            </div>
            <p className="p-2 text-justify">
              In the enchanting world of "Arcane Chronicles," a realm where
              magic and mystery intertwine, embark on an epic journey with young
              sorcerer, Aria. Gifted with a long-lost power, she must navigate a
              treacherous quest to restore balance to the warring factions of
              light and darkness. As ancient prophecies unfold, Aria's fate
              becomes entwined with a band of unlikely allies, facing perilous
              trials and unearthing long-buried secrets. With every page turned,
              discover the spellbinding depths of friendship, sacrifice, and the
              unyielding strength of the human spirit. "Arcane Chronicles" will
              ignite your imagination and leave you breathless as you delve into
              a world where destiny lies in the hands of a young heroine, whose
              courage will shape the very fabric of their extraordinary realm.
            </p>
            <div className="flex justify-start items-center ">
              <TiTick className="text-xl"></TiTick>
              <p className="text-lg font-semibold px-3 my-1">
                {' '}
                Author Name:&nbsp; &nbsp; {book?.data?.author}
              </p>
            </div>
            <div className="flex justify-start items-center ">
              <TiTick className="text-xl"></TiTick>
              <p className="text-lg font-semibold px-3 my-1">
                {' '}
                Genre:&nbsp; &nbsp; {book?.data?.genre}
              </p>
            </div>
            <div className="flex justify-start items-center ">
              <TiTick className="text-xl"></TiTick>
              <p className="text-lg font-semibold px-3 my-1">
                {' '}
                Publication Data:&nbsp; &nbsp; {book?.data?.publication_date}
              </p>
            </div>
            <div className="flex flex-col md:flex-row md:items-center md:justify-center justify-start mt-5">
              <a
                href={`${import.meta.env.VITE_BASE_FOR_FILE}${
                  book?.data?.bookPdf?.filename
                }`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <button className="bg-green-600 text-white border border-green-600 w-full md:w-[200px] py-2 rounded-sm m-1 flex justify-center items-center">
                  <FaReadme className="mx-2 "></FaReadme>
                  <span className="mx-2"> Read Now</span>{' '}
                </button>
              </a>
              <button
                onClick={handleOpenModal}
                className="bg-review text-white border border-review w-full md:w-[200px] py-2 rounded-sm m-1 flex justify-center items-center"
              >
                <MdRateReview className="text-lg font-bold "></MdRateReview>
                <span className="mx-2"> Add Review</span>{' '}
              </button>
              <AddReviewModal
                open={isModalOpen}
                onClose={handleCloseModal}
                onAddReview={handleAddReview}
              />
              <button
                onClick={handleEditRoute}
                className="bg-main text-white border border-main w-full md:w-[200px] py-2 rounded-sm m-1 flex justify-center items-center"
              >
                <BiSolidEditAlt className="text-lg font-bold"></BiSolidEditAlt>
                <span className="mx-2"> Edit</span>{' '}
              </button>
              <button
                onClick={handleDeleteOpenModal}
                className="bg-red-600 text-white border border-red-600 w-full md:w-[200px] py-2 rounded-sm m-1 flex justify-center items-center"
              >
                <MdDelete className="text-lg font-bold"></MdDelete>
                <span className="mx-2"> Delete</span>{' '}
              </button>
              {isDeleteModalOpen && (
                <DeleteConfirmationModal
                  onDelete={handleDelete}
                  onCancel={handleDeleteCloseModal}
                />
              )}
            </div>
          </motion.div>
        </div>

        <motion.div
          variants={bannerVarient}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          <h6 className="text-main font-bold mt-10 mb-3 text-2xl">Reviews</h6>
          <div className=" my-4">
            {reviews?.data?.reviews.map((review: IReview) => {
              return (
                <div className="bg-white rounded-lg shadow-md p-4 my-1">
                  <ReviewCard
                    key={review?._id}
                    reviewData={review}
                  ></ReviewCard>
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
