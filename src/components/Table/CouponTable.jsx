import React from "react";
import { HiOutlinePencilSquare, HiOutlineTrash } from "react-icons/hi2";
import { Link } from "react-router-dom";
import useCouponSubmit from "../../hooks/useCouponSubmit";
import DeleteModal from "../lib/DeleteModal";

const CouponTable = ({ coupons }) => {
  const {
    servicesId,
    setServicesId,
    isOpenDeleteModal,
    handleCloseDeleteModal,
  } = useCouponSubmit();

  return (
    <>
      <DeleteModal
        table={"coupons"}
        id={servicesId}
        isOpen={isOpenDeleteModal}
        titleLowercase={"coupons"}
        handleCloseDeleteModal={handleCloseDeleteModal}
      />

      {coupons.length === 0 ? (
        <tr className="hover:bg-gray-50">
          <td
            className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 text-center"
            colSpan={7}
          >
            <div className="text-sm font-semibold font-sans">
              Coupons is Empty
            </div>
          </td>
        </tr>
      ) : (
        coupons?.map((coupon) => (
          <tr key={coupon._id} className="hover:bg-gray-50">
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
              {coupon._id.slice(8, 12)}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              {coupon.name}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              {coupon.code}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              {" "}
              {coupon.amountType === "amount" && <span>$</span>}
              {coupon.discount}
              {coupon.amountType === "percentage" && <span>%</span>}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              {coupon.amountType}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              {new Date(coupon.startDate).toLocaleDateString()}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              {new Date(coupon.endDate).toLocaleDateString()}
            </td>
            <td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <div className="flex justify-center gap-4">
                  <div className="relative flex flex-col items-center group cursor-pointer">
                    <Link
                      to={`/coupon/${coupon._id}/edit`}
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
                        setServicesId(coupon._id);
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

export default CouponTable;
