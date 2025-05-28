import React, { useState } from "react";
import "../styles/FeedbackPage.css";
import { FaStar } from "react-icons/fa";

const FeedbackPage = () => {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [feedback, setFeedback] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!rating || feedback.trim() === "") {
      alert("Please give a rating and feedback.");
      return;
    }
    // Submit feedback to backend here
    alert("Thank you for your feedback!");
    setRating(0);
    setFeedback("");
  };

  return (
    <div className="customer-feedback-container">
      <h2 className="customer-feedback-title">📝 Share Your Experience</h2>

      <form className="customer-feedback-form" onSubmit={handleSubmit}>
        <div className="customer-feedback-rating">
          <label>Rate your experience:</label>
          <div className="customer-feedback-stars">
            {[1, 2, 3, 4, 5].map((star) => (
              <FaStar
                key={star}
                className={
                  (hoverRating || rating) >= star
                    ? "star selected"
                    : "star"
                }
                onMouseEnter={() => setHoverRating(star)}
                onMouseLeave={() => setHoverRating(0)}
                onClick={() => setRating(star)}
              />
            ))}
          </div>
        </div>

        <div className="customer-feedback-textarea">
          <label>Your Feedback</label>
          <textarea
            placeholder="Tell us what you liked or what can be improved..."
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            rows={5}
          />
        </div>

        <button type="submit" className="customer-feedback-submit-btn">
          Submit Feedback
        </button>
      </form>
    </div>
  );
};

export default FeedbackPage;
