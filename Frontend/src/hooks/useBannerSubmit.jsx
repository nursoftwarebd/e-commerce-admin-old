import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { notifySuccess } from "../components/lib/ToastifyMessage";
import { SidebarContext } from "../context/SidebarContext";
import BannerServices from "../services/BannerServices";
import ImageUploadServices from "../services/ImageUploadServices";

const useBannerSubmit = (id) => {
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

    const bannerInfo = {
      image: image,
      name: data.name,
      link: data.link,
      orderBy: 1,
      description: data.description,
    };

    // edit
    if (id) {
      BannerServices.singleUpdateBanner(id, bannerInfo)
        .then((res) => {
          // console.log(res);
          notifySuccess(res.message);
          setImage({});
          setIsSubmitting(false);
          setValue("name");
          setValue("description");
          setValue("link");
          navigate("/banner");
        })
        .catch((err) => {
          setIsSubmitting(false);
          console.log(err);
        });
    } else {
      // create
      BannerServices.singleCreateBanner(bannerInfo)
        .then((res) => {
          setIsSubmitting(false);
          setIsUpdate(true);
          closeDrawer();
          setImage({});
          setValue("name");
          setValue("description");
          setValue("link");
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
      setImage({});
      setValue("name");
      setValue("description");
      setValue("link");
    }

    // get

    if (id) {
      BannerServices.getSingleBanner(id)
        .then((res) => {
          setValue("name", res?.data?.name);
          setValue("description", res?.data?.description);
          setValue("link", res?.data?.link);
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
    handleImageUpload,
    handleImageDelete,
    isOpenDeleteModal,
    handleCloseDeleteModal,
  };
};

export default useBannerSubmit;
