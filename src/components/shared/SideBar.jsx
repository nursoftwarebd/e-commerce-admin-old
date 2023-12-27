import { BiCategory, BiMessageSquareAdd } from "react-icons/bi";
import { HiOutlineTicket, HiShoppingBag } from "react-icons/hi";
import { HiOutlineTag, HiOutlineUserCircle } from "react-icons/hi2";
import { RiLayoutGridFill, RiListUnordered } from "react-icons/ri";
import CustomLink from "../../components/lib/CustomLink";

const SideBar = ({ handleCloseSidebar }) => {
  return (
    <div className="fixed w-64 h-full bg-white z-40">
      <div className=" mt-6 mb-14 pl-12">
        <picture>
          <img
            className="w-32 h-auto"
            src="https://dashtar-admin.vercel.app/static/media/logo-dark.acf69e90.svg"
            alt="company logo"
          />
        </picture>
      </div>
      <div className="flex flex-col">
        <CustomLink onClick={handleCloseSidebar} to="/">
          {" "}
          <button className="flex items-center gap-2">
            <RiLayoutGridFill className="text-xl" /> <span>Dashboard</span>
          </button>
        </CustomLink>
        <CustomLink onClick={handleCloseSidebar} to="/orders">
          <button className="flex items-center gap-2">
            <RiListUnordered className="text-xl" /> <span>Orders</span>
          </button>
        </CustomLink>
        <CustomLink onClick={handleCloseSidebar} to="/products">
          <button className="flex items-center gap-2">
            <HiShoppingBag className="text-xl" /> <span>Products</span>
          </button>
        </CustomLink>
        <CustomLink onClick={handleCloseSidebar} to="/category">
          <button className="flex items-center gap-2">
            <BiCategory className="text-xl" /> <span>Category</span>
          </button>
        </CustomLink>
        <CustomLink onClick={handleCloseSidebar} to="/customer">
          <button className="flex items-center gap-2">
            <HiOutlineUserCircle className="text-xl" /> <span>Customer</span>
          </button>
        </CustomLink>
        <CustomLink onClick={handleCloseSidebar} to="/attribute">
          <button className="flex items-center gap-2">
            <HiOutlineTag className="text-xl" /> <span>Attribute</span>
          </button>
        </CustomLink>{" "}
        <CustomLink onClick={handleCloseSidebar} to="/banner">
          <button className="flex items-center gap-2">
            <BiMessageSquareAdd className="text-xl" /> <span>Banner</span>
          </button>
        </CustomLink>{" "}
        <CustomLink onClick={handleCloseSidebar} to="/coupons">
          <button className="flex items-center gap-2">
            <HiOutlineTicket className="text-xl" /> <span>Coupons</span>
          </button>
        </CustomLink>
      </div>
    </div>
  );
};

export default SideBar;
