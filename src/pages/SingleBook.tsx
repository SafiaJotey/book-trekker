import AdditionalPageCover from '@/components/ui/AdditionalPageCover';
import { AiOutlineHeart } from 'react-icons/ai';
// import { BsFillHeartFill } from 'react-icons/bs';
import Review from '@/components/Review';
import {
  useDeleteBookMutation,
  useSingleBookQuery,
} from '@/redux/feature/books/bookApi';
import { useGetUserQuery } from '@/redux/feature/user/userApi';
import { useAppSelector } from '@/redux/hooks';
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

  const { data: currentUser } = useGetUserQuery(user?.email);
  const [deleteBook] = useDeleteBookMutation();
  const handleEditRoute = () => {
    if (currentUser?.data?._id === book?.data?.user) {
      navigate(`/books/edit/${id}`);
    } else {
      toast.error(' Forbidden! You can only edit book that have added');
    }
  };
  const handleDelete = () => {
    if (currentUser?.data?._id === book?.data?.user) {
      deleteBook(id);
      toast.error('Book Deleted');
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

      <div className="container my-[100px] px-[100px]">
        <div className="w-full border rounded-md flex p-2 ">
          <img src={book?.data?.image} className="w-1/3" />

          <div className="w-2/3 p-5 ">
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
            <div className="flex justify-start mt-5">
              <button className="bg-main text-white border border-main w-[200px] py-2 rounded-sm m-1 flex justify-center items-center">
                <BiSolidEditAlt className="text-lg font-bold"></BiSolidEditAlt>
                <span className="mx-2" onClick={handleEditRoute}>
                  {' '}
                  Edit
                </span>{' '}
              </button>
              <button className="bg-red-600 text-white border border-red-600 w-[200px] py-2 rounded-sm m-1 flex justify-center items-center">
                <MdDelete className="text-lg font-bold"></MdDelete>
                <span className="mx-2" onClick={handleDelete}>
                  {' '}
                  Delete
                </span>{' '}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
