import React from "react";
import { useParams } from "react-router-dom";
import spinnerLoadingImage from "../../assets/animate-spin.gif";
import Breadcrumbs from "../../components/lib/Breadcrumbs";
import useCouponSubmit from "../../hooks/useCouponSubmit";

const EditCoupon = () => {
  let { id } = useParams();
  const {
    onSubmit,
    register,
    getValues,
    isLoading,
    isSubmitting,
    handleSubmit,
  } = useCouponSubmit(id);

  return (
    <>
      <h1>Attribute Edit</h1>

      <Breadcrumbs
        url={"coupons"}
        mainTitle={"coupons"}
        subTitle={getValues("name")}
      />

      <div className="p-3 mt-6">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
            <h3>Campaign Name</h3>
            <div className="lg:col-span-2">
              <input
                {...register("name", { required: true })}
                name="name"
                type="text"
                className="input_styles"
                placeholder="campaign name"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
            <h3>Campaign Code</h3>
            <div className="lg:col-span-2">
              <input
                {...register("code", { required: true })}
                name="code"
                type="text"
                className="input_styles"
                placeholder="campaign code"
              />
            </div>
          </div>{" "}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
            <h3>Discount</h3>
            <div className="lg:col-span-2">
              <input
                {...register("discount", { required: true })}
                name="discount"
                type="number"
                className="input_styles"
                placeholder="amount of discount"
              />
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
            </div>
          </div>{" "}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
            <h3>Discount Type</h3>
            <div className="lg:col-span-2">
              <select
                {...register("amountType")}
                name="amountType"
                className="input_styles"
              >
                <option value="percentage">Percentage</option>
                <option value="amount">Amount</option>
              </select>
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
                <span>Update Coupon</span>
              </button>
            )}
          </div>
        </form>
      </div>
    </>
  );
};

export default EditCoupon;
