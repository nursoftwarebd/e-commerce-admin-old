import React from "react";
import { BsCheckLg, BsFillCreditCard2BackFill } from "react-icons/bs";
import { FaCarSide } from "react-icons/fa";
import { FiShoppingCart } from "react-icons/fi";
import { HiOutlineSquare3Stack3D } from "react-icons/hi2";
import { MdSync } from "react-icons/md";

const OrderOverview = () => {
  return (
    <div>
      <div className="grid lg:grid-cols-3 gap-5 mb-6">
        <div className="bg-primary-900 rounded-[8px] p-6 text-white text-center space-y-2 shadow-custom">
          <HiOutlineSquare3Stack3D className="mx-auto text-3xl" />
          <p className="text-lg">Today Order</p>
          <h2 className="text-3xl font-semibold">৳450.00</h2>
        </div>
        <div className="bg-gray-500 rounded-[8px] p-6 text-white text-center space-y-2 shadow-custom">
          <FiShoppingCart className="mx-auto text-3xl" />
          <p className="text-lg">This Month</p>
          <h2 className="text-3xl font-semibold">৳1550.80</h2>
        </div>
        <div className="bg-secondary-400 rounded-[8px] p-6 text-white text-center space-y-2 shadow-custom">
          <BsFillCreditCard2BackFill className="mx-auto text-3xl" />
          <p className="text-lg">Total Order</p>
          <h2 className="text-3xl font-semibold">৳25450.00</h2>
        </div>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mb-6">
        <div className="bg-white rounded-[8px] p-6 text-gray-600 shadow-custom">
          <div className="flex items-center gap-4">
            <div className="bg-accent-100 p-4 rounded-full">
              <FiShoppingCart className="text-3xl text-error-500" />
            </div>
            <div>
              <p className="text-sm">Total Order</p>
              <h2 className="text-2xl font-semibold">460</h2>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-[8px] p-6 text-gray-600 shadow-custom">
          <div className="flex items-center gap-4">
            <div className="bg-primary-100 p-4 rounded-full">
              <MdSync className="text-3xl text-secondary-500" />
            </div>
            <div>
              <p className="text-sm">Order Pending</p>
              <h2 className="text-2xl font-semibold">130</h2>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-[8px] p-6 text-gray-600 shadow-custom">
          <div className="flex items-center gap-4">
            <div className="bg-success-100 p-4 rounded-full">
              <FaCarSide className="text-3xl text-success-800" />
            </div>
            <div>
              <p className="text-sm">Order Processing</p>
              <h2 className="text-2xl font-semibold">50</h2>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-[8px] p-6 text-gray-600 shadow-custom">
          <div className="flex items-center gap-4">
            <div className="bg-success-100 p-4 rounded-full">
              <BsCheckLg className="text-3xl text-success-500" />
            </div>
            <div>
              <p className="text-sm">Order Delivered</p>
              <h2 className="text-2xl font-semibold">260</h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderOverview;
