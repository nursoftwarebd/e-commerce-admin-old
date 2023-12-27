import React from "react";
import forgotImage from "../assets/forgot-password.jpeg";
import Input from "../components/lib/Input";

const ForgotPassword = () => {
  return (
    <div className="flex items-center min-h-screen p-6 bg-gray-50">
      <div className="flex-1 h-full max-w-4xl mx-auto overflow-hidden bg-white rounded-lg shadow-md">
        <div className="flex flex-col overflow-y-auto md:flex-row">
          <div className="h-32 md:h-auto md:w-1/2">
            <img
              aria-hidden="true"
              className="hidden object-cover w-full h-full dark:block"
              src={forgotImage}
              alt="Office"
            />
          </div>

          <main className="flex items-center justify-center p-6 sm:p-12 md:w-1/2">
            <div className="w-full">
              <h1 className="mb-6 text-2xl font-semibold text-gray-700">
                Forgot password
              </h1>
              <form>
                <div className="mb-2">
                  <label htmlFor="email" className="block font-medium mb-2">
                    Email
                  </label>
                  <Input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="john@doe.com"
                    className="input_styles"
                  />
                </div>

                <button
                  className="align-bottom inline-flex items-center justify-center cursor-pointer leading-5 transition-colors duration-150 bg-primary-600 text-white font-medium px-4 py-2 rounded focus:outline-none text-sm bg-green-500 border border-transparent active:bg-green-600 hover:bg-primary-700 w-full mt-4 h-12"
                  type="submit"
                >
                  Recover password
                </button>
              </form>

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

export default ForgotPassword;
