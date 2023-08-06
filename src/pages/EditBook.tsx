import AdditionalPageCover from '@/components/ui/AdditionalPageCover';
import {
  useSingleBookQuery,
  useUpdateBookMutation,
} from '@/redux/feature/books/bookApi';
import { useGetUserQuery } from '@/redux/feature/user/userApi';
import { useAppSelector } from '@/redux/hooks';
import { IAddBookInput } from '@/types/globalTypes';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';

import editbookImage from '../assets/images/addBook.png';
import { useParams } from 'react-router-dom';
export default function EditBook() {
  const { id } = useParams();
  const { data: book } = useSingleBookQuery(id);
  const { user } = useAppSelector((state) => state.user);


  const { data: currentUser } = useGetUserQuery(user?.email);
  const [updateBook] = useUpdateBookMutation();
  const { register, handleSubmit } = useForm<IAddBookInput>({
    defaultValues: {
      title: book?.data?.title,
      author: book?.data?.author,
      genre: book?.data?.genre,
      publication_date: book?.data?.publication_date,
      image: book?.data?.image,
    },
  });

  const onSubmit: SubmitHandler<Partial<IAddBookInput>> = (data) => {
    if (currentUser?.data?._id === book?.data?.user) {
      data.user = currentUser.data?._id;

      const options = {
        data: data,
        id: book?.data?._id,
      };

      updateBook(options);
      toast.success(' Book updated ');
    } else {
      toast.error(' Forbidden! You can only edit book that have added');
    }
  };
  return (
    <div className=" ">
      <AdditionalPageCover
        title="Reading is an active, imaginative act; it takes work."
        author="―Khaled Hosseinis"
      />
      <div className="container py-[10px] px-[80px] my-5">
        <div className="flex  flex-col ">
          <div className="my-[20px]">
            {' '}
            <h6 className="text-lg font-semibold  ">By The Authors</h6>
            <h3 className="text-4xl font-bold ">Edit The Book</h3>
          </div>{' '}
          <div className="flex justify-between items-center">
            <div className="bg-white w-1/2 p-[20px] rounded-md">
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
                  <button
                    className="bg-green-600 text-white border border-green-600 mt-8 mb-3 w-[200px] py-2 rounded-sm m-1 flex justify-center items-center"
                    type="submit"
                  >
                    <span className="mx-2">update Book</span>{' '}
                  </button>
                </div>
              </form>
            </div>
            <div>
              <img src={editbookImage} />
            </div>
          </div>
        </div>{' '}
      </div>{' '}
    </div>
  );
}
