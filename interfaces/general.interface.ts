export interface ProductDetailProps {
  id: string | undefined;
  title: string;
  price: {
    currency: string;
    amount: number;
    decimals: number;
  };
  picture: string;
  condition: string;
  freeShipping?: boolean;
  soldQuantity?: number;
  description?: string;
  category?: string;
}

export interface Author {
  name: string;
  lastname: string;
}

export interface Price {
  currency: string;
  amount: number;
  decimals: number;
}

export interface Product {
  id: string;
  title: string;
  price: Price;
  picture: string;
  condition: string;
  free_shipping: boolean;
}

export interface SearchResult {
  author: Author;
  categories: BreadcrumbProps | null;
  items: Product[];
}

export interface ProductDetail {
  author: Author;
  item: Product;
}

export interface Category {
  id: string;
  name: string;
}

export interface BreadcrumbProps {
  categories: Category[];
}
