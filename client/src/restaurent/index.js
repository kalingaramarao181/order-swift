import { Routes, Route } from "react-router-dom";
import Header from "../components/header";
import RestaurantDashboardHomePage from "./pages/HomePage";
import BillingPage from "./pages/BillingPage";
import BookingsPage from "./pages/BookingsPage";
import TablesPage from "./pages/ManageTablesPage";
import ManageMenu from "./pages/MangeMenuPage";
import OrdersPage from "./pages/OrdersPage";
import ProfilePage from "./pages/ProfilePage";

const Dashboard = () => {
  
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<RestaurantDashboardHomePage />} />
        <Route path="/billing" element={<BillingPage />} />
        <Route path="/bookings" element={<BookingsPage />} />
        <Route path="/tables" element={<TablesPage />} />
        <Route path="/manage-menu" element={<ManageMenu />} />
        <Route path="/orders" element={<OrdersPage />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Routes>
    </div>
  );
};

export default Dashboard;
