import React from "react";
import { useParams } from "react-router-dom";
import OrderDetailsTable from "../../components/Table/OrderDetailsTable";

const OrderDetails = () => {
  const { id } = useParams();
  let loading = false;

  return (
    <div>
      <h1 className="mb-3 text-xl font-medium">Order Details</h1>

      <div className="bg-white mb-4 p-6 lg:p-8 rounded-xl shadow-sm overflow-hidden">
        {!loading && (
          <div>
            <div className="flex lg:flex-row md:flex-row flex-col lg:items-center justify-between pb-4 border-b border-gray-50">
              <h1 className="font-boldtext-xl uppercase flex flex-col md:items-start items-center">
                Invoice
                <p className="text-xs text-gray-500 md:my-0 my-2 md:mt-1">
                  Status :
                  <span className="pl-2 font-medium text-xs capitalize">
                    Pending
                  </span>
                  <span className="font-semibold text-xs capitalize mt-2 block">
                    VAT Number :
                    <span className="text-gray-800">8789797979</span>
                  </span>
                </p>
              </h1>

              <div className="lg:text-right md:text-right text-center flex flex-col md:items-start items-center">
                <h2 className="lg:flex md:justify-end justify-items-center items-center flex   mt-4 lg:mt-0 lg:ml-0 md:mt-0 md:w-full">
                  <img
                    src={
                      "https://dashtar-admin.vercel.app/static/media/logo-dark.acf69e90.svg"
                    }
                    alt="logo"
                    style={{ width: 110 }}
                  />
                </h2>

                <p className="text-sm text-gray-500 mt-2">
                  Shop Name
                  <br />
                  Office Address
                  <br />
                  contact number
                  <br />
                  email address
                  <br />
                  website address
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 pt-4">
              <div className="mb-3 md:mb-0 lg:mb-0 flex flex-col">
                <span className="font-bold sm:text-sm text-xs uppercase text-gray-600 block">
                  Date
                </span>
                <span className="sm:text-sm text-xs text-gray-500 block">
                  <span>20/09/2302</span>
                </span>
              </div>

              <div className="mb-3 md:mb-0 lg:mb-0 flex flex-col">
                <span className="font-bold sm:text-sm text-xs uppercase text-gray-600 block">
                  Invoice No
                </span>
                <span className="sm:text-sm text-xs text-gray-500 block">
                  #78878678
                </span>
              </div>

              <div className="flex flex-col md:text-right text-left">
                <span className="font-bold sm:text-sm text-xs uppercase text-gray-600 block">
                  Invoice To
                </span>
                <span className="sm:text-sm text-xs text-gray-500 block">
                  user name
                  <br />
                  user email address
                  <br />
                  address
                  <br />
                  city and country
                </span>
              </div>
            </div>
          </div>
        )}

        <div>
          {loading ? (
            <p>loading...</p>
          ) : (
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
                          SR
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Product Name
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Quantity
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Item Price
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Amount
                        </th>
                      </tr>
                    </thead>

                    <tbody className="bg-white divide-y divide-gray-200">
                      {loading ? (
                        <p>Loading...</p>
                      ) : (
                        <OrderDetailsTable data={[]} />
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </div>

        {!loading && (
          <div className="md:mt-4 border rounded-xl border-gray-100 md:p-8 md:px-0 px-5 py-6 bg-gray-50">
            <div className="flex lg:flex-row md:flex-row flex-col justify-between ml-2">
              <div className="mb-3 md:mb-0 lg:mb-0">
                <p>
                  <span className="mb-1 font-bold sm:text-sm text-xs uppercase text-gray-600 block">
                    Payment Method :
                  </span>
                  <span className="text-green-500">Cash on delivery</span>
                </p>
              </div>

              <div className="flex flex-row md:flex-col justify-between">
                <span className="mb-1 font-bold sm:text-sm text-xs uppercase text-gray-600 block">
                  Sub Total
                </span>
                <span className="sm:text-sm text-xs text-gray-500 font-semibold  block">
                  $ 200.00
                </span>
              </div>

              <div className="md:mb-0 lg:mb-0 flex flex-row md:flex-col justify-between">
                <span className="mb-1 font-bold sm:text-sm text-xs uppercase text-gray-600 block">
                  VAT
                </span>
                <span className="sm:text-sm text-xs text-gray-500 font-semibold  block">
                  $0.00
                </span>
              </div>

              <div className="md:mb-0 lg:mb-0  flex  flex-row md:flex-col justify-between">
                <span className="mb-1 font-bold sm:text-sm text-xs uppercase text-gray-600 block">
                  Shipping Cost
                </span>
                <span className="sm:text-sm text-xs text-gray-500 font-semibold  block">
                  $ 20.00
                </span>
              </div>

              <div className="md:mb-0 lg:mb-0  flex  flex-row md:flex-col justify-between">
                <span className="mb-1 font-bold sm:text-sm text-xs uppercase text-gray-600 block">
                  Discount
                </span>
                <span className="sm:text-sm text-xs text-gray-500 font-semibold  block">
                  $ 100.00
                </span>
              </div>

              <div className="flex flex-row md:flex-col justify-between md:mr-2">
                <span className="mb-1 font-bold sm:text-sm text-xs uppercase text-gray-600 block">
                  Total
                </span>
                <span className="text-base text-red-500 font-semibold text-right">
                  $900.00
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderDetails;
