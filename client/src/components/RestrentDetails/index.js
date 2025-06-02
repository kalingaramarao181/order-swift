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
import OrderForm from "../../forms/ordersForm";

const RestaurantDetails = () => {
  const [isOpenBookTableForm, setIsOpenBookTableForm] = useState(false);
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const restaurantId = location.state?.restaurantId;
  const [restaurant, setRestaurant] = useState(null);
  const [userId, setUserId] = useState(null);
  const [isOpenOrderForm, setIsOpenOrderForm] = useState(false);
  const [orderDetails, setOrderDetails] = useState(null);

  useEffect(() => {
    if (!restaurantId) {
      navigate("/");
      return;
    }

    const fetchData = async () => {
      try {
        const res = await getRestaurantDetails(restaurantId);
        console.log("Restaurant Details:", res);

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

  const handleOrderClick = (item) => {
    setOrderDetails(item);
    setIsOpenOrderForm(true);
  };

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

  const origionalPrice = (offer) => {
    let totalPrice = 0;
    offer.items.forEach((item) => {
      totalPrice += parseInt(item.price);
    });
    return `₹${totalPrice - offer.discount_value}`;
  };

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

        <h2 className="order-menu-title">Offers</h2>
        <div className="offers-container">
          {restaurant.offers.map((offer) => (
            <div key={offer.offer_id} className="offer-card">
              <div className="offer-header">
                <h2 className="offer-title">{offer.offer_title}</h2>
                <span className="offer-type">{offer.offer_type}</span>
              </div>
              <p className="offer-description"> </p>

              <div className="offer-discount">
                <strong>Discount: </strong>
                {offer.discount_type === "FLAT"
                  ? `₹${offer.discount_value}`
                  : `${offer.discount_value}%`}
              </div>

              <div className="offer-discount">
                <strong>Origional Price: </strong>
                {origionalPrice(offer)}
              </div>

              <div className="items-grid">
                {offer.items.map((item) => (
                  <div key={item.id} className="item-card">
                    <div className="image-wrapper">
                      <img
                        src={baseUrl + item.image}
                        alt={item.name}
                        className="item-image"
                      />
                    </div>
                    <h4 className="item-name">{item.name}</h4>
                    <p className="item-price">₹{item.price}</p>
                  </div>
                ))}
              </div>
              <button
                className="offer-button"
                onClick={() => handleOrderClick(offer)}
              >
                Order Now {origionalPrice(offer)}
              </button>

              <div className="offer-dates">
                <small>
                  Valid from{" "}
                  <strong>
                    {new Date(offer.start_date).toLocaleDateString()}
                  </strong>{" "}
                  to{" "}
                  <strong>
                    {new Date(offer.end_date).toLocaleDateString()}
                  </strong>
                </small>
              </div>
            </div>
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
                <button
                  className="order-food-button"
                  onClick={() => handleOrderClick(item)}
                >
                  Order Now
                </button>
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

      {isOpenOrderForm && (
        <div className="login-popup-overlay">
          <div className="login-popup">
            <button
              className="order-login-close-button"
              onClick={() => setIsOpenOrderForm(false)}
            >
              <MdClose />
            </button>
            <div className="order-login-page">
              <OrderForm
                userId={userId}
                orderDetails={orderDetails}
                onClose={() => setIsOpenOrderForm(false)}
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
