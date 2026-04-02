import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ShoppingCart, Star, CheckCircle2, ShieldCheck } from 'lucide-react';
import { Product } from '../types';
import { useCart } from '../context/CartContext';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
}

export default function ProductDetailModal({ product, onClose }: ProductDetailModalProps) {
  const { addToCart } = useCart();

  if (!product) return null;

  return (
    <AnimatePresence>
      {product && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[150]"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed inset-4 md:inset-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-full md:max-w-4xl bg-white rounded-3xl shadow-2xl z-[151] overflow-hidden flex flex-col md:flex-row"
          >
            <button 
              onClick={onClose}
              className="absolute top-4 right-4 p-2 bg-white/80 backdrop-blur-md rounded-full text-emerald-950 hover:bg-emerald-50 z-10 shadow-sm"
            >
              <X size={24} />
            </button>

            {/* Image Section */}
            <div className="md:w-1/2 h-64 md:h-auto relative">
              <img 
                src={product.image} 
                alt={product.name}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-4 left-4">
                <span className="px-3 py-1 bg-emerald-600 text-white text-xs font-bold uppercase tracking-wider rounded-full">
                  {product.category}
                </span>
              </div>
            </div>

            {/* Content Section */}
            <div className="md:w-1/2 p-8 md:p-12 overflow-y-auto max-h-[70vh] md:max-h-none">
              <div className="flex items-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} className="fill-amber-400 text-amber-400" />
                ))}
                <span className="text-sm text-emerald-900/50 ml-2">(120+ Reviews)</span>
              </div>

              <h2 className="text-3xl font-bold text-emerald-950 mb-4">{product.name}</h2>
              <p className="text-emerald-900/60 leading-relaxed mb-8">
                {product.description}
              </p>

              <div className="bg-emerald-50 rounded-2xl p-6 mb-8">
                <h4 className="text-emerald-900 font-bold mb-4 flex items-center gap-2">
                  <ShieldCheck size={20} className="text-emerald-600" />
                  Key Benefits
                </h4>
                <div className="grid grid-cols-1 gap-3">
                  {product.benefits.map((benefit, i) => (
                    <div key={i} className="flex items-center gap-3 text-sm text-emerald-900/70">
                      <CheckCircle2 size={16} className="text-emerald-500 shrink-0" />
                      {benefit}
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex items-end justify-between gap-6">
                <div className="flex flex-col">
                  <span className="text-xs text-emerald-600 font-bold uppercase tracking-widest mb-1">Price</span>
                  <span className="text-3xl font-bold text-emerald-950">
                    Rs. {product.price} <span className="text-lg font-normal text-emerald-900/40">/ {product.unit}</span>
                  </span>
                </div>
                <button 
                  onClick={() => {
                    addToCart(product);
                    onClose();
                  }}
                  className="px-8 py-4 bg-emerald-600 text-white rounded-2xl font-bold hover:bg-emerald-700 transition-all flex items-center gap-3 shadow-lg shadow-emerald-100"
                >
                  <ShoppingCart size={20} />
                  Add to Cart
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
