import { Router } from "express";
import productController from "../controllers/products";

const router = Router();

// GET /products: Fetch all products in pages of 10, sorted by dateAdded (desc).
// Accepts optional page, category query strings.
// GET /products/search?q=: Return products whose names match query.
router.get("/", productController.getProducts);
router.post("/", productController.createProduct);
router.get("/search", productController.createProduct);

// Reviews
router.get("/:id/reviews", productController.createProduct); // Fetch all reviews for a product.
router.post("/:id/reviews", productController.createProduct); // POST /products/:id/reviews
router.put("/:productId/reviews/:id", productController.createProduct); // PUT /products/:productId/reviews/:id
router.delete("/:productId/reviews/:id", productController.createProduct); // DELETE /products/:productId/reviews/:id

export default router;
