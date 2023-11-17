import { useContext, useEffect, useState } from "react";
import differenceInCalendarDays from "date-fns/differenceInCalendarDays";
import axios from "axios";
import { Navigate } from "react-router-dom";
import { UserContext } from "./UserContext";

export default function BookingWidget({ place }) {
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [numberOfGuests, setNumberOfGuests] = useState(1);
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [redirect, setRedirect] = useState("");
  const { user } = useContext(UserContext);

  useEffect(() => {
    if (user) {
      setName(`${user.first} ${user.last}`);
    } else {
      setName("");
    }
  }, [user]);

  const numberOfNights =
    checkIn && checkOut
      ? differenceInCalendarDays(new Date(checkOut), new Date(checkIn))
      : 0;

  const bookThisPlace = async () => {
    if (!checkIn || !checkOut) {
      alert("Please select both check-in and check-out dates before booking.");
      return;
    }

    const response = await axios.post("/bookings", {
      checkIn,
      checkOut,
      numberOfGuests,
      phone,
      name,
      place: place._id,
      price: numberOfNights * place.price,
    });

    const bookingId = response.data._id;
    setRedirect(`/account/bookings/${bookingId}`);
  };

  if (redirect) {
    return <Navigate to={redirect} />;
  }

  return (
    <div className="grid  shadow shadow-black p-2  rounded-xl">
      <div className=" text-center text-2xl">
        Price: {place.price}$ / per night
      </div>
      <div className="border border-gray-300 rounded-xl shadow">
        <div className="flex newLine ">
          <div className="py-1 px-1 ">
            <label>Check in: </label>
            <input
              className="rounded-xl p-1  border border-gray-500"
              type="date"
              value={checkIn}
              onChange={(ev) => setCheckIn(ev.target.value)}
            />
          </div>
          <div className=" py-1 px-1 ">
            <label>Check out: </label>
            <input
              className="rounded-xl p-1 border border-gray-500"
              type="date"
              value={checkOut}
              onChange={(ev) => setCheckOut(ev.target.value)}
            />
          </div>
        </div>

        <div className=" px-1 border-t">
          <label>Number of guests: </label>
          <input
            type="number"
            value={numberOfGuests}
            onChange={(ev) => setNumberOfGuests(ev.target.value)}
            className="border border-gray-400"
          />
        </div>

        <div className=" px-1 border-t">
          <label>Full name: </label>
          <input
            type="text"
            value={name}
            onChange={(ev) => setName(ev.target.value)}
            className="border border-gray-400"
          />
        </div>

        <div className="px-1 border-t">
          <label>Phone Number: </label>
          <input
            type="tel"
            value={phone}
            onChange={(ev) => setPhone(ev.target.value)}
            className="border border-gray-400"
          />
        </div>
      </div>
      <button
        onClick={bookThisPlace}
        className="mt-1 bg-primary font-bold text-white px-5 py-2 rounded-2xl shadow hover:bg-blue-700"
      >
        Book Now $
        {numberOfNights > 0 && <span>{numberOfNights * place.price}</span>}
      </button>
    </div>
  );
}
