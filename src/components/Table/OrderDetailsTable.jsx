import React from "react";

const OrderDetailsTable = ({ data }) => {
  return (
    <>
      {/* {data?.map((order) => ( */}
      <tr className="hover:bg-gray-50">
        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
          01
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 capitalize">
          this is my new product
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 capitalize">
          90
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 capitalize font-semibold">
          100
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 capitalize font-semibold">
          9000
        </td>
      </tr>
      {/* ))} */}
    </>
  );
};

export default OrderDetailsTable;
