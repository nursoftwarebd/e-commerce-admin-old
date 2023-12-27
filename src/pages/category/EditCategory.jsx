import React from "react";
import { FiX } from "react-icons/fi";
import { useParams } from "react-router-dom";
import spinnerLoadingImage from "../../assets/animate-spin.gif";
import defaultImage from "../../assets/noImage.jpg";
import uploadImg from "../../assets/upload.png";
import Breadcrumbs from "../../components/lib/Breadcrumbs";
import useCategorySubmit from "../../hooks/useCategorySubmit";

const EditCategory = () => {
  let { id } = useParams();
  const {
    image,
    errors,
    loading,
    onSubmit,
    register,
    getValues,
    isLoading,
    categories,
    isSubmitting,
    handleSubmit,
    subCategories,
    setSubCategories,
    handleImageDelete,
    handleImageUpload,
    handleCategorySlug,
    setParentCategory,
  } = useCategorySubmit(id);

  return (
    <>
      <h1>Category Edit</h1>

      <Breadcrumbs
        url={"category"}
        mainTitle={"category"}
        subTitle={getValues("name")}
      />

      <div className="p-3 mt-6">
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
          </div>

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

              {image ? (
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
              ) : (
                <div className="w-20 mt-2">
                  <div className="border-2 border-gray-200 w-20 h-16 rounded-md relative">
                    <img
                      src={defaultImage}
                      className="w-full h-full rounded-md"
                      alt="categoryImage"
                    />
                  </div>
                </div>
              )}
              <p>{getValues("image")}</p>
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
                        setSubCategories(filterSubCategories?.children);
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
                <span>Update Category</span>
              </button>
            )}
          </div>
        </form>
      </div>
    </>
  );
};

export default EditCategory;
