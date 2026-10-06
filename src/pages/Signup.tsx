import { RecentVarient, headerVarient } from '@/animates/home';
import { useCreateNewUserMutation } from '@/redux/feature/user/userApi';
import { createUser } from '@/redux/feature/user/userSlice';
import { useAppDispatch } from '@/redux/hooks';
import { IFormSignupInput } from '@/types/globalTypes';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast, Toaster } from 'react-hot-toast';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { BiArrowBack, BiEnvelope, BiLockAlt, BiUser } from 'react-icons/bi';
import { CgSpinner } from 'react-icons/cg';
import { Link, useNavigate } from 'react-router-dom';
import auth from '../assets/images/auth.jpg';

export default function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [createNewUser, { isLoading }] = useCreateNewUserMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormSignupInput>();

  const onSubmit: SubmitHandler<IFormSignupInput> = async (data) => {
    try {
      dispatch(createUser({ email: data.email, password: data.password }));
      
      const options = {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        password: data.password,
      };

      await createNewUser(options).unwrap();
      toast.success('Successfully created your account!');
      navigate('/');
    } catch {
      toast.error('Failed to create account. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50/60 flex items-center justify-center p-4 md:p-8">
      {/* Central Auth Container */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-4xl bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden grid grid-cols-1 md:grid-cols-2"
      >
        {/* Left Side: Hero Image & Overlay */}
        <div className="relative hidden md:block overflow-hidden bg-slate-900 min-h-[620px]">
          <motion.img
            variants={RecentVarient}
            initial="hidden"
            animate="visible"
            src={auth}
            alt="Library Bookshelf"
            className="w-full h-full object-cover opacity-85 transition-transform duration-700 hover:scale-105"
          />
          {/* Subtle gradient overlay with quote */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-900/30 to-transparent flex flex-col justify-end p-8 text-white">
            <span className="text-xs uppercase tracking-widest text-slate-300 font-semibold mb-2">
              Join Our Community
            </span>
            <p className="text-xl font-serif italic text-white/95 leading-relaxed">
              “There is no friend as loyal as a book.”
            </p>
            <p className="text-xs text-slate-300 mt-2 font-medium">
              — Ernest Hemingway
            </p>
          </div>
        </div>

        {/* Right Side: Signup Form */}
        <motion.div
          variants={headerVarient}
          initial="hidden"
          animate="visible"
          className="p-8 sm:p-10 flex flex-col justify-between"
        >
          {/* Top Bar: Return to Home */}
          <div className="flex justify-between items-center mb-4">
            <Link
              to="/"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-main transition-colors group"
            >
              <BiArrowBack className="text-base transition-transform group-hover:-translate-x-1" />
              <span>Back to Home</span>
            </Link>
          </div>

          {/* Form Header */}
          <div className="mb-5">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Create an account
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Start building your personal library today.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-3.5">
            {/* First Name & Last Name (Side-by-side) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1">
                  First Name *
                </label>
                <div className="relative flex items-center">
                  <BiUser className="absolute left-3.5 text-slate-400 text-lg pointer-events-none" />
                  <input
                    type="text"
                    placeholder="John"
                    className={`w-full pl-10 pr-3 py-2 bg-slate-50 border rounded-xl text-sm placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 transition-all ${
                      errors.firstName
                        ? 'border-red-400 focus:ring-red-200'
                        : 'border-slate-200 focus:border-main focus:ring-main/20'
                    }`}
                    {...register('firstName', {
                      required: 'First name is required',
                    })}
                  />
                </div>
                {errors.firstName && (
                  <p className="text-red-500 text-[11px] mt-1 font-medium">
                    {errors.firstName.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1">
                  Last Name
                </label>
                <div className="relative flex items-center">
                  <BiUser className="absolute left-3.5 text-slate-400 text-lg pointer-events-none" />
                  <input
                    type="text"
                    placeholder="Doe"
                    className={`w-full pl-10 pr-3 py-2 bg-slate-50 border rounded-xl text-sm placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 transition-all ${
                      errors.lastName
                        ? 'border-red-400 focus:ring-red-200'
                        : 'border-slate-200 focus:border-main focus:ring-main/20'
                    }`}
                    {...register('lastName', {
                      required: 'Last name is required',
                    })}
                  />
                </div>
                {errors.lastName && (
                  <p className="text-red-500 text-[11px] mt-1 font-medium">
                    {errors.lastName.message}
                  </p>
                )}
              </div>
            </div>

            {/* Email Field */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1">
                Email Address *
              </label>
              <div className="relative flex items-center">
                <BiEnvelope className="absolute left-3.5 text-slate-400 text-lg pointer-events-none" />
                <input
                  type="email"
                  placeholder="name@example.com"
                  className={`w-full pl-10 pr-4 py-2 bg-slate-50 border rounded-xl text-sm placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 transition-all ${
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
                <p className="text-red-500 text-[11px] mt-1 font-medium">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1">
                Password *
              </label>
              <div className="relative flex items-center">
                <BiLockAlt className="absolute left-3.5 text-slate-400 text-lg pointer-events-none" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  className={`w-full pl-10 pr-11 py-2 bg-slate-50 border rounded-xl text-sm placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 transition-all ${
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
                <p className="text-red-500 text-[11px] mt-1 font-medium">
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
                  <span>Creating Account...</span>
                </>
              ) : (
                <>
                  <BiUser className="text-lg" />
                  <span>Create Account</span>
                </>
              )}
            </button>
          </form>

          {/* Bottom Switcher */}
          <div className="mt-6 text-center pt-4 border-t border-slate-100">
            <p className="text-xs sm:text-sm text-slate-500">
              Already have an account?{' '}
              <Link
                to="/login"
                className="font-semibold text-main hover:underline transition-all"
              >
                Sign In
              </Link>
            </p>
          </div>
        </motion.div>
      </motion.div>
      <Toaster />
    </div>
  );
}