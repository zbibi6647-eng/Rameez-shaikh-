export interface Product {
  id: string;
  name: string;
  category: 'Herbs' | 'Spices' | 'Oils' | 'Medicines' | 'Honey' | 'Sharbat' | 'Pakki';
  description: string;
  price: number;
  unit: string;
  image: string;
  benefits: string[];
}

export interface Category {
  id: string;
  name: string;
  image: string;
  description: string;
}
