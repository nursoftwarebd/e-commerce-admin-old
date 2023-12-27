import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { notifySuccess } from "../components/lib/ToastifyMessage";
import { SidebarContext } from "../context/SidebarContext";
import AttributeServices from "../services/AttributeServices";

const useAttributeSubmit = (id, subId) => {
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
  const [variants, setVariants] = useState([]);
  const [selected, setSelected] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // handle submit create/update function
  const onSubmit = (data) => {
    setIsSubmitting(true);

    const attributeInfo = {
      title: data.title,
      name: data.name,
      options: data.options,
      variants: selected.map((item) => {
        return {
          name: item,
        };
      }),
      status: "show",
    };

    // attribute edit
    if (id) {
      AttributeServices.singleUpdateAttribute(id, attributeInfo)
        .then((res) => {
          // console.log(res);
          notifySuccess(res.message);
          setIsSubmitting(false);
          setValue("title");
          setValue("name");
          setValue("options");
          setValue("variants");
          setSelected([]);
          navigate("/attribute");
          setIsUpdate(true);
        })
        .catch((err) => {
          setIsSubmitting(false);
          console.log(err);
        });
    } else {
      // attribute create
      AttributeServices.singleCreateAttribute(attributeInfo)
        .then((res) => {
          setIsSubmitting(false);
          setIsUpdate(true);
          closeDrawer();
          setValue("title");
          setValue("name");
          setValue("options");
          setSelected([]);
          setValue("variants");
          notifySuccess(res.message);
        })
        .catch((err) => {
          setIsSubmitting(false);
          console.log(err);
        });
    }
  };

  const onSubmitVariant = (data) => {
    setIsSubmitting(true);

    const variantInfo = {
      name: data.variantName,
      status: "show",
    };
    if (subId) {
      AttributeServices.singleUpdateAttributeVariant(subId, variantInfo)
        .then((res) => {
          setIsUpdate(true);
          setIsSubmitting(false);
          notifySuccess(res.message);
          navigate(`/attribute/${id}/variants`);

          setValue("variantName");
        })
        .catch((err) => {
          setIsSubmitting(false);
          console.log(err);
        });
    } else {
      AttributeServices.singleCreateAttributeVariant(id, variantInfo)
        .then((res) => {
          closeDrawer();
          setIsUpdate(true);
          setIsSubmitting(false);
          notifySuccess(res.message);

          setValue("variantName");
        })
        .catch((err) => {
          setIsSubmitting(false);
          console.log(err);
        });
    }
  };

  useEffect(() => {
    if (!isDrawerOpen) {
      setValue("title");
      setValue("name");
      setValue("options");
      setValue("variants");
    }

    if (id) {
      AttributeServices.getSingleAttribute(id)
        .then((res) => {
          setValue("title", res?.data?.title);
          setValue("name", res?.data?.name);
          setValue("options", res?.data?.options);
          setValue("variants", res?.data?.variants);
          setVariants(res?.data?.variants);

          const singleVariant = res?.data?.variants?.find(
            (item) => item._id === subId
          );
          setValue("variantName", singleVariant?.name);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [isDrawerOpen, id, setValue]);

  return {
    errors,
    onSubmit,
    variants,
    selected,
    register,
    isLoading,
    getValues,
    servicesId,
    closeDrawer,
    setVariants,
    setSelected,
    setIsLoading,
    toggleDrawer,
    isDrawerOpen,
    handleSubmit,
    isSubmitting,
    setServicesId,
    onSubmitVariant,
    isOpenDeleteModal,
    handleCloseDeleteModal,
  };
};

export default useAttributeSubmit;
