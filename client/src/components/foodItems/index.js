import React from "react";
import "./index.css";
import { foodCategories } from "../../utils/foodItems";
  
  
  const FoodItems = () => {
    return (
      <section className="food-category-section">
        <div className="food-category-grid">
          {foodCategories.map((item, index) => (
            <div className="food-card" key={index}>
              <img src={item.image} alt={item.name} />
              <p className="food-label">{item.name}</p>
            </div>
          ))}
        </div>  
      </section>
    );
  };
  
  export default FoodItems;
  