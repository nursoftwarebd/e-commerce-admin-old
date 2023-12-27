import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Navbar from "../components/shared/Navbar";
import SideBar from "../components/shared/SideBar";

const Layout = () => {
  return (
    <>
      <ToastContainer />

      <Navbar />
      <div className="hidden lg:block z-30">
        <SideBar />
      </div>
      <main className="pt-16 bg-gray-50 lg:pl-64 min-h-screen">
        <div className="p-3 md:p-4 lg:p-6">
          <Outlet />
        </div>
      </main>
    </>
  );
};

export default Layout;
