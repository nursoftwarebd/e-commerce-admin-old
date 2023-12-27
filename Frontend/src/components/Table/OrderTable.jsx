import React from "react";
import { HiMagnifyingGlassPlus } from "react-icons/hi2";
import { Link } from "react-router-dom";
import Badges from "../lib/Badges";

const OrderTable = ({ data, handleOrderStatusUpdate, dashboard }) => {
  return (
    <>
      {data?.map((order) => (
        <tr key={order._id} className="hover:bg-gray-50">
          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
            {new Date(order.createdAt).toDateString()}
          </td>
          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 capitalize">
            {order.invoice}
          </td>
          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 capitalize">
            {"test User"}
          </td>
          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 capitalize font-semibold">
            {order.shippingAddress}
          </td>
          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 capitalize font-semibold">
            {order.paymentMethod}
          </td>
          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 capitalize font-semibold">
            {order.total}
          </td>
          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 capitalize">
            {order.status === "pending" ? (
              <Badges title={order.status} color={"accent"} />
            ) : order.status === "complete" ? (
              <Badges title={order.status} color={"success"} />
            ) : order.status === "processing" ? (
              <Badges title={order.status} color={"secondary"} />
            ) : order.status === "delivered" ? (
              <Badges title={order.status} color={"success"} />
            ) : order.status === "cancel" ? (
              <Badges title={order.status} color={"error"} />
            ) : (
              order.status === "deleted" && (
                <Badges title={order.status} color={"error"} />
              )
            )}
          </td>

          {!dashboard && (
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium flex gap-4">
              <div className="relative inline-block">
                <select
                  onChange={(e) =>
                    handleOrderStatusUpdate(e.target.value, order._id)
                  }
                  className="block appearance-none w-full bg-white border border-gray-400 text-gray-400 hover:border-gray-500 px-4 py-1.5 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                >
                  <option value={"pending"}>Pending</option>
                  <option value={"processing"}>Processing</option>
                  <option value={"delivered"}>Delivered</option>
                  <option value={"cancel"}>Cancel</option>
                </select>

                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <svg
                    className="fill-current h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path d="M10 12l-5-5 1.41-1.41L10 9.18l3.59-3.59L15 7l-5 5z" />
                  </svg>
                </div>
              </div>
            </td>
          )}

          <td className="px-6 py-4 text-center whitespace-nowrap text-sm text-gray-900 capitalize font-semibold">
            <Link to={`/order/${order._id}/view`}>
              <HiMagnifyingGlassPlus className="text-2xl" />
            </Link>
          </td>
        </tr>
      ))}
    </>
  );
};

export default OrderTable;
