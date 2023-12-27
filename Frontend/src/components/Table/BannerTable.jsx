import React from "react";
import { HiOutlinePencilSquare, HiOutlineTrash } from "react-icons/hi2";
import { Link } from "react-router-dom";
import defaultImage from "../../assets/noImage.jpg";
import useBannerSubmit from "../../hooks/useBannerSubmit";
import SwitchButton from "../Forms/SwitchButton";
import DeleteModal from "../lib/DeleteModal";

const BannerTable = ({ banners }) => {
  const {
    servicesId,
    setServicesId,
    isOpenDeleteModal,
    handleCloseDeleteModal,
  } = useBannerSubmit();

  return (
    <>
      <DeleteModal
        table={"banner"}
        id={servicesId}
        isOpen={isOpenDeleteModal}
        titleLowercase={"banner"}
        handleCloseDeleteModal={handleCloseDeleteModal}
      />

      {banners?.length === 0 ? (
        <tr className="hover:bg-gray-50">
          <td
            className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 text-center"
            colSpan={7}
          >
            <div className="text-sm font-semibold font-sans">
              Banner is Empty
            </div>
          </td>
        </tr>
      ) : (
        banners?.map((banner) => (
          <tr key={banner._id} className="hover:bg-gray-50">
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
              {banner._id.slice(8, 12)}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              <div className="flex items-center gap-x-2">
                <div className="w-10 h-10 drop-shadow-md p-1">
                  {banner?.image ? (
                    <img
                      src={banner?.image?.Location}
                      className="w-full h-full rounded-full border"
                      alt={banner.name}
                    />
                  ) : banner?.image?.Location ? (
                    <img
                      src={defaultImage}
                      className="w-full h-full rounded-full border"
                      alt={banner.name}
                    />
                  ) : (
                    <img
                      src={defaultImage}
                      className="w-full h-full rounded-full border"
                      alt={banner.name}
                    />
                  )}
                </div>
                {banner.name.substring(0, 10) + "..."}
              </div>
            </td>

            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              {banner.description.substring(0, 10) + "..."}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              {banner.link.substring(0, 10) + "..."}
            </td>

            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                <SwitchButton
                  table={"banner"}
                  id={banner._id}
                  status={banner.status}
                />
              </td>
            </td>

            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
              <div className="flex justify-center gap-4">
                <div className="relative flex flex-col items-center group cursor-pointer">
                  <Link
                    to={`/banner/${banner._id}/edit`}
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
                      setServicesId(banner._id);
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

export default BannerTable;
