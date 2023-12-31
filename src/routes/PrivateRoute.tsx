import { useAppSelector } from '@/redux/hooks';
import Spinner from '@/shared/Spinner';
import { IProps } from '@/types/globalTypes';

import { Navigate, useLocation } from 'react-router-dom';

export default function PrivateRoute({ children }: IProps) {
  const { user, isLoading } = useAppSelector((state) => state.user);
  const { pathname } = useLocation();
  const savedEmail = localStorage.getItem('userEmail');
  console.log(savedEmail);

  if (isLoading) {
    return <Spinner></Spinner>;
  }

  if (savedEmail) {
  
    return children;
  }
  if (!user.email && !isLoading) {
    return <Navigate to="/login" state={{ path: pathname }} />;
  }
  return children;
}
