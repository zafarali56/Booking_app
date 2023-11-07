import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export default function PlacePage() {
  function constructImageURL(imageAddress) {
    let fileName;

    if (imageAddress.includes("/uploads")) {
      fileName = imageAddress.split("/").pop();
    } else {
      fileName = imageAddress;
    }

    return "http://localhost:4000/uploads/" + fileName;
  }

  const { id } = useParams();
  const [place, setPlace] = useState(null);

  useEffect(() => {
    if (!id) {
      return;
    }
    axios.get(`/places/${id}`).then((response) => {
      setPlace(response.data);
    });
  }, [id]);

  if (!place) return "";

  return (
    <div className="mt-4 bg-gray-50 -mx-8 px-8 py-8">
      <h1 className="text-3xl font-semibold">{place.title}</h1>
      <a
        className="my-2 block font-bold underline"
        target="_blank"
        rel="noopener noreferrer"
        href={"https://maps.google.com/?q=" + place.address}
      >
        {place.address}
      </a>
      <div className="relative">
        <div className="grid gap-2 grid-cols-[2fr_1fr]">
          <div>
            {place.photos?.[0] && (
              <div>
                <img
                  className="aspect-square object-cover rounded-xl"
                  src={constructImageURL(place.photos[0])}
                  alt=""
                />
              </div>
            )}
          </div>
          <div className="grid ">
            {place.photos?.[1] && (
              <img
                className="aspect-square object-cover rounded-xl"
                src={constructImageURL(place.photos[1])}
                alt=""
              />
            )}
            <div className=" overflow-hidden">
              {" "}
              {place.photos?.[2] && (
                <img
                  className="aspect-square object-cover relative top-2 rounded-xl"
                  src={constructImageURL(place.photos[2])}
                  alt=""
                />
              )}
            </div>
          </div>
        </div>
        <button className=" flex gap-1 absolute bottom-2 right-2 py-2 px-4 bg-white rounded-xl shadow shadow-gray-500">
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
              d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zM3.75 12h.007v.008H3.75V12zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm-.375 5.25h.007v.008H3.75v-.008zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
            />
          </svg>
          Show all photos
        </button>
      </div>
    </div>
  );
}
