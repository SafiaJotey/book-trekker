import { auth } from '@/lib/firebase';
import { setUser } from '@/redux/feature/user/userSlice';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { signOut } from 'firebase/auth';
import { AiOutlineLogout } from 'react-icons/ai';
import { BiBookReader } from 'react-icons/bi';
import { TbUserHeart } from 'react-icons/tb';
import { Link } from 'react-router-dom';
import logo from '../assets/images/Book_trekker_logo.png';

export default function Navbar() {
  const { user } = useAppSelector((state) => state.user);
  console.log(user);

  const dispatch = useAppDispatch();

  const handleLogout = () => {
    console.log('Logout');
    signOut(auth).then(() => {
      // Sign-out successful.
      dispatch(setUser(null));
    });
  };
  return (
    <nav className="w-full h-30 fixed top  z-10  ">
      <div className="h-full w-full bg-[#003461] p-1 container">
        <div className="flex items-center justify-between w-full md:max-w-7xl h-full mx-auto ">
          <div className="w-20 ">
            <Link className="text-white" to="/home">
              {' '}
              <img src={logo} />
            </Link>
          </div>
          <div>
            <ul className="flex items-center">
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
              <li className=" mx-3">
                <a>
                  <Link className="text-white font-bold text-xl" to="/wishlist">
                    <TbUserHeart></TbUserHeart>
                  </Link>
                </a>
              </li>
              <li className=" mx-3">
                <a>
                  <Link
                    className="text-white font-bold text-xl"
                    to="/readinglist"
                  >
                    <BiBookReader></BiBookReader>
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
                <li className=" mx-3 cursor-pointer " onClick={handleLogout}>
                  <a className="text-white font-bold text-xl">
                    <AiOutlineLogout></AiOutlineLogout>
                  </a>
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}
