import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { differenceInCalendarDays } from "date-fns";
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
      <div className=" bg-gray-200 p-2 my-2 rounded-2xl items-center newLine ">
        <div>
          <h2 className=" items-center text-2xl mb-1 ">Booking info</h2>

          <div className="flex ">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-6 "
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z"
              />
            </svg>
            {differenceInCalendarDays(
              new Date(booking.checkOut),
              new Date(booking.checkIn)
            )}
            {"-Nights"}
          </div>
          <BookingDates booking={booking} />
        </div>
        <div
          className=" bg-primary rounded-xl p-2 text-white
        "
        >
          <div className="flex gap-2 justify-between items-center">
            <h1 className="font-bold text-2xl">Total price:</h1>

            <div className="text-3xl font-bold">
              ${" "}
              {differenceInCalendarDays(
                new Date(booking.checkOut),
                new Date(booking.checkIn)
              ) > 0 && (
                <span>
                  {differenceInCalendarDays(
                    new Date(booking.checkOut),
                    new Date(booking.checkIn)
                  ) * booking.place.price}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      <PlaceGallery place={booking.place} />
    </div>
  );
}
