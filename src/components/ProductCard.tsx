import React from 'react';
import { motion } from 'motion/react';
import { ShoppingCart, Plus, Star } from 'lucide-react';
import { Product } from '../types';
import { useCart } from '../context/CartContext';

export interface ProductCardProps {
  product: Product;
  onClick: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onClick }) => {
  const { addToCart } = useCart();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      onClick={() => onClick(product)}
      className="group bg-white rounded-2xl overflow-hidden border border-emerald-50 hover:shadow-xl transition-all duration-300 cursor-pointer"
    >
      <div className="relative aspect-square overflow-hidden">
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          referrerPolicy="no-referrer"
        />
        <div className="absolute top-3 left-3">
          <span className="px-2 py-1 bg-white/90 backdrop-blur-sm text-emerald-700 text-[10px] font-bold uppercase tracking-wider rounded-md border border-emerald-100">
            {product.category}
          </span>
        </div>
        <button 
          onClick={(e) => {
            e.stopPropagation();
            addToCart(product);
          }}
          className="absolute bottom-3 right-3 w-10 h-10 bg-emerald-600 text-white rounded-full flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-300"
        >
          <Plus size={20} />
        </button>
      </div>
      
      <div className="p-5">
        <div className="flex items-center gap-1 mb-2">
          {[...Array(5)].map((_, i) => (
            <Star key={i} size={12} className="fill-amber-400 text-amber-400" />
          ))}
          <span className="text-[10px] text-emerald-900/50 ml-1">(4.9)</span>
        </div>
        
        <h3 className="text-lg font-bold text-emerald-950 mb-1 group-hover:text-emerald-600 transition-colors">
          {product.name}
        </h3>
        <p className="text-sm text-emerald-900/60 line-clamp-2 mb-4 h-10">
          {product.description}
        </p>
        
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-xs text-emerald-600 font-bold uppercase tracking-tighter">Price</span>
            <span className="text-xl font-bold text-emerald-950">
              Rs. {product.price} <span className="text-sm font-normal text-emerald-900/40">/ {product.unit}</span>
            </span>
          </div>
          <button 
            onClick={(e) => {
              e.stopPropagation();
              addToCart(product);
            }}
            className="p-2 text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"
          >
            <ShoppingCart size={20} />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
