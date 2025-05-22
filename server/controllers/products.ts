import { Request, Response, NextFunction, RequestHandler } from "express";
import Product from "../models/Product";
import productsService from "../services/products";
import reviewsService from "../services/reviews";

// Create a product
const createProduct = (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, description, category, price } = req.body;
    const product = new Product(name, description, category, price);
    // Insert logic here
    res.status(201).json(product);
  } catch (error) {
    next(error);
  }
};

// Read all items
const getProducts = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const products = await productsService.getAllProducts();
    res.status(200).json({ message: "Success", products });
  } catch (error) {
    next(error);
  }
};

const searchProducts = (req: Request, res: Response, next: NextFunction) => {};
const getProductReviews = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const productId = req.params.id;
  try {
    const productId = req.params.id;

    if (!productId) {
      res.status(400).json({ message: "Invalid product ID" });
    }

    const product = await productsService.getProductById(productId);
    if (!product) {
      res.status(404).json({ message: "Product not found" });
    }

    const reviews = reviewsService.getReviewsByProductId(productId);

    res.status(200).json({
      product,
      reviews,
    });
  } catch (error) {
    next(error);
  }
};
export default {
  createProduct,
  getProducts,
  getProductReviews,
  searchProducts,
};
