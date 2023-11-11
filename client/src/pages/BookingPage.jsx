import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import AddressLink from "../AddressLink";
import PlaceGallery from "../PlaceGallery";
import BookingDates from "../BookingDates";

export default function BookingPage() {
  const { id } = useParams();
  const [booking, setBooking] = useState(null);
  useEffect(() => {
    if (id) {
      axios.get("/bookings").then((response) => {
        const foundBookings = response.data.find(({ _id }) => _id === id);
        if (foundBookings) {
          setBooking(foundBookings);
        }
      });
    }
  }, [id]);

  if (!booking) {
    return "";
  }
  return (
    <div className="my-8">
      <h1 className="text-3xl font-semibold">{booking.place.title}</h1>
      <AddressLink className="my-2 block">{booking.place.address}</AddressLink>
      <div className="bg-gray-200 p-6 my-4 rounded-2xl flex items-center justify-between">
        <div>
          <h2 className="text-2xl mb-4">Your booking info:</h2>

          <BookingDates booking={booking} />
        </div>

        <div
          className=" bg-primary rounded-xl p-2 text-white
        "
        >
          <div>Total price:</div>

          <div className="text-3xl">${booking.place.price}</div>
        </div>
      </div>

      <PlaceGallery place={booking.place} />
    </div>
  );
}
