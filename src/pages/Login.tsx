import { RecentVarient, headerVarient } from '@/animates/home';
import { loginUser } from '@/redux/feature/user/userSlice';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { IFormLoginInput } from '@/types/globalTypes';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { BiArrowBack, BiLockAlt, BiEnvelope } from 'react-icons/bi';
import { CgSpinner } from 'react-icons/cg';
import { IoMdLogIn } from 'react-icons/io';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import auth from '../assets/images/auth.jpg';

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location?.state?.path || '/';

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormLoginInput>();

  const { user, isLoading, isError, error } = useAppSelector(
    (state) => state.user
  );
  const dispatch = useAppDispatch();

  const onSubmit: SubmitHandler<IFormLoginInput> = (data: IFormLoginInput) => {
    dispatch(loginUser({ email: data.email, password: data.password }));
  };

  useEffect(() => {
    if (isError) {
      toast.error('Invalid email or password.');
    }
    if (user.email && !isLoading) {
      localStorage.setItem('userEmail', user.email);
      navigate(from);
      setTimeout(() => {
        toast.success('Successfully logged in!');
      }, 500);
    }
  }, [user.email, isLoading, navigate, from, isError, error]);

  return (
    <div className="min-h-screen bg-slate-50/60 flex items-center justify-center p-4 md:p-8">
      {/* Central Auth Container */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-4xl bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden grid grid-cols-1 md:grid-cols-2"
      >
        {/* Left Side: Editorial Image & Overlay */}
        <div className="relative hidden md:block overflow-hidden bg-slate-900 min-h-[580px]">
          <motion.img
            variants={RecentVarient}
            initial="hidden"
            animate="visible"
            src={auth}
            alt="Books & Library"
            className="w-full h-full object-cover opacity-85 transition-transform duration-700 hover:scale-105"
          />
          {/* Subtle gradient overlay & quote */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-900/30 to-transparent flex flex-col justify-end p-8 text-white">
            <span className="text-xs uppercase tracking-widest text-slate-300 font-semibold mb-2">
              Welcome to BookStore
            </span>
            <p className="text-xl font-serif italic text-white/95 leading-relaxed">
              “A reader lives a thousand lives before he dies.”
            </p>
            <p className="text-xs text-slate-300 mt-2 font-medium">
              — George R.R. Martin
            </p>
          </div>
        </div>

        {/* Right Side: Form */}
        <motion.div
          variants={headerVarient}
          initial="hidden"
          animate="visible"
          className="p-8 sm:p-12 flex flex-col justify-between"
        >
          {/* Top Bar: Return to Home */}
          <div className="flex justify-between items-center mb-6">
            <Link
              to="/"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-main transition-colors group"
            >
              <BiArrowBack className="text-base transition-transform group-hover:-translate-x-1" />
              <span>Back to Home</span>
            </Link>
          </div>

          {/* Form Header */}
          <div className="mb-6">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Welcome back
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Please enter your details to sign in to your bookshelf.
            </p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Email Field */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
                Email Address
              </label>
              <div className="relative flex items-center">
                <BiEnvelope className="absolute left-3.5 text-slate-400 text-lg pointer-events-none" />
                <input
                  type="email"
                  placeholder="name@example.com"
                  className={`w-full pl-10 pr-4 py-2.5 bg-slate-50 border rounded-xl text-sm placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 transition-all ${
                    errors.email
                      ? 'border-red-400 focus:ring-red-200'
                      : 'border-slate-200 focus:border-main focus:ring-main/20'
                  }`}
                  {...register('email', {
                    required: 'Email is required',
                    pattern: {
                      value: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/i,
                      message: 'Please enter a valid email address',
                    },
                  })}
                />
              </div>
              {errors.email && (
                <p className="text-red-500 text-xs mt-1 font-medium">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password Field */}
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="text-xs font-semibold uppercase tracking-wider text-slate-700">
                  Password
                </label>
              </div>
              <div className="relative flex items-center">
                <BiLockAlt className="absolute left-3.5 text-slate-400 text-lg pointer-events-none" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  className={`w-full pl-10 pr-11 py-2.5 bg-slate-50 border rounded-xl text-sm placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 transition-all ${
                    errors.password
                      ? 'border-red-400 focus:ring-red-200'
                      : 'border-slate-200 focus:border-main focus:ring-main/20'
                  }`}
                  {...register('password', {
                    required: 'Password is required',
                    pattern: {
                      value:
                        /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,15}$/i,
                      message:
                        'Must be 7-15 chars, with at least 1 digit & 1 symbol',
                    },
                  })}
                />
                {/* Toggle Password Visibility */}
                <button
                  type="button"
                  tabIndex={-1}
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-3 text-slate-400 hover:text-slate-600 focus:outline-none p-1"
                >
                  {showPassword ? (
                    <AiOutlineEyeInvisible className="text-lg" />
                  ) : (
                    <AiOutlineEye className="text-lg" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-500 text-xs mt-1 font-medium">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full mt-4 flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-main text-white font-semibold text-sm shadow-md shadow-main/20 hover:brightness-105 active:scale-[0.98] transition-all disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
            >
              {isLoading ? (
                <>
                  <CgSpinner className="animate-spin text-lg" />
                  <span>Signing In...</span>
                </>
              ) : (
                <>
                  <IoMdLogIn className="text-lg" />
                  <span>Sign In</span>
                </>
              )}
            </button>
          </form>

          {/* Bottom Call to Action */}
          <div className="mt-8 text-center pt-4 border-t border-slate-100">
            <p className="text-xs sm:text-sm text-slate-500">
              Don't have an account?{' '}
              <Link
                to="/signup"
                className="font-semibold text-main hover:underline transition-all"
              >
                Create an account
              </Link>
            </p>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}