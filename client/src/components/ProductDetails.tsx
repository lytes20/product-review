import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import type { ProductType, Review } from "./types";
import ReviewModal from "./ReviewModal";
import "./styles/ProductDetails.css";
import { BASE_URL } from "../constants";

const ProductDetails = () => {
  const { productId } = useParams<{ productId: string }>();
  const [product, setProduct] = useState<ProductType | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [editingReview, setEditingReview] = useState<Review | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [refetch, setRefetch] = useState(1);

  useEffect(() => {
    if (productId) {
      fetch(`${BASE_URL}/${productId}/reviews`)
        .then((res) => res.json())
        .then((data) => {
          setProduct(data.product);
          setReviews(data.reviews);
        });
    }
  }, [productId, refetch]);

  const renderStars = (rating: number) =>
    [...Array(5)].map((_, index) => (
      <span key={index}>{index < rating ? "★" : "☆"}</span>
    ));

  const handleDeleteReview = (id: string) => {
    fetch(`${BASE_URL}/${productId}/reviews/${id}`, {
      method: "DELETE",
    }).then(() => {
      setIsLoading(false);
      setRefetch((prev) => prev + 1);
    });
  };
  if (!product) return <p>Loading product...</p>;

  return (
    <div className="product-details">
      <div className="product-header">
        <img src={product.imageUrl} alt={product.name} />
        <div className="product-info">
          <h2>{product.name}</h2>
          <p>
            <strong>Category:</strong> {product.category}
          </p>
          <p>
            <strong>Price:</strong> ${product.price}
          </p>
          <p>
            <strong>Description:</strong> {product.description}
          </p>
          <div className="rating">
            <strong>Rating:</strong>{" "}
            {renderStars(Math.round(product.averageRating))}
          </div>
        </div>
      </div>

      <div className="review-section">
        <h3>Reviews</h3>
        <button
          onClick={() => {
            setEditingReview(null);
            setShowModal(true);
          }}
        >
          Add Review
        </button>

        {isLoading && <span>Saving...</span>}
        {reviews.length === 0 ? (
          <p>No reviews yet.</p>
        ) : (
          <ul className="review-list">
            {reviews.map((review) => (
              <li key={review.id} className="review-item">
                <p>
                  <strong>{review.author}</strong> –{" "}
                  {renderStars(review.rating)}
                </p>
                <p>{review.comment}</p>
                <small>{new Date(review.date).toLocaleDateString()}</small>
                <div className="review-actions">
                  <button
                    onClick={() => {
                      setEditingReview(review);
                      setShowModal(true);
                    }}
                    disabled={isLoading}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteReview(review.id)}
                    disabled={isLoading}
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      <ReviewModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onSave={() => {
          setRefetch((prev) => prev + 1);
        }}
        productId={product.id}
        initialData={editingReview}
      />
    </div>
  );
};

export default ProductDetails;
