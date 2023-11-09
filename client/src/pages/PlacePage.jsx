import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import BookingWidget from "../BookingWidget";

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
  const [showAllPhotos, setShowAllPhotos] = useState(false);
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

  if (showAllPhotos) {
    return (
      <div className="absolute bg-white  min-h-screen inset-0">
        <div className=" flex items-center flex-col p-10 gap-4">
          <div>
            <h2 className="text-4xl font-bold">Photos of {place.title}</h2>
            <button
              onClick={() => setShowAllPhotos(false)}
              className=" fixed flex left-8 py-2 px-4 bg-gray-300 rounded-2xl shadow shadow-black"
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
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
              Close Photos
            </button>
          </div>
          {place?.photos?.length > 0 &&
            place.photos.map(
              (
                photo,
                index // Add 'index' as the key
              ) => (
                <div className="gap-2" key={index}>
                  <img src={constructImageURL(photo)} alt="" />
                </div>
              )
            )}
        </div>
      </div>
    );
  }

  return (
    <div className="mt-4 bg-gray-50 -mx-8 px-8 py-8">
      <h1 className="text-3xl font-semibold">{place.title}</h1>
      <a
        className="my-2 block font-bold underline"
        target="_blank"
        rel="noopener noreferrer"
        href={"https://maps.google.com/?q=" + place.address}
      >
        <div className="flex ">
          {place.address}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-4 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
            />
          </svg>
        </div>
      </a>
      <div className="relative">
        <div className="grid gap-2 grid-cols-[2fr_1fr] cursor-pointer overflow-hidden rounded-2xl">
          <div>
            {place.photos?.[0] && (
              <div>
                <img
                  onClick={() => setShowAllPhotos(true)}
                  className="aspect-square object-cover  "
                  src={constructImageURL(place.photos[0])}
                  alt=""
                />
              </div>
            )}
          </div>
          <div className="">
            {place.photos?.[1] && (
              <img
                onClick={() => setShowAllPhotos(true)}
                className="aspect-square object-cover"
                src={constructImageURL(place.photos[1])}
                alt=""
              />
            )}
            <div className="">
              {" "}
              {place.photos?.[2] && (
                <img
                  onClick={() => setShowAllPhotos(true)}
                  className="aspect-square object-cover relative top-2 "
                  src={constructImageURL(place.photos[2])}
                  alt=""
                />
              )}
            </div>
          </div>
        </div>
        <button
          onClick={() => setShowAllPhotos(true)}
          className=" flex gap-1 absolute bottom-2 right-2 py-2 px-4 bg-white rounded-xl shadow shadow-gray-500"
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
              d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zM3.75 12h.007v.008H3.75V12zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm-.375 5.25h.007v.008H3.75v-.008zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
            />
          </svg>
          Show all photos
        </button>
      </div>
      <div className="mt-8 mb-8 flex flex-col sm:flex-row md:flex-row lg:flex-row gap-8">
        <div className="w-full sm:w-auto md:w-auto lg:w-auto">
          <div className="my-4">
            <h2 className="font-bold text-2xl">Description</h2>
            <pre style={{ whiteSpace: "pre-wrap" }} className="font-sans">
              {place.description}
            </pre>
            <br />
            <b>Check-in time: {place.checkIn}</b>
            <br />
            <b> Check-out time: {place.checkOut}</b>
            <br />
            <b> Maximum number of guests: {place.maxGuests}</b>
          </div>
        </div>
        <div className="w-full sm:w-auto md:w-auto lg:w-auto">
          <BookingWidget place={place} />
        </div>
      </div>

      <div className="bg-white -mx-8 px-8 py-8 pt-8 border-t ">
        <div>
          <h2 className="mt-3 font-semi-bold text-2xl">Extra info</h2>
        </div>
        <div className="mb-4 mt-2 text-sm text-gray-700 leading-5">
          <pre className="font-sans" style={{ whiteSpace: "pre-wrap" }}>
            {place.extraInfo}
          </pre>
        </div>
      </div>
    </div>
  );
}
