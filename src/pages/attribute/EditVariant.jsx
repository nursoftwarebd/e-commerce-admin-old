import React from "react";
import { useParams } from "react-router-dom";
import spinnerLoadingImage from "../../assets/animate-spin.gif";
import Breadcrumbs from "../../components/lib/Breadcrumbs";
import useAttributeSubmit from "../../hooks/useAttributeSubmit";

const EditVariant = () => {
  let { attId, id } = useParams();

  const {
    register,
    isLoading,
    handleSubmit,
    isSubmitting,
    onSubmitVariant,
    getValues,
  } = useAttributeSubmit(attId, id);

  return (
    <>
      <h1>Variant Edit</h1>

      <Breadcrumbs
        url={"attribute"}
        mainTitle={"attribute"}
        title={getValues("name")}
        titleUrl={`attribute/${attId}/variants`}
        subTitle={getValues("variantName")}
      />

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
                <span>Update Variant</span>
              </button>
            )}
          </div>
        </form>
      </div>
    </>
  );
};

export default EditVariant;
