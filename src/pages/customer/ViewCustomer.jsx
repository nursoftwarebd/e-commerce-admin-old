import React from "react";
import { useParams } from "react-router-dom";
import CustomerOrderTable from "../../components/Table/CustomerOrderTable";
import Breadcrumbs from "../../components/lib/Breadcrumbs";
import useAsync from "../../hooks/useAsync";
import CustomerServices from "../../services/CustomerServices";
import OrderServices from "../../services/OrderServices";

const ViewCustomer = () => {
  const { id } = useParams();

  const { data, loading } = useAsync(() =>
    CustomerServices.getSingleCustomer(id)
  );

  const { data: orderData, loading: orderLoading } = useAsync(() =>
    OrderServices.getSingleCustomerOrder(id)
  );

  return (
    <>
      <h1 className="text-xl font-medium pb-6">Customer View</h1>

      <Breadcrumbs
        url={"customer"}
        mainTitle={"customer"}
        subTitle={loading ? "loading..." : data?.data?.name}
      />

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
                    Order Date
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Invoice
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    User
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Shipping Address
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Payment Method
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Order Amount
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Status
                  </th>
                </tr>
              </thead>

              <tbody className="bg-white divide-y divide-gray-200">
                {orderLoading ? (
                  <p>Loading...</p>
                ) : (
                  <CustomerOrderTable data={orderData?.data} />
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewCustomer;
