import React from "react";
import { HiOutlinePlus } from "react-icons/hi2";
import { useParams } from "react-router-dom";
import AttributeVariantTable from "../../components/Table/AttributeVariantTable";
import AttributeVariantDrawer from "../../components/drawer/AttributeVariantDrawer";
import Breadcrumbs from "../../components/lib/Breadcrumbs";
import useAttributeSubmit from "../../hooks/useAttributeSubmit";

const Variants = () => {
  let { id } = useParams();
  const { getValues, toggleDrawer, variants } = useAttributeSubmit(id);

  return (
    <>
      {/* variant drawer */}
      <AttributeVariantDrawer id={id} />

      <div className="flex items-center justify-between pb-3">
        <h2 className="text-xl font-medium">Variants</h2>

        <div className="text-center w-40">
          <button
            className="flex items-center justify-center gap-2 bg-primary-600 text-white w-full cursor-pointer py-3 border-none rounded-md font-medium"
            onClick={toggleDrawer}
          >
            <HiOutlinePlus />
            <span>Add Variant</span>
          </button>
        </div>
      </div>

      <Breadcrumbs
        url={"attribute"}
        mainTitle={"attribute"}
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
                    status
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody className="bg-white divide-y divide-gray-200">
                <AttributeVariantTable id={id} variants={variants} />
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default Variants;
