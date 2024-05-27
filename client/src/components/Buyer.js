import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
import axios from "axios";
import "./Buyer.css";

import Modal from "./Modal";

const Buyer = () => {
  // const { id } = useParams();
  const [city, setCity] = useState("");
  const [area, setArea] = useState("");
  const [houses, setHouses] = useState([]);
  const [error, setError] = useState(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [sellerDetails, setSellerDetails] = useState(null);

  useEffect(() => {
    const fetchHouses = async () => {
      try {
        const response = await axios.get(
          "https://presidio-mern-test.onrender.com/buyer/home"
        );
        setHouses(response.data);
        setError(null);
      } catch (error) {
        setHouses([]);
        setError("No houses found...");
      }
    };
    fetchHouses();
  }, []);

  const fetchSellerDetails = async (houseId) => {
    try {
      console.log("Fetching details for houseId:", houseId);
      const response = await axios.get(
        `https://presidio-mern-test.onrender.com/buyer/house/${houseId}`
      );
      console.log("Response:", response.data);
      setSellerDetails(response.data);
      setIsModalOpen(true);
    } catch (error) {
      console.error(
        "Error fetching seller details:",
        error.response || error.message
      );
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSellerDetails(null);
  };

  const handleSearch = async () => {
    try {
      const housesData = await axios.get("https://presidio-mern-test.onrender.com/buyer/", {
        params: { city, area },
      });
      setHouses(housesData.data);
      setError(null);
    } catch (error) {
      setHouses([]);
      setError("No houses found in this location.");
    }
  };

  return (
    <div className="buyer-page">
      <h2>Search for Houses</h2>
      <div className="search-form">
        <input
          type="text"
          placeholder="City"
          name="city"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <input
          type="text"
          placeholder="Area"
          name="area"
          value={area}
          onChange={(e) => setArea(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      {error && <p className="error">{error}</p>}
      <div className="houses-list">
        {houses.length > 0
          ? houses.map((house) => (
              <div key={house._id} className="house-card">
                <h3>
                  {house.Area}, {house.City}
                </h3>{" "}
                {/* Update with the actual field name */}
                <h5>Rent Amount: Just Rs.{house.Rent} only</h5>
                <p>{house.NumOfBedrooms} BHK</p>{" "}
                {/* Update with the actual field name */}
                <p>{house.NumOfBathrooms} Bathrooms</p>
                {/* Add other fields you want to display */}
                <button onClick={() => fetchSellerDetails(house._id)}>
                  View Seller Details
                </button>
                <Modal
                  isOpen={isModalOpen}
                  onClose={closeModal}
                  seller={sellerDetails}
                />
              </div>
            ))
          : !error && <p>No houses found</p>}
      </div>
    </div>
  );
};

export default Buyer;
