import { format } from "date-fns"; // Import the necessary date-fns functions

export default function BookingDates({ booking, className }) {
  return (
    <div className={"" + className}>
      {format(new Date(booking.checkIn), "dd-MM-yyyy")}
      &rarr;
      {format(new Date(booking.checkOut), "dd-MM-yyyy")}
    </div>
  );
}
