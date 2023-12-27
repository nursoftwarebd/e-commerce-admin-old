import React, { useState } from "react";
import BestSellingChart from "./BestSellingChart";
import OrdersChart from "./OrdersChart";
import SalesChart from "./SalesChart";

const Chart = () => {
  const [active, setActive] = useState("sales");
  return (
    <div className=" grid lg:grid-cols-2 gap-4 mb-10">
      <div className="bg-white shadow-custom rounded-[8px] p-4">
        <h2 className="text-base font-semibold ">Weekly Sales</h2>
        <div className="flex gap-4 border-b mt-6">
          <button
            onClick={() => setActive("sales")}
            className={`px-2 text-gray-600 border-b-[2px] border-b-transparent pb-[8px] ${
              active === "sales" && `text-secondary-400 border-b-secondary-400`
            }`}
          >
            Sales
          </button>
          <button
            onClick={() => setActive("order")}
            className={`px-2 text-gray-600 border-b-[2px] border-b-transparent pb-[8px] ${
              active === "order" && `text-secondary-400 border-b-secondary-400`
            }`}
          >
            Orders
          </button>
        </div>
        <div className="mt-8">
          {active === "sales" && <SalesChart />}
          {active === "order" && <OrdersChart />}
        </div>
      </div>
      <div className="bg-white shadow-custom rounded-[8px]">
        <h2 className="text-base font-semibold p-4">Best Selling Products</h2>
        <BestSellingChart />
      </div>
    </div>
  );
};

export default Chart;
