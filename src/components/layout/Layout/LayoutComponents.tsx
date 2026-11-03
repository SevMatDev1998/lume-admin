import { Sidebar } from '../Sidebar';
import { Header } from '../Header';
import { Outlet } from 'react-router-dom';
import { useState } from "react";

const LayoutComponents = () => {
  const [isShowSideBar, setIsShowSideBar] = useState<boolean>(false);

  return (
    <div className="flex h-screen bg-gray-100 relative">
      <div
        className={`
          ${isShowSideBar ? 'block' : 'hidden'}
          absolute
          top-0
          left-0
          z-50
          w-64
          h-full
          bg-white
          md:static
          md:block
        `}
      >
        <Sidebar  setIsShowSideBar={setIsShowSideBar}/>
      </div>

      <div className="flex flex-1 flex-col overflow-hidden">
        <Header setIsShowSideBar={setIsShowSideBar} />
        <main className="flex-1 overflow-y-auto p-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default LayoutComponents;
