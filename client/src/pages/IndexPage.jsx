import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import Image from "../Image";

export default function IndexPage() {
  const [places, setPlaces] = useState([]);
  useEffect(() => {
    axios.get("/places").then((response) => {
      setPlaces(response.data);
    });
  }, []);

  return (
    <div className=" mt-10 grid grid-cols-1 gap-x-5 gap-y-8 md:grid-cols-3 lg:grid-cols-4">
      {places.length > 0 &&
        places.map((place) => (
          <Link to={"/place/" + place._id} key={place._id}>
            <div className="bg-gray-500 mb-1 rounded-2xl flex">
              {place.photos?.[0] && (
                <Image
                  className="cursor-pointer rounded-2xl object-cover aspect-square"
                  src={place.photos?.[0]}
                  alt=""
                />
              )}
            </div>
            <h2 className="text-md truncate font-bold leading-5">
              {place.title}
            </h2>
            <h3 className="text-sm text-gray-600">{place.address}</h3>
            <div className="mt-2">
              <span className="font-bold">{place.price}</span>$ Per night
            </div>
          </Link>
        ))}
    </div>
  );
}
