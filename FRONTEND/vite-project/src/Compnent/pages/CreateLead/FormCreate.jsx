import { useForm } from "react-hook-form";
import axios from "axios";
import { useState } from "react";
// import {useNavigate} from 'react-router-dom'
export default function FormCreate() {
  const { register, handleSubmit } = useForm({
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      source: "",
    },
  });
  const [error, setError] = useState("");
  const [sourse, setSource] = useState("FaceBook");
  const sources = ["from_your_frind", "Tweeter", "Inestagram", "FaceBook"];
  const OnSubmit = async (data) => {
    try {
        data.source = sourse;
      const token = localStorage.getItem("token");
      const res = await axios.post("http://127.0.0.1:5000/api/Lead", data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setError("");
      console.log(res.data);
    } catch (error) {
      setError(error.response?.data?.msg || "faild to add");
    }
  };
  return (
    <form
  onSubmit={handleSubmit(OnSubmit)}
  className="mx-auto max-w-lg space-y-5 rounded-2xl bg-white p-6 shadow-lg"
>
  <h2 className="text-2xl font-bold text-slate-800">Create Lead</h2>

  <div className="space-y-2">
    <label htmlFor="name" className="block text-sm font-medium text-slate-700">
      Name
    </label>
    <input
      {...register("name")}
      type="text"
      placeholder="Enter customer name"
      className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
    />
  </div>

  <div className="space-y-2">
    <label htmlFor="phone" className="block text-sm font-medium text-slate-700">
      Phone
    </label>
    <input
      {...register("phone")}
      type="text"
      placeholder="Enter phone number"
      className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
    />
  </div>

  <div className="space-y-2">
    <label htmlFor="email" className="block text-sm font-medium text-slate-700">
      Email
    </label>
    <input
      {...register("email")}
      type="email"
      placeholder="Enter email address"
      className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
    />
  </div>

  <div>
    <label className="mb-3 block text-sm font-medium text-slate-700">
      Lead Source
    </label>

    <div className="grid grid-cols-2 gap-3">
      {sources.map((item, index) => (
        <button
          key={index}
          type="button"
          onClick={() => setSource(item)}
          className={`rounded-xl border px-4 py-3 text-sm font-medium transition-all duration-200
      
            ${
              sourse === item
                ? "border-blue-600 bg-blue-600 text-white shadow-md"
                : "border-slate-300 bg-white text-slate-700 hover:border-blue-400 hover:bg-blue-50"
            }`}
        >
          {item}
        </button>
      ))}
    </div>
  </div>

  {error && (
    <p className="rounded-lg bg-red-50 p-3 text-sm text-red-600">
      {error}
    </p>
  )}

  <button
    type="submit"
    className="w-full rounded-xl bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-700 active:scale-[0.98]"
  >
    Create Lead
  </button>
</form>
  );
}
