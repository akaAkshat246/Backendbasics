export interface Product {
  id: string;
  name: string;
  brand: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewsCount: number;
  image: string;
  additionalImages?: string[];
  category: 'Wardrobe' | 'Home' | 'Gifts' | 'Apothecary' | 'Outerwear' | 'Footwear';
  badges?: string[];
  inStock: boolean;
  provenance: string;
  description: string;
  dimensions?: string;
  materials?: string;
  artisanName?: string;
  artisanLocation?: string;
}

export interface Department {
  id: string;
  name: string;
  itemCount: number;
  image: string;
  slug: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedSize?: string;
}

export interface Hotspot {
  id: string;
  x: number; // percentage
  y: number; // percentage
  title: string;
  subtitle: string;
  price: number;
  image: string;
  productId: string;
}

export type CategoryFilter = 'All Objects' | 'Wardrobe' | 'Home' | 'Gifts';
