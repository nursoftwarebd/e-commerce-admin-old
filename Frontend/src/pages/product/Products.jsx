import React, { useContext } from "react";
import ProductTable from "../../components/Table/ProductTable";
import ProductDrawer from "../../components/drawer/ProductDrawer";
import { SidebarContext } from "../../context/SidebarContext";
import useAsync from "../../hooks/useAsync";
import useProductSubmit from "../../hooks/useProductSubmit";
import ProductServices from "../../services/ProductServices";

const Products = () => {
  // custom hook
  const { toggleDrawer, mainCategories, categoryLoading } = useProductSubmit();
  // react hook
  const {
    limitData,
    searchText,
    currentPage,
    filterPrice,
    setSearchText,
    setFilterPrice,
    filterCategory,
    setFilterCategory,
  } = useContext(SidebarContext);
  // api call
  const { data, loading } = useAsync(() =>
    ProductServices.getAllProduct({
      limit: limitData,
      page: currentPage,
      price: filterPrice,
      searchText: searchText,
      category: filterCategory,
    })
  );

  return (
    <>
      {/* product drawer */}
      <ProductDrawer />

      <h2 className="text-xl font-medium pb-6">Products</h2>

      <div className="bg-white py-8 px-5 rounded-md shadow-custom_secondary grid lg:grid-cols-4 gap-8 ">
        <div>
          <input
            className="input_styles"
            type="text"
            placeholder="Search by product name"
            onChange={(e) => setSearchText(e.target.value)}
          />
        </div>
        {categoryLoading ? (
          <div>Loading...</div>
        ) : (
          <div className="relative z-0">
            <select
              id="Category"
              name="Category"
              onChange={(e) => setFilterCategory(e.target.value)}
              className="input_styles relative appearance-none focus:outline-none focus:border-blue-500 "
            >
              <option value="" className="text-gray-500">
                Category
              </option>
              {mainCategories?.data[0]?.children?.map((category) => (
                <option key={category._id} value={category._id}>
                  {category.name}
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
        )}
        <div className="relative z-0">
          <select
            id="price"
            name="Price"
            onChange={(e) => setFilterPrice(e.target.value)}
            className="input_styles relative appearance-none focus:outline-none focus:border-blue-500"
          >
            <option value="" className="text-gray-500">
              Price
            </option>
            <option value="low">Low to High</option>
            <option value="high">High to Low</option>
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
        <div>
          <div className="text-center">
            <button
              onClick={toggleDrawer}
              className="bg-primary-600 text-white lg:w-4/6 w-full cursor-pointer py-3 border-none rounded-md font-medium"
            >
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6 inline-block text-white"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 6v12m6-6H6"
                  />
                </svg>
              </span>
              Add Product
            </button>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto mt-4">
        <div className="align-middle inline-block min-w-full">
          <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Product
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Category
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Price
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Sale Price
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Stock
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Status
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Published
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Featured
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {loading ? (
                  <p>Loading...</p>
                ) : (
                  <ProductTable data={data?.data} />
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default Products;
