export default function Image({ src, alt, ...rest }) {
  // Use a regular expression to extract the filename
  const filename = src.match(/[^/\\&?]+\.\w{3,4}(?=([?&].*$|$))/)[0];

  // Construct the image path based on whether it's a local file or an AWS S3 file
  const imagePath =
    typeof src === "string" && src.includes("https://")
      ? src
      : `http://localhost:4000/uploads/${filename}`;

  return <img {...rest} src={imagePath} alt={alt} />;
}
