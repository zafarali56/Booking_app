export default function BookingWidget({ place }) {
  return (
    <div className="bg-gray-100 p-4 rounded-xl shadow shadow-gray-500">
      <div className="text-2xl text-center">
        Price: {place.price}$ / per night
      </div>
      <div className="border rounded-xl shadow shadow-gray-300 mt-4 p-2 flex flex-col sm:flex-row">
        <div className="mb-2 sm:w-1/2">
          <label>Check in: </label>
          <input className="w-full border rounded px-2 py-1" type="date" />
        </div>
        <div className="mb-2 sm:w-1/2 sm:ml-2">
          <label>Check out: </label>
          <input className="w-full border rounded px-2 py-1" type="date" />
        </div>
        <div className="mb-2">
          <label>Number of guests: </label>
          <input
            className="w-full border rounded px-2 py-1"
            type="number"
            value={1}
          />
        </div>
      </div>
      <button className="mt-4 bg-primary text-white font-bold px-4 py-2 rounded-2xl shadow shadow-gray-800 w-full">
        Book Now
      </button>
    </div>
  );
}
