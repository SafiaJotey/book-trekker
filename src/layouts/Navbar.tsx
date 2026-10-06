import { headerVarient } from '@/animates/home';
import { auth } from '@/lib/firebase';
import { useGetUserQuery } from '@/redux/feature/user/userApi';
import { setUser } from '@/redux/feature/user/userSlice';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { signOut } from 'firebase/auth';
import { AnimatePresence, motion } from 'framer-motion';
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

  const [isOpen, setIsOpen] = useState(false);

  const toggleNavbar = () => setIsOpen((prev) => !prev);
  const closeNavbar = () => setIsOpen(false);

  const handleLogout = () => {
    signOut(auth).then(() => {
      localStorage.removeItem('userEmail');
      dispatch(setUser(null));
      toast.success('Successfully logged out');
      closeNavbar();
      navigate('/');
    });
  };

  // Safe formatting for user's name
  const rawFirstName = data?.data?.firstName;
  const displayName = rawFirstName
    ? rawFirstName.charAt(0).toUpperCase() + rawFirstName.slice(1)
    : user?.displayName || 'Reader';

  return (
    <nav className="sticky top-0 left-0 w-full z-50 bg-main/95 backdrop-blur-md border-b border-white/10 shadow-sm transition-all">
      <motion.div
        variants={headerVarient}
        initial="hidden"
        animate="visible"
        className="container mx-auto px-4 sm:px-6 lg:px-8"
      >
        <div className="flex items-center justify-between h-16 md:h-20">
          
          {/* Logo */}
          <Link to="/" onClick={closeNavbar} className="flex items-center gap-2">
            <img
              src={logo}
              alt="Book Trekker Logo"
              className="h-10 md:h-12 w-auto object-contain transition-transform hover:scale-105"
            />
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center space-x-6">
            <Link
              to="/"
              className="text-white/85 hover:text-white text-sm font-medium transition-colors"
            >
              Home
            </Link>
            <Link
              to="/allBooks"
              className="text-white/85 hover:text-white text-sm font-medium transition-colors"
            >
              All Books
            </Link>
            <Link
              to="/addBook"
              className="text-white/85 hover:text-white text-sm font-medium transition-colors"
            >
              Add Book
            </Link>

            {/* Quick List Status Icons (Wishlist, Reading, Completed) */}
            <div className="flex items-center space-x-1 pl-2 border-l border-white/15">
              <Link
                to="/wishlist"
                title="Wishlist"
                className="p-2 text-white/80 hover:text-white hover:bg-white/10 rounded-full transition-all"
              >
                <TbUserHeart className="text-xl" />
              </Link>
              <Link
                to="/readinglist"
                title="Reading List"
                className="p-2 text-white/80 hover:text-white hover:bg-white/10 rounded-full transition-all"
              >
                <BiBookReader className="text-xl" />
              </Link>
              <Link
                to="/completelist"
                title="Completed Books"
                className="p-2 text-white/80 hover:text-white hover:bg-white/10 rounded-full transition-all"
              >
                <TiTick className="text-xl" />
              </Link>
            </div>

            {/* Auth Buttons / User Profile */}
            <div className="flex items-center space-x-3 pl-3 border-l border-white/15">
              {!user?.email ? (
                <>
                  <Link
                    to="/login"
                    className="text-white/90 hover:text-white text-sm font-medium px-3 py-1.5 transition-colors"
                  >
                    Login
                  </Link>
                  <Link
                    to="/signup"
                    className="px-4 py-1.5 rounded-full bg-white text-main font-semibold text-sm shadow-sm hover:bg-white/90 active:scale-95 transition-all"
                  >
                    Sign Up
                  </Link>
                </>
              ) : (
                <div className="flex items-center space-x-3">
                  {/* Greeting Pill */}
                  <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-white text-xs md:text-sm font-medium border border-white/15">
                    <MdOutlineWavingHand className="text-amber-300 text-sm" />
                    <span>Hi,</span>
                    <span className="font-semibold">{displayName}</span>
                  </div>

                  {/* Logout Action */}
                  <button
                    type="button"
                    onClick={handleLogout}
                    title="Log Out"
                    className="p-2 text-white/80 hover:text-red-300 hover:bg-red-500/10 rounded-full transition-all"
                  >
                    <AiOutlineLogout className="text-xl" />
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Mobile Menu Hamburger Button */}
          <div className="flex md:hidden">
            <button
              type="button"
              onClick={toggleNavbar}
              aria-label="Toggle Navigation Menu"
              className="p-2 rounded-lg text-white hover:bg-white/10 focus:outline-none transition-colors"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
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
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Animated Dropdown */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="md:hidden overflow-hidden border-t border-white/10 py-4"
            >
              <div className="flex flex-col space-y-2">
                <Link
                  to="/"
                  onClick={closeNavbar}
                  className="px-3 py-2 rounded-lg text-white font-medium hover:bg-white/10 transition-colors"
                >
                  Home
                </Link>
                <Link
                  to="/allBooks"
                  onClick={closeNavbar}
                  className="px-3 py-2 rounded-lg text-white font-medium hover:bg-white/10 transition-colors"
                >
                  All Books
                </Link>
                <Link
                  to="/addBook"
                  onClick={closeNavbar}
                  className="px-3 py-2 rounded-lg text-white font-medium hover:bg-white/10 transition-colors"
                >
                  Add Book
                </Link>

                {/* Mobile Quick-Links */}
                <div className="py-2 my-2 border-y border-white/10 flex flex-col space-y-1">
                  <Link
                    to="/wishlist"
                    onClick={closeNavbar}
                    className="flex items-center gap-3 px-3 py-2 rounded-lg text-white/90 hover:bg-white/10"
                  >
                    <TbUserHeart className="text-xl" />
                    <span>Wishlist</span>
                  </Link>
                  <Link
                    to="/readinglist"
                    onClick={closeNavbar}
                    className="flex items-center gap-3 px-3 py-2 rounded-lg text-white/90 hover:bg-white/10"
                  >
                    <BiBookReader className="text-xl" />
                    <span>Reading List</span>
                  </Link>
                  <Link
                    to="/completelist"
                    onClick={closeNavbar}
                    className="flex items-center gap-3 px-3 py-2 rounded-lg text-white/90 hover:bg-white/10"
                  >
                    <TiTick className="text-xl" />
                    <span>Completed List</span>
                  </Link>
                </div>

                {/* Mobile User Profile & Auth */}
                {!user?.email ? (
                  <div className="pt-2 flex flex-col gap-2">
                    <Link
                      to="/login"
                      onClick={closeNavbar}
                      className="w-full text-center py-2.5 rounded-xl border border-white/20 text-white font-medium hover:bg-white/10 transition-colors"
                    >
                      Login
                    </Link>
                    <Link
                      to="/signup"
                      onClick={closeNavbar}
                      className="w-full text-center py-2.5 rounded-xl bg-white text-main font-bold hover:bg-white/90 transition-colors"
                    >
                      Sign Up
                    </Link>
                  </div>
                ) : (
                  <div className="pt-2 flex flex-col gap-3">
                    <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/10 text-white text-sm font-medium">
                      <MdOutlineWavingHand className="text-amber-300 text-lg" />
                      <span>Hi, {displayName}</span>
                    </div>
                    <button
                      type="button"
                      onClick={handleLogout}
                      className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-red-500/20 text-red-200 hover:bg-red-500/30 font-medium transition-colors"
                    >
                      <AiOutlineLogout className="text-lg" />
                      <span>Log Out</span>
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </nav>
  );
}