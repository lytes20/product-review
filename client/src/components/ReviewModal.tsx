import React, { useEffect, useState } from "react";
import type { Review } from "./types";
import "./styles/ReviewModal.css";
import { BASE_URL } from "../constants";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSave: () => void;
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
  const [isLoading, setIsLoading] = useState(false);

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

  const handleMakeCreateRequest = () => {
    setIsLoading(true);
    fetch(`${BASE_URL}/${productId}/reviews`, {
      method: "POST",
      body: JSON.stringify({ author, rating, comment }),
      headers: {
        "Content-Type": "application/json",
      },
    }).then(() => {
      setIsLoading(false);
      onClose();
      onSave();
    });
  };

  const handleMakeEditRequest = () => {
    setIsLoading(true);
    fetch(`${BASE_URL}/${productId}/reviews/${initialData?.id}`, {
      method: "PUT",
      body: JSON.stringify({ author, rating, comment }),
      headers: {
        "Content-Type": "application/json",
      },
    }).then(() => {
      setIsLoading(false);
      onClose();
      onSave();
    });
  };
  const handleSubmit = () => {
    if (initialData) {
      handleMakeEditRequest();
    } else {
      handleMakeCreateRequest();
    }
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
        {isLoading ? (
          <span>Saving ...</span>
        ) : (
          <div className="modal-actions">
            <button onClick={handleSubmit} disabled={isLoading}>
              {initialData ? "Update" : "Submit"}
            </button>
            <button onClick={onClose}>Cancel</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReviewModal;
