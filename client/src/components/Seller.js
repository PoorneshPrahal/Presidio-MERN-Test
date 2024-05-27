import React, { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Seller.css";

const Seller = () => {
  const navigate = useNavigate();
  const { sellerId } = useParams();
  const [houses, setHouses] = useState([]);
  const [error, setError] = useState(null);

  const postHouse = () => {
    navigate(`/sellerpubish/${sellerId}`);
  };

  const updateHouse = (id) => {
    console.log(id);
    navigate(`/seller/updateHouse/${id}/${sellerId}`);
  };

  const fetchHouses = useCallback(async () => {
    try {
      const response = await axios.get(
        `https://presidio-mern-test.onrender.com/seller/${sellerId}`
      );
      setHouses(response.data);
      setError(null);
    } catch (error) {
      setHouses([]);
      setError("You have not posted any houses");
    }
  }, [sellerId]);

  useEffect(() => {
    fetchHouses();
  }, [fetchHouses]);
  const deleteHouse = async (id) => {
    await axios.delete(`https://presidio-mern-test.onrender.com/seller/${id}`);
    fetchHouses();
  };

  return (
    <div className="seller-page">
      <h2>Seller Page</h2>
      <button type="button" onClick={postHouse}>
        Publish your house
      </button>
      {error && <p className="error">{error}</p>}
      <div className="houses-list">
        {houses.length > 0 ? (
          houses.map((house) => (
            <div key={house._id} className="house-card">
              <img src={house.img} alt="House images" style={{width: "200px"}}/>
              <h3>
                {house.Area}, {house.City}
              </h3>{" "}
              {/* Update with the actual field name */}
              <h5>Rent Amount: Just Rs.{house.Rent} only</h5>
              <p>{house.NumOfBedrooms} BHK</p>{" "}
              {/* Update with the actual field name */}
              <p>{house.NumOfBathrooms} Bathrooms</p>
              {/* Add other fields you want to display */}
              <button type="button" onClick={() => updateHouse(house._id)}>
                Update the house details
              </button>
              <button
                type="button"
                onClick={() => {
                  deleteHouse(house._id);
                }}
              >
                Delete this house
              </button>
            </div>
          ))
        ) : (
          <h3>No houses found</h3>
        )}
      </div>
    </div>
  );
};

export default Seller;
