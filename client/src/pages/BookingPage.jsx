import { useParams } from "react-router-dom";

export default function BookingPage() {
  const { id } = useParams();
  return <div>Single Booking {id}</div>;
}
