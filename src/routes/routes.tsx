import App from '@/App';
import AddBook from '@/pages/AddBook';
import AllBooks from '@/pages/AllBooks';
import EditBook from '@/pages/EditBook';
import Home from '@/pages/Home';
import Login from '@/pages/Login';
import NotFound from '@/pages/NotFound';
import Reading from '@/pages/ReadingList';
import SingleBook from '@/pages/SingleBook';
import WishList from '@/pages/Wishlist';
import { createBrowserRouter } from 'react-router-dom';
import Signup from '../pages/Signup';
import PrivateRoute from './PrivateRoute';

const routes = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: '/allBooks',
        element: <AllBooks />,
      },
      {
        path: '/books/:id',
        element: (
          <PrivateRoute>
            <SingleBook />
          </PrivateRoute>
        ),
      },
      {
        path: '/addBook',
        element: (
          <PrivateRoute>
            <AddBook />
          </PrivateRoute>
        ),
      },
      {
        path: '/books/edit/:id',
        element: (
          <PrivateRoute>
            <EditBook />
          </PrivateRoute>
        ),
      },
      {
        path: '/wishlist',
        element: (
          <PrivateRoute>
            <WishList />
          </PrivateRoute>
        ),
      },
      {
        path: '/readingList',
        element: (
          <PrivateRoute>
            {' '}
            <Reading />
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/signup',
    element: <Signup />,
  },

  {
    path: '*',
    element: <NotFound />,
  },
]);

export default routes;
