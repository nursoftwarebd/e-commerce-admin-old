import React from "react";
import { useParams } from "react-router-dom";
import CategoryTable from "../../components/Table/CategoryTable";
import Breadcrumbs from "../../components/lib/Breadcrumbs";
import useCategorySubmit from "../../hooks/useCategorySubmit";

const SubSubCategory = () => {
  let { id, subId } = useParams();

  const { getValues, categories, loading } = useCategorySubmit(subId);

  return (
    <>
      <h1>Sub Category</h1>

      <Breadcrumbs
        url={"category"}
        mainTitle={"category"}
        title={getValues("parentCategory")}
        titleUrl={`category/${id}/sub-category`}
        subTitle={getValues("name")}
      />

      <div className="overflow-x-auto">
        <div className="align-middle inline-block min-w-full">
          <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-100">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Id
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Name
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Description
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Parent Category
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
                    status
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody className="bg-white divide-y divide-gray-200">
                {loading ? (
                  <p>Loading...</p>
                ) : (
                  <CategoryTable
                    categories={
                      categories?.data[0]?.children
                        ?.find((item) => item._id === id)
                        .children.find((item) => item._id === subId).children
                    }
                  />
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default SubSubCategory;
