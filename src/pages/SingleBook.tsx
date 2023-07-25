import AdditionalPageCover from '@/components/ui/AdditionalPageCover';
import { AiOutlineHeart } from 'react-icons/ai';
import { MdRateReview } from 'react-icons/md';
// import { BsFillHeartFill } from 'react-icons/bs';
import Review from '@/components/Review';
import AddReviewModal from '@/components/ui/AddModalReview';
import ReviewCard from '@/components/ui/ReviewCard';
import {
  useAddReviewMutation,
  useDeleteBookMutation,
  useGetReviewsQuery,
  useSingleBookQuery,
} from '@/redux/feature/books/bookApi';
import { useGetUserQuery } from '@/redux/feature/user/userApi';
import { useAppSelector } from '@/redux/hooks';
import { IReview } from '@/types/globalTypes';
import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { BiSolidEditAlt } from 'react-icons/bi';
import { MdDelete } from 'react-icons/md';
import { TiTick } from 'react-icons/ti';
import { useNavigate, useParams } from 'react-router-dom';
export default function SingleBook() {
  const { id } = useParams();
  const { data: book } = useSingleBookQuery(id);
  const { user } = useAppSelector((state) => state.user);
  const navigate = useNavigate();
  const { data: reviews } = useGetReviewsQuery(id);

  const { data: currentUser } = useGetUserQuery(user?.email);
  const [addReview] = useAddReviewMutation();
  const [deleteBook] = useDeleteBookMutation();
  const [isModalOpen, setIsModalOpen] = useState(false);

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
      toast.success('Book Edited');
      navigate(`/books/edit/${id}`);
    } else {
      toast.error(' Forbidden! You can only edit book that have added');
    }
  };
  const handleDelete = () => {
    if (currentUser?.data?._id === book?.data?.user) {
      deleteBook(id);
      toast.success('Book Deleted');
      navigate('/allBooks');
    } else {
      toast.error(' Forbidden! You can only Delete book that have added');
    }
  };
  return (
    <div className=" mb-[50px]">
      <AdditionalPageCover
        title="Books are a uniquely portable magic"
        author="Stephen King, On Writing: A Memoir of the Craft"
      />

      <div className="container my-[100px] md:px-[100px]">
        <div className="w-full border rounded-md flex flex-col md:flex-row p-2 ">
          <img src={book?.data?.image} className="md:w-1/3" />

          <div className="md:w-2/3 p-5 ">
            <div className="border-b-2 pb-3">
              {' '}
              <p className="text-xl ">{book?.data?.author}</p>
              <h5 className="text-5xl font-semibold my-2">
                {book?.data?.title}
              </h5>
              <div className="flex justify-between">
                {' '}
                <Review key={book?.data?._id} book={book?.data} />
                <AiOutlineHeart size={25}></AiOutlineHeart>
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
              <button
                onClick={handleOpenModal}
                className="bg-review text-white border border-review md:w-[200px] py-2 rounded-sm m-1 flex justify-center items-center"
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
                className="bg-main text-white border border-main md:w-[200px] py-2 rounded-sm m-1 flex justify-center items-center"
              >
                <BiSolidEditAlt className="text-lg font-bold"></BiSolidEditAlt>
                <span className="mx-2"> Edit</span>{' '}
              </button>
              <button
                onClick={handleDelete}
                className="bg-red-600 text-white border border-red-600 md:w-[200px] py-2 rounded-sm m-1 flex justify-center items-center"
              >
                <MdDelete className="text-lg font-bold"></MdDelete>
                <span className="mx-2"> Delete</span>{' '}
              </button>
            </div>
          </div>
        </div>

        <div>
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
        </div>
      </div>
    </div>
  );
}
