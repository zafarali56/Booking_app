export default function BookingWidget({ place }) {
  return (
    <div className="grid  text-center bg-gray-100 shadow shadow-gray-500 p-4 rounded-xl">
      <div className="text-2xl text-center">
        Price: {place.price}$ / per night
      </div>
      <div className="border rounded-xl shadow shadow-gray-300">
        <div className="flex">
          <div className=" py-3 px-3">
            <label>Check in: </label>
            <input type="date" />
          </div>
          <div className=" py-3 px-3 border-l">
            <label>Check out: </label>
            <input type="date" />
          </div>
        </div>
        <div className=" py-3 px-4 border-t">
          <label>Number of guest: </label>
          <input type="Number" value={1} />
        </div>
      </div>
      <button className="mt-3 bg-primary font-bold text-white px-10 py-2 rounded-2xl shadow shadow-gray-800">
        Book Now
      </button>
    </div>
  );
}
