import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { BASE_URL } from "../constants";

interface ProductType {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  imageUrl: string;
  averageRating: number;
}

interface ProductContextType {
  products: ProductType[];
  isLoading: boolean;
  query: string;
  setQuery: (query: string) => void;
  category: string;
  setCategory: (category: string) => void;
  page: number;
  setPage: (page: number) => void;
  total: number;
  limit: number;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const useProducts = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error("useProducts must be used within a ProductProvider");
  }
  return context;
};

interface ProductProviderProps {
  children: ReactNode;
}

export const ProductProvider: React.FC<ProductProviderProps> = ({
  children,
}) => {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const limit = 10;

  useEffect(() => {
    const fetchProducts = () => {
      setIsLoading(true);

      const params = new URLSearchParams();
      if (query) params.append("q", query);
      if (category && category !== "All") {
        params.append("category", category);
      }
      params.append("page", page.toString());
      params.append("limit", limit.toString());

      fetch(`${BASE_URL}/search?${params.toString()}`)
        .then((res) => res.json())
        .then((res) => {
          setProducts(res.results || []);
          setTotal(res.total || 0);
          setIsLoading(false);
        })
        .catch((err) => {
          console.error(err);
          setIsLoading(false);
        });
    };

    fetchProducts();
  }, [query, category, page]);

  const value = {
    products,
    isLoading,
    query,
    setQuery,
    category,
    setCategory,
    page,
    setPage,
    total,
    limit,
  };

  return (
    <ProductContext.Provider value={value}>{children}</ProductContext.Provider>
  );
};
