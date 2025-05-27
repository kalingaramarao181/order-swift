import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Dashboard from "./restaurent";
import Secure from "./components/Secure";
import Billing from "./forms/billing";
import RestaurantDetails from "./components/RestrentDetails";
import UserDashboard from "./userDashboard";

function App() {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/restaurant/:restaurantId" element={<RestaurantDetails />} />
      <Route element={<Secure />}>
          <Route path="/dashboard/*" element={<Dashboard />} />
          <Route path="/c-dashboard/*" element={<UserDashboard />} />
          <Route path="/billing" element={<Billing />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
