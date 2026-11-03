import { FC, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { getJwtToken } from '../../../utils/tokenUtil';
import { useGetInfoQuery } from '../../../services/auth/auth.service';
import useAppSelector from '../../../hooks/useAppSelector';
import useAppDispatch from '../../../hooks/useAppDisaptch';
import { isAdmin, logOut } from '../../../store/slices/auth.slice';
import RouteEnum from '../../../enums/route.enum';
import { Loader } from '../../public/Loader';
import LayoutComponents from './LayoutComponents';

export const Layout: FC = () => {
  const dispatch = useAppDispatch();
  const token = getJwtToken();
  const user = useAppSelector((state) => state.auth.user);
  const { isError } = useGetInfoQuery(undefined, { skip: !token });
  const isForbidden = !!user && !isAdmin(user);

  useEffect(() => {
    if (!isForbidden) return;
    toast.error('This account has no access to the admin panel');
    dispatch(logOut());
  }, [isForbidden, dispatch]);

  if (!token || isError || isForbidden) return <Navigate to={RouteEnum.LOGIN} replace />;
  if (!user) return <Loader />;

  return <LayoutComponents />;
};
