const express = require("express");
const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/User");
const router = express.Router();

const generateToken = (id, role) => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET, { expiresIn: "30d" });
};

router.get(
  "/",
  asyncHandler(async (req, res) => {
    const users = await User.find().select("-password").lean();
    if (users.length === 0) {
      return res.json("400", { message: "Users not found" });
    }
    res.json(users);
  })
);

router.post(
  "/register",
  asyncHandler(async (req, res) => {
    const { FirstName, LastName, Password, Email, Phone, Role } = req.body;

    if (!FirstName || !Password || !Email || !Phone || !Role) {
      res.status(400).json({ message: "All fields are required" });
    }

    const duplicate = await User.findOne({ FirstName, LastName }).lean().exec();

    if (duplicate) {
      return res.status(409).json({ message: "Duplicate username" });
    }

    const hashedPassword = await bcrypt.hash(Password, 10);

    const userData = {
      FirstName,
      LastName,
      Password: hashedPassword,
      Email,
      Phone,
      Role,
    };

    const user = await User.create(userData);

    if (user) {
      res.status(201).json({
        _id: user._id,
        firstName: user.FirstName,
        lastName: user.LastName,
        email: user.Email,
        phone: user.Phone,
        role: user.Role,
        token: generateToken(user._id, Role),
      });
    } else {
      res.status(400).json({ message: "Invalid userData received" });
    }
  })
);

router.post(
  "/login",
  asyncHandler(async (req, res) => {
    const { Email, Password } = req.body;

    if (!Email || !Password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    const user = await User.findOne({ Email }).exec();

    if (!user || !(await bcrypt.compare(Password, user.Password))) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    console.log("Hi");

    res.status(201).json({
      _id: user._id,
      firstName: user.FirstName,
      lastName: user.LastName,
      email: user.Email,
      phone: user.Phone,
      role: user.Role,
      token: generateToken(user._id),
    });
  })
);

router.patch(
  "/",
  asyncHandler(async (req, res) => {
    const { id, FirstName, LastName, Email, Phone, Role } = req.body;

    if (!id || !FirstName || !LastName || !Role || !Email || !Phone) {
      return res
        .status(400)
        .json({ message: "All fields except password are required" });
    }

    const user = await User.findById(id).exec();

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const duplicate = await User.find({ FirstName, LastName }).lean().exec();

    if (duplicate && duplicate.length > 1) {
      return res
        .status(409)
        .json({ message: "Already an user exists with the same name..." });
    }

    user.FirstName = FirstName;
    user.LastName = LastName;
    user.Role = Role;
    user.Email = Email;
    user.Phone = Phone;

    if (password) {
      // Hash password
      user.Password = await bcrypt.hash(Password, 10); // salt rounds
    }

    const updatedUser = await user.save();

    res.json({
      message: `${updatedUser.FirstName + updatedUser.LastName} updated`,
    });
  })
);

router.delete(
  "/",
  asyncHandler(async (req, res) => {
    const { id } = req.body;

    // Confirm data
    if (!id) {
      return res.status(400).json({ message: "User ID Required" });
    }

    // Does the user exist to delete?
    const user = await User.findById(id).exec();

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const result = await user.deleteOne();

    const reply = `Username ${result.username} with ID ${result._id} deleted`;

    res.json(reply);
  })
);

module.exports = router;
