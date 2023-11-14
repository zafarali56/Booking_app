import { useEffect, useState } from "react";
import AccountNav from "../AccountNav";
import axios from "axios";
import PlaceImg from "../PlaceImg";
import { differenceInCalendarDays } from "date-fns";
import { Link } from "react-router-dom";
import BookingDates from "../BookingDates";

export default function BookingsPage() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    axios.get("/api/bookings").then((response) => {
      setBookings(response.data);
    });
  }, []);

  return (
    <div>
      <AccountNav />
      <div>
        {bookings?.length > 0 &&
          bookings.map((booking, index) => (
            <Link
              to={`/account/bookings/${booking._id}`}
              key={index}
              className="flex gap-2 my-8 bg-gray-200 rounded-2xl "
            >
              <div className=" w-48">
                <PlaceImg
                  className="rounded-xl w-full h-full object-cover transform scale-100 hover:scale-125 transition-transform duration-300"
                  place={booking.place}
                />
              </div>
              <div className="py-3 pr-3 grow object-cover">
                <h2 className="text-xl font-semibold">{booking.place.title}</h2>
                <div className="">
                  <BookingDates
                    booking={booking}
                    className="mt-2 text-sm text-gray-700 ml-2  "
                  />
                </div>
                <div
                  className="flex
                "
                >
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

                <div className="flex items-center text-xl">
                  <div>Total price: ${booking.price}</div>
                </div>
              </div>
            </Link>
          ))}
      </div>
    </div>
  );
}
