import { Link } from 'react-router-dom';
import logo from '../assets/images/Book_trekker_logo.png';

export default function Navbar() {
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
                  <Link className="text-white" to="/">
                    Login
                  </Link>
                </a>
              </li>
              <li className=" mx-3">
                <a>
                  <Link className="text-white" to="/">
                    Sign Up
                  </Link>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}
