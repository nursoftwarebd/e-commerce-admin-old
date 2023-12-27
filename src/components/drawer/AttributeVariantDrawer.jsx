import React from "react";
import { FiX } from "react-icons/fi";
import spinnerLoadingImage from "../../assets/animate-spin.gif";
import useAttributeSubmit from "../../hooks/useAttributeSubmit";
import MainDrawer from "./MainDrawer";

const AttributeVariantDrawer = ({ id }) => {
  const {
    register,
    isLoading,
    closeDrawer,
    handleSubmit,
    isSubmitting,
    onSubmitVariant,
  } = useAttributeSubmit(id);

  return (
    <MainDrawer>
      <div className="fixed top-0 right-0 h-auto lg:h-screen w-full shadow-custom z-50 bg-[#F4F5F7]">
        {/* Modal content */}
        {/* Replace this with your modal content */}
        <div className="pt-8 px-5 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold">Add Variant</h1>
            <p>
              Add your variant and necessary information your variant and
              necessary information from here
            </p>
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
          <form onSubmit={handleSubmit(onSubmitVariant)} className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
              <h3>Name</h3>
              <div className="lg:col-span-2">
                <input
                  {...register("variantName", { required: true })}
                  name="variantName"
                  type="text"
                  className="input_styles"
                  placeholder="Variant Name"
                />
              </div>
            </div>

            <div className="mt-6 z-20 space-x-2 flex justify-end items-center">
              {isSubmitting ? (
                <button
                  disabled={true}
                  type="button"
                  className={`flex justify-center items-center gap-x-1 bg-primary-600 text-white w-40 py-3 border-none rounded-md font-medium ${
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
                  className={`bg-primary-600 text-white w-40 py-3 border-none rounded-md font-medium ${
                    isLoading || isSubmitting
                      ? "cursor-not-allowed"
                      : "cursor-pointer"
                  }`}
                >
                  <span>Add Variant</span>
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </MainDrawer>
  );
};

export default AttributeVariantDrawer;
