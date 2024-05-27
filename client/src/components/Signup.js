import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Form.css";

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    FirstName: "",
    LastName: "",
    Role: "",
    Phone: "",
    Email: "",
    Password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://presidio-mern-test.onrender.com/users/register",
        formData
      );
      console.log(response.data);
      navigate("/login");
    } catch (error) {
      console.error(error.response.data);
    }
  };

  return (
    <div className="form-container">
      <h2>Signup</h2>
      <form onSubmit={handleSubmit} className="form">
        <input
          type="text"
          name="FirstName"
          placeholder="First Name"
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="LastName"
          placeholder="Last Name"
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="Email"
          placeholder="Email"
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="Password"
          placeholder="Password"
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="Phone"
          placeholder="9638163946"
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="Role"
          placeholder="Buyer/Seller"
          onChange={handleChange}
          required
        />
        <button type="submit" className="form-button">
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default Signup;
