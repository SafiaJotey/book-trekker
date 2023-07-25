import { auth } from '@/lib/firebase';
import { setUser } from '@/redux/feature/user/userSlice';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { signOut } from 'firebase/auth';
import { toast } from 'react-hot-toast';
import {
  FaFacebookF,
  FaInstagram,
  FaPinterest,
  FaTwitter,
} from 'react-icons/fa';
import { HiMail } from 'react-icons/hi';
import { TiLocation } from 'react-icons/ti';
import { Link } from 'react-router-dom';
import logo from '../assets/images/Book_trekker_logo.png';
export default function Footer() {
  const { user } = useAppSelector((state) => state.user);

  const dispatch = useAppDispatch();

  const handleLogout = () => {
    signOut(auth).then(() => {
      // Sign-out successful.
      dispatch(setUser(null));
      toast.success('successfully logged out');
    });
  };

  return (
    <div>
      <div className="mx-auto px-[50px] bg-[#151b30]">
        <div className=" text-white flex  flex-col md:flex-row p-5">
          <div className="md:w-4/12 p-5">
            <div className="flex md:justify-start justify-center">
              {' '}
              <img src={logo} alt="" />
            </div>

            <p className=" text-center md:text-justify my-2">
              Welcome to Book Treeker, your ultimate destination for avid
              readers to immerse themselves in a vast collection of books and
              explore captivating stories from various genres, all at your
              fingertips.
            </p>
            <div className="flex justify-center md:justify-start items-center my-5">
              <h3>
                <FaFacebookF className="text-xl mx-2"></FaFacebookF>
              </h3>
              <h3>
                <FaTwitter className="text-xl mx-2"></FaTwitter>
              </h3>
              <h3 className="text-xl mx-2">
                <FaInstagram></FaInstagram>
              </h3>
              <h3 className="text-xl mx-2">
                <FaPinterest></FaPinterest>
              </h3>
            </div>
            <div></div>
          </div>
          <div className="md:w-4/12 flex justify-between items-start">
            <div className="w-1/2 p-5">
              <h3 className="font-bold">Important Links</h3>
              <ul className="flex flex-col items-start">
                <li className=" my-2 ">
                  <a>
                    <Link to="/" className="text-white ">
                      Home
                    </Link>
                  </a>
                </li>
                <li className="my-2 ">
                  <a>
                    <Link className="text-white " to="/allBooks">
                      All Books
                    </Link>
                  </a>
                </li>
                <li className="my-2 ">
                  <a>
                    <Link
                      className="text-white  flex justify-center items-center "
                      to="/wishlist"
                    >
                      <span>Wishlist</span>
                    </Link>
                  </a>
                </li>
                <li className="my-2 ">
                  <a>
                    <Link
                      className="text-white  flex justify-center items-center"
                      to="/readinglist"
                    >
                      <span>Readinglist</span>
                    </Link>
                  </a>
                </li>
                <li className="my-2 ">
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
                  <li className="my-2 ">
                    <a>
                      <Link className="text-white" to="/login">
                        Login
                      </Link>
                    </a>
                  </li>
                )}
                {!user.email && (
                  <li className="my-2 ">
                    <a>
                      <Link className="text-white" to="/signup">
                        Sign Up
                      </Link>
                    </a>
                  </li>
                )}
                {user.email && (
                  <li className="my-2  cursor-pointer " onClick={handleLogout}>
                    <a className="text-white  ">Logout</a>
                  </li>
                )}
              </ul>
            </div>
            <div className="w-1/2 p-5">
              <h3 className="font-bold">Related Links</h3>
              <ul>
                <li className="my-2  cursor-pointer ">
                  <a href="https://www.gutenberg.org/">Project Gutenberg</a>
                </li>
                <li className="my-2  cursor-pointer ">
                  <a href="https://www.goodreads.com/">Goodreads</a>
                </li>
                <li className="my-2  cursor-pointer ">
                  <a href="https://librivox.org/">Librivox</a>
                </li>
                <li className="my-2  cursor-pointer ">
                  <a href="https://www.scribd.com/subscribe-now?utm_medium=cpc&utm_source=google_search&utm_campaign=3Q_Google_Search_Beta_Brand_RoW_Other&utm_term=scribd&utm_device=c&gclid=Cj0KCQjw5f2lBhCkARIsAHeTvlhxM_mYA4mIZ_5uJULSZ86cGJySlFf-Oa8VTflS0nYEbXw6mHk2YRIaAqcUEALw_wcB">
                    Scribd
                  </a>
                </li>
                <li className="my-2  cursor-pointer ">
                  <a href="https://www.bookbub.com/">BookHub</a>
                </li>
                <li className="my-2  cursor-pointer ">
                  <a href="https://manybooks.net/">ManyBooks</a>
                </li>
                <li className="my-2  cursor-pointer ">
                  <a href="https://openlibrary.org/">Open Library</a>
                </li>
                <li className="my-2  cursor-pointer ">
                  <a href="https://openlibrary.org/">Curorary</a>
                </li>
              </ul>
            </div>
          </div>
          <div className="md:w-4/12 md:p-5">
            <h3 className="mb-2 font-bold">Subscribe</h3>
            <div className="my-5">
              <input
                className="w-8/12 px-3 py-4 rounded-l-full border text-center "
                type="text"
                placeholder="Enter Your Email"
              />
              <button className="w-4/12   py-4 rounded-r-full text-base font-semibold bg-subsidiary border-2 border-subsidiary">
                Subscribe
              </button>
            </div>
            <p className="text-center md:text-left">
              Sign up for our latest news & articel. We won’t give you spam
              mails.
            </p>{' '}
            <div className="my-5">
              <h3 className="mb-2 text-xl my-2 font-bold text-center md:text-left">
                Contact
              </h3>
              <div className="flex items-start ">
                <TiLocation className="text-xl  mx-1"></TiLocation>{' '}
                <p>Wave, via habro dereinio 2b 52100 Arezo, italy</p>
              </div>
              <div className="flex items-center">
                <HiMail className="text-xl  mx-1"></HiMail>{' '}
                <p>booktrekker@gmail.com</p>
              </div>
            </div>
            <div></div>
          </div>
        </div>
      </div>
      <div className="bg-[#1e263b] text-white flex justify-center py-5">
        <p className="py-5  text-center md:text-left">
          © 2023 BookTrekker By Safia Ahmed. All Rights Reserved
        </p>
      </div>
    </div>
  );
}
