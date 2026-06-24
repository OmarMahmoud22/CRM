

export default function NavSearch() {
  return (
    <div className="relative w-full min-w-0 sm:max-w-md">
      <form className="w-full">
        <i className="fa-solid fa-magnifying-glass absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"></i>

        <input
          id="search"
          type="text"
          placeholder="Search leads, agents, or tasks..."
          className="min-h-11 w-full rounded-xl bg-[#F2F4F6] py-3 pl-10 pr-4 text-sm outline-none transition focus:bg-white focus:ring-2 focus:ring-blue-100"
        />
      </form>
    </div>
  );
}
