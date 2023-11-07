import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";

export default function IndexPage() {
  const [places, setPlaces] = useState([]);
  useEffect(() => {
    axios.get("/places").then((response) => {
      setPlaces(response.data);
    });
  }, []);

  function constructImageURL(places) {
    const imageAddress = places.photos[0];
    let fileName;

    if (imageAddress.includes("/uploads")) {
      fileName = imageAddress.split("/").pop();
    } else {
      fileName = imageAddress;
    }

    return "http://localhost:4000/uploads/" + fileName;
  }

  return (
    <div className=" mt-10 grid grid-cols-2 gap-x-5 gap-y-8 md:grid-cols-3 lg:grid-cols-4">
      {places.length > 0 &&
        places.map((place) => (
          <div key={place.id}>
            <div className="bg-gray-500 mb-1 rounded-2xl flex">
              {place.photos?.[0] && (
                <img
                  className="cursor-pointer rounded-2xl object-cover aspect-square"
                  src={constructImageURL(place)}
                  alt=""
                />
              )}
            </div>
            <h2 className="text-md truncate font-bold leading-5">
              {place.title}
            </h2>
            <h3 className="font-thin font-serif text-gray-600">
              {place.address}
            </h3>
            <div className="mt-2">
              <span className="font-bold">{place.price}</span>$ per night
            </div>
          </div>
        ))}
    </div>
  );
}
