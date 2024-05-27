import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./updateHouse.css";

const UpdateHouse = () => {
  const { id, sellerId } = useParams();
  console.log(id, sellerId);
  const navigate = useNavigate();
  const [houseDetails, setHouseDetails] = useState({
    id: id,
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
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchHouseDetails = async () => {
      try {
        const houseData = await axios.get(
          `http://localhost:3500/seller/house/${id}`
        );
        setHouseDetails(houseData.data);
      } catch (error) {
        setError("Failed to fetch house details");
      }
    };
    fetchHouseDetails();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setHouseDetails({
      ...houseDetails,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");
    try {
      console.log(houseDetails);
      const response = await axios.patch(
        "http://localhost:3500/seller/",
        houseDetails
      );
      setMessage(response.message);
      navigate(`/seller/${sellerId}`);
    } catch (error) {
      setError(error.response?.data?.message || "Error updating house");
    }
  };

  return (
    <div className="update-house">
      <h2>Update House Details</h2>
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
          placeholder="10000"
          value={houseDetails.Rent}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="img"
          placeholder="http://img.jpg"
          value={houseDetails.img}
          onChange={handleChange}
          required
        />
        <button type="submit">Update House</button>
      </form>
      {message && <p className="message">{message}</p>}
      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default UpdateHouse;
