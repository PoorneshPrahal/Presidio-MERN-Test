import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./SellerPublish.css";

const SellerPublish = () => {
  const { sellerId } = useParams();
  const navigate = useNavigate();
  const [houseDetails, setHouseDetails] = useState({
    HouseOwner: `${sellerId}`,
    HouseNo: "",
    Street: "",
    Area: "",
    City: "",
    State: "",
    DistanceToHospitals: "",
    NumOfBathrooms: "",
    NumOfBedrooms: "",
    Rent: "",
    img: "",
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setHouseDetails({
      ...houseDetails,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `https://presidio-mern-test.onrender.com/seller`,
        houseDetails
      );
      setMessage(response.message);
      navigate(`/seller/${sellerId}`);
    } catch (error) {
      setMessage(error.response?.data?.message || "Error publishing house");
    }
  };

  return (
    <div className="seller-page">
      <h2>Publish a House</h2>
      <form className="house-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="HouseNo"
          placeholder="House No"
          value={houseDetails.HouseNo}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="Street"
          placeholder="Street"
          value={houseDetails.Street}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="Area"
          placeholder="Area"
          value={houseDetails.Area}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="City"
          placeholder="City"
          value={houseDetails.City}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="State"
          placeholder="State"
          value={houseDetails.State}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="DistanceToHospitals"
          placeholder="Distance to Hospitals"
          value={houseDetails.DistanceToHospitals}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="NumOfBathrooms"
          placeholder="Number of Bathrooms"
          value={houseDetails.NumOfBathrooms}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="NumOfBedrooms"
          placeholder="Number of Bedrooms"
          value={houseDetails.NumOfBedrooms}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="Rent"
          placeholder="Rent - Ex. 10000"
          value={houseDetails.Rent}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="img"
          placeholder="http://img.jpeg"
          value={houseDetails.img}
          onChange={handleChange}
          required
        />
        <button type="submit">Publish House</button>
      </form>
      {message && <p className="message">{message}</p>}
    </div>
  );
};

export default SellerPublish;
