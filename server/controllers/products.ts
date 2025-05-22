import { Request, Response, NextFunction, RequestHandler } from "express";
import Product from "../models/Product";
import productsService from "../services/products";
import reviewsService from "../services/reviews";

// Helper function to compute average rating
const computeAverageRating = (productId: string): number => {
  const reviews = reviewsService.getReviewsByProductId(productId);
  if (!reviews || reviews.length === 0) return 0;

  const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
  return Number((totalRating / reviews.length).toFixed(1));
};

// Create a product
const createProduct = (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, description, category, price } = req.body;
    const product = new Product(name, description, category, price);
    // TODO:Save product to products.json file
    res.status(201).json(product);
  } catch (error) {
    next(error);
  }
};

// Read all items
const getProducts = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const products = await productsService.getAllProducts();

    // Compute average rating for each product
    const productsWithRatings = products.map((product) => {
      return {
        ...product,
        averageRating: computeAverageRating(product.id),
      };
    });

    res.status(200).json({ message: "Success", products: productsWithRatings });
  } catch (error) {
    next(error);
  }
};

const searchProducts = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { q, category, page = "1", limit = "10" } = req.query;

    const searchQuery = typeof q === "string" ? q.toLowerCase() : "";
    const filterCategory =
      typeof category === "string" ? category.toLowerCase() : null;
    const pageNumber = parseInt(page as string, 10) || 1;
    const pageSize = parseInt(limit as string, 10) || 10;

    const allProducts = await productsService.getAllProducts();
    // Compute average rating for each product
    const productsWithRatings = allProducts.map((product) => {
      return {
        ...product,
        averageRating: computeAverageRating(product.id),
      };
    });

    let filtered = productsWithRatings;

    // Search by name
    if (searchQuery) {
      filtered = filtered.filter((product) =>
        product.name.toLowerCase().includes(searchQuery)
      );
    }

    // Filter by category
    if (filterCategory) {
      filtered = filtered.filter(
        (product) => product.category.toLowerCase() === filterCategory
      );
    }

    const total = filtered.length;
    const start = (pageNumber - 1) * pageSize;
    const end = start + pageSize;

    const paginated = filtered.slice(start, end);

    res.status(200).json({
      page: pageNumber,
      limit: pageSize,
      total,
      results: paginated,
    });
  } catch (error) {
    console.error("Error in searchProducts:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getProductReviews = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
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
      product: {
        ...product,
        averageRating: computeAverageRating(productId),
      },
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
