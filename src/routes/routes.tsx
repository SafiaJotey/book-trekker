import App from '@/App';
import AddBook from '@/pages/AddBook';
import AllBooks from '@/pages/AllBooks';
import Home from '@/pages/Home';
import Login from '@/pages/Login';
import NotFound from '@/pages/NotFound';
import SingleBook from '@/pages/SingleBook';
import { createBrowserRouter } from 'react-router-dom';
import Signup from '../pages/Signup';

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
        path: '/singleBook',
        element: <SingleBook />,
      },
      {
        path: '/addBook',
        element: <AddBook />,
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
