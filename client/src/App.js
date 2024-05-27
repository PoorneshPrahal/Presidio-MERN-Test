import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import "./App.css";
import Signup from "./components/Signup";
import Seller from "./components/Seller";
import Buyer from "./components/Buyer";
import SellerPublish from "./components/SellerPublish";
import UpdateHouse from "./components/updateHouse";

function App() {
  return (
    <Router>
      <Navbar />
      <div className="App">
        <Routes>
          <Route path="/" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/buyer/:id" element={<Buyer />} />
          <Route path="/seller/:sellerId" element={<Seller />} />
          <Route path="/sellerpubish/:sellerId" element={<SellerPublish />} />
          <Route
            path="/seller/updateHouse/:id/:sellerId"
            element={<UpdateHouse />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
