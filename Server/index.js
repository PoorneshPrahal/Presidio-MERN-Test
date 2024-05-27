require("dotenv").config();
const express = require("express");
const app = express();

const userRoutes = require("./routes/userRoutes");
const sellerRoutes = require("./routes/sellerRoutes");
const buyerRoutes = require("./routes/buyerRoutes");

const errorHandler = require("./middlewares/errorHandler");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const connectDB = require("./config/dbconn");

const PORT = process.env.PORT || 3500;

console.log(process.env.MONGODB_URL);

connectDB();

app.use(cors());

app.use(express.json());

app.use(cookieParser());

app.use("/users", userRoutes);
app.use("/seller", sellerRoutes);
app.use("/buyer", buyerRoutes);

app.all("*", (req, res) => {
  res.status(404);

  if (req.accepts("json")) {
    res.json({ message: "404 Not Found" });
  } else {
    res.type("txt").send("404 Not Found");
  }
});

app.use(errorHandler);

mongoose.connection.once("open", () => {
  console.log("Connected to DB");
});

mongoose.connection.error("error", (err) => {
  console.log(err);
});

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
