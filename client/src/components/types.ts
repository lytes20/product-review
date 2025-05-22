// types.ts
export interface Review {
  id: string;
  productId: string;
  author: string;
  rating: number;
  comment: string;
  date: string;
}

export interface ProductType {
  id: number;
  name?: string;
  category: string;
  price: number;
  imageUrl: string;
  description: string;
  averageRating: number; // average rating from 1–5
}
