// import React from 'react'
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function LoginForm() {
  const [servererror, setServererror] = useState("");

  const navigate = useNavigate();

  const { register, handleSubmit } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function reg() {
    navigate("/register");
  }

  const onSubmit = async (data) => {
    try {
      const res = await axios.post("http://localhost:3000/api/login", data);

      localStorage.setItem("token", res.data.token);

      setServererror("");

      navigate("/dashbord");
    } catch (error) {
      setServererror(error.response?.data?.msg || "Login failed");
    }
  };

  return (
    <div className="w-full max-w-md font-inter">
      <div className="bg-white border border-gray-200 rounded-lg shadow-xl shadow-slate-200/70 p-6 sm:p-8">
        {/* Header */}
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-600">
            Welcome back
          </p>

          <h1 className="mt-3 text-4xl font-extrabold text-slate-950">
            SalesCore
          </h1>

          <p className="text-gray-500 mt-2 text-sm">
            Login to your Enterprise Relationship Management workspace.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="mt-8">
          {/* Email */}
          <div>
            <label className="text-sm font-medium text-gray-700">
              Email Address
            </label>

            <div className="relative mt-2">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                <i className="fa-solid fa-envelope"></i>
              </span>

              <input
                type="email"
                placeholder="name@company.com"
                className="
                  w-full
                  pl-11
                  pr-4
                  py-3
                  border
                  border-gray-300
                  rounded-lg
                  focus:border-blue-500
                  focus:ring-2
                  focus:ring-blue-200
                  focus:outline-none
                  transition
                "
                {...register("email")}
              />
            </div>
          </div>

          {/* Password */}
          <div className="mt-5">
            <div className="flex justify-between items-center">
              <label className="text-sm font-medium text-gray-700">
                Password
              </label>

              <p className="text-sm text-blue-600 cursor-pointer hover:underline">
                Forgot Password?
              </p>
            </div>

            <div className="relative mt-2">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                <i className="fa-solid fa-lock"></i>
              </span>

              <input
                type="password"
                placeholder="Password"
                className="
                  w-full
                  pl-11
                  pr-12
                  py-3
                  border
                  border-gray-300
                  rounded-lg
                  focus:border-blue-500
                  focus:ring-2
                  focus:ring-blue-200
                  focus:outline-none
                  transition
                "
                {...register("password")}
              />

              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer">
                <i className="fa-regular fa-eye"></i>
              </span>
            </div>
          </div>

          {/* Error Message */}
          {servererror && (
            <p className="text-red-500 text-sm mt-4">{servererror}</p>
          )}

          {/* Remember me */}
          <div className="flex items-center gap-2 mt-5">
            <input
              type="checkbox"
              className="h-4 w-4 rounded border-gray-300 text-blue-700 focus:ring-blue-500"
            />

            <p className="text-sm text-gray-500">Remember this device</p>
          </div>

          {/* Button */}
          <button
            type="submit"
            className="
              w-full
              mt-6
              bg-blue-700
              hover:bg-blue-800
              text-white
              py-3
              rounded-lg
              font-semibold
              transition
            "
          >
            Login
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center gap-3 my-6">
          <div className="flex-1 h-[1px] bg-gray-200"></div>

          <p className="text-xs text-gray-400">SECURE LOGIN</p>

          <div className="flex-1 h-[1px] bg-gray-200"></div>
        </div>

        {/* Register Button */}
        <button
          type="button"
          onClick={reg}
          className="
            w-full
            border
            border-gray-300
            py-3
            rounded-lg
            hover:bg-gray-50
            transition
          "
        >
          Register
        </button>

        {/* Footer */}
        <div className="text-center mt-8">
          <p className="text-sm text-gray-500">Contact Support</p>

          <div className="flex justify-center gap-4 mt-3 text-sm text-gray-400">
            <p className="cursor-pointer hover:text-gray-600">Privacy Policy</p>

            <p className="cursor-pointer hover:text-gray-600">
              Terms of Service
            </p>
          </div>

          <p className="text-xs text-gray-400 mt-4">
            (c) 2024 SalesCore Enterprise CRM. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
}
