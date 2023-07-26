import AdditionalPageCover from '@/components/ui/AdditionalPageCover';
import Header from '@/components/ui/Header';
import { useAddBookMutation } from '@/redux/feature/books/bookApi';
import { useGetUserQuery } from '@/redux/feature/user/userApi';
import { useAppSelector } from '@/redux/hooks';
import { IAddBookInput } from '@/types/globalTypes';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import book from '../assets/images/addBook.png';
export default function AddBook() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IAddBookInput>();
  const [addBook] = useAddBookMutation();
  const { user } = useAppSelector((state) => state.user);
  const navigate = useNavigate();
  const { data: currentUser } = useGetUserQuery(user?.email);
  const onSubmit: SubmitHandler<IAddBookInput> = (data) => {
    data.user = currentUser.data?._id;
    console.log(data);
    addBook(data);
    reset();
    toast.success(' Book Added ');

    navigate('/allBooks');
  };
  return (
    <div className=" ">
      <AdditionalPageCover
        title="Reading is an active, imaginative act; it takes work."
        author="Khaled Hosseinis"
      />
      <div className="container py-[10px] md:px-[80px] my-5">
        <div className="flex  flex-col ">
          <div className="my-[20px]">
            {' '}
            <Header header="Add A New Book" subHeader="By The Authors"></Header>
          </div>{' '}
          <div className="flex flex-col md:flex-row justify-center items-center md:justify-between md:items-start">
            <div className="bg-white md:w-1/2 p-[20px] rounded-md">
              <form onSubmit={handleSubmit(onSubmit)}>
                <label>Book's Image *</label>
                <input
                  className="w-full p-2 border rounded-md my-1"
                  placeholder="Enter  Books's image link"
                  {...register('image', {
                    required: true,
                  })}
                />{' '}
                {errors?.image && errors?.image.type === 'required' && (
                  <small className="text-red-600">
                    {' '}
                    This field is required
                  </small>
                )}
                <br />
                <label>Title</label>
                <input
                  className="w-full p-2 border rounded-md my-1"
                  placeholder="Add A Title"
                  {...register('title', {
                    required: true,
                  })}
                />
                {errors?.title && errors?.title?.type === 'required' && (
                  <small className="text-red-600">
                    {' '}
                    This field is required
                  </small>
                )}
                <br />
                <label>Athor</label>
                <input
                  className="w-full p-2 border rounded-md my-1"
                  placeholder="Author Name"
                  {...register('author', {
                    required: true,
                  })}
                />
                {errors?.author && errors?.author?.type === 'required' && (
                  <small className="text-red-600">
                    {' '}
                    This field is required
                  </small>
                )}
                <br />
                <label>Genre</label>
                <input
                  className="w-full p-2 border rounded-md my-1"
                  placeholder="genre"
                  {...register('genre', {
                    required: true,
                  })}
                />
                {errors?.genre && errors?.genre?.type === 'required' && (
                  <small className="text-red-600">
                    {' '}
                    This field is required
                  </small>
                )}
                <br />
                <label>Date</label>
                <input
                  className="w-full p-2 border rounded-md my-1"
                  placeholder="eg: July 11, 1960 "
                  {...register('publication_date', {
                    required: true,
                    pattern:
                      /^(January|February|March|April|May|June|July|August|September|October|November|December)\s*\d{1,2},?\s*\d{4}$/i,
                  })}
                />
                {errors?.publication_date &&
                  (errors?.publication_date?.type === 'pattern' ? (
                    <small className="text-red-600">
                      please maintin the pattern eg: July 11, 1960
                    </small>
                  ) : (
                    <small className="text-red-600">
                      {' '}
                      This field is required
                    </small>
                  ))}
                <br />
                <div className="flex justify-center">
                  {' '}
                  <button className="bg-green-600 text-white border border-green-600 mt-8 mb-3 md:w-[200px] py-2 rounded-sm m-1 flex justify-center items-center">
                    <span className="mx-2"> Add Book</span>{' '}
                  </button>
                </div>
              </form>
            </div>
            <div>
              <img src={book} />
            </div>
          </div>
        </div>{' '}
      </div>{' '}
    </div>
  );
}
