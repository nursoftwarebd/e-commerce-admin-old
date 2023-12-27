import React from "react";
import { HiOutlinePencilSquare, HiOutlineTrash } from "react-icons/hi2";
import { Link } from "react-router-dom";
import useAttributeSubmit from "../../hooks/useAttributeSubmit";
import SwitchButton from "../Forms/SwitchButton";
import DeleteModal from "../lib/DeleteModal";

const AttributeVariantTable = ({ variants, id }) => {
  const {
    servicesId,
    setServicesId,
    isOpenDeleteModal,
    handleCloseDeleteModal,
  } = useAttributeSubmit();

  return (
    <>
      <DeleteModal
        id={servicesId}
        table={"variant"}
        isOpen={isOpenDeleteModal}
        titleLowercase={"variant"}
        handleCloseDeleteModal={handleCloseDeleteModal}
      />

      {variants?.length === 0 ? (
        <tr className="hover:bg-gray-50">
          <td
            className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 text-center"
            colSpan={7}
          >
            <div className="text-sm font-semibold font-sans">
              Variants is Empty
            </div>
          </td>
        </tr>
      ) : (
        variants?.map((variant) => (
          <tr key={variant._id} className="hover:bg-gray-50">
            <td className="px-6 py-4 whitespace-nowrap uppercase text-sm font-medium text-gray-900">
              {variant._id.slice(20, 24)}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              {variant.name}
            </td>

            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              <SwitchButton
                table={"variant"}
                id={variant._id}
                status={variant.status}
              />
            </td>

            <td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <div className="flex gap-3">
                  <div className="relative flex flex-col items-center group cursor-pointer">
                    <Link
                      to={`/attribute/${id}/variants/${variant._id}/edit`}
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
                        setServicesId(variant._id);
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
            </td>
          </tr>
        ))
      )}
    </>
  );
};

export default AttributeVariantTable;
