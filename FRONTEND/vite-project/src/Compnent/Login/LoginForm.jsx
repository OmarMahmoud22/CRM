import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import socket from "../../Socket/Socket";
import { useDispatch } from "react-redux";
import { login } from "../../redux/slices/AuthSlice";

export default function LoginForm() {
  const [servererror, setServererror] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const demoAccounts = [
    { label: "Admin", email: "admin@salescore.com", color: "hover:bg-purple-50 hover:text-purple-700" },
    { label: "Team Leader", email: "teamleader@salescore.com", color: "hover:bg-blue-50 hover:text-blue-700" },
    { label: "Agent", email: "agent@salescore.com", color: "hover:bg-emerald-50 hover:text-emerald-700" },
    { label: "Data Entry", email: "dataentry@salescore.com", color: "hover:bg-amber-50 hover:text-amber-700" },
  ];

  const handleFillDemo = (email) => {
    setValue("email", email, { shouldValidate: true });
    setValue("password", "password123", { shouldValidate: true });
    setServererror("");
  };

  function reg() {
    navigate("/register");
  }

  const onSubmit = async (data) => {
    setServererror("");
    const resultAction = await dispatch(login(data));

    if (login.fulfilled.match(resultAction)) {
      const { token, user } = resultAction.payload;

      socket.auth = { token };
      socket.connect();

      const userRole = user?.role?.toString().toLowerCase();

      switch (userRole) {
        case "agent":
          navigate("/start/agent-dashbourd");
          break;
        case "admin":
        case "superadmin":
          navigate("/start/admin-dashbourd");
          break;
        case "teamleader":
        case "superviser":
          navigate("/start/TeamLeader");
          break;
        case "dataentry":
          navigate("/AddeLead");
          break;
        default:
          navigate("/start/AllLead");
      }
    } else {
      const errorMsg =
        typeof resultAction.payload === "string"
          ? resultAction.payload
          : Array.isArray(resultAction.payload)
          ? resultAction.payload.join(", ")
          : "Login failed. Please check your credentials.";
      setServererror(errorMsg);
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

        {/* Demo Accounts Quick-Fill Pill Box */}
        <div className="mt-5 rounded-xl border border-blue-100 bg-blue-50/70 p-3">
          <p className="text-xs font-bold text-blue-900 uppercase tracking-wide">
            Quick Test Accounts (Click to Auto-fill)
          </p>
          <div className="mt-2 grid grid-cols-2 gap-1.5">
            {demoAccounts.map((demo) => (
              <button
                key={demo.label}
                type="button"
                onClick={() => handleFillDemo(demo.email)}
                className={`rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-xs font-semibold text-slate-700 shadow-xs transition ${demo.color}`}
              >
                {demo.label}
              </button>
            ))}
          </div>
          <p className="text-[11px] text-blue-700 mt-1.5 text-center">
            Password for all demo accounts: <code className="font-mono bg-white px-1 rounded">password123</code>
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="mt-6">
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
                className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none transition"
                {...register("email", { required: "Email is required" })}
              />
            </div>
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
            )}
          </div>

          {/* Password */}
          <div className="mt-5">
            <div className="flex justify-between items-center">
              <label className="text-sm font-medium text-gray-700">
                Password
              </label>
            </div>

            <div className="relative mt-2">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                <i className="fa-solid fa-lock"></i>
              </span>

              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className="w-full pl-11 pr-12 py-3 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none transition"
                {...register("password", { required: "Password is required" })}
              />

              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none"
                tabIndex={-1}
              >
                <i
                  className={
                    showPassword ? "fa-regular fa-eye-slash" : "fa-regular fa-eye"
                  }
                ></i>
              </button>
            </div>
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Error Message */}
          {servererror && (
            <div className="mt-4 rounded-lg bg-red-50 p-3 text-sm text-red-600">
              {servererror}
            </div>
          )}

          {/* Remember me */}
          <div className="flex items-center gap-2 mt-5">
            <input
              type="checkbox"
              id="remember"
              className="h-4 w-4 rounded border-gray-300 text-blue-700 focus:ring-blue-500"
            />
            <label htmlFor="remember" className="text-sm text-gray-500">
              Remember this device
            </label>
          </div>

          {/* Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full mt-6 bg-blue-700 hover:bg-blue-800 disabled:opacity-50 text-white py-3 rounded-lg font-semibold transition"
          >
            {isSubmitting ? "Signing in..." : "Login"}
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
          className="w-full border border-gray-300 py-3 rounded-lg hover:bg-gray-50 transition font-medium text-gray-700"
        >
          Create New Account / Register
        </button>

        {/* Footer */}
        <div className="text-center mt-8">
          <p className="text-sm text-gray-500">Contact Support</p>
          <p className="text-xs text-gray-400 mt-4">
            (c) 2026 SalesCore Enterprise CRM. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
}
