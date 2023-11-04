import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import AccountNav from "../AccountNav";
import axios from "axios";

export default function PlacesPage() {
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    axios.get("/places").then(({ data }) => {
      setPlaces(data);
    });
  }, []);

  return (
    <div>
      <AccountNav />

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

      <div className="mt-4">
        {places.length > 0 &&
          places.map((place, index) => {
            // Extract the image address and file name
            const imageAddress = place.photos[0];
            console.log("Image Address:", imageAddress);
            let fileName;

            // Check if the image address contains a specific part
            if (
              imageAddress.includes(
                "/home/zafar/Documents/CODE/MERN_BookingApp/api/uploads"
              )
            ) {
              fileName = imageAddress.split("/").pop();
            } else {
              fileName = imageAddress;
            }

            console.log("File Name:", fileName);

            return (
              <div key={index}>
                <Link
                  to={"/account/places/" + place._id}
                  className="flex cursor-pointer gap-4 bg-gray-100 rounded-xl p-5"
                >
                  <div className="flex w-32 h-32 bg-gray-400 grow shrink-0 rounded-xl">
                    {place.photos.length > 0 && (
                      <img
                        className="object-cover rounded-2xl"
                        src={"http://localhost:4000/uploads/" + fileName}
                        alt=""
                      />
                    )}
                  </div>

                  <div className="grow-0 shrink">
                    <h2 className="text-xl ">{place.title}</h2>
                    <p className="text-sm mt-2">{place.description}</p>
                  </div>
                </Link>
              </div>
            );
          })}
      </div>
    </div>
  );
}
