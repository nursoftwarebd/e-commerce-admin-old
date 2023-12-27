import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { notifySuccess } from "../components/lib/ToastifyMessage";
import { SidebarContext } from "../context/SidebarContext";
import CategoryServices from "../services/CategoryServices";
import ImageUploadServices from "../services/ImageUploadServices";
import ProductServices from "../services/ProductServices";
import useAsync from "./useAsync";

const useProductSubmit = (id) => {
  const navigate = useNavigate();
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

  // api calling
  // api calling function (parent and children category)
  const { data: mainCategories, loading: categoryLoading } = useAsync(
    CategoryServices.getAllParentCategory
  );

  // react form hook
  const {
    register,
    setValue,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm();

  // react hook
  const [tags, setTags] = useState([]);
  const [slug, setSlug] = useState("");
  const [images, setImages] = useState([]);
  const [options, setOptions] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [singleProduct, setSingleProduct] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [subCategories, setSubCategories] = useState([]);
  const [defaultCategory, setDefaultCategory] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState([]);

  // handle image upload
  const handleImageUpload = (files) => {
    setIsLoading(true);
    const formData = new FormData();
    for (const file of files) {
      formData.append("files", file);
    }

    ImageUploadServices.singleImageUpload(formData)
      .then((res) => {
        // console.log("res", res);
        setIsLoading(false);
        setImages([...images, ...res.data]);
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
        const dd = images.filter((image) => image.Key !== fileKey);
        setImages(dd);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // for handle product slug
  const handleProductSlug = (value) => {
    setValue("slug", value.toLowerCase().replace(/[^A-Z0-9]+/gi, "-"));
    setSlug(value.toLowerCase().replace(/[^A-Z0-9]+/gi, "-"));
  };

  // handle submit
  const onSubmit = (data) => {
    setIsSubmitting(true);
    const productInfo = {
      name: data.productTitle,
      slug: data.slug ? data.slug : slug,
      description: data.description,
      sku: data.sku,
      barCode: data.barCode,
      price: data.price,
      salePrice: data.salePrice,
      stock: data.stock,
      tags: tags,
      orderBy: 1,
      images: images,
      status: "hide",
      categories: selectedCategory.map((category) => category._id),
      category: data.defaultCategory,
    };

    if (id) {
      ProductServices.singleUpdateProduct(id, productInfo)
        .then((res) => {
          setIsUpdate(true);
          setIsSubmitting(false);
          notifySuccess(res?.message);
          navigate("/products");
        })
        .catch((err) => {
          setIsSubmitting(false);
          console.log(err);
        });
    } else {
      ProductServices.singleCreateProduct(productInfo)
        .then((res) => {
          // console.log("res", res);
          closeDrawer();
          setIsUpdate(true);
          setIsSubmitting(false);
          notifySuccess(res.message);
        })
        .catch((err) => {
          setIsSubmitting(false);
          console.log(err);
        });
    }
  };

  // unique array in function
  const uniqueArray = (arr) => {
    return [...new Set(arr)];
  };

  useEffect(() => {
    if (!isDrawerOpen) {
      setTags([]);
      setImages([]);
      setCategories([]);
      setSubCategories([]);
      setSelectedCategory([]);

      setValue("sku");
      setValue("slug");
      setValue("price");
      setValue("stock");
      setValue("barCode");
      setValue("category");
      setValue("salePrice");
      setValue("subCategory");
      setValue("description");
      setValue("productName");
      setValue("productTitle");
      setValue("mainCategory");
      setValue("defaultCategory");
    }

    if (id) {
      ProductServices.getSingleProduct(id)
        .then((res) => {
          setSingleProduct(res?.data);
          setValue("sku", res?.data?.sku);
          setValue("slug", res?.data?.slug);
          setValue("price", res?.data?.price);
          setValue("stock", res?.data?.stock);
          setValue("barCode", res?.data?.barCode);
          setValue("productTitle", res?.data?.name);
          setValue("salePrice", res?.data?.salePrice);
          setValue("description", res?.data?.description);
          setValue("defaultCategory", res?.data?.category?._id);

          const categories = res?.data?.categories?.map((category) => {
            return {
              value: category._id,
              label: category.name,
            };
          });

          setOptions(categories);
          setSelectedCategory(categories);
          setDefaultCategory([
            {
              label: res?.data?.category?.name,
              value: res?.data?.category?._id,
            },
          ]);

          setTags(res?.data?.tags);
          setImages(res?.data?.images);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [id, isDrawerOpen, setValue]);

  return {
    tags,
    images,
    errors,
    setTags,
    options,
    onSubmit,
    setValue,
    register,
    getValues,
    isLoading,
    setOptions,
    categories,
    servicesId,
    setIsUpdate,
    closeDrawer,
    uniqueArray,
    toggleDrawer,
    isDrawerOpen,
    isSubmitting,
    handleSubmit,
    setCategories,
    subCategories,
    singleProduct,
    setServicesId,
    mainCategories,
    defaultCategory,
    categoryLoading,
    setSubCategories,
    selectedCategory,
    isOpenDeleteModal,
    handleImageDelete,
    handleProductSlug,
    handleImageUpload,
    setDefaultCategory,
    setSelectedCategory,
    handleCloseDeleteModal,
  };
};

export default useProductSubmit;
