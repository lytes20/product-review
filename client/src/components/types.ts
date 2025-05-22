// types.ts
export interface Review {
  id: number;
  productId: number;
  author: string;
  rating: number;
  comment: string;
  date: string;
}

export interface ProductType {
  id: number;
  title: string;
  name?: string;
  category: string;
  price: number;
  imageUrl: string;
  description: string;
  averageRating: number; // average rating from 1–5
}
