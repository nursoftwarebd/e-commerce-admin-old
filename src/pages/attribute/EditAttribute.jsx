import React from "react";
import { useParams } from "react-router-dom";
import spinnerLoadingImage from "../../assets/animate-spin.gif";
import Breadcrumbs from "../../components/lib/Breadcrumbs";
import useAttributeSubmit from "../../hooks/useAttributeSubmit";

const EditAttribute = () => {
  let { id } = useParams();
  const {
    onSubmit,
    register,
    getValues,
    isLoading,
    isSubmitting,
    handleSubmit,
  } = useAttributeSubmit(id);

  return (
    <>
      <h1>Attribute Edit</h1>

      <Breadcrumbs
        url={"attribute"}
        mainTitle={"attribute"}
        subTitle={getValues("name")}
      />

      <div className="p-3 mt-6">
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
          </div>
          {/* <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
            <h3>Variants</h3>
            <div className="lg:col-span-2">
              <TagsInput
                value={selected}
                onChange={setSelected}
                name="variants"
                placeHolder="enter variants"
              />
              <em>press enter to add new tag</em>
            </div>
          </div> */}
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
                <span>Update Attribute</span>
              </button>
            )}
          </div>
        </form>
      </div>
    </>
  );
};

export default EditAttribute;
