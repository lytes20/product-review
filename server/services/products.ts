import { promises as fs } from "fs";
import path from "path";
import Product from "../models/Product";

const PRODUCTS_FILE = path.join(__dirname, "../data/product.json");

const getAllProducts = async (): Promise<Product[]> => {
  console.log("I get called");
  try {
    const data = await fs.readFile(PRODUCTS_FILE, "utf-8");
    console.log("data -->", data);
    return JSON.parse(data);
  } catch (error) {
    console.log("error -->", error);
    throw new Error("Can not read the file");
    return [];
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

export default { getAllProducts, addProduct };
