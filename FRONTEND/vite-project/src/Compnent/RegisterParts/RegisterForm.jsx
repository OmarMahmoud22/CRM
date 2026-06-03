import { useForm } from "react-hook-form";
import axios from "axios";
import { useState } from "react";

export default function RegisterForm() {
  const { register, handleSubmit, watch } = useForm({
    defaultValues: {
      full_name: "",
      email: "",
      password: "",
      confirm_password: "",
    },
  });

  const [error, setError] = useState("");
  const [role, setRole] = useState("admin");

  const password = watch("password");
  const roles = ["admin", "agent", "Dataentry", "SuperViser"];

  const onSubmit = async (data) => {
    try {
      data.role = role;

      const token = localStorage.getItem("token");

      const res = await axios.post("http://localhost:5000/api/register", data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setError("");

      console.log("result", res.data);
    } catch (error) {
      setError(error.response?.data?.msg || "failed to register");

      console.log(error.response?.data);
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
            Admin only
          </p>

          <h1 className="mt-3 text-4xl font-extrabold text-slate-950">
            Register user
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            Only admins can create new CRM accounts and assign access roles.
          </p>
        </div>

        <div className="rounded-lg border border-blue-100 bg-blue-50 px-4 py-3">
          <p className="text-sm font-medium text-blue-900">
            Admin authorization required
          </p>
          <p className="mt-1 text-xs leading-5 text-blue-700">
            Your admin token will be used to approve this registration request.
          </p>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-700">
            Full Name
          </label>

          <input
            type="text"
            placeholder="Enter your full name"
            {...register("full_name")}
            className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-700">Email</label>

          <input
            type="email"
            placeholder="Enter your email"
            {...register("email")}
            className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
          />
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-700">
              Password
            </label>

            <input
              type="password"
              placeholder="Enter password"
              {...register("password")}
              className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-700">
              Confirm Password
            </label>

            <input
              type="password"
              placeholder="Confirm password"
              {...register("confirm_password", {
                validate: (value) =>
                  value === password || "Passwords do not match",
              })}
              className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            />
          </div>
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700">
            Assign role
          </label>

          <div className="mt-2 grid grid-cols-2 gap-2 rounded-lg border border-slate-100 bg-slate-50 p-2">
            {roles.map((item , index) => (
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
          Selected Role: <span className="font-semibold">{role}</span>
        </p>

        <button
          type="submit"
          className="w-full rounded-lg bg-blue-700 py-3 font-semibold text-white transition hover:bg-blue-800"
        >
          Create account
        </button>

        {error && <p className="text-sm text-red-500">{error}</p>}
      </form>
    </div>
  );
}
