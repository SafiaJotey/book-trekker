import { onAuthStateChanged } from 'firebase/auth';
import { useEffect } from 'react';

import MainLayout from './layouts/MainLayout';
import { auth } from './lib/firebase';
import { setLoading, setUser } from './redux/feature/user/userSlice';
import { useAppDispatch } from './redux/hooks';
import { Toaster } from 'react-hot-toast';

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setLoading(true));

    onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(setUser(user.email!));
        dispatch(setLoading(false));
      } else {
        dispatch(setLoading(false));
      }
    });
  }, [dispatch]);
  return (
    <div>
      <Toaster />
      <MainLayout />
    </div>
  );
}

export default App;
