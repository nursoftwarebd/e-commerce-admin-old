import React from "react";
import { FiX } from "react-icons/fi";
import { TagsInput } from "react-tag-input-component";
import spinnerLoadingImage from "../../assets/animate-spin.gif";
import uploadImg from "../../assets/upload.png";
import useProductSubmit from "../../hooks/useProductSubmit";
import MainDrawer from "./MainDrawer";

const ProductDrawer = () => {
  const {
    tags,
    images,
    errors,
    setTags,
    onSubmit,
    register,
    isLoading,
    categories,
    uniqueArray,
    closeDrawer,
    isSubmitting,
    handleSubmit,
    setCategories,
    subCategories,
    mainCategories,
    categoryLoading,
    setSubCategories,
    selectedCategory,
    handleProductSlug,
    handleImageUpload,
    handleImageDelete,
    setSelectedCategory,
  } = useProductSubmit();


  // main category change
  const handleMainCategoryChange = (e) => {
    setCategories([]);
    setSubCategories([]);
    const filterMainCategories = mainCategories?.data[0]?.children?.find(
      (category) => category._id === e.target.value
    );

    if (
      e.target.value === null ||
      e.target.value === "" ||
      e.target.value === undefined
    ) {
      setCategories([]);
      setSelectedCategory([]);
    } else {
      setSelectedCategory([filterMainCategories]);
      setCategories(filterMainCategories?.children);
    }
  };

  // category change
  const handleCategoryChange = (e) => {
    setSubCategories([]);
    const filterCategories = categories?.find(
      (category) => category._id === e.target.value
    );

    const previousCategoryFilter = selectedCategory?.filter(
      (category) => category.parentId !== filterCategories?.parentId
    );

    const uniqueArr = uniqueArray([
      ...previousCategoryFilter,
      filterCategories,
    ]);

    if (
      e.target.value === null ||
      e.target.value === "" ||
      e.target.value === undefined
    ) {
      setSubCategories([]);
      setSelectedCategory([...selectedCategory]);
    } else {
      setSelectedCategory(uniqueArr);
      setSubCategories(filterCategories?.children);
    }
  };

  // sub category change
  const handleSubCategoryChange = (e) => {
    const filterSubCategories = subCategories?.find(
      (category) => category._id === e.target.value
    );
    const previousCategoryFilter = selectedCategory?.filter(
      (category) => category.parentId !== filterSubCategories?.parentId
    );

    const uniqueArr = uniqueArray([
      ...previousCategoryFilter,
      filterSubCategories,
    ]);

    if (
      e.target.value === null ||
      e.target.value === "" ||
      e.target.value === undefined
    ) {
      setSelectedCategory([...selectedCategory]);
    } else {
      setSelectedCategory(uniqueArr);
    }
  };

  return (
    <MainDrawer>
      <div className="fixed top-0 right-0 h-auto lg:h-screen w-full shadow-custom z-50 bg-[#F4F5F7]">
        {/* Modal content */}
        {/* Replace this with your modal content */}
        <div className="pt-8 px-5 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold">Add Product</h1>
            <p>Add your Product and necessary information from here</p>
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
                  <p className="text-error-500">
                    {errors.productTitle?.message}
                  </p>
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
            {/* category */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
              <h3>Category Name</h3>
              <div className="lg:col-span-2 flex justify-between gap-3">
                {categoryLoading ? (
                  <p>Loading...</p>
                ) : (
                  <div className="w-full">
                    <select
                      className="input_styles relative appearance-none focus:outline-none focus:border-blue-500 "
                      name="mainCategory"
                      id="mainCategory"
                      {...register(`mainCategory`, {
                        required: "Main category is required",
                        onChange: (e) => handleMainCategoryChange(e),
                      })}
                    >
                      <option value={""} defaultValue className="text-gray-500">
                        Main category
                      </option>
                      {mainCategories?.data[0]?.children?.map(
                        (mainCategory, i) => (
                          <option key={i} value={mainCategory._id}>
                            {mainCategory.name}
                          </option>
                        )
                      )}
                    </select>
                  </div>
                )}

                {categories?.length > 0 && (
                  <div className="w-full">
                    <select
                      className="input_styles relative appearance-none focus:outline-none focus:border-blue-500 "
                      name="category"
                      id="category"
                      {...register(`category`, {
                        onChange: (e) => handleCategoryChange(e),
                      })}
                    >
                      <option value="" defaultValue className="text-gray-500">
                        category
                      </option>
                      {categories?.map((category, i) => (
                        <option key={i} value={category._id}>
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
                      name="subCategory"
                      id="subCategory"
                      {...register(`subCategory`, {
                        onChange: (e) => handleSubCategoryChange(e),
                      })}
                    >
                      <option value="" defaultValue className="text-gray-500">
                        Sub Category
                      </option>
                      {subCategories?.map((subCategory, i) => (
                        <option key={i} value={subCategory._id}>
                          {subCategory.name}
                        </option>
                      ))}
                    </select>
                  </div>
                )}
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

                    {selectedCategory?.map((selectedCategory, i) => (
                      <option key={i} value={selectedCategory._id}>
                        {selectedCategory.name}
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
                  <span>Add Product</span>
                </button>
              )}
            </div>
            {/* <div className="">
              <button
                type="submit"
                className="bg-primary-600 text-white cursor-pointer w-full py-3 border-none rounded-md font-medium"
              >
                Add Product
              </button>
            </div> */}
          </form>
        </div>
      </div>
    </MainDrawer>
  );
};

export default ProductDrawer;
