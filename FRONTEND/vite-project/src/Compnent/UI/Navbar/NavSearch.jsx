import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function NavSearch() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/start/AllLead`);
    }
  };

  return (
    <div className="relative w-full min-w-0 sm:max-w-md">
      <form onSubmit={handleSearch} className="w-full relative">
        <i className="fa-solid fa-magnifying-glass absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"></i>

        <input
          id="search"
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search leads, pipeline, or accounts..."
          className="min-h-11 w-full rounded-xl bg-[#F2F4F6] py-2.5 pl-10 pr-4 text-sm outline-none transition focus:bg-white focus:ring-2 focus:ring-blue-100 border border-transparent focus:border-blue-200"
        />
      </form>
    </div>
  );
}
