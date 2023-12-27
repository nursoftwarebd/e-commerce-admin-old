import React from "react";
import { FiX } from "react-icons/fi";
import spinnerLoadingImage from "../../assets/animate-spin.gif";
import uploadImg from "../../assets/upload.png";
import useCategorySubmit from "../../hooks/useCategorySubmit";
import MainDrawer from "./MainDrawer";

const CategoryDrawer = () => {
  const {
    image,
    errors,
    register,
    onSubmit,
    loading,
    isLoading,
    categories,
    closeDrawer,
    handleSubmit,
    isSubmitting,
    subCategories,
    setSubCategories,
    handleImageDelete,
    setParentCategory,
    handleImageUpload,
    handleCategorySlug,
  } = useCategorySubmit();

  return (
    <MainDrawer>
      <div className="fixed top-0 right-0 h-auto lg:h-screen w-full shadow-custom z-50 bg-[#F4F5F7]">
        {/* Modal content */}
        {/* Replace this with your modal content */}
        <div className="pt-8 px-5 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold">Add Category</h1>
            <p>Add your Category and necessary information from here</p>
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
              <h3>Category Name</h3>
              <div className="lg:col-span-2">
                <input
                  {...register("name", {
                    required: "Category name is required",
                    onBlur: (e) => handleCategorySlug(e.target.value),
                  })}
                  name="name"
                  type="text"
                  className="input_styles"
                  placeholder="Category Name"
                />
                {errors.name && (
                  <p className="text-error-500">{errors.name?.message}</p>
                )}
              </div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
              <h3>Category Description</h3>
              <div className="lg:col-span-2">
                <textarea
                  {...register("description")}
                  name="description"
                  rows="4"
                  className="input_styles"
                  placeholder="Category Description"
                ></textarea>
              </div>
            </div>{" "}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
              <h3>Category Images</h3>
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
                        alt="categoryImage"
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
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
              <h3>Slug</h3>
              <div className="lg:col-span-2">
                <input
                  type="text"
                  className="input_styles"
                  placeholder="Category Slug"
                  {...register("slug", {
                    required: "Category slug is required",
                    onBlur: (e) => handleCategorySlug(e.target.value),
                  })}
                  name="slug"
                />
                {errors?.slug && (
                  <p className="text-error-500">{errors?.slug?.message}</p>
                )}
              </div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
              <h3>Parent Category Name</h3>
              <div className="lg:col-span-2 flex justify-between gap-3">
                {loading ? (
                  <p>Loading...</p>
                ) : (
                  <div className="w-full">
                    <select
                      className="input_styles relative appearance-none focus:outline-none focus:border-blue-500 "
                      name="parentId"
                      id="parentId"
                      {...register(`parentId`, {
                        required: "Parent Name is required",
                        onChange: (e) => {
                          setParentCategory(e.target.value);
                          const filterSubCategories =
                            categories?.data[0]?.children?.find(
                              (category) => category._id === e.target.value
                            );
                          setSubCategories(
                            categories?.data[0]?._id === e.target.value
                              ? []
                              : filterSubCategories?.children
                          );
                        },
                      })}
                    >
                      <option value="" defaultValue className="text-gray-500">
                        select category
                      </option>
                      <option value={categories?.data[0]?._id}>Root</option>
                      {categories?.data[0]?.children?.map((category) => (
                        <option key={category._id} value={category._id}>
                          {category.name}
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                {subCategories?.length > 0 && (
                  <div className="w-full">
                    <select
                      className="input_styles relative appearance-none focus:outline-none focus:border-blue-500 "
                      name="childrenCategoryId"
                      id="childrenCategoryId"
                      {...register(`childrenCategoryId`, {
                        required: false,
                      })}
                    >
                      <option value="" defaultValue className="text-gray-500">
                        Children category
                      </option>
                      {subCategories?.map((category) => (
                        <option key={category._id} value={category._id}>
                          {category.name}
                        </option>
                      ))}
                    </select>
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
                  <span>Add Category</span>
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </MainDrawer>
  );
};

export default CategoryDrawer;
