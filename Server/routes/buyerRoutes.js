const express = require("express");
const asyncHandler = require("express-async-handler");
const House = require("../models/House");
const router = express.Router();

router.get("/home", asyncHandler(async (req, res) =>
{
  let houses = await House.find().exec();
  if (houses && houses.length > 0) {
    return res.status(200).json(houses);
  } else {
    return res
      .status(404)
      .json({ message: "No houses found..." });
  }

}))

router.get(
  "/",
  asyncHandler(async (req, res) => {
    const { area, city } = req.query;

    let houses;
    if (area && city) {
      houses = await House.find({ City: city, Area: area }).exec();
    } else if (city) {
      houses = await House.find({ City: city }).exec();
    }

    if (houses && houses.length > 0) {
      return res.status(200).json(houses);
    } else {
      return res
        .status(404)
        .json({ message: "No houses found in this location" });
    }
  })
);

router.get(
  "/house/:id",
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    try {
      const house = await House.findById(id).populate(
        "HouseOwner",
        "FirstName LastName Email Phone"
      );
      if (!house) {
        return res.status(404).json({ message: "House not found" });
      }
      const seller = house.HouseOwner;
      res.status(200).json(seller);
    } catch (error) {
      console.error("Error fetching house:", error);
      res.status(500).json({ message: "Server error" });
    }
  })
);

module.exports = router;