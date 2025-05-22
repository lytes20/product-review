import React from "react";
import { useNavigate } from "react-router-dom";
import type { ProductType } from "./types";

const Product: React.FC<ProductType> = (props) => {
  const { id, name, category, price, description, imageUrl, averageRating } =
    props;
  console.log("rating", averageRating);

  const navigate = useNavigate();
  const renderStars = (rating: number) => {
    return [...Array(5)].map((_, index) => (
      <span key={index}>{index < rating ? "★" : "☆"}</span>
    ));
  };

  return (
    <div
      className="product"
      onClick={() => navigate(`/products/${id}`)}
      style={{ cursor: "pointer" }}
    >
      <div>
        <div className="product-image">
          <img src={imageUrl} alt={name} />
        </div>
      </div>

      <div>
        <p className="product-name">{name}</p>
        <p>{category}</p>
        <p>{price}</p>
        <div className="stars">{renderStars(Math.round(averageRating))}</div>
        <p>{description}</p>
      </div>
    </div>
  );
};

export default Product;
