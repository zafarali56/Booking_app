export default function PlaceImg({ place, index = 0, className = null }) {
  if (!place.photos?.length) {
    return "";
  }
  if (!className) {
    className = "object-cover  ";
  }

  function constructImageURL(imageAddress) {
    let fileName;

    if (imageAddress.includes("/uploads")) {
      fileName = imageAddress.split("/").pop();
    } else {
      fileName = imageAddress;
    }

    return "http://localhost:4000/uploads/" + fileName;
  }
  return (
    <img
      className={className}
      src={constructImageURL(place.photos[index])}
      alt=""
    />
  );
}
