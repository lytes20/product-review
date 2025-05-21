import { v4 as uuidv4 } from "uuid";

export interface ReviewProps {
  id: string;
  productId: string;
  author: string;
  rating: number; // 1 to 5
  comment: string;
  date: string;
}

export class Review implements ReviewProps {
  id: string;
  productId: string;
  author: string;
  rating: number;
  comment: string;
  date: string;

  constructor(
    productId: string,
    author: string,
    rating: number,
    comment: string
  ) {
    this.id = uuidv4();
    this.productId = productId;
    this.author = author;
    this.rating = rating;
    this.comment = comment;
    this.date = new Date().toISOString();
  }

  update(author: string, rating: number, comment: string) {
    if (author) this.author = author;
    if (rating) this.rating = rating;
    if (comment) this.comment = comment;
  }
}
