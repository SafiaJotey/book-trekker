import AdditionalPageCover from '@/components/ui/AdditionalPageCover';
import { useAddBookMutation } from '@/redux/feature/books/bookApi';
import { useGetUserQuery } from '@/redux/feature/user/userApi';
import { useAppSelector } from '@/redux/hooks';
import { IAddBookInput } from '@/types/globalTypes';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import book from '../assets/images/addBook.png';
import Header from '@/components/ui/Header';
export default function AddBook() {
  const { register, handleSubmit, reset } = useForm<IAddBookInput>();
  const [addBook] = useAddBookMutation();
  const { user } = useAppSelector((state) => state.user);
  const { data: currentUser } = useGetUserQuery(user?.email);
  const onSubmit: SubmitHandler<IAddBookInput> = (data) => {
    data.user = currentUser.data?._id;
    console.log(data);
    addBook(data);
    toast.success(' Book Added ');
    reset();
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
          <div className="flex flex-col justify-center items-center md:justify-between md:items-center">
            <div className="bg-white md:w-1/2 p-[20px] rounded-md">
              <form onSubmit={handleSubmit(onSubmit)}>
                <label>book's Image *</label>
                <input
                  className="w-full p-2 border rounded-md my-1"
                  placeholder="Enter  Books's image link"
                  {...register('image', {
                    required: true,
                  })}
                />
                <br />
                <label>Title</label>
                <input
                  className="w-full p-2 border rounded-md my-1"
                  placeholder="Add A Title"
                  {...register('title', {
                    required: true,
                    maxLength: 100,
                    pattern: /^[A-Za-z]+$/i,
                  })}
                />
                <br />
                <label>Athor</label>
                <input
                  className="w-full p-2 border rounded-md my-1"
                  placeholder="Author Name"
                  {...register('author', {
                    required: true,
                    maxLength: 100,
                    pattern: /^[A-Za-z]+$/i,
                  })}
                />
                <br />
                <label>Genre</label>
                <input
                  className="w-full p-2 border rounded-md my-1"
                  placeholder="genre"
                  {...register('genre', {
                    required: true,
                    maxLength: 100,
                    pattern: /^[A-Za-z]+$/i,
                  })}
                />
                <br />
                <label>Date</label>
                <input
                  className="w-full p-2 border rounded-md my-1"
                  placeholder="eg: July 11, 1960 "
                  {...register('publication_date', {
                    required: true,
                  })}
                />
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
