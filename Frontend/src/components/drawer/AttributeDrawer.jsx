import React from "react";
import { FiX } from "react-icons/fi";
import { TagsInput } from "react-tag-input-component";
import spinnerLoadingImage from "../../assets/animate-spin.gif";
import useAttributeSubmit from "../../hooks/useAttributeSubmit";
import MainDrawer from "./MainDrawer";

const AttributeDrawer = () => {
  const {
    selected,
    register,
    onSubmit,
    isLoading,
    closeDrawer,
    handleSubmit,
    isSubmitting,
    setSelected,
  } = useAttributeSubmit();

  return (
    <MainDrawer>
      <div className="fixed top-0 right-0 h-auto lg:h-screen w-full shadow-custom z-50 bg-[#F4F5F7]">
        {/* Modal content */}
        {/* Replace this with your modal content */}
        <div className="pt-8 px-5 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold">Add Attribute</h1>
            <p>Add your attribute and necessary information from here</p>
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
              <h3>Title</h3>
              <div className="lg:col-span-2">
                <input
                  {...register("title", { required: true })}
                  name="title"
                  type="text"
                  className="input_styles"
                  placeholder="Attribute Title"
                />
              </div>
            </div>{" "}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
              <h3>Name</h3>
              <div className="lg:col-span-2">
                <input
                  {...register("name", { required: true })}
                  name="name"
                  type="text"
                  className="input_styles"
                  placeholder="Attribute Name"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
              <h3>Options</h3>
              <div className="lg:col-span-2">
                <select
                  {...register("options")}
                  name="options"
                  className="input_styles"
                >
                  <option value="dropdown">dropdown</option>
                  <option value="radio">radio</option>
                  <option value="checkbox">checkbox</option>
                </select>
              </div>
            </div>{" "}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
              <h3>Variants</h3>
              <div className="lg:col-span-2">
                <TagsInput
                  name="variants"
                  value={selected}
                  onChange={setSelected}
                  placeHolder="enter variants"
                />
                <em className="text-xs italic text-error-500">
                  press enter to add new tag
                </em>
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
                  <span>Add Attribute</span>
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </MainDrawer>
  );
};

export default AttributeDrawer;
