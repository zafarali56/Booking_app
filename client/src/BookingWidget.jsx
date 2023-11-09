import { useState } from "react";
import differenceInCalendarDays from "date-fns/differenceInCalendarDays";

export default function BookingWidget({ place }) {
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [numberOfGuests, setNumberOfGuests] = useState(1);
  const [mobile, setMobile] = useState("");
  const [name, setName] = useState("");

  let numberOfNights = 0;
  if (checkIn && checkOut) {
    numberOfNights = differenceInCalendarDays(
      new Date(checkOut),
      new Date(checkIn)
    );
  }

  return (
    <div className="grid  text-center bg-gray-100 shadow shadow-gray-500 p-4 rounded-xl">
      <div className="text-2xl text-center">
        Price: {place.price}$ / per night
      </div>
      <div className="border rounded-xl shadow shadow-gray-300">
        <div className="flex">
          <div className=" py-3 px-3">
            <label>Check in: </label>
            <input
              type="date"
              value={checkIn}
              onChange={(ev) => setCheckIn(ev.target.value)}
            />
          </div>
          <div className=" py-3 px-3 border-l">
            <label>Check out: </label>
            <input
              type="date"
              value={checkOut}
              onChange={(ev) => setCheckOut(ev.target.value)}
            />
          </div>
        </div>

        <div className=" py-3 px-4 border-t">
          <label>Number of guest: </label>
          <input
            type="Number"
            value={numberOfGuests}
            onChange={(ev) => setNumberOfGuests(ev.target.value)}
          />
        </div>

        <div className=" py-3 px-4 border-t">
          <label>Full name: </label>
          <input
            type="text"
            value={name}
            onChange={(ev) => setName(ev.target.value)}
          />
        </div>

        <div className=" py-3 px-4 border-t">
          <label>Phone Number: </label>
          <input
            type="tel"
            value={mobile}
            onChange={(ev) => setMobile(ev.target.value)}
          />
        </div>
      </div>
      <button className="mt-3 bg-primary font-bold text-white px-10 py-2 rounded-2xl shadow shadow-gray-800">
        Book Now ${" "}
        {numberOfNights > 0 && <span>{numberOfNights * place.price}</span>}
      </button>
    </div>
  );
}
