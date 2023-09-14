import { headerVarient } from '@/animates/home';
import { auth } from '@/lib/firebase';
import { useGetUserQuery } from '@/redux/feature/user/userApi';
import { setUser } from '@/redux/feature/user/userSlice';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { signOut } from 'firebase/auth';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { AiOutlineLogout } from 'react-icons/ai';
import { BiBookReader } from 'react-icons/bi';
import { MdOutlineWavingHand } from 'react-icons/md';
import { TbUserHeart } from 'react-icons/tb';
import { TiTick } from 'react-icons/ti';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/images/Book_trekker_logo.png';

export default function Navbar() {
  const { user } = useAppSelector((state) => state.user);
  const { data } = useGetUserQuery(user?.email);
  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  const handleLogout = () => {
    signOut(auth).then(() => {
      localStorage.removeItem('userEmail');
      // Sign-out successful.
      dispatch(setUser(null));
      toast.success('successfully logged out');
      navigate('/');
    });
  };
  const [isOpen, setIsOpen] = useState(false);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className=" bg-main py-1 md:fixed md:w-full z-50">
      <motion.div
        variants={headerVarient}
        initial="hidden"
        animate="visible"
        className="container mx-auto"
      >
        <div className="flex items-center justify-between">
          <div className="w-20 ">
            <Link className="text-white" to="/">
              {' '}
              <img src={logo} />
            </Link>
          </div>
          <motion.div
            variants={headerVarient}
            initial="hidden"
            animate="visible"
            className="md:hidden"
          >
            <button
              className="text-white focus:outline-none"
              onClick={toggleNavbar}
            >
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                {isOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16m-7 6h7"
                  />
                )}
              </svg>
            </button>
          </motion.div>
          <div className="hidden md:flex space-x-4">
            <ul className="flex  items-center">
              <li className=" mx-3">
                <a>
                  <Link to="/" className="text-white">
                    Home
                  </Link>
                </a>
              </li>
              <li className=" mx-3">
                <a>
                  <Link className="text-white" to="/allBooks">
                    All Books
                  </Link>
                </a>
              </li>
              <li className="my-1  mx-3">
                <a>
                  <Link className="text-white " to="/addBook">
                    Add Book
                  </Link>
                </a>
              </li>
              <li className=" mx-3">
                <a>
                  <Link className="text-white  text-xl" to="/wishlist">
                    <TbUserHeart></TbUserHeart>
                  </Link>
                </a>
              </li>
              <li className=" mx-3">
                <a>
                  <Link className="text-white  text-xl" to="/readinglist">
                    <BiBookReader></BiBookReader>
                  </Link>
                </a>
              </li>
              <li className=" mx-3">
                <a>
                  <Link className="text-white  text-xl" to="/completelist">
                    <TiTick></TiTick>
                  </Link>
                </a>
              </li>
              {!user.email && (
                <li className=" mx-3">
                  <a>
                    <Link className="text-white" to="/login">
                      Login
                    </Link>
                  </a>
                </li>
              )}
              {!user.email && (
                <li className=" mx-3">
                  <a>
                    <Link className="text-white" to="/signup">
                      Sign Up
                    </Link>
                  </a>
                </li>
              )}
              {user.email && (
                <>
                  <li className=" mx-3 cursor-pointer " onClick={handleLogout}>
                    <a className="text-white  text-xl">
                      <AiOutlineLogout></AiOutlineLogout>
                    </a>
                  </li>
                  <li className="flex justify-center items-center font-bold py-1 px-2 rounded-sm">
                    <MdOutlineWavingHand className="text-base text-white mx-1 "></MdOutlineWavingHand>
                    <span className="text-base text-white mr-2 ">Hi</span>
                    <a className="text-white  ">
                      {' '}
                      {data?.data?.firstName.charAt(0).toUpperCase() +
                        data?.data?.firstName.slice(1)}
                    </a>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
        {isOpen && (
          <div className="mt-4 md:hidden">
            <ul className="flex flex-col items-start">
              <li className="my-1  mx-3">
                <a>
                  <Link to="/" className="text-white ">
                    Home
                  </Link>
                </a>
              </li>
              <li className="my-1  mx-3">
                <a>
                  <Link className="text-white " to="/allBooks">
                    All Books
                  </Link>
                </a>
              </li>
              <li className="my-1  mx-3">
                <a>
                  <Link className="text-white " to="/addBook">
                    Add Book
                  </Link>
                </a>
              </li>
              <li className="my-1  mx-3">
                <a>
                  <Link
                    className="text-white  flex justify-center items-center "
                    to="/wishlist"
                  >
                    <span>Wishlist</span>
                  </Link>
                </a>
              </li>
              <li className="my-1  mx-3">
                <a>
                  <Link
                    className="text-white  flex justify-center items-center"
                    to="/readinglist"
                  >
                    <span>Readinglist</span>
                  </Link>
                </a>
              </li>
              <li className="my-1  mx-3">
                <a>
                  <Link
                    className="text-white  flex justify-center items-center"
                    to="/completelist"
                  >
                    <span>Completelist</span>
                  </Link>
                </a>
              </li>
              {!user.email && (
                <li className="my-1  mx-3">
                  <a>
                    <Link className="text-white" to="/login">
                      Login
                    </Link>
                  </a>
                </li>
              )}
              {!user.email && (
                <li className=" mx-3 my-1 ">
                  <a>
                    <Link className="text-white" to="/signup">
                      Sign Up
                    </Link>
                  </a>
                </li>
              )}
              {user.email && (
                <>
                  <li className="flex justify-center items-center font-bold py-1 px-2 rounded-sm">
                    <MdOutlineWavingHand className="text-base text-white mx-1 "></MdOutlineWavingHand>
                    <span className="text-base text-white mr-2 ">Hi</span>
                    <a className="text-white  ">
                      {' '}
                      {data?.data?.firstName.charAt(0).toUpperCase() +
                        data?.data?.firstName.slice(1)}
                    </a>
                  </li>
                  <li
                    className=" mx-3 my-1 cursor-pointer "
                    onClick={handleLogout}
                  >
                    <a className="text-white  ">Logout</a>
                  </li>
                </>
              )}
            </ul>
          </div>
        )}
      </motion.div>
    </nav>
  );
}
