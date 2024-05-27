const express = require("express");
const asyncHandler = require("express-async-handler");
const House = require("../models/House");
const router = express.Router();

router.get(
  "/:id",
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    const houses = await House.find({ HouseOwner: id }).exec();
    console.log(houses);
    if (houses.length === 0) {
      return res
        .status(400)
        .json({ message: "You have not posted any houses" });
    }
    res.status(200).json(houses);
  })
);

router.get(
  "/house/:id",
  asyncHandler(async (req, res) => {
    const houseId = req.params.id;
    const house = await House.findOne({ _id: houseId });

    if (!house) {
      return res.status(400).json({ message: "The house does not exist" });
    }
    res.status(200).json(house);
  })
);

router.post(
  "/",
  asyncHandler(async (req, res) => {
    console.log("Hi");
    try {
      const {
        DistanceToHospitals,
        NumOfBathrooms,
        NumOfBedrooms,
        State,
        City,
        Area,
        Street,
        HouseNo,
      } = req.body;

      if (
        !HouseNo ||
        !Street ||
        !Area ||
        !City ||
        !State ||
        !NumOfBedrooms ||
        !NumOfBathrooms ||
        !DistanceToHospitals
      ) {
        return res.status(400).json({ message: "All fields are required" });
      }

      const duplicate = await House.find({ HouseNo, Area });
      if (duplicate.length > 0) {
        return res
          .status(400)
          .json({ message: "This house has already been posted" });
      }
      const house = await House.create(req.body);

      if (house) {
        res.status(201).json({ message: "House published successfully" });
      } else {
        res.status(400).json({ message: "Invalid house details received" });
      }
    } catch (error) {
      console.error("Error publishing house:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  })
);

router.patch(
  "/",
  asyncHandler(async (req, res) => {
    const {
      _id,
      DistanceToHospitals,
      NumOfBathrooms,
      NumOfBedrooms,
      State,
      City,
      Area,
      Street,
      HouseNo,
      Rent,
      img,
    } = req.body;
    console.log(_id);

    if (
      !_id ||
      !HouseNo ||
      !Street ||
      !Area ||
      !City ||
      !State ||
      !NumOfBedrooms ||
      !NumOfBathrooms ||
      !DistanceToHospitals ||
      !Rent ||
      !img
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const duplicate = await House.find({ HouseNo, Area });
    if (duplicate.length > 1) {
      return res
        .status(409)
        .json({ message: "This house has already been posted" });
    }

    const house = await House.findByIdAndUpdate(
      _id,
      {
        DistanceToHospitals,
        NumOfBedrooms,
        NumOfBathrooms,
        State,
        City,
        Area,
        Street,
        HouseNo,
        Rent,
        img,
      },
      { new: true }
    );

    if (house) {
      res.status(201).json({ message: "House has been updated successfully" });
    } else {
      res.status(400).json({ message: "Invalid house details provided" });
    }
  })
);

router.delete(
  "/:id",
  asyncHandler(async (req, res) => {
    console.log("Hi");
    const { id } = req.params;
    console.log(id);

    if (!id) {
      return res.status(400).json({ message: "User id required" });
    }

    const house = await House.findByIdAndDelete(id);

    if (house) {
      return res.status(201).json({ message: "House deleted successfully" });
    } else {
      res.status(400).json({ message: "House not found" });
    }
  })
);

module.exports = router;
