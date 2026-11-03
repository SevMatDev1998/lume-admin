import React, { FC } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { CalendarDays, Inbox, LayoutDashboard, Package, Users } from 'lucide-react';
import RouteEnum from '../../enums/route.enum';

const NAVIGATION = [
  { name: 'Dashboard', href: RouteEnum.HOME, icon: LayoutDashboard },
  { name: 'Inquiries', href: RouteEnum.INQUIRIES, icon: Inbox },
  { name: 'Bookings', href: RouteEnum.BOOKINGS, icon: CalendarDays },
  { name: 'Products', href: RouteEnum.PRODUCTS, icon: Package },
  { name: 'Users', href: RouteEnum.USERS, icon: Users },
];

interface ISideBar {
  setIsShowSideBar: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Sidebar: FC<ISideBar> = ({ setIsShowSideBar }) => (
  <div className="flex h-full w-64 flex-col bg-midnight-abyss">
    <Link to={RouteEnum.HOME} className="flex h-16 items-center justify-center gap-2 border-b border-black-pearl">
      <span className="text-xl font-extrabold tracking-[0.2em] text-white">LUME</span>
      <span className="text-xs text-blizzard-blue">Admin</span>
    </Link>
    <nav className="flex-1 space-y-1 px-2 py-4">
      {NAVIGATION.map(({ name, href, icon: Icon }) => (
        <NavLink
          key={name}
          to={href}
          end={href === RouteEnum.HOME}
          className={({ isActive }) =>
            `flex items-center rounded-md border-l-2 px-2 py-2 text-sm font-medium transition-colors ${
              isActive
                ? 'border-blizzard-blue bg-bice-blue/20 text-blizzard-blue'
                : 'border-transparent text-gray-300 hover:bg-black-pearl hover:text-white'
            }`
          }
          onClick={() => setIsShowSideBar(false)}
        >
          <Icon className="mr-3 h-5 w-5" />
          {name}
        </NavLink>
      ))}
    </nav>
  </div>
);
