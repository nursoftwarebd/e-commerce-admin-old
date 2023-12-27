import React from "react";
import { FiX } from "react-icons/fi";
import { useParams } from "react-router-dom";
import { TagsInput } from "react-tag-input-component";
import spinnerLoadingImage from "../../assets/animate-spin.gif";
import uploadImg from "../../assets/upload.png";
import CategoryTreeSelect from "../../components/Forms/CategoryTreeSelect";
import Breadcrumbs from "../../components/lib/Breadcrumbs";
import useProductSubmit from "../../hooks/useProductSubmit";

const EditProduct = () => {
  let { id } = useParams();

  const {
    tags,
    images,
    errors,
    setTags,
    onSubmit,
    register,
    options,
    isLoading,
    getValues,
    setOptions,
    isSubmitting,
    handleSubmit,
    defaultCategory,
    selectedCategory,
    handleProductSlug,
    handleImageUpload,
    handleImageDelete,
    setDefaultCategory,
    setSelectedCategory,
  } = useProductSubmit(id);

  return (
    <div>
      <h1>Product Edit</h1>

      <Breadcrumbs
        url={"products"}
        mainTitle={"products"}
        subTitle={getValues("productTitle")}
      />

      <div className="p-3 mt-6">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
            <h3>Product Title</h3>
            <div className="lg:col-span-2">
              <input
                {...register("productTitle", {
                  required: "Product name is required",
                  onBlur: (e) => handleProductSlug(e.target.value),
                })}
                name="productTitle"
                type="text"
                className="input_styles"
                placeholder="Product Name"
              />
              {errors.productTitle && (
                <p className="text-error-500">{errors.productTitle?.message}</p>
              )}
            </div>
          </div>
          {/* Product Description */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
            <h3>Product Description</h3>
            <div className="lg:col-span-2">
              <textarea
                rows="4"
                className="input_styles"
                placeholder="Product Description"
                {...register("description")}
                name="description"
              />
            </div>
          </div>
          {/* Product Images */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
            <h3>Product Images</h3>
            <div className="lg:col-span-2 ">
              <div className="rounded-lg border-4 border-dashed w-full group text-center py-5">
                <label>
                  <div>
                    <img
                      className={`w-20 h-20 mx-auto object-center cursor-pointer ${
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
                    multiple
                  />
                </label>
              </div>

              <div className="grid grid-cols-5">
                {images.map((image) => (
                  <div className="w-20 mt-2" key={image?.Key}>
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
                ))}
              </div>
            </div>
          </div>
          {/* Product SKU */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
            <h3>Product SKU</h3>
            <div className="lg:col-span-2">
              <input
                type="text"
                className="input_styles"
                placeholder="Product SKU"
                {...register("sku")}
                name="sku"
              />
            </div>
          </div>
          {/* Product Barcode */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
            <h3>Product Barcode</h3>
            <div className="lg:col-span-2">
              <input
                type="text"
                className="input_styles"
                placeholder="Product Barcode"
                {...register("barCode")}
                name="barCode"
              />
            </div>
          </div>
          {/* Product Price */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
            <h3>Product Price</h3>
            <div className="lg:col-span-2">
              <input
                type="number"
                className="input_styles"
                placeholder="Product Price"
                {...register("price", {
                  required: "Product price is required",
                })}
                name="price"
              />
              {errors?.price && (
                <p className="text-error-500">{errors?.price?.message}</p>
              )}
            </div>
          </div>{" "}
          {/* Product Sale Price */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
            <h3>Product Sale Price</h3>
            <div className="lg:col-span-2">
              <input
                name="salePrice"
                type="number"
                className="input_styles"
                placeholder="Product Price"
                {...register("salePrice", {
                  required: "Sale price is required",
                })}
              />
              {errors?.salePrice && (
                <p className="text-error-500">{errors?.salePrice?.message}</p>
              )}
            </div>
          </div>
          {/* Product Stock */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
            <h3>Product Stock</h3>
            <div className="lg:col-span-2">
              <input
                type="number"
                className="input_styles"
                placeholder="Product Stock"
                {...register("stock", {
                  required: "Product stock is required",
                })}
                name="stock"
              />
              {errors?.stock && (
                <p className="text-error-500">{errors?.stock?.message}</p>
              )}
            </div>
          </div>
          {/* Product Slug */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
            <h3>Product Slug</h3>
            <div className="lg:col-span-2">
              <input
                type="text"
                className="input_styles"
                placeholder="Product Slug"
                {...register("slug", {
                  required: "Product slug is required",
                  onBlur: (e) => handleProductSlug(e.target.value),
                })}
                name="slug"
              />
              {errors?.slug && (
                <p className="text-error-500">{errors?.slug?.message}</p>
              )}
            </div>
          </div>
          {/* category tree */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
            <h3>Category</h3>
            <div className="lg:col-span-2">
              <CategoryTreeSelect
                options={options}
                setOptions={setOptions}
                selectedCategory={selectedCategory}
                setDefaultCategory={setDefaultCategory}
                setSelectedCategory={setSelectedCategory}
              />
            </div>
          </div>
          {/* Default Category */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
            <h3>Default Category</h3>
            <div className="lg:col-span-2">
              <div className="relative">
                <select
                  className="input_styles relative appearance-none focus:outline-none focus:border-blue-500"
                  {...register("defaultCategory", {
                    required: "Default Category is required",
                  })}
                  name="defaultCategory"
                >
                  <option value="" className="text-gray-500">
                    Default Category
                  </option>

                  {defaultCategory?.map((selectedCategory, i) => (
                    <option key={i} value={selectedCategory.value}>
                      {selectedCategory.label}
                    </option>
                  ))}
                </select>

                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6 inline-block"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
            <h3>Tags</h3>
            <div className="lg:col-span-2">
              <TagsInput
                name="tags"
                value={tags}
                onChange={setTags}
                placeHolder="enter tags"
              />
              <em className="text-xs italic text-error-500">
                press enter to add new tag
              </em>
            </div>
          </div>
          {/* Submit Button */}
          <div className="">
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
                <span>Update Product</span>
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProduct;
