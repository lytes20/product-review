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

export default { getReviewsByProductId, saveReview };
