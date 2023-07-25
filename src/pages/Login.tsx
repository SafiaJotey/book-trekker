import { loginUser } from '@/redux/feature/user/userSlice';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import Spinner from '@/shared/Spinner';
import { IFormLoginInput } from '@/types/globalTypes';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { BiSolidHome } from 'react-icons/bi';
import { IoMdLogIn } from 'react-icons/io';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import auth from '../assets/images/auth.jpg';
export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location?.state?.path || '/';

  const { register, handleSubmit } = useForm<IFormLoginInput>();

  const { user, isLoading } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  const onSubmit = (data: IFormLoginInput) => {
    dispatch(loginUser({ email: data.email, password: data.password }));
  };

  useEffect(() => {
    if (user.email && !isLoading) {
      navigate(from);
      setTimeout(() => {
        toast.success('Successfully Logged in.');
      }, 1000);
    }
  }, [user.email, isLoading, navigate, from]);
  return (
    <div className="container md:px-[250px]   h-screen  flex  justify-center items-center">
      {!isLoading ? (
        <div className="shadow-md  w-full flex flex-col md:flex-row justify-center items-center rounded-lg  ">
          <div className="md:w-6/12 h-[560px] ">
            <img className="h-full w-full" src={auth} />
          </div>
          <div className="md:w-6/12 px-12 flex flex-col items-center">
            <div className=" w-full flex justify-end">
              <Link to="/">
                <BiSolidHome className="text-main text-3xl my-2"></BiSolidHome>
              </Link>
            </div>
            <h3 className="text-2xl text-main font-bold my-8 text-center md:text-left">
              Login To Explore more
            </h3>
            <form onSubmit={handleSubmit(onSubmit)}>
              <label>Email</label>
              <input
                className="w-full p-2 border rounded-md my-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter Your Email"
                {...register('email', {
                  required: true,

                  pattern: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/i,
                })}
              />
              <br />
              <label>Password</label>
              <input
                className="w-full p-2 border  rounded-md my-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
      ) : (
        <Spinner></Spinner>
      )}
    </div>
  );
}
