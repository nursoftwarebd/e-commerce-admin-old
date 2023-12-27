import React from "react";
import {
  HiOutlineMagnifyingGlassPlus,
  HiOutlinePencilSquare,
  HiOutlineTrash,
} from "react-icons/hi2";
import { Link } from "react-router-dom";
import defaultImage from "../../assets/noImage.jpg";
import useCategorySubmit from "../../hooks/useCategorySubmit";
import SwitchButton from "../Forms/SwitchButton";
import DeleteModal from "../lib/DeleteModal";

const CategoryTable = ({ categories, subCategory }) => {
  const {
    servicesId,
    setServicesId,
    isOpenDeleteModal,
    handleCloseDeleteModal,
  } = useCategorySubmit();

  return (
    <>
      <DeleteModal
        id={servicesId}
        table={"category"}
        isOpen={isOpenDeleteModal}
        titleLowercase={"category"}
        handleCloseDeleteModal={handleCloseDeleteModal}
      />

      {categories?.length === 0 ? (
        <tr className="hover:bg-gray-50">
          <td
            className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 text-center"
            colSpan={7}
          >
            <div className="text-sm font-semibold font-sans">
              Category is Empty
            </div>
          </td>
        </tr>
      ) : (
        categories?.map((category) => (
          <tr key={category._id} className="hover:bg-gray-50">
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
              {category._id.slice(8, 12)}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              <div className="flex items-center gap-x-2">
                <div className="w-10 h-10 drop-shadow-md p-1">
                  {category?.image ? (
                    <img
                      src={category?.image?.Location}
                      className="w-full h-full rounded-full border"
                      alt={category.name}
                    />
                  ) : category?.image?.Location ? (
                    <img
                      src={defaultImage}
                      className="w-full h-full rounded-full border"
                      alt={category.name}
                    />
                  ) : (
                    <img
                      src={defaultImage}
                      className="w-full h-full rounded-full border"
                      alt={category.name}
                    />
                  )}
                </div>
                {category.name}
              </div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              {category.description}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              {category?.parentCategory?.name}
            </td>

            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              {category.status === "show" ? (
                <span className="inline-flex items-center rounded-md bg-success-50 px-2  py-1 text-xs font-medium text-success-700 ring-1 ring-inset ring-success-600/20">
                  {category.status}
                </span>
              ) : (
                <span className="inline-flex items-center rounded-md bg-error-50 px-2  py-1 text-xs font-medium text-error-700 ring-1 ring-inset ring-error-600/20">
                  {category.status}
                </span>
              )}
            </td>

            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              <SwitchButton
                table={"category"}
                id={category._id}
                status={category.status}
              />
            </td>

            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
              <div className="flex justify-center gap-4">
                {category.children.length !== 0 && (
                  <div className="relative flex flex-col items-center group cursor-pointer">
                    <Link
                      to={
                        subCategory
                          ? `/category/${category.parentId}/${category._id}/sub/sub-category`
                          : `/category/${category._id}/sub-category`
                      }
                      className="text-gray-400 text-lg"
                    >
                      <HiOutlineMagnifyingGlassPlus />
                    </Link>

                    <div className="absolute bottom-0 hidden flex-col items-center mb-6 group-hover:flex">
                      <span className="relative z-10 p-2 text-xs leading-none text-white whitespace-no-wrap bg-primary-500 shadow-lg">
                        view
                      </span>
                      <div className="w-3 h-3 -mt-2 rotate-45 bg-primary-500"></div>
                    </div>
                  </div>
                )}

                <div className="relative flex flex-col items-center group cursor-pointer">
                  <Link
                    to={`/category/${category._id}/edit`}
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

                {category.children.length === 0 && (
                  <div className="relative flex flex-col items-center group cursor-pointer">
                    <button
                      onClick={() => {
                        handleCloseDeleteModal();
                        setServicesId(category._id);
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
                )}
              </div>
            </td>
          </tr>
        ))
      )}
    </>
  );
};

export default CategoryTable;
