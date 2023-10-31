import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import Perks from "../Perks";
import axios from "axios";

export default function PlacesPage() {
  const { action } = useParams();
  const [title, setTitle] = useState("");
  const [address, setAddress] = useState("");
  const [addedPhotos, setAddedPhotos] = useState([]);
  const [photoLink, setPhotoLink] = useState("");
  const [description, setDescription] = useState("");
  const [perks, setPerks] = useState([]);
  const [extraInfo, setExtraInfo] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [maxGuests, setMaxGuests] = useState(1);

  function inputHeader(text) {
    return <h2 className="text-2xl mt-4">{text}</h2>;
  }
  function inputDescription(text) {
    return <p className="text-gray-500 text-sm"> {text}</p>;
  }

  function preInput(header, description) {
    return (
      <>
        {inputHeader(header)}
        {inputDescription(description)}
      </>
    );
  }
  async function addPhotoByLink(ev) {
    ev.preventDefault();
    const { data: filename } = await axios.post("/upload-by-link", {
      link: photoLink,
    });
    setAddedPhotos((prev) => {
      return [...prev, filename];
    });
    setPhotoLink("");
  }

  return (
    <div>
      {action !== "new" && (
        <div className="text-center lower-text">
          <Link
            className="inline-flex gap-1 bg-primary text-white py-2 px-3 rounded-full"
            to={"/account/places/new"}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            Add New Places
          </Link>
        </div>
      )}
      {action === "new" && (
        <div style={{ marginTop: "20px" }}>
          <form>
            {preInput(
              "Title",
              "Title should be short and catchy as in advertisement"
            )}
            <input
              value={title}
              onChange={(ev) => setTitle(ev.target.value)}
              type="text"
              placeholder="Ex: My lovely apartment"
              style={{ width: "100%" }}
            />
            {preInput("Address", "Address of the place")}
            <input
              type="text"
              value={address}
              onChange={(ev) => setAddress(ev.target.value)}
              placeholder="Address"
            />
            {preInput("Photos", "High-quality/The more the better/Detailed")}
            <div className="flex gap-2">
              <input
                value={photoLink}
                onChange={(ev) => setPhotoLink(ev.target.value)}
                type="text"
                placeholder={"Add using a link ...jpg"}
              />
              <button
                onClick={addPhotoByLink}
                className="bg-primary px-4 py-1 h-10 text-white rounded-2xl m-2"
              >
                Add&nbsp;photo
              </button>
            </div>

            <div className="mt-2 grid gap-2 grid-cols-3 md:grid-col-4 lg:grid-cols-6">
              {addedPhotos.length > 0 &&
                addedPhotos.map((link) => {
                  // Split the link by '/' and get the last part (the filename)
                  const filename = link.split("/").pop();

                  return (
                    <div>
                      <img
                        className="rounded-2xl"
                        src={"http://localhost:4000/uploads/" + filename}
                        alt="description"
                      />
                    </div>
                  );
                })}

              <button className="flex items-center border bg-transparent rounded-2xl p-2 text-2xl text-gray-600 mt-2 justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class=" w-8 h-7"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M9 8.25H7.5a2.25 2.25 0 00-2.25 2.25v9a2.25 2.25 0 002.25 2.25h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25H15m0-3l-3-3m0 0l-3 3m3-3V15"
                  />
                </svg>
                Upload
              </button>
            </div>

            {preInput("Description", "About the place")}
            <textarea
              value={description}
              onChange={(ev) => setDescription(ev.target.value)}
            />
            {preInput("Perks", "Select all the perks of your place")}
            <div className="grid mt-2 gap-2 grid-cols-2 md:grid-cols-4 lg:grid-cols-6">
              <Perks selected={perks} onChange={setPerks} />
            </div>
            {preInput("Extra info", "Rules/Terms and conditions")}
            <textarea
              value={extraInfo}
              onChange={(ev) => setExtraInfo(ev.target.value)}
            />

            {preInput(
              "Check in & out time",
              "When formulating our reservation policies, it is essential to establish specific check-in and check-out times, with due consideration for an allotted timeframe dedicated to room cleaning between successive guests"
            )}

            <div className="grid sm:grid-cols-3 gap-2">
              <div>
                <h3 className="mt-2 -mb-1">Check in time</h3>
                <input
                  type="text"
                  value={checkIn}
                  onChange={(ev) => setCheckIn(ev.target.value)}
                  placeholder="10:30 AM"
                />
              </div>
              <div>
                <h3 className="mt-2 -mb-1">Check out time</h3>
                <input
                  type="text"
                  value={checkOut}
                  onChange={(ev) => setCheckOut(ev.target.value)}
                  placeholder="12:30 PM"
                />
              </div>
              <div>
                <h3 className="mt-2 -mb-1">Max guests</h3>
                <input
                  type="number"
                  value={maxGuests}
                  onChange={(ev) => setMaxGuests(ev.target.value)}
                />
              </div>
            </div>
            <div>
              <button className="primary my-4"> Submit </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
