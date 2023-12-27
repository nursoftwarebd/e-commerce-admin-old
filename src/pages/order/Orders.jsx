import React, { useContext } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import OrderTable from "../../components/Table/OrderTable";
import { SidebarContext } from "../../context/SidebarContext";
import useAsync from "../../hooks/useAsync";
import useOrderSubmit from "../../hooks/useOrderSubmit";
import OrderServices from "../../services/OrderServices";
const orders = () => {
  // react hook
  const {
    endDate,
    startDate,
    setEndDate,
    searchText,
    orderStatus,
    setStartDate,
    setSearchText,
    setOrderStatus,
    shippingAddress,
    setShippingAddress,
  } = useContext(SidebarContext);

  const { handleOrderStatusUpdate } = useOrderSubmit();

  // api calling
  const { data, loading } = useAsync(() =>
    OrderServices.getAllOrder({
      page: 1,
      limit: 10,
      endDate: endDate ? new Date(endDate).toISOString() : "",
      startDate: startDate ? new Date(startDate).toISOString() : "",
      status: orderStatus,
      searchText: searchText,
      shippingAddress: shippingAddress,
    })
  );

  // handle reset
  const handleReset = () => {
    setSearchText("");
    setShippingAddress("");
    setOrderStatus("");
    setStartDate("");
    setEndDate("");
  };

  return (
    <>
      <h2 className="text-xl font-medium pb-6">Orders</h2>

      <form>
        <div className="bg-white py-8 px-5 rounded-md shadow-custom_secondary grid lg:grid-cols-4 gap-8">
          <div>
            <input
              className="input_styles"
              type="text"
              placeholder="Search by invoice number"
              onChange={(e) => setSearchText(e.target.value)}
            />
          </div>

          <div>
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              customInput={<input type="text" className="input_styles" />}
              placeholderText="start date"
            />
          </div>

          <div>
            <DatePicker
              selected={endDate}
              onChange={(date) => setEndDate(date)}
              customInput={<input type="text" className="input_styles" />}
              placeholderText="end date"
            />
          </div>

          <div className="relative z-0">
            <select
              id="shippingAddress"
              name="shippingAddress"
              onClick={(e) => setShippingAddress(e.target.value)}
              className="input_styles relative appearance-none focus:outline-none focus:border-blue-500"
            >
              <option value="" className="text-gray-500">
                shipping address
              </option>
              <option value="inside-dhaka">Inside Dhaka</option>
              <option value="outside-dhaka">Outside Dhaka</option>
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

          <div className="relative z-0">
            <select
              id="status"
              name="status"
              onClick={(e) => setOrderStatus(e.target.value)}
              className="input_styles relative appearance-none focus:outline-none focus:border-blue-500"
            >
              <option value="" className="text-gray-500">
                status
              </option>
              <option value="pending">Pending</option>
              <option value="ordered">Ordered</option>
              <option value="complete">Complete</option>
              <option value="processing">Processing</option>
              <option value="delivered">Delivered</option>
              <option value="cancel">Cancel</option>
              <option value="deleted">Deleted</option>
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

          <div className="">
            <button
              onClick={handleReset}
              type="reset"
              className="bg-primary-600 text-white lg:w-4/6 w-full cursor-pointer py-3 border-none rounded-md font-medium"
            >
              Reset
            </button>
          </div>
        </div>
      </form>

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
                  <th
                    scope="col"
                    className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Action
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Invoice
                  </th>
                </tr>
              </thead>

              <tbody className="bg-white divide-y divide-gray-200">
                {loading ? (
                  <p>Loading...</p>
                ) : (
                  <OrderTable
                    data={data?.data}
                    handleOrderStatusUpdate={handleOrderStatusUpdate}
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

export default orders;
