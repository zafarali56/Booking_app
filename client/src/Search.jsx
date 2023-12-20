import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Search() {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);

  const handleSearch = async () => {
    try {
      const response = await axios.get(`/search?query=${searchTerm}`);
      setResults(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleCloseResults = () => {
    setResults([]);
  };

  return (
    <div className="flex flex-col customPadding items-center relative">
      <div className="flex">
        <input
          type="text"
          placeholder="Search"
          className="shadow border py-1 border-gray-400"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
          }}
        />

        <button onClick={handleSearch} className="rounded-full">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="absolute top-0 bottom-0 w-8 h-8 my-auto "
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </button>
      </div>

      {results.length > 0 && (
        <div className="absolute top-full w-full bg-white border border-gray-200 rounded-xl shadow-lg">
          <button
            onClick={handleCloseResults}
            className="absolute top-0 right-0  text-white hover:text-gray-700"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
          {results.map((item) => (
            <Link
              to={"/place/" + item._id}
              key={item._id}
              className="block hover:bg-gray-200 roundex-2xl"
            >
              <div className="p-2">{item.title}</div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
