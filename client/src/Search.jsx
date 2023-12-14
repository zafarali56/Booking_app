export default function Search() {
  return (
    <div className="flex px-3 gap-1 items-center">
      <div>
        <input
          type="text"
          placeholder="Search"
          className="shadow border border-gray-400"
        />
      </div>

      <button className=" text-white bg-primary shadow p-3 rounded-full">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
          />
        </svg>
      </button>
    </div>
  );
}
