import React from 'react';
import { motion } from 'motion/react';
import { categories } from '../data/products';
import { ArrowRight } from 'lucide-react';

interface CategorySectionProps {
  onSelectCategory: (category: string | null) => void;
  selectedCategory: string | null;
}

export default function CategorySection({ onSelectCategory, selectedCategory }: CategorySectionProps) {
  return (
    <section id="categories" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-12">
          <div>
            <span className="text-emerald-600 font-bold uppercase tracking-widest text-xs mb-3 block">Explore Our World</span>
            <h2 className="text-4xl md:text-5xl font-bold text-emerald-950">Shop by Category</h2>
          </div>
          <button 
            onClick={() => onSelectCategory(null)}
            className="hidden md:flex items-center gap-2 text-emerald-600 font-bold hover:gap-3 transition-all"
          >
            View All Categories <ArrowRight size={20} />
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              onClick={() => {
                onSelectCategory(category.name);
                document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className={cn(
                "group relative h-[400px] rounded-3xl overflow-hidden cursor-pointer transition-all duration-500",
                selectedCategory === category.name ? "ring-4 ring-emerald-600 ring-offset-4" : ""
              )}
            >
              <img 
                src={category.image} 
                alt={category.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/90 via-emerald-950/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <h3 className="text-2xl font-bold text-white mb-2">{category.name}</h3>
                <p className="text-emerald-100/80 text-sm mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {category.description}
                </p>
                <div className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white group-hover:bg-emerald-600 transition-colors">
                  <ArrowRight size={20} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

import { cn } from '../lib/utils';
