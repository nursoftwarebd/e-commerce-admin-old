import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { notifySuccess } from "../components/lib/ToastifyMessage";
import { SidebarContext } from "../context/SidebarContext";
import CustomerServices from "../services/CustomerServices";
import ImageUploadServices from "../services/ImageUploadServices";

const useCustomerSubmit = (id) => {
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
  const [image, setImage] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // handle image upload
  const handleImageUpload = (file) => {
    setIsLoading(true);
    const files = new FormData();
    files.append("files", file[0]);

    ImageUploadServices.singleImageUpload(files)
      .then((res) => {
        setIsLoading(false);
        setImage(res.data[0]);
      })
      .catch((err) => {
        setIsLoading(false);
        console.log(err);
      });
  };

  // handle image delete
  const handleImageDelete = (fileKey) => {
    ImageUploadServices.singleImageDelete({ imageKey: fileKey })
      .then((res) => {
        console.log("res", res);
        setImage({});
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // handle submit create/update function
  const onSubmit = (data) => {
    setIsSubmitting(true);

    const customerInfo = {
      image: image,
      name: data.customerName,
      email: data.customerEmail,
      phone: data.customerPhone,
      password: data.customerPassword,
    };
    // id
    if (id) {
      CustomerServices.singleUpdateCustomer(id, customerInfo)
        .then((res) => {
          setImage({});
          setIsUpdate(true);
          notifySuccess(res.message);
          setIsSubmitting(false);
          navigate("/customer");
        })
        .catch((err) => {
          setIsSubmitting(false);
          console.log(err);
        });
    } else {
      CustomerServices.singleCreateCustomer(customerInfo)
        .then((res) => {
          closeDrawer();
          setIsUpdate(true);
          notifySuccess(res.message);
          setIsSubmitting(false);
        })
        .catch((err) => {
          setIsSubmitting(false);
          console.log(err);
        });
    }
  };

  useEffect(() => {
    if (!isDrawerOpen) {
      setValue("customerName");
      setValue("customerEmail");
      setValue("customerPhone");
      setValue("customerPassword");
      setImage({});
    }

    if (id) {
      CustomerServices.getSingleCustomer(id)
        .then((res) => {
          setValue("customerName", res?.data?.name);
          setValue("customerEmail", res?.data?.email);
          setValue("customerPhone", res?.data?.phone);
          setImage(res?.data?.image);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [isDrawerOpen, id, setValue]);

  return {
    image,
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
    isSubmitting,
    setServicesId,
    handleImageDelete,
    isOpenDeleteModal,
    handleImageUpload,
    handleCloseDeleteModal,
  };
};

export default useCustomerSubmit;
