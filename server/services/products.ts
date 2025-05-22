import { promises as fs } from "fs";
import path from "path";
import Product from "../models/Product";

const PRODUCTS_FILE = path.join(__dirname, "../data/products.json");

const getAllProducts = async (): Promise<Product[]> => {
  try {
    const data = await fs.readFile(PRODUCTS_FILE, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    throw new Error("Can not read the file");
  }
};

// get product by id
export const getProductById = async (productId: string) => {
  try {
    const data = await fs.readFile(PRODUCTS_FILE, "utf-8");
    const products: Product[] = JSON.parse(data);
    return products.find((p) => p.id === productId);
  } catch (error) {
    console.error("Failed to read products file:", error);
    throw new Error("Unable to fetch product data.");
  }
};
const saveAllProducts = async (products: Product[]) => {
  await fs.writeFile(PRODUCTS_FILE, JSON.stringify(products, null, 2), "utf-8");
};
const addProduct = async (product: Product): Promise<Product> => {
  const products = await getAllProducts();
  products.push(product);
  await saveAllProducts(products);
  return product;
};

export default { getAllProducts, addProduct, getProductById };
