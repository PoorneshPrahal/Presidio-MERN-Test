import React, { useEffect, useState } from "react";
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

  const fetchHouses = async () => {
    try {
      const housesData = await axios.get(
        `http://localhost:3500/seller/${sellerId}`
      );
      console.log(housesData.data);
      setHouses(housesData.data);
    } catch (error) {
      setError("You have not posted any houses.");
    }
  };
  const deleteHouse = async (id) => {
    const house = await axios.delete(`http://localhost:3500/seller/${id}`);
    fetchHouses();
  };

  useEffect(() => {
    fetchHouses();
  }, [sellerId]);

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
