import React from "react";
import { HiOutlinePlus } from "react-icons/hi2";
import CouponTable from "../../components/Table/CouponTable";
import CouponDrawer from "../../components/drawer/CouponDrawer";
import useAsync from "../../hooks/useAsync";
import useCouponSubmit from "../../hooks/useCouponSubmit";
import CouponsServices from "../../services/CouponServices";

const Coupon = () => {
  const { toggleDrawer } = useCouponSubmit();

  // api calling function
  const { data: coupons, loading } = useAsync(CouponsServices.getAllCoupons);

  return (
    <>
      {/* Coupon drawer */}
      <CouponDrawer />

      <h2 className="text-xl font-medium pb-6">Coupon</h2>

      <div className="bg-white py-8 px-5 rounded-md shadow-custom_secondary flex items-center gap-8 mb-4">
        <div className="w-full">
          <input
            className="input_styles"
            type="text"
            placeholder="Search by coupon name"
          />
        </div>

        <div className="text-center w-1/4">
          <button
            onClick={toggleDrawer}
            className="flex items-center justify-center gap-2  bg-primary-600 text-white w-full cursor-pointer py-3 border-none rounded-md font-medium"
          >
            <HiOutlinePlus />
            <span>Add Coupon</span>
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <div className="align-middle inline-block min-w-full">
          <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-100">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Id
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Name
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Code
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Discount
                  </th>{" "}
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Discount Type
                  </th>{" "}
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Start Date
                  </th>{" "}
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    End Date
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody className="bg-white divide-y divide-gray-200">
                {loading ? (
                  <p>Loading...</p>
                ) : (
                  <CouponTable coupons={coupons?.data} />
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default Coupon;
