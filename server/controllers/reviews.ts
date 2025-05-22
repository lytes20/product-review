import { Request, Response, NextFunction, RequestHandler } from "express";
import { Review } from "../models/Review";
import productsService from "../services/products";
import reviewsService from "../services/reviews";

const postReview = async (req: Request, res: Response, next: NextFunction) => {
  const productId = req.params.id;

  const product = await productsService.getProductById(productId);
  if (!product) {
    res.status(404).json({ message: "Product not found" });
  }

  const { author, rating, comment } = req.body;

  if (!author || !rating || !comment) {
    res.status(400).json({ message: "All fields are required." });
  }

  try {
    const review = new Review(productId, author, rating, comment);
    reviewsService.saveReview(review);
    res.status(201).json({ message: "Review created", review });
  } catch (err) {
    console.error("Error creating review:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

const updateReview = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { productId, id: reviewId } = req.params;

  const product = await productsService.getProductById(productId);
  if (!product) {
    res.status(404).json({ message: "Product not found" });
  }

  const { author, rating, comment } = req.body;

  const success = reviewsService.updateReview(productId, reviewId, {
    author,
    rating,
    comment,
  });

  if (!success) {
    res.status(404).json({ message: "Review not found" });
  }

  res.status(200).json({ message: "Review updated" });
};

const deleteReview = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { productId, id: reviewId } = req.params;
  const product = await productsService.getProductById(productId);
  if (!product) {
    res.status(404).json({ message: "Product not found" });
  }

  const success = reviewsService.deleteReview(productId, reviewId);
  if (!success) {
    res.status(404).json({ message: "Review not found" });
  }

  res.status(200).json({ message: "Review deleted" });
};

export default { postReview, updateReview, deleteReview };
