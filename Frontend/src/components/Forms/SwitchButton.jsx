import { Switch } from "@headlessui/react";
import React, { useContext } from "react";
import { SidebarContext } from "../../context/SidebarContext";
import AttributeServices from "../../services/AttributeServices";
import BannerServices from "../../services/BannerServices";
import CategoryServices from "../../services/CategoryServices";
import CustomerServices from "../../services/CustomerServices";
import ProductServices from "../../services/ProductServices";
import { notifySuccess } from "../lib/ToastifyMessage";

const SwitchButton = ({ id, status, table }) => {
  const { setIsUpdate } = useContext(SidebarContext);

  // handle change
  const handleChange = async (itemId) => {
    try {
      let newStatus;
      if (status === "show") {
        newStatus = "hide";
      } else {
        newStatus = "show";
      }

      if (table === "category") {
        const res = await CategoryServices.singleUpdateCategoryStatus(itemId, {
          status: newStatus,
        });
        setIsUpdate(true);
        notifySuccess(res?.message || "Status Update successfully!");
      }
      if (table === "attribute") {
        const res = await AttributeServices.singleUpdateAttributeStatus(
          itemId,
          {
            status: newStatus,
          }
        );
        setIsUpdate(true);
        notifySuccess(res?.message || "Status Update successfully!");
      }
      if (table === "variant") {
        const res = await AttributeServices.singleUpdateAttributeVariantStatus(
          itemId,
          {
            status: newStatus,
          }
        );
        setIsUpdate(true);
        notifySuccess(res?.message || "Status Update successfully!");
        window.location.reload();
      }
      if (table === "banner") {
        const res = await BannerServices.singleUpdateBannerStatus(itemId, {
          status: newStatus,
        });
        setIsUpdate(true);
        notifySuccess(res?.message || "Status Update successfully!");
      }
      if (table === "product") {
        const res = await ProductServices.singleUpdateProductStatus(itemId, {
          status: newStatus,
        });
        setIsUpdate(true);
        notifySuccess(res?.message || "Status Update successfully!");
      }
      if (table === "productFeatured") {
        const res = await ProductServices.singleUpdateProductFeatured(itemId, {
          featured: newStatus,
        });
        setIsUpdate(true);
        notifySuccess(res?.message || "Status Update successfully!");
      }
      if (table === "customer") {
        const res = await CustomerServices.singleUpdateCustomerStatus(itemId, {
          status: newStatus,
        });
        setIsUpdate(true);
        notifySuccess(res?.message || "Status Update successfully!");
      }
    } catch (error) {
      console.log("error ====>", error);
    }
  };

  return (
    <Switch
      checked={status === "show"}
      onChange={() => handleChange(id)}
      className={`${
        status === "show" ? "bg-primary-600" : "bg-gray-300"
      } relative inline-flex h-6 w-11 items-center rounded-full`}
    >
      <span className="sr-only">Enable notifications</span>
      <span
        className={`${
          status === "show" ? "translate-x-6" : "translate-x-1"
        } inline-block h-4 w-4 transform rounded-full bg-white transition`}
      />
    </Switch>
  );
};

export default SwitchButton;
