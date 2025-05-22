import React, { useEffect, useState } from "react";
import type { Review } from "./types";
import "./styles/ReviewModal.css";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSave: (review: Review) => void;
  productId: number;
  initialData?: Review | null;
}

const ReviewModal: React.FC<Props> = ({
  isOpen,
  onClose,
  onSave,
  productId,
  initialData,
}) => {
  const [author, setAuthor] = useState("");
  const [rating, setRating] = useState(1);
  const [comment, setComment] = useState("");

  useEffect(() => {
    if (initialData) {
      setAuthor(initialData.author);
      setRating(initialData.rating);
      setComment(initialData.comment);
    } else {
      setAuthor("");
      setRating(1);
      setComment("");
    }
  }, [initialData]);

  const handleStarClick = (value: number) => setRating(value);

  if (!isOpen) return null;

  const handleMakeRequest = () => {
    fetch(`http://localhost:3030/api/products/${productId}/reviews`, {
      method: `${initialData ? "PUT" : "POST"}`,
      body: JSON.stringify({ author, rating, comment }),
      headers: {
        "Content-Type": "application/json",
      },
    });
  };
  const handleSubmit = () => {
    handleMakeRequest();
    onSave();
    onClose();
  };

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <h2>{initialData ? "Edit" : "Add"} Review</h2>
        <input
          type="text"
          placeholder="Your name"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />
        <div className="star-rating">
          {[1, 2, 3, 4, 5].map((star) => (
            <span
              key={star}
              onClick={() => handleStarClick(star)}
              style={{
                cursor: "pointer",
                color: star <= rating ? "#FFD700" : "#ccc",
                fontSize: "1.5rem",
              }}
            >
              ★
            </span>
          ))}
        </div>
        <textarea
          placeholder="Your comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <div className="modal-actions">
          <button onClick={handleSubmit}>
            {initialData ? "Update" : "Submit"}
          </button>
          <button onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default ReviewModal;
