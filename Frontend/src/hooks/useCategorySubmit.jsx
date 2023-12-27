import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { notifySuccess } from "../components/lib/ToastifyMessage";
import { SidebarContext } from "../context/SidebarContext";
import CategoryServices from "../services/CategoryServices";
import ImageUploadServices from "../services/ImageUploadServices";
import useAsync from "./useAsync";

const useCategorySubmit = (id) => {
  const navigate = useNavigate();
  const {
    register,
    setValue,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm();

  // api calling function (parent and children category)
  const { data: categories, loading } = useAsync(
    CategoryServices.getAllParentCategory
  );

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
  const [slug, setSlug] = useState("");
  const [image, setImage] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [subCategories, setSubCategories] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [parentCategory, setParentCategory] = useState("");
  const [enabledSwitch, setEnabledSwitch] = useState(false);

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

  // handle category delete
  const handleDeleteCategory = (id) => {
    CategoryServices.singleDeleteCategory(id)
      .then((res) => {
        setIsUpdate(true);
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
        setIsUpdate(true);
      });
  };

  // for handle category slug
  const handleCategorySlug = (value) => {
    setValue("slug", value.toLowerCase().replace(/[^A-Z0-9]+/gi, "-"));
    setSlug(value.toLowerCase().replace(/[^A-Z0-9]+/gi, "-"));
  };

  // handle submit create/update function
  const onSubmit = (data) => {
    setIsSubmitting(true);

    const categoryInfo = {
      image: image,
      name: data.name,
      slug: data.slug ? data.slug : slug,
      description: data.description,
      orderBy: categories?.count + 1,
      parentId:
        subCategories?.length === 0
          ? parentCategory
          : data?.childrenCategoryId === "" ||
            data?.childrenCategoryId === undefined
          ? parentCategory
          : data?.childrenCategoryId,
    };

    if (id) {
      CategoryServices.singleUpdateCategory(id, categoryInfo)
        .then((res) => {
          // console.log("res", res);
          notifySuccess(res.message);
          navigate("/category");
          setImage({});
          setIsSubmitting(false);
          setSubCategories([]);
          setParentCategory("");
          setValue("name");
          setValue("description");
          setValue("parentId");
          setValue("childrenCategoryId");
        })
        .catch((err) => {
          setIsSubmitting(false);
          console.log(err);
        });
    } else {
      CategoryServices.singleCreateCategory(categoryInfo)
        .then((res) => {
          setIsSubmitting(false);
          setIsUpdate(true);
          closeDrawer();
          setImage({});
          setSubCategories([]);
          setParentCategory("");
          setValue("name");
          setValue("description");
          setValue("parentId");
          setValue("childrenCategoryId");
          notifySuccess(res.message);
        })
        .catch((err) => {
          setIsSubmitting(false);
          console.log(err.message);
        });
    }
  };

  useEffect(() => {
    if (!isDrawerOpen) {
      setImage({});
      setSlug("");
      setValue("name");
      setValue("slug");
      setSubCategories([]);
      setParentCategory("");
      setValue("description");
      setValue("childrenCategoryId");
    }

    if (id) {
      CategoryServices.getSingleCategory(id)
        .then((res) => {
          setValue("name", res?.data?.name);
          setValue("slug", res?.data?.slug);
          setValue("parentId", res?.data?.parentId);
          setValue("parentCategory", res?.data?.parentCategory?.name);
          setValue("description", res?.data?.description);
          setParentCategory(res?.data?.parentId);
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
    loading,
    onSubmit,
    register,
    isLoading,
    getValues,
    servicesId,
    categories,
    closeDrawer,
    toggleDrawer,
    isDrawerOpen,
    handleSubmit,
    isSubmitting,
    subCategories,
    enabledSwitch,
    setServicesId,
    parentCategory,
    setEnabledSwitch,
    setSubCategories,
    setParentCategory,
    handleImageUpload,
    handleImageDelete,
    isOpenDeleteModal,
    handleCategorySlug,
    handleDeleteCategory,
    handleCloseDeleteModal,
  };
};

export default useCategorySubmit;
