import Cookies from "js-cookie";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { notifySuccess } from "../components/lib/ToastifyMessage";
import AdminServices from "../services/AdminServices";

const useLoginRegisterSubmit = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // on submit register
  const onSubmitRegister = async (data) => {
    const adminData = {
      name: data.name,
      email: data.email,
      password: data.password,
    };

    AdminServices.adminSignUp(adminData)
      .then((res) => {
        console.log(res.data);
        notifySuccess("Register Successfully");
        return navigate("/");
      })
      .catch((err) => console.log(err.message));
  };

  // on submit login
  const onSubmitLogin = async (data) => {
    try {
      const res = await AdminServices.adminSignIn(data);

      const expire = new Date(new Date().getTime() + 30 * 24 * 60 * 60 * 1000);

      if (res) {
        localStorage.setItem("adminInfo", JSON.stringify(res), {
          expires: expire,
          sameSite: "none",
          secure: true,
        });
        Cookies.set("adminInfo", JSON.stringify(res), {
          expires: expire,
          sameSite: "none",
          secure: true,
        });
        notifySuccess("Login Successfully");
        return navigate("/");
      } else {
        console.log("There is no Company associated with this account.");
      }
    } catch (error) {
      console.log(err.message);
    }
  };

  return {
    errors,
    register,
    handleSubmit,
    onSubmitLogin,
    onSubmitRegister,
  };
};

export default useLoginRegisterSubmit;
