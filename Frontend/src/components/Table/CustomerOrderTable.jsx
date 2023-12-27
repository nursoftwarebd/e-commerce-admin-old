import React from "react";
import Badges from "../lib/Badges";

const CustomerOrderTable = ({ data }) => {
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
        </tr>
      ))}
    </>
  );
};

export default CustomerOrderTable;
