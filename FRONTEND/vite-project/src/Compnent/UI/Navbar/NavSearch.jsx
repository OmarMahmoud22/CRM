

export default function NavSearch() {
  return (
    <div className="relative">
      <form>
        <i className="fa-solid fa-magnifying-glass absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"></i>

        <input
          id="search"
          type="text"
          placeholder="Search leads, agents, or tasks..."
          className="bg-[#F2F4F6] pl-10 pr-4 py-3 rounded-2xl"
        />
      </form>
    </div>
  );
}