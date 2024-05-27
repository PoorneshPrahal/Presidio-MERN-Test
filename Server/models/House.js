const mongoose = require("mongoose");

const houseSchema = new mongoose.Schema({
  HouseOwner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  HouseNo: {
    type: String,
    required: true,
  },
  Street: {
    type: String,
  },
  Area: {
    type: String,
    required: true,
  },
  City: {
    type: String,
    required: true,
  },
  State: {
    type: String,
    required: true,
  },
  NumOfBedrooms: {
    type: Number,
    required: true,
  },
  NumOfBathrooms: {
    type: Number,
    required: true,
  },
  DistanceToHospitals: {
    type: Number,
    required: true,
  },
  img: {
    type: String,
    required: true,
  },
  Rent: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("House", houseSchema);
