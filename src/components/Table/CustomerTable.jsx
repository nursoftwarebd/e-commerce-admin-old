import React from "react";
import {
  HiMagnifyingGlassPlus,
  HiOutlinePencilSquare,
  HiOutlineTrash,
} from "react-icons/hi2";
import { Link } from "react-router-dom";
import defaultImage from "../../assets/noImage.jpg";
import useCustomerSubmit from "../../hooks/useCustomerSubmit";
import SwitchButton from "../Forms/SwitchButton";
import DeleteModal from "../lib/DeleteModal";

const CustomerTable = ({ customers }) => {
  const {
    servicesId,
    setServicesId,
    isOpenDeleteModal,
    handleCloseDeleteModal,
  } = useCustomerSubmit();

  return (
    <>
      <DeleteModal
        table={"customer"}
        id={servicesId}
        isOpen={isOpenDeleteModal}
        titleLowercase={"customer"}
        handleCloseDeleteModal={handleCloseDeleteModal}
      />

      {customers?.length === 0 ? (
        <tr className="hover:bg-gray-50">
          <td
            className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 text-center"
            colSpan={7}
          >
            <div className="text-sm font-semibold font-sans">
              Customer is Empty
            </div>
          </td>
        </tr>
      ) : (
        customers?.map((customer) => (
          <tr key={customer._id} className="hover:bg-gray-50">
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
              {customer._id.slice(8, 12)}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              <div className="flex items-center gap-x-2">
                <div className="w-10 h-10 drop-shadow-md p-1">
                  {customer?.image ? (
                    <img
                      src={customer?.image?.Location}
                      className="w-full h-full rounded-full border"
                      alt={customer.name}
                    />
                  ) : customer?.image?.Location ? (
                    <img
                      src={defaultImage}
                      className="w-full h-full rounded-full border"
                      alt={customer.name}
                    />
                  ) : (
                    <img
                      src={defaultImage}
                      className="w-full h-full rounded-full border"
                      alt={customer.name}
                    />
                  )}
                </div>
                {customer.name.length > 10
                  ? customer.name.substring(0, 10) + "..."
                  : customer.name}
              </div>
            </td>

            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              {customer.email}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              {customer.phone}
            </td>

            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                <SwitchButton
                  table={"customer"}
                  id={customer._id}
                  status={customer.status}
                />
              </td>
            </td>

            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium gap-4">
              <div className="flex gap-x-2">
                <div className="relative flex flex-col items-center group cursor-pointer">
                  <Link
                    to={`/customer/${customer._id}/view`}
                    className="text-gray-400 text-lg"
                  >
                    <HiMagnifyingGlassPlus />
                  </Link>

                  <div className="absolute bottom-0 hidden flex-col items-center mb-6 group-hover:flex">
                    <span className="relative z-10 p-2 text-xs leading-none text-white whitespace-no-wrap bg-success-500 shadow-lg">
                      view
                    </span>
                    <div className="w-3 h-3 -mt-2 rotate-45 bg-success-500"></div>
                  </div>
                </div>

                <div className="relative flex flex-col items-center group cursor-pointer">
                  <Link
                    to={`/customer/${customer._id}/edit`}
                    className="text-gray-400 text-lg"
                  >
                    <HiOutlinePencilSquare />
                  </Link>

                  <div className="absolute bottom-0 hidden flex-col items-center mb-6 group-hover:flex">
                    <span className="relative z-10 p-2 text-xs leading-none text-white whitespace-no-wrap bg-success-500 shadow-lg">
                      Edit
                    </span>
                    <div className="w-3 h-3 -mt-2 rotate-45 bg-success-500"></div>
                  </div>
                </div>

                <div className="relative flex flex-col items-center group cursor-pointer">
                  <button
                    onClick={() => {
                      handleCloseDeleteModal();
                      setServicesId(customer._id);
                    }}
                    className="text-gray-400 text-lg"
                  >
                    <HiOutlineTrash />
                  </button>

                  <div className="absolute bottom-0 hidden flex-col items-center mb-6 group-hover:flex">
                    <span className="relative z-10 p-2 text-xs leading-none text-white whitespace-no-wrap bg-error-500 shadow-lg">
                      Delete
                    </span>
                    <div className="w-3 h-3 -mt-2 rotate-45 bg-error-500"></div>
                  </div>
                </div>
              </div>
            </td>
          </tr>
        ))
      )}
    </>
  );
};

export default CustomerTable;
