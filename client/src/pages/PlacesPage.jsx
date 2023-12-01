import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import AccountNav from "../AccountNav";
import axios from "axios";
import Image from "../Image";

export default function PlacesPage() {
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    axios.get("/user-places").then(({ data }) => {
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

            return (
              <div
                key={index}
                className="flex gap-2 my-8 bg-gray-200 rounded-2xl"
              >
                <Link
                  to={"/account/places/" + place._id}
                  className="flex cursor-pointer gap-4 bg-gray-200 rounded-xl px-2 py-1"
                >
                  <div className="mt-2 ml-1 relative w-20 h-20 aspect-square  object-cover">
                    {place.photos.length > 0 && (
                      <Image
                        className="aspect-square overflow-hidden rounded-xl w-full object-cover"
                        src={imageAddress}
                        alt=""
                      />
                    )}
                  </div>

                  <div className="grow-0 shrink">
                    <h2 className="text-xl font-bold ">{place.title}</h2>
                    <p className="text-sm mt-2 font-bold">{place.address}</p>
                    <p className="">{place.price} $</p>
                    <p className="">Check In: {place.checkIn}</p>
                    <p className="">Check Out: {place.checkOut}</p>
                  </div>
                </Link>
              </div>
            );
          })}
      </div>
    </div>
  );
}
