import React from "react";
import {
  HiOutlineMagnifyingGlassPlus,
  HiOutlinePencilSquare,
  HiOutlineTrash,
} from "react-icons/hi2";
import { Link } from "react-router-dom";
import useProductSubmit from "../../hooks/useProductSubmit";
import SwitchButton from "../Forms/SwitchButton";
import Badges from "../lib/Badges";
import DeleteModal from "../lib/DeleteModal";

const ProductTable = ({ data }) => {
  const {
    servicesId,
    setServicesId,
    isOpenDeleteModal,
    handleCloseDeleteModal,
  } = useProductSubmit();

  return (
    <>
      <DeleteModal
        id={servicesId}
        table={"product"}
        isOpen={isOpenDeleteModal}
        titleLowercase={"product"}
        handleCloseDeleteModal={handleCloseDeleteModal}
      />

      {data.map((product) => (
        <tr key={product._id} className="hover:bg-gray-50">
          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 flex items-center gap-2">
            <img
              className="w-8 h-8 rounded-full hidden md:block"
              src={product?.images[0]?.Location}
              alt=""
            />
            <span className="capitalize">
              {product?.name?.substring(0, 15)}
            </span>
          </td>
          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 capitalize">
            {product?.category?.name}
          </td>
          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 capitalize">
            {product.price}
          </td>
          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 capitalize font-semibold">
            {product.salePrice}
          </td>
          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 capitalize font-semibold">
            {product.stock}
          </td>
          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 capitalize font-semibold">
            {product.status === "show" ? (
              <Badges title={product.status} color={"success"} />
            ) : (
              <Badges title={product.status} color={"error"} />
            )}
          </td>
          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 capitalize font-semibold">
            <SwitchButton
              id={product._id}
              table={"product"}
              status={product.status}
            />
          </td>

          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 capitalize font-semibold">
            <SwitchButton
              id={product._id}
              table={"productFeatured"}
              status={product.featured}
            />
          </td>

          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
            <div className="flex gap-4">
              <div className="relative flex flex-col items-center group">
                <Link
                  to={`/product/${product._id}/view`}
                  className="text-gray-400 text-lg"
                >
                  <HiOutlineMagnifyingGlassPlus />
                </Link>
                <div className="absolute bottom-0 flex-col items-center hidden mb-6 group-hover:flex">
                  <span className="relative z-10 p-2 text-xs leading-none text-white whitespace-no-wrap bg-success-500 shadow-lg">
                    View
                  </span>
                  <div className="w-3 h-3 -mt-2 rotate-45 bg-success-500"></div>
                </div>
              </div>

              <div className="relative flex flex-col items-center group cursor-pointer">
                <Link
                  to={`/product/${product._id}/edit`}
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

              <div className="relative flex flex-col items-center group">
                <button
                  onClick={() => {
                    handleCloseDeleteModal();
                    setServicesId(product._id);
                  }}
                  className="text-gray-400 text-lg"
                >
                  <HiOutlineTrash />
                </button>
                <div className="absolute bottom-0 flex-col items-center hidden mb-6 group-hover:flex">
                  <span className="relative z-10 p-2 text-xs leading-none text-white whitespace-no-wrap bg-error-500 shadow-lg">
                    Delete
                  </span>
                  <div className="w-3 h-3 -mt-2 rotate-45 bg-error-500"></div>
                </div>
              </div>
            </div>
          </td>
        </tr>
      ))}
    </>
  );
};

export default ProductTable;
