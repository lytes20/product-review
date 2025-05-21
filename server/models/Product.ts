import { v4 as uuidv4 } from "uuid";

export interface ProductProps {
  id: string;
  name: string;
  description: string;
  category: string;
  price: number;
  dateAdded: string;
  averageRating: number; // computed from reviews
}

class Product implements ProductProps {
  id: string;
  name: string;
  description: string;
  category: string;
  price: number;
  dateAdded: string;
  averageRating: number;

  constructor(
    name: string,
    description: string,
    category: string,
    price: number
  ) {
    this.id = uuidv4();
    this.name = name;
    this.description = description;
    this.category = category;
    this.price = price;
    this.dateAdded = new Date().toISOString();
    this.averageRating = 0; // to be computed from reviews
  }

  update(name: string, description: string, category: string, price: number) {
    if (name) this.name = name;
    if (description) this.description = description;
    if (category) this.category = category;
    if (price) this.price = price;
  }
}

export default Product;
