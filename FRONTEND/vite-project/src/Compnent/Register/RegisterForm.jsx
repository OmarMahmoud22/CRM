import { useForm } from "react-hook-form";
import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API_BASE_URL, { getAuthHeaders } from "../../config/api";

export default function RegisterForm() {
  const { register, handleSubmit, watch, reset, formState: { errors } } = useForm({
    defaultValues: {
      full_name: "",
      email: "",
      password: "",
      confirm_password: "",
    },
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [role, setRole] = useState("agent");
  const navigate = useNavigate();

  const password = watch("password");
  const roles = ["admin", "agent", "TeamLeader", "Dataentry"];

  const onSubmit = async (data) => {
    setError("");
    setSuccess("");
    try {
      data.role = role;

      const res = await axios.post(`${API_BASE_URL}/register`, data, {
        headers: getAuthHeaders(),
      });

      setSuccess(`Account for "${data.full_name}" (${role}) created successfully!`);
      reset();
    } catch (err) {
      const msg =
        err.response?.data?.msg ||
        (Array.isArray(err.response?.data?.msg)
          ? err.response.data.msg.join(", ")
          : "Failed to register user. An admin token is required.");
      setError(msg);
    }
  };

  return (
    <div className="w-full max-w-md font-inter">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-5 rounded-lg border border-gray-200 bg-white p-6 shadow-xl shadow-slate-200/70 sm:p-8"
      >
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-600">
            Admin Management
          </p>

          <h1 className="mt-3 text-4xl font-extrabold text-slate-950">
            Register User
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            Create new CRM team accounts and assign access roles.
          </p>
        </div>

        <div className="rounded-lg border border-blue-100 bg-blue-50 px-4 py-3">
          <p className="text-sm font-medium text-blue-900">
            Admin Authorization
          </p>
          <p className="mt-1 text-xs leading-5 text-blue-700">
            Only logged-in administrators can create new team members.
          </p>
        </div>

        {success && (
          <div className="rounded-lg bg-emerald-50 p-3 text-sm text-emerald-700 border border-emerald-200">
            {success}
          </div>
        )}

        {error && (
          <div className="rounded-lg bg-red-50 p-3 text-sm text-red-600 border border-red-200">
            {error}
          </div>
        )}

        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-700">Full Name</label>
          <input
            type="text"
            placeholder="Enter full name"
            {...register("full_name", { required: "Full name is required" })}
            className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
          />
          {errors.full_name && (
            <p className="text-xs text-red-500">{errors.full_name.message}</p>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-700">Email Address</label>
          <input
            type="email"
            placeholder="name@company.com"
            {...register("email", { required: "Email is required" })}
            className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
          />
          {errors.email && (
            <p className="text-xs text-red-500">{errors.email.message}</p>
          )}
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              placeholder="Min 8 characters"
              {...register("password", {
                required: "Password is required",
                minLength: { value: 8, message: "Min 8 characters" },
              })}
              className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            />
            {errors.password && (
              <p className="text-xs text-red-500">{errors.password.message}</p>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-700">
              Confirm Password
            </label>
            <input
              type="password"
              placeholder="Re-enter password"
              {...register("confirm_password", {
                required: "Please confirm password",
                validate: (value) =>
                  value === password || "Passwords do not match",
              })}
              className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            />
            {errors.confirm_password && (
              <p className="text-xs text-red-500">
                {errors.confirm_password.message}
              </p>
            )}
          </div>
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700">
            Assign Role
          </label>

          <div className="mt-2 grid grid-cols-2 gap-2 rounded-lg border border-slate-100 bg-slate-50 p-2">
            {roles.map((item, index) => (
              <button
                key={index}
                type="button"
                onClick={() => setRole(item)}
                className={`
                  rounded-lg
                  px-3
                  py-2.5
                  text-xs
                  transition-all
                  cursor-pointer
                  ${
                    role === item
                      ? "border border-slate-200 bg-white font-semibold text-blue-700 shadow-sm"
                      : "font-medium text-slate-500 hover:text-slate-700"
                  }
                `}
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        <p className="text-sm text-gray-500">
          Selected Role: <span className="font-semibold text-blue-700">{role}</span>
        </p>

        <button
          type="submit"
          className="w-full rounded-lg bg-blue-700 py-3 font-semibold text-white transition hover:bg-blue-800"
        >
          Create User Account
        </button>

        <div className="flex justify-between pt-2 text-sm text-gray-500">
          <Link to="/" className="text-blue-600 hover:underline">
            Back to Login
          </Link>
          <Link to="/start/allUsers" className="text-blue-600 hover:underline">
            View All Users
          </Link>
        </div>
      </form>
    </div>
  );
}
