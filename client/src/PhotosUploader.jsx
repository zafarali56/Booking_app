import { useState } from "react";
import axios from "axios";

export default function PhotosUploader({ addedPhotos, onChange }) {
  const [photoLink, setPhotoLink] = useState("");

  async function addPhotoByLink(ev) {
    ev.preventDefault();
    const { data: filename } = await axios.post("/upload-by-link", {
      link: photoLink,
    });
    onChange((prev) => {
      return [...prev, filename];
    });
    setPhotoLink("");
  }

  function uploadPhoto(ev) {
    const files = ev.target.files;
    const data = new FormData();
    for (let i = 0; i < files.length; i++) {
      data.append("photos", files[i]);
    }

    axios
      .post("/upload", data, {
        headers: { "Content-type": "multipart/form-data" },
      })
      .then((response) => {
        const { data: filenames } = response;
        onChange((prev) => {
          return [...prev, ...filenames];
        });
      });
  }

  return (
    <>
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
              <div className="h-32 flex" key={link}>
                <img
                  className="rounded-2xl w-full object-cover position-center"
                  src={"http://localhost:4000/uploads/" + filename}
                  alt="description"
                />
              </div>
            );
          })}

        <label className=" flex h-30 cursor-pointer items-center border bg-transparent rounded-2xl p-2 text-2xl text-gray-600 mt-2 justify-center">
          <input
            type="file"
            multiple
            className="hidden"
            onChange={uploadPhoto}
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className=" w-8 h-7"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 8.25H7.5a2.25 2.25 0 00-2.25 2.25v9a2.25 2.25 0 002.25 2.25h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25H15m0-3l-3-3m0 0l-3 3m3-3V15"
            />
          </svg>
          Upload
        </label>
      </div>
    </>
  );
}
