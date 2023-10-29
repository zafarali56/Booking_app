import { Link, useParams } from "react-router-dom";

export default function PlacesPage() {
  const { action } = useParams();
  return (
    <div>
      {action !== "new" && (
        <div className="text-center lower-text">
          <Link
            className="inline-flex gap-1 bg-primary text-white py-2 px-3 rounded-full"
            to={"/account/places/new"}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            Add New Places
          </Link>
        </div>
      )}
      {action === "new" && (
        <div style={{ marginTop: "20px" }}>
          <form>
            <h2 className="text-2xl mt-4">Title</h2>
            <p className="text-gray-500 text-sm">
              Title should be short and catchy as in advertisement
            </p>
            <input
              type="text"
              placeholder="Ex: My lovely apartment"
              style={{ width: "100%" }}
            />
            <h2 className="text-2xl mt-4">Address</h2>
            <p className="text-gray-500 text-sm">Address of this place.</p>
            <input type="text" placeholder="Address" />

            <h2 className="text-2xl mt-4">Photos</h2>
            <p className="text-gray-500 text-sm">
              High-quality/The more the better/Detailed
            </p>
            <div className="mt-2 grid grid-cols-3 md:grid-col-4 lg:grid-cols-6">
              <button className="border bg-transparent rounded-2xl p-10 text-2xl text-gray-600 mt-2 flex justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 4.5v15m7.5-7.5h-15"
                  />
                </svg>
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
