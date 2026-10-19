import { useForm } from "react-hook-form";
import axios from "axios";
import { useState } from "react";
import API_BASE_URL, { getAuthHeaders } from "../../config/api";

export default function FormCreate() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      source: "FaceBook",
    },
  });

  const [error, setError] = useState("");
  const [source, setSource] = useState("FaceBook");
  const [message, setMessage] = useState("");
  const sources = ["FaceBook", "Inestagram", "Tweeter", "from_your_frind"];

  const sourceLabels = {
    FaceBook: "Facebook",
    Inestagram: "Instagram",
    Tweeter: "Twitter",
    from_your_frind: "Friend Referral",
  };

  const OnSubmit = async (data) => {
    setError("");
    setMessage("");
    try {
      data.source = source;
      const res = await axios.post(`${API_BASE_URL}/Lead`, data, {
        headers: getAuthHeaders(),
      });

      setMessage(`Lead "${data.name}" was created successfully!`);
      reset();
    } catch (err) {
      const msg =
        err.response?.data?.msg ||
        (Array.isArray(err.response?.data?.msg)
          ? err.response.data.msg.join(", ")
          : "Failed to create lead. Please check the inputs.");
      setError(msg);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(OnSubmit)}
      className="mx-auto w-full max-w-lg space-y-5 rounded-xl bg-white p-6 shadow-xl border border-slate-200 sm:p-8"
    >
      <div>
        <h2 className="text-2xl font-bold text-slate-900">Create New Lead</h2>
        <p className="text-sm text-slate-500 mt-1">
          Capture prospect details for the sales pipeline.
        </p>
      </div>

      {message && (
        <div className="rounded-lg bg-emerald-50 border border-emerald-200 p-3 text-sm text-emerald-700 font-semibold">
          {message}
        </div>
      )}

      {error && (
        <div className="rounded-lg bg-red-50 border border-red-200 p-3 text-sm text-red-600 font-semibold">
          {error}
        </div>
      )}

      <div className="space-y-1.5">
        <label
          htmlFor="name"
          className="block text-sm font-semibold text-slate-700"
        >
          Customer / Company Name
        </label>
        <input
          {...register("name", { required: "Name is required" })}
          id="name"
          type="text"
          placeholder="e.g. Acme Corp or John Smith"
          className="min-h-11 w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
        />
        {errors.name && (
          <p className="text-xs text-red-500">{errors.name.message}</p>
        )}
      </div>

      <div className="space-y-1.5">
        <label
          htmlFor="phone"
          className="block text-sm font-semibold text-slate-700"
        >
          Phone Number
        </label>
        <input
          {...register("phone", { required: "Phone number is required" })}
          id="phone"
          type="text"
          placeholder="e.g. +1 555-0192"
          className="min-h-11 w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
        />
        {errors.phone && (
          <p className="text-xs text-red-500">{errors.phone.message}</p>
        )}
      </div>

      <div className="space-y-1.5">
        <label
          htmlFor="email"
          className="block text-sm font-semibold text-slate-700"
        >
          Email Address
        </label>
        <input
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "Invalid email address format",
            },
          })}
          id="email"
          type="email"
          placeholder="e.g. contact@domain.com"
          className="min-h-11 w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
        />
        {errors.email && (
          <p className="text-xs text-red-500">{errors.email.message}</p>
        )}
      </div>

      <div>
        <label className="mb-2 block text-sm font-semibold text-slate-700">
          Acquisition Source
        </label>

        <div className="grid grid-cols-2 gap-2.5">
          {sources.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setSource(item)}
              className={`rounded-xl border px-3 py-2.5 text-xs font-semibold transition-all ${
                source === item
                  ? "border-blue-600 bg-blue-600 text-white shadow-sm"
                  : "border-slate-200 bg-slate-50 text-slate-700 hover:border-blue-300 hover:bg-white"
              }`}
            >
              {sourceLabels[item] || item}
            </button>
          ))}
        </div>
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="min-h-12 w-full rounded-xl bg-blue-600 py-3 font-semibold text-white shadow-sm transition hover:bg-blue-700 disabled:opacity-50 active:scale-[0.99]"
      >
        {isSubmitting ? "Creating Lead..." : "Create Lead"}
      </button>
    </form>
  );
}
