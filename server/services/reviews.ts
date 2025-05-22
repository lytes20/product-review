import fs from "fs";
import path from "path";
import { Review } from "../models/Review";

const REVIEWS_FILE = path.join(__dirname, "../data/reviews.json");
/**
 * Load all reviews from the JSON file.
 */
const loadReviews = (): Review[] => {
  try {
    const data = fs.readFileSync(REVIEWS_FILE, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    console.error("Error reading reviews.json:", error);
    return [];
  }
};

/**
 * Save all reviews to the JSON file.
 */
const saveReviews = (reviews: Review[]): void => {
  try {
    fs.writeFileSync(REVIEWS_FILE, JSON.stringify(reviews, null, 2), "utf-8");
  } catch (error) {
    console.error("Error writing to reviews.json:", error);
  }
};

/**
 * Add a new review to the reviews file.
 */
const saveReview = (review: Review): void => {
  const reviews = loadReviews();
  reviews.push(review);
  saveReviews(reviews);
};

/**
 * Get all reviews for a specific product by its ID.
 */
const getReviewsByProductId = (productId: string): Review[] => {
  const allReviews = loadReviews();
  return allReviews.filter((review) => review.productId === productId);
};

/**
 * Update a review by productId and reviewId.
 */
const updateReview = (
  productId: string,
  reviewId: string,
  data: { author?: string; rating?: number; comment?: string }
): boolean => {
  const reviews = loadReviews();
  const index = reviews.findIndex(
    (r) => r.productId === productId && r.id === reviewId
  );

  if (index === -1) return false;

  if (data.author) reviews[index].author = data.author;
  if (data.rating) reviews[index].rating = data.rating;
  if (data.comment) reviews[index].comment = data.comment;

  reviews[index].date = new Date().toISOString();

  saveReviews(reviews);
  return true;
};

/**
 * Delete a review by productId and reviewId.
 */
const deleteReview = (productId: string, reviewId: string): boolean => {
  const reviews = loadReviews();
  const index = reviews.findIndex(
    (r) => r.productId === productId && r.id === reviewId
  );

  if (index === -1) return false;

  reviews.splice(index, 1);
  saveReviews(reviews);
  return true;
};
export default {
  getReviewsByProductId,
  saveReview,
  updateReview,
  deleteReview,
};
