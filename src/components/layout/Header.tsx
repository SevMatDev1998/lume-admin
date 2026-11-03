import { LogOut, Menu } from 'lucide-react';
import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import useAppDispatch from '../../hooks/useAppDisaptch';
import useAppSelector from '../../hooks/useAppSelector';
import useModal from '../../hooks/useModal';
import { logOut } from '../../store/slices/auth.slice';
import SignOutModal from '../../modals/SignOutModal';
import RouteEnum from '../../enums/route.enum';
import { clientName } from '../../utils/format';

interface IHeader {
  setIsShowSideBar: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Header: FC<IHeader> = ({ setIsShowSideBar }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const open = useModal();
  const user = useAppSelector((state) => state.auth.user);

  const handleLogOut = () => {
    open(SignOutModal, {
      onSubmit: () => {
        dispatch(logOut());
        navigate(RouteEnum.LOGIN);
      },
    });
  };

  return (
    <header className="bg-white shadow">
      <div className="flex h-16 items-center justify-between px-4">
        <button
          onClick={() => setIsShowSideBar((prev) => !prev)}
          className="rounded-full p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 md:hidden"
          aria-label="Menu"
        >
          <Menu className="h-6 w-6" />
        </button>
        <div className="ml-auto flex items-center gap-4">
          {user && <span className="hidden text-sm text-gray-600 sm:inline">{clientName(user)}</span>}
          <button
            onClick={handleLogOut}
            className="rounded-full p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500"
            aria-label="Sign out"
          >
            <LogOut className="h-6 w-6" />
          </button>
        </div>
      </div>
    </header>
  );
};
