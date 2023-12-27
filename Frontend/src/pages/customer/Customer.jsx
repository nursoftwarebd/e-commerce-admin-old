import React from "react";
import { HiOutlinePlus } from "react-icons/hi2";
import CustomerTable from "../../components/Table/CustomerTable";
import CustomerDrawer from "../../components/drawer/CustomerDrawer";
import useAsync from "../../hooks/useAsync";
import useCustomerSubmit from "../../hooks/useCustomerSubmit";
import CustomerServices from "../../services/CustomerServices";

const Customer = () => {
  const { toggleDrawer } = useCustomerSubmit();

  // api calling
  const { data, loading } = useAsync(CustomerServices.getAllCustomer);

  return (
    <>
      <CustomerDrawer />

      <h2 className="text-xl font-medium pb-6">Customer</h2>

      <div className="bg-white py-8 px-5 rounded-md shadow-custom_secondary flex items-center gap-8 mb-4">
        <div className="w-full">
          <input
            type="text"
            className="input_styles"
            placeholder="Search by customer name"
          />
        </div>

        <div className="text-center w-1/4">
          <button
            onClick={toggleDrawer}
            className="flex items-center justify-center gap-2  bg-primary-600 text-white w-full cursor-pointer py-3 border-none rounded-md font-medium"
          >
            <HiOutlinePlus />
            <span>Add Customer</span>
          </button>
        </div>
      </div>

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
                    Email
                  </th>

                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Phone
                  </th>

                  <th
                    scope="col"
                    className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Status
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
                {loading ? (
                  <p>Loading...</p>
                ) : (
                  <CustomerTable customers={data?.data} />
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default Customer;
