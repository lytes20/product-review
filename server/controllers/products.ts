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

    let filtered = allProducts;

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
