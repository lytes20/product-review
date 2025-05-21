import { Request, Response, NextFunction } from "express";
import Product from "../models/Product";
import productsService from "../services/products";

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
    console.log("products -->", products);
    res.status(200).json({ message: "Success", products });
  } catch (error) {
    console.log("get some -->", error);
    next(error);
  }
};

export default { createProduct, getProducts };
