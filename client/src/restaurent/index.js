import { Routes, Route } from "react-router-dom";
import React, { useEffect, useState } from "react";
import Header from "../components/header";
import RestaurantDashboardHomePage from "./pages/HomePage";
import BillingPage from "./pages/BillingPage";
import BookingsPage from "./pages/BookingsPage";
import TablesPage from "./pages/ManageTablesPage";
import ManageMenu from "./pages/MangeMenuPage";
import OrdersPage from "./pages/OrdersPage";
import ProfilePage from "./pages/ProfilePage";
import { getRestaurantDetails, getRestaurantProfileById } from "../api/restaurentApi";
import { getMenuItemById } from "../api/menuItemApi";
import { getTablesByRestaurantId } from "../api/tablesApi";
import { getBookingsByRestaurantId } from "../api/tableBookingApi";
import { getOrdersByRestaurantId } from "../api/orderApi";
import { getAddressFromCoords } from "../utils/getAddressFromCoords";
import { getCookiesData } from "../utils/cookiesData";

const Dashboard = () => {
  const [restaurantDetails, setRestaurantDetails] = useState({});
  const [menuItems, setMenuItems] = useState([]);
  const [tables, setTables] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const ownerId = getCookiesData().userId;
        const restaurantData = await getRestaurantProfileById(ownerId);
        const restaurantId = restaurantData[0]?.id;
        if (!restaurantId) {
          console.error("Restaurant ID not found for owner:", ownerId);
          return;
        }
        const [
          restaurant,
          menu,
          tableData,
          bookingsData,
          orderList,
        ] = await Promise.all([
          getRestaurantDetails(restaurantId),
          getMenuItemById(restaurantId),
          getTablesByRestaurantId(restaurantId),
          getBookingsByRestaurantId(restaurantId),
          getOrdersByRestaurantId(restaurantId),
        ]);

        const updatedOrders = await Promise.all(
          orderList.map(async (order) => {
            let address = "Invalid location";
            try {
              const location = JSON.parse(order.location);
              address = await getAddressFromCoords(location.lat, location.lng);
            } catch (err) {
              console.error("Location parse error:", err);
            }
            return { ...order, address };
          })
        );

        setRestaurantDetails(restaurant);
        setMenuItems(menu);
        setTables(tableData);
        setBookings(bookingsData);
        setOrders(updatedOrders);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }
    };

    fetchAllData();
  }, []);

  return (
    <div>
      <Header />
      <Routes>
        <Route
          path="/"
          element={
            <RestaurantDashboardHomePage
              restaurantDetails={restaurantDetails}
            />
          }
        />
        <Route path="/billing" element={<BillingPage />} />
        <Route
          path="/bookings"
          element={
            <BookingsPage bookings={bookings} setBookings={setBookings} />
          }
        />
        <Route
          path="/tables"
          element={<TablesPage tables={tables} restaurantId={restaurantDetails.restaurantId} setTables={setTables} />}
        />
        <Route
          path="/manage-menu"
          element={<ManageMenu menuItems={menuItems} restaurantId={restaurantDetails.restaurantId}/>}
        />
        <Route path="/orders" element={<OrdersPage orders={orders}  />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Routes>
    </div>
  );
};

export default Dashboard;
