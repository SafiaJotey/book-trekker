import App from '@/App';
import AllBooks from '@/pages/AllBooks';
import Home from '@/pages/Home';
import NotFound from '@/pages/NotFound';
import SingleBook from '@/pages/SingleBook';
import { createBrowserRouter } from 'react-router-dom';

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
    ],
  },

  {
    path: '*',
    element: <NotFound />,
  },
]);

export default routes;
