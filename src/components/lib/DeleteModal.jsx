import { Dialog, Transition } from "@headlessui/react";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import React, { Fragment, useContext, useRef, useState } from "react";
// internal import
import spinnerLoadingImage from "../../assets/animate-spin.gif";
import { SidebarContext } from "../../context/SidebarContext";
import AttributeServices from "../../services/AttributeServices";
import BannerServices from "../../services/BannerServices";
import CategoryServices from "../../services/CategoryServices";
import CouponsServices from "../../services/CouponServices";
import CustomerServices from "../../services/CustomerServices";
import ProductServices from "../../services/ProductServices";
import { notifySuccess } from "./ToastifyMessage";

const DeleteModal = ({
  id,
  table,
  isOpen,
  titleLowercase,
  handleCloseDeleteModal,
}) => {
  const cancelButtonRef = useRef(null);

  // react hook
  const { setIsUpdate, setServicesId } = useContext(SidebarContext);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // handle delete
  const handleDelete = () => {
    setIsSubmitting(true);

    if (table === "category") {
      CategoryServices.singleDeleteCategory(id)
        .then((res) => {
          // console.log(res);
          notifySuccess(res.message);
          setIsUpdate(true);
          setServicesId("");
          setIsSubmitting(false);
          handleCloseDeleteModal();
        })
        .catch((err) => {
          setServicesId("");
          setIsSubmitting(false);
          handleCloseDeleteModal();
          console.log(err);
        });
    }
    if (table === "attribute") {
      AttributeServices.singleDeleteAttribute(id)
        .then((res) => {
          // console.log(res);
          notifySuccess(res.message);
          setIsUpdate(true);
          setServicesId("");
          setIsSubmitting(false);
          handleCloseDeleteModal();
        })
        .catch((err) => {
          setServicesId("");
          setIsSubmitting(false);
          handleCloseDeleteModal();
          console.log(err);
        });
    }
    if (table === "variant") {
      AttributeServices.singleDeleteAttributeVariant(id)
        .then((res) => {
          // console.log(res);
          setIsUpdate(true);
          setServicesId("");
          setIsSubmitting(false);
          handleCloseDeleteModal();
          notifySuccess(res.message);
          window.location.reload();
        })
        .catch((err) => {
          setServicesId("");
          setIsSubmitting(false);
          handleCloseDeleteModal();
          console.log(err);
        });
    }
    if (table === "banner") {
      BannerServices.singleDeleteBanner(id)
        .then((res) => {
          // console.log(res);
          setIsUpdate(true);
          notifySuccess(res.message);
          setServicesId("");
          setIsSubmitting(false);
          handleCloseDeleteModal();
        })
        .catch((err) => {
          setServicesId("");
          setIsSubmitting(false);
          handleCloseDeleteModal();
          console.log(err);
        });
    }
    if (table === "coupons") {
      CouponsServices.singleDeleteCoupons(id)
        .then((res) => {
          // console.log(res);
          notifySuccess(res.message);
          setIsUpdate(true);
          setServicesId("");
          setIsSubmitting(false);
          handleCloseDeleteModal();
        })
        .catch((err) => {
          setServicesId("");
          setIsSubmitting(false);
          handleCloseDeleteModal();
          console.log(err);
        });
    }
    if (table === "product") {
      ProductServices.singleDeleteProduct(id)
        .then((res) => {
          // console.log(res);
          notifySuccess(res.message);
          setIsUpdate(true);
          setServicesId("");
          setIsSubmitting(false);
          handleCloseDeleteModal();
        })
        .catch((err) => {
          setServicesId("");
          setIsSubmitting(false);
          handleCloseDeleteModal();
          console.log(err);
        });
    }
    if (table === "customer") {
      CustomerServices.singleDeleteCustomer(id)
        .then((res) => {
          // console.log(res);
          notifySuccess(res.message);
          setIsUpdate(true);
          setServicesId("");
          setIsSubmitting(false);
          handleCloseDeleteModal();
        })
        .catch((err) => {
          setServicesId("");
          setIsSubmitting(false);
          handleCloseDeleteModal();
          console.log(err);
        });
    }
  };

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        initialFocus={cancelButtonRef}
        onClose={handleCloseDeleteModal}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                <div>
                  <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                    <div className="sm:flex sm:items-start">
                      <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                        <ExclamationTriangleIcon
                          className="h-6 w-6 text-red-600"
                          aria-hidden="true"
                        />
                      </div>
                      <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                        <Dialog.Title
                          as="h3"
                          className="text-base capitalize font-semibold leading-6 text-gray-900"
                        >
                          Delete {titleLowercase}
                        </Dialog.Title>
                        <div className="mt-2">
                          <p className="text-sm text-gray-500">
                            Are you sure you want to Delete your{" "}
                            {titleLowercase}? All of your data will be
                            permanently removed. This action cannot be undone.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-50 py-2 sm:flex sm:flex-row-reverse sm:px-6 gap-x-2">
                    {isSubmitting ? (
                      <button
                        disabled={true}
                        type="button"
                        className={`flex justify-center items-center gap-x-1 bg-error-600 text-white px-3 py-2 border-none rounded-md font-medium ${
                          isSubmitting ? "cursor-not-allowed" : "cursor-pointer"
                        }`}
                      >
                        <img
                          src={spinnerLoadingImage}
                          alt="Loading"
                          width={20}
                          height={10}
                        />{" "}
                        <span className="font-serif ml-2 font-light">
                          Processing
                        </span>
                      </button>
                    ) : (
                      <button
                        disabled={isSubmitting ? true : false}
                        type="button"
                        className={`inline-flex w-full justify-center rounded-md bg-error-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-error-500 sm:ml-3 sm:w-auto ${
                          isSubmitting ? "cursor-not-allowed" : "cursor-pointer"
                        }`}
                        onClick={handleDelete}
                      >
                        Delete
                      </button>
                    )}

                    {/* <button
                      type="submit"
                      className={`bg-primary-600 text-white w-full py-3 border-none rounded-md font-medium ${
                        isLoading || isSubmitting
                          ? "cursor-not-allowed"
                          : "cursor-pointer"
                      }`}
                    >
                      <span>Add Category</span>
                    </button> */}

                    <button
                      type="button"
                      className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                      onClick={handleCloseDeleteModal}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default DeleteModal;
