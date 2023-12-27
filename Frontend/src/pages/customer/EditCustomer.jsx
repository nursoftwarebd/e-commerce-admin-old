import React from "react";
import { FiX } from "react-icons/fi";
import { useParams } from "react-router-dom";
import spinnerLoadingImage from "../../assets/animate-spin.gif";
import uploadImg from "../../assets/upload.png";
import Breadcrumbs from "../../components/lib/Breadcrumbs";
import useCustomerSubmit from "../../hooks/useCustomerSubmit";

const EditCustomer = () => {
  const { id } = useParams();

  const {
    image,
    errors,
    onSubmit,
    register,
    getValues,
    isLoading,
    isSubmitting,
    handleSubmit,
    handleImageUpload,
    handleImageDelete,
  } = useCustomerSubmit(id);

  return (
    <>
      <h1 className="text-xl font-medium pb-6">Customer Edit</h1>

      <Breadcrumbs
        url={"customer"}
        mainTitle={"customer"}
        subTitle={getValues("customerName")}
      />

      <div className="p-3 mt-6">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
            <h3>Name</h3>
            <div className="lg:col-span-2">
              <input
                {...register("customerName", {
                  required: "Customer Name is required",
                })}
                type="text"
                name="customerName"
                className="input_styles"
                placeholder="Customer Name"
              />
              {errors.customerName && (
                <p className="text-error-500">{errors.customerName?.message}</p>
              )}
            </div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
            <h3>Email</h3>
            <div className="lg:col-span-2">
              <input
                {...register("customerEmail", {
                  required: "Customer Email is required",
                })}
                type="text"
                name="customerEmail"
                className="input_styles"
                placeholder="Customer email"
              />
              {errors.customerEmail && (
                <p className="text-error-500">
                  {errors.customerEmail?.message}
                </p>
              )}
            </div>
          </div>{" "}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
            <h3>Phone</h3>
            <div className="lg:col-span-2">
              <input
                {...register("customerPhone", {
                  required: "customer phone is required",
                })}
                type="text"
                name="customerPhone"
                className="input_styles"
                placeholder="Customer phone"
              />
              {errors.customerPhone && (
                <p className="text-error-500">
                  {errors.customerPhone?.message}
                </p>
              )}
            </div>
          </div>{" "}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
            <h3>Images</h3>
            <div className="lg:col-span-2">
              <div className="rounded-lg border-4 border-dashed w-full group text-center py-5">
                <label>
                  <div>
                    <img
                      className={`w-20 h-20 mx-auto object-center cursor-pointer  ${
                        isLoading && "animate-bounce"
                      }`}
                      src={uploadImg}
                      alt="upload image"
                    />
                    <p>Drag your images here </p>
                    <p className="text-gray-600">
                      (Only *.jpeg, *.webp and *.png images will be accepted)
                    </p>
                  </div>

                  <input
                    onChange={(e) => handleImageUpload(e.target.files)}
                    type="file"
                    className="hidden"
                  />
                </label>
              </div>

              {Object.keys(image)?.length > 0 && (
                <div className="w-20 mt-2">
                  <div className="border-2 border-gray-200 w-20 h-16 rounded-md relative">
                    <img
                      src={image?.Location}
                      className="w-full h-full rounded-md"
                      alt="bannerImage"
                    />

                    <button
                      onClick={() => handleImageDelete(image?.Key)}
                      type="button"
                      className="absolute -right-3 -top-2 text-xl border border-error-700 bg-error-100 rounded-full text-error-700"
                    >
                      <FiX />
                    </button>
                  </div>
                </div>
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
                <span>Add Customer</span>
              </button>
            )}
          </div>
        </form>
      </div>
    </>
  );
};

export default EditCustomer;
