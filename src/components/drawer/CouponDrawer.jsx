import React from "react";
import { FiX } from "react-icons/fi";
import spinnerLoadingImage from "../../assets/animate-spin.gif";
import useCouponSubmit from "../../hooks/useCouponSubmit";
import MainDrawer from "./MainDrawer";

const CouponDrawer = () => {
  const {
    errors,
    register,
    onSubmit,
    isLoading,
    closeDrawer,
    handleSubmit,
    isSubmitting,
  } = useCouponSubmit();

  return (
    <MainDrawer>
      <div className="fixed top-0 right-0 h-auto lg:h-screen w-full shadow-custom z-50 bg-[#F4F5F7]">
        {/* Modal content */}
        {/* Replace this with your modal content */}
        <div className="pt-8 px-5 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold">Add Coupon</h1>
            <p>Add your coupon and necessary information from here</p>
          </div>

          <div>
            <button
              className="w-8 h-8 flex justify-center items-center border border-gray-400 rounded-full hover:border-gray-500 focus:outline-none focus:ring-0 focus:border-gray-500 transition duration-150 ease-in-out"
              type="button"
              onClick={closeDrawer}
            >
              <FiX className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>

        <div className="mt-8 h-[75%] overflow-y-scroll bg-white p-5">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
              <h3>Campaign Name</h3>
              <div className="lg:col-span-2">
                <input
                  {...register("couponName", { required: "Name is required" })}
                  name="couponName"
                  type="text"
                  className="input_styles"
                  placeholder="campaign name"
                />
                {errors.couponName && (
                  <p className="text-error-500">{errors.couponName?.message}</p>
                )}
              </div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
              <h3>Campaign Code</h3>
              <div className="lg:col-span-2">
                <input
                  {...register("code", { required: "code is required" })}
                  name="code"
                  type="text"
                  className="input_styles"
                  placeholder="campaign code"
                />
                {errors.code && (
                  <p className="text-error-500">{errors.code?.message}</p>
                )}
              </div>
            </div>{" "}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
              <h3>Discount</h3>
              <div className="lg:col-span-2">
                <input
                  {...register("discount", {
                    required: "discount is required",
                  })}
                  name="discount"
                  type="number"
                  className="input_styles"
                  placeholder="amount of discount"
                />
                {errors.discount && (
                  <p className="text-error-500">{errors.discount?.message}</p>
                )}
              </div>
            </div>{" "}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
              <h3>Campaign Start Date</h3>
              <div className="lg:col-span-2">
                <input
                  {...register("startDate", {
                    required: "start date is required",
                  })}
                  name="startDate"
                  type="date"
                  className="input_styles"
                  placeholder="Start Date"
                />
                {errors.startDate && (
                  <p className="text-error-500">{errors.startDate?.message}</p>
                )}
              </div>
            </div>{" "}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
              <h3>Campaign End Date</h3>
              <div className="lg:col-span-2">
                <input
                  {...register("endDate", { required: "end date is required" })}
                  name="endDate"
                  type="date"
                  className="input_styles"
                  placeholder="End Date"
                />
                {errors.endDate && (
                  <p className="text-error-500">{errors.endDate?.message}</p>
                )}
              </div>
            </div>{" "}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
              <h3>Discount Type</h3>
              <div className="lg:col-span-2">
                <select
                  {...register("amountType", {
                    required: "amount type is required",
                  })}
                  name="amountType"
                  className="input_styles"
                >
                  <option value="percentage">Percentage</option>
                  <option value="amount">Amount</option>
                </select>
                {errors.amountType && (
                  <p className="text-error-500">{errors.amountType?.message}</p>
                )}
              </div>
            </div>
            <div className="mt-6 z-20 space-x-2 items-center">
              {isSubmitting ? (
                <button
                  disabled={true}
                  type="button"
                  className={`flex justify-center items-center gap-x-1 bg-primary-600 text-white w-full py-3 border-none rounded-md font-medium ${
                    isSubmitting ? "cursor-not-allowed" : "cursor-pointer"
                  }`}
                >
                  <img
                    src={spinnerLoadingImage}
                    alt="Loading"
                    width={20}
                    height={10}
                  />{" "}
                  <span className="font-serif ml-2 font-light">Processing</span>
                </button>
              ) : (
                <button
                  disabled={isSubmitting || isLoading ? true : false}
                  type="submit"
                  className={`bg-primary-600 text-white w-full py-3 border-none rounded-md font-medium ${
                    isLoading || isSubmitting
                      ? "cursor-not-allowed"
                      : "cursor-pointer"
                  }`}
                >
                  <span>Add Coupon</span>
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </MainDrawer>
  );
};

export default CouponDrawer;
