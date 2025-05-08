import { useEffect, useState } from "react";
import { getRestaurantDetails } from "../../api/restaurentApi";
import { useLocation, useNavigate } from "react-router-dom";
import "./index.css";
import { baseUrl } from "../../config/constants";
import Loader from "../loader";
import Navbar from "../navbar";
import TableBookingForm from "../../forms/tableBookingForm";
import { MdClose } from "react-icons/md";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

const RestaurantDetails = () => {
  const [isOpenBookTableForm, setIsOpenBookTableForm] = useState(false);
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const restaurantId = location.state?.restaurantId;
  const [restaurant, setRestaurant] = useState(null);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    if (!restaurantId) {
      navigate("/");
      return;
    }

    const fetchData = async () => {
      try {
        const res = await getRestaurantDetails(restaurantId);
        setRestaurant(res);
      } catch (error) {
        console.error("Error fetching restaurant:", error);
      }
    };

    const token = Cookies.get("jwtToken");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUserId(decoded.id);
      } catch (error) {
        console.error("Invalid token:", error);
        Cookies.remove("jwtToken");
        setUserId(null);
      }
    }

    fetchData();
  }, [restaurantId, navigate]);

  const handleBookTableClick = () => {
    const token = Cookies.get("jwtToken");

    if (!token) {
      setShowLoginPrompt(true); 
      return;
    }

    setIsOpenBookTableForm(true);
  };

  if (!restaurant) {
    return <Loader loadingText="Fetching Restaurant details..." />;
  }

  return (
    <>
      <Navbar />
      <div className="order-restaurant-details-container">
        <div className="order-restaurant-details-header">
          <img
            src={`${baseUrl}${restaurant.logo}`}
            alt="Logo"
            className="order-restaurant-logo"
          />
          <h1 className="order-restaurant-name">{restaurant.name}</h1>
          <button
            className="order-restaurant-book-button"
            onClick={handleBookTableClick}
          >
            Book Table
          </button>
        </div>

        <div className="order-restaurant-gallery">
          {restaurant.images.map((img, idx) => (
            <img
              src={`${baseUrl}${img}`}
              alt={`Restaurant ${idx + 1}`}
              key={idx}
            />
          ))}
        </div>

        <h2 className="order-menu-title">Menu Items</h2>
        <div className="order-food-items-grid">
          {restaurant.foodItems.map((item, idx) => (
            <div className="order-food-card" key={idx}>
              <img src={`${baseUrl}${item.image}`} alt={item.name} />
              <div className="order-food-info">
                <p className="order-food-name">{item.name}</p>
                <p className="order-food-price">₹{item.price}</p>
                {item.discount && (
                  <span className="order-food-discount">{item.discount}</span>
                )}
                <button className="order-food-button">Order Now</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Table Booking Form Popup */}
      {isOpenBookTableForm && (
        <div className="login-popup-overlay">
          <div className="login-popup">
            <button
              className="order-login-close-button"
              onClick={() => setIsOpenBookTableForm(false)}
            >
              <MdClose />
            </button>
            <div className="order-login-page">
              <TableBookingForm
                userId={userId}
                restaurantData={restaurant}
                onClose={() => setIsOpenBookTableForm(false)}
              />
            </div>
          </div>
        </div>
      )}

      {/* Login Required Prompt */}
      {showLoginPrompt && (
        <div className="rd-login-popup-overlay">
          <div className="rd-login-popup">
            <p className="rd-login-popup-message">
              Please login to book a table.
            </p>
            <div className="rd-login-popup-buttons">
              <button
                onClick={() => setShowLoginPrompt(false)}
                className="rd-login-popup-cancel-button"
              >
                Cancel
              </button>
              <button
                onClick={() => navigate("/")}
                className="rd-login-popup-login-button"
              >
                Login
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default RestaurantDetails;
