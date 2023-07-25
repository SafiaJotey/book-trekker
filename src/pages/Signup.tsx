import { useCreateNewUserMutation } from '@/redux/feature/user/userApi';
import { createUser } from '@/redux/feature/user/userSlice';
import { useAppDispatch } from '@/redux/hooks';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Toaster, toast } from 'react-hot-toast';
import { BiSolidHome, BiSolidUser } from 'react-icons/bi';
import { Link, useNavigate } from 'react-router-dom';
import auth from '../assets/images/auth.jpg';
import { IFormSignupInput } from '../types/globalTypes';

export default function Signup() {
  const navigate = useNavigate();
  const [createNewUser] = useCreateNewUserMutation();

  const dispatch = useAppDispatch();
  const { register, handleSubmit } = useForm<IFormSignupInput>();
  const onSubmit: SubmitHandler<IFormSignupInput> = (data) => {
    dispatch(createUser({ email: data.email, password: data.password }));
    const options = {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      password: data.password,
    };

    createNewUser(options);

    navigate('/');
    setTimeout(() => {
      toast.success('Successfully Signed Up.');
    }, 1000);
  };
  return (
    <div className="container md:px-[250px]   h-screen  flex  justify-center items-center">
      <div className="shadow-md  w-full flex flex-col md:flex-row justify-center items-center rounded-lg  ">
        <div className="md:w-6/12 h-[560px]  ">
          <img className="h-full w-full" src={auth} />
        </div>
        <div className="md:w-6/12 px-12 flex flex-col items-center">
          <div className=" w-full flex justify-end">
            <Link to="/">
              <BiSolidHome className="text-main text-3xl my-2"></BiSolidHome>
            </Link>
          </div>
          <h3 className="text-2xl text-main font-bold my-8 text-center md:text-left">
            Create A New Account
          </h3>
          <form onSubmit={handleSubmit(onSubmit)}>
            <label>First Name *</label>
            <input
              className="w-full p-2 border rounded-md my-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter Your First Name"
              {...register('firstName', {
                required: true,
                maxLength: 20,
                pattern: /^[A-Za-z]+$/i,
              })}
            />
            <br />
            <label>Last Name</label>
            <input
              className="w-full p-2 border  rounded-md my-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter Your Last Name"
              {...register('lastName', {
                required: true,
                maxLength: 20,
                pattern: /^[A-Za-z]+$/i,
              })}
            />
            <br />
            <label>Email</label>
            <input
              className="w-full p-2 border  rounded-md my-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                <BiSolidUser className="text-lg font-bold"></BiSolidUser>
                <span className="mx-2"> Create Account</span>{' '}
              </button>
            </div>
            <div className="flex justify-center">
              <small>
                Already have an account?{' '}
                <span className=" underline decoration-solid">
                  <Link className="text-blue-500 font-bold " to="/login">
                    Login
                  </Link>
                </span>
              </small>
            </div>
          </form>
        </div>
      </div>
      <Toaster />
    </div>
  );
}
