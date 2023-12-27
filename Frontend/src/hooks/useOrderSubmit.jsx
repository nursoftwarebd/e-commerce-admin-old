import { useContext } from "react";
import { useForm } from "react-hook-form";
import { notifySuccess } from "../components/lib/ToastifyMessage";
import { SidebarContext } from "../context/SidebarContext";
import OrderServices from "../services/OrderServices";

const useOrderSubmit = () => {
  // react hook
  const { setIsUpdate } = useContext(SidebarContext);
  const {
    register,
    setValue,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm();

  // handle order status
  const handleOrderStatusUpdate = (value, orderId) => {
    OrderServices.singleUpdateOrderStatus(orderId, { status: value })
      .then((res) => {
        setIsUpdate(true);
        notifySuccess(res?.message);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return {
    errors,
    register,
    setValue,
    getValues,
    handleSubmit,
    handleOrderStatusUpdate,
  };
};

export default useOrderSubmit;
