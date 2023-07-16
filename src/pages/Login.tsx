import { IFormLoginInput } from '@/types/globalTypes';
import { SubmitHandler, useForm } from 'react-hook-form';
import { BiSolidHome } from 'react-icons/bi';
import { IoMdLogIn } from 'react-icons/io';
import { Link } from 'react-router-dom';
import auth from '../assets/images/auth.jpg';
export default function Login() {
  const { register, handleSubmit } = useForm<IFormLoginInput>();
  const onSubmit: SubmitHandler<IFormLoginInput> = (data) => console.log(data);
  return (
    <div className="container px-[250px]   h-screen  flex  justify-center items-center">
      <div className="shadow-md w-full flex  justify-center items-center rounded-lg  ">
        <div className="w-6/12 h-[560px] ">
          <img className="h-full w-full" src={auth} />
        </div>
        <div className="w-6/12 px-12 flex flex-col items-center">
          <div className=" w-full flex justify-end">
            <Link to="/">
              <BiSolidHome classname="bg-main text-5xl my-2"></BiSolidHome>
            </Link>
          </div>
          <h3 className="text-2xl text-main font-bold my-8">
            Login To Explore more
          </h3>
          <form onSubmit={handleSubmit(onSubmit)}>
            <label>Email</label>
            <input
              className="w-full p-2 border rounded-md my-1"
              placeholder="Enter Your Email"
              {...register('email', {
                required: true,

                pattern: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/i,
              })}
            />
            <br />
            <label>Password</label>
            <input
              className="w-full p-2 border rounded-md my-1"
              placeholder="Enter Your Password"
              {...register('password', {
                required: true,
                pattern:
                  /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,15}$/i,
              })}
            />
            <div className="flex justify-center">
              {' '}
              <button className="bg-green-600 text-white border border-green-600 mt-8 mb-3 w-[200px] py-2 rounded-sm m-1 flex justify-center items-center">
                <IoMdLogIn className="text-lg font-bold"></IoMdLogIn>
                <span className="mx-2"> Login</span>{' '}
              </button>
            </div>
            <div className="flex justify-center">
              <small>
                New To The Website?{' '}
                <span className=" underline decoration-solid">
                  <Link className="text-blue-500 font-bold " to="/signup">
                    Create an account
                  </Link>
                </span>
              </small>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
