import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { notifySuccess } from "../components/lib/ToastifyMessage";
import { SidebarContext } from "../context/SidebarContext";
import CouponsServices from "../services/CouponServices";

const useCouponSubmit = (id) => {
  const navigate = useNavigate();
  const {
    register,
    setValue,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm();

  // react hook
  const {
    servicesId,
    setIsUpdate,
    closeDrawer,
    toggleDrawer,
    isDrawerOpen,
    setServicesId,
    isOpenDeleteModal,
    handleCloseDeleteModal,
  } = useContext(SidebarContext);

  // react hook
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // handle Coupon delete
  const handleDeleteCoupon = (id) => {
    CouponsServices.singleDeleteCoupons(id)
      .then((res) => {
        setIsUpdate(true);
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
        setIsUpdate(true);
      });
  };

  // handle submit create/update function
  const onSubmit = (data) => {
    setIsSubmitting(true);

    const couponInfo = {
      name: data.couponName,
      code: data.code,
      discount: data.discount,
      amountType: data.amountType,
      orderBy: 1,
      startDate: data.startDate,
      endDate: data.endDate,
      status: "show",
    };

    // edit
    if (id) {
      CouponsServices.singleUpdateCoupons(id, couponInfo)
        .then((res) => {
          // console.log(res);
          notifySuccess(res.message);
          setIsSubmitting(false);
          setValue("couponName");
          setValue("code");
          setValue("discount");
          setValue("amountType");
          setValue("startDate");
          setValue("endDate");
          navigate("/coupons");
        })
        .catch((err) => {
          setIsSubmitting(false);
          console.log(err);
        });
    } else {
      // create
      CouponsServices.singleCreateCoupons(couponInfo)
        .then((res) => {
          setIsSubmitting(false);
          setIsUpdate(true);
          closeDrawer();
          setValue("couponName");
          setValue("code");
          setValue("discount");
          setValue("amountType");
          setValue("startDate");
          setValue("endDate");
          notifySuccess(res.message);
        })
        .catch((err) => {
          setIsSubmitting(false);
          console.log(err);
        });
    }
  };

  useEffect(() => {
    if (!isDrawerOpen) {
      setValue("couponName");
      setValue("code");
      setValue("discount");
      setValue("amountType");
      setValue("startDate");
      setValue("endDate");
    }

    // get

    if (id) {
      CouponsServices.getSingleCoupons(id)
        .then((res) => {
          setValue("couponName", res?.data?.name);
          setValue("code", res?.data?.code);
          setValue("discount", res?.data?.discount);
          setValue("amountType", res?.data?.amountType);
          setValue("orderBy", res?.data?.orderBy);
          setValue(
            "startDate",
            new Date(res?.data?.startDate).toJSON().slice(0, 10)
          );
          setValue(
            "endDate",
            new Date(res?.data?.endDate).toJSON().slice(0, 10)
          );
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [isDrawerOpen, id, setValue]);

  return {
    errors,
    onSubmit,
    register,
    isLoading,
    getValues,
    servicesId,
    closeDrawer,
    toggleDrawer,
    isDrawerOpen,
    handleSubmit,
    setIsLoading,
    isSubmitting,
    setServicesId,
    isOpenDeleteModal,
    handleDeleteCoupon,
    handleCloseDeleteModal,
  };
};

export default useCouponSubmit;
