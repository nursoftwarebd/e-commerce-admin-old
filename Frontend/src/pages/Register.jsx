import React from "react";
import registerImage from "../assets/register.jpeg";
import useLoginRegisterSubmit from "../hooks/useLoginRegisterSubmit";

const Register = () => {
  const { onSubmitRegister, handleSubmit, register, errors } = useLoginRegisterSubmit();

  return (
    <div className="flex items-center min-h-screen p-6 bg-gray-50">
      <div className="flex-1 h-full max-w-4xl mx-auto overflow-hidden bg-white rounded-lg shadow-md">
        <div className="flex flex-col overflow-y-auto md:flex-row">
          <div className="h-32 md:h-auto md:w-1/2">
            <img
              aria-hidden="true"
              className="hidden object-cover w-full h-full dark:block"
              src={registerImage}
              alt="Office"
            />
          </div>

          <main className="flex items-center justify-center p-6 sm:p-12 md:w-1/2">
            <div className="w-full">
              <h1 className="mb-6 text-2xl font-semibold text-gray-700">
                Create account
              </h1>
              <form onSubmit={handleSubmit(onSubmitRegister)}>
                <div className="mb-2">
                  <label htmlFor="name" className="block font-medium mb-2">
                    Name
                  </label>
                  <input
                    {...register("name", { required: "your name is required" })}
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Type your name"
                    className="input_styles"
                  />
                  {errors.name && <span className="text-error-600">{errors.name?.message}</span>}
                </div>

                <div className="mb-2">
                  <label htmlFor="email" className="block font-medium mb-2">
                    Email
                  </label>

                  <input
                    {...register("email", { required: "Email Address is required" })}
                    type="email"
                    id="email"
                    name="email"
                    placeholder="john@doe.com"
                    className="input_styles"
                  />
                  {errors.email && <span className="text-error-600">{errors.email?.message}</span>}
                </div>
                
                <div className="mb-2">
                  <label htmlFor="password" className="block font-medium mb-2">
                    Password
                  </label>
                  <input
                    {...register("password", { required: "password is required" })}
                    type="password"
                    id="password"
                    name="password"
                    placeholder="***************"
                    className="input_styles"
                  />
                  {errors.password && <span className="text-error-600">{errors.password?.message}</span>}
                </div>

                <label className="text-sm text-gray-700 dark:text-gray-400 inline-flex items-center">
                  <input {...register("privacyPolicy", { required: "Privacy Policy is required" })} type="checkbox" className="mr-2 focus:outline-none" />
                  <span>
                    I agree to the{" "}
                    <span className="underline">privacy policy</span>
                  </span>
                </label>
                <br />
                {errors.privacyPolicy && <span className="text-error-600">{errors.privacyPolicy?.message}</span>}

                <button
                  className="align-bottom inline-flex items-center justify-center cursor-pointer leading-5 transition-colors duration-150 bg-primary-600 text-white font-medium px-4 py-2 rounded focus:outline-none text-sm bg-green-500 border border-transparent active:bg-green-600 hover:bg-primary-700 w-full mt-4 h-12"
                  type="submit"
                >
                  Create account
                </button>
              </form>

              <hr className="my-7" />

              <button className="flex items-center align-bottom justify-center cursor-pointer leading-5 transition-colors duration-150 bg-gray-100 hover:bg-primary-700 text-gray-800 hover:text-white font-medium px-4 py-2 rounded focus:outline-none text-sm bg-green-500 border border-transparent active:bg-green-600 w-full mt-4 h-12 mb-3">
                <svg
                  stroke="currentColor"
                  fill="currentColor"
                  strokeWidth="0"
                  version="1.1"
                  viewBox="0 0 16 16"
                  className="w-4 h-4 mr-2"
                  height="1em"
                  width="1em"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M9.5 3h2.5v-3h-2.5c-1.93 0-3.5 1.57-3.5 3.5v1.5h-2v3h2v8h3v-8h2.5l0.5-3h-3v-1.5c0-0.271 0.229-0.5 0.5-0.5z"></path>
                </svg>{" "}
                <span className="ml-2"> Login With Facebook </span>
              </button>

              <button className="flex items-center align-bottom justify-center cursor-pointer leading-5 transition-colors duration-150 bg-gray-100 hover:bg-error-600 text-gray-800 hover:text-white font-medium px-4 py-2 rounded focus:outline-none text-sm bg-green-500 border border-transparent active:bg-green-600 w-full mt-4 h-12">
                <svg
                  stroke="currentColor"
                  fill="currentColor"
                  strokeWidth="0"
                  version="1.1"
                  viewBox="0 0 16 16"
                  className="w-4 h-4 mr-2"
                  height="1em"
                  width="1em"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M8.159 6.856v2.744h4.537c-0.184 1.178-1.372 3.45-4.537 3.45-2.731 0-4.959-2.262-4.959-5.050s2.228-5.050 4.959-5.050c1.553 0 2.594 0.663 3.188 1.234l2.172-2.091c-1.394-1.306-3.2-2.094-5.359-2.094-4.422 0-8 3.578-8 8s3.578 8 8 8c4.616 0 7.681-3.247 7.681-7.816 0-0.525-0.056-0.925-0.125-1.325l-7.556-0.003z"></path>
                </svg>{" "}
                <span className="ml-2">Login With Google</span>
              </button>

              <p className="mt-4">
                <a
                  className="text-sm font-medium text-primary-600 dark:text-green-400 hover:underline"
                  href="/login"
                >
                  Already have an account? Login
                </a>
              </p>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Register;
