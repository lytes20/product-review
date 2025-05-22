const BACKEND_PORT = import.meta.env.VITE_BACKEND_PORT || "3030";

export const BASE_URLS = {
  DEVELOPMENT: "https://product-review-6nbx.onrender.com/api/products",
  LOCAL: `http://localhost:${BACKEND_PORT}/api/products`,
};

export const BASE_URL =
  BASE_URLS[import.meta.env.VITE_ENV as keyof typeof BASE_URLS];
