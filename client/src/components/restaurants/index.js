import { useNavigate } from "react-router-dom";
import { getRestaurants } from "../../api/restaurentApi";
import "./index.css";
import { useState, useEffect } from "react";
import { baseUrl } from "../../config/constants";

const Restaurants = () => {
    const [restaurants, setRestaurants] = useState([]);
    const navigate = useNavigate();


    useEffect(() => {
        const fetchRestaurants = async () => {
            try {
                const response = await getRestaurants();
                
                setRestaurants(response.map((item) => ({
                    id: item.id,
                    name: item.name,
                    description: item.description,
                    image: `${baseUrl}${item.image}`,
                    })));
            } catch (error) {
                console.error("Error fetching restaurants:", error);
            }
        };
        fetchRestaurants();
    }, []);

    const handleBookTable = (restaurant) => {

        const slug = restaurant.name.toLowerCase().replace(/\s+/g, "-");
        navigate(`/restaurant/${slug}`, {
          state: { restaurantId: restaurant.id },
        });
      };
  return (
    <>
      <h1 className="order-restarent-card-title">Top Restaurants</h1>
      <div className="restarent-card-container">
        {restaurants.map((card) => (
          <div className="restarent-card" key={card.id}>
            <img
              src={card.image}
              alt={card.title}
              className="restarent-card-image"
            />
            <h3 className="restarent-card-title">{card.name}</h3>
            <p className="restrent-card-description">{card.description}</p>
            <button onClick={() => handleBookTable(card)} className="restarent-card-button">Book Table</button>
          </div>
        ))}
      </div>
    </>
  );
};

export default Restaurants;
