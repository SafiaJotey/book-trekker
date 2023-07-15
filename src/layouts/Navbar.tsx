import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="w-full h-16 fixed top backdrop-blur-lg z-10 ">
      <div className="h-full w-full bg-[#003461]">
        <div className="flex items-center justify-between w-full md:max-w-7xl h-full mx-auto ">
          <div>
            <Link className="text-white" to="/home">
              {' '}
              Book Trekker
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
                  <Link className="text-white" to="/">
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
