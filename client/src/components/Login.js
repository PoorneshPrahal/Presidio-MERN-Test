import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Form.css";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
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
        "https://presidio-mern-test.onrender.com/users/login",
        formData
      );
      console.log(response.data);
      if (response.data.role === "Seller") {
        navigate(`/seller/${response.data._id}`);
      } else {
        navigate(`/buyer/${response.data._id}`);
      }
    } catch (error) {
      console.error(error.response.data);
    }
  };

  return (
    <div className="form-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit} className="form">
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
        <button type="submit" className="form-button">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
