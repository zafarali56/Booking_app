import mongoose from "mongoose";

const placeSchema = new mongoose.Schema({
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  title: String,
  address: String,
  photos: [String],
  description: String,
  perks: [String],
  extraInfo: [String],
  checkIn: [String],
  checkOut: [String],
  maxGuests: Number,
  price: Number,
});
placeSchema.index({ title: "text", address: "text" });
const PlaceModel = mongoose.model("Place", placeSchema);

export default PlaceModel;
