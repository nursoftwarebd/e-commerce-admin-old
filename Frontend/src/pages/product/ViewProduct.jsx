import React from "react";
import { Link, useParams } from "react-router-dom";
import placeholderImg from "../../assets/placeholder.png";
import Badges from "../../components/lib/Badges";
import Breadcrumbs from "../../components/lib/Breadcrumbs";
import useProductSubmit from "../../hooks/useProductSubmit";
import OrderServices from "../../services/OrderServices";
import ProductServices from "../../services/ProductServices";

const ViewProduct = () => {
  let { id } = useParams();

  const { singleProduct, getValues } = useProductSubmit(id);

  const handleOrder = async (id) => {
    try {
      ProductServices.getSingleProduct(id)
        .then((res) => {
          const orderInfo = {
            vat: "0",
            total: "400.89",
            discount: "0",
            invoice: "342",
            cart: res?.data,
            status: "pending",
            shippingCost: "60",
            paidAmount: "100",
            address: "dhaka,bangladesh",
            shippingAddress: "inside-dhaka",
            paymentMethod: "cash on delivery",
            customer: "6459be26f78c4f444330b3fd",
          };

          OrderServices.singleCreateOrder(orderInfo)
            .then((res) => {
              console.log(res);
            })
            .catch((err) => {
              console.log(err);
            });
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <h2 className="font-semibold text-2xl text-heading dark:text-gray-400">
        product details
      </h2>

      <Breadcrumbs
        url={"products"}
        mainTitle={"products"}
        subTitle={getValues("productTitle")}
      />

      <div className="inline-block overflow-y-auto h-full align-middle transition-all transform">
        <div className="flex flex-col lg:flex-row md:flex-row w-full overflow-hidden">
          <div className="flex-shrink-0 flex items-center justify-center h-auto">
            {singleProduct?.images?.length > 0 ? (
              <img
                src={singleProduct?.images[0]?.Location}
                alt="product"
                className="h-64 w-64"
              />
            ) : (
              <img src={placeholderImg} alt="product" />
            )}
          </div>

          <div className="w-full flex flex-col p-5 md:p-8 text-left">
            <div className="mb-5 block ">
              <div className=" font-semibold py-1 text-sm">
                <p className="text-sm pr-4">
                  Status:{" "}
                  {singleProduct?.status === "show" ? (
                    <span className="text-primary-400">
                      This Product Showing
                    </span>
                  ) : (
                    <span className="text-error-400">This product hidden</span>
                  )}
                </p>
              </div>
              <h2 className="text-heading text-lg md:text-xl lg:text-2xl font-semibold  dark:text-gray-400">
                {singleProduct?.name}
              </h2>
              <p className="uppercase  font-medium text-gray-500 dark:text-gray-400 text-sm">
                Sku :{" "}
                <span className="font-bold text-gray-500 dark:text-gray-500">
                  {singleProduct?.sku}
                </span>
              </p>
            </div>

            <div className=" product-price font-bold dark:text-gray-400">
              <span className="inline-block text-2xl">
                ${singleProduct?.price}
                {singleProduct?.salePrice >= singleProduct?.price && (
                  <del className="text-gray-400 dark:text-gray-500 text-lg pl-2">
                    ${singleProduct?.salePrice}
                  </del>
                )}
              </span>
            </div>
            <div className="mb-3">
              {singleProduct?.stock <= 0 ? (
                <Badges title={"Stock Out"} color={"error"} />
              ) : (
                <Badges title={"Stock In"} color={"success"} />
              )}
              <span className="text-sm text-gray-500 dark:text-gray-400 font-medium pl-4">
                Quantity: {singleProduct?.stock}
              </span>
            </div>
            <p className="text-sm leading-6 text-gray-500 dark:text-gray-400 md:leading-7">
              {singleProduct?.description}
            </p>
            <div className="flex flex-col mt-4">
              <p className=" font-semibold py-1 text-gray-500 text-sm">
                <span className="text-gray-700 dark:text-gray-400">
                  Category:{" "}
                </span>{" "}
                {singleProduct?.category?.name}
              </p>
              <div className="flex flex-row">
                {singleProduct?.tags?.map((tag, i) => (
                  <span
                    key={i + 1}
                    className="bg-gray-200 mr-2 border-0 text-gray-500 rounded-full inline-flex items-center justify-center px-2 py-1 text-xs font-semibold  mt-2"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <div className="flex gap-2 mt-6">
              <button
                type="button"
                onClick={() => handleOrder(id)}
                className="text-white bg-primary-700 hover:bg-primary-800 focus:outline-none font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
              >
                Add to Cart
              </button>
              <Link
                to={`/product/${id}/edit`}
                className="text-white bg-success-700 hover:bg-success-800 focus:outline-none font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
              >
                Edit Product
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewProduct;
