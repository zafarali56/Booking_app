import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import BookingWidget from "../BookingWidget";
import PlaceGallery from "../PlaceGallery";
import AddressLink from "../AddressLink";
import Perks from "../Perks";

export default function PlacePage() {
  const { id } = useParams();
  const [place, setPlace] = useState(null);
  const [selectedPerks, setSelectedPerks] = useState([]);

  useEffect(() => {
    if (!id) {
      return;
    }
    axios.get(`/places/${id}`).then((response) => {
      setPlace(response.data);
      setSelectedPerks(response.data.perks || []);
    });
  }, [id]);

  if (!place) return "";

  return (
    <div className="mt-4 bg-gray-50 -mx-8 px-8 py-8">
      <h1 className="text-3xl font-semibold">{place.title}</h1>
      <AddressLink>{place.address}</AddressLink>
      <PlaceGallery place={place} />

      <div className="mt-4">
        <div className="sm:w-auto md:w-auto lg:w-auto">
          <div>
            <div className="flex gap-5 newLine ">
              <div className="">
                <BookingWidget place={place} />
              </div>

              <div>
                <h2 className="font-bold text-2xl">Description</h2>
                <pre style={{ whiteSpace: "pre-wrap" }} className="font-serif">
                  {place.description}
                </pre>
              </div>
            </div>

            <br />
            <b>Check-in time: {place.checkIn}</b>
            <br />
            <b> Check-out time: {place.checkOut}</b>
            <br />
            <b> Maximum number of guests: {place.maxGuests}</b>
          </div>
        </div>
      </div>

      <div className="bg-white -mx-8 px-8 py-8 pt-8 border-t ">
        <div>
          <h2 className="mt-3 font-semi-bold text-2xl">Extra info</h2>
        </div>
        <div className="mb-4 mt-2 text-sm text-gray-700 leading-5">
          <pre className="font-serif" style={{ whiteSpace: "pre-wrap" }}>
            {place.extraInfo}
          </pre>
        </div>
      </div>
      <div className="grid sm:grid-cols-2 gap-2 md:grid-cols-4">
        <Perks selected={selectedPerks} onChange={setSelectedPerks} />
      </div>
    </div>
  );
}
