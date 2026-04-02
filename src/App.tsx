import React, { useState, useMemo, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import CategorySection from './components/CategorySection';
import ProductCard from './components/ProductCard';
import ConsultationForm from './components/ConsultationForm';
import Footer from './components/Footer';
import HakeemAI from './components/HakeemAI';
import CartDrawer from './components/CartDrawer';
import ProductDetailModal from './components/ProductDetailModal';
import AdminDashboard from './components/AdminDashboard';
import { products as staticProducts } from './data/products';
import { Sparkles, ArrowRight, FilterX, X } from 'lucide-react';
import { Product } from './types';
import { db } from './firebase';
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';

export default function App() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [products, setProducts] = useState<Product[]>(staticProducts);

  useEffect(() => {
    const q = query(collection(db, 'products'), orderBy('name'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      if (!snapshot.empty) {
        const fetchedProducts = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as Product[];
        setProducts(fetchedProducts);
      }
    }, (error) => {
      console.error("Error fetching products from Firestore:", error);
    });

    return () => unsubscribe();
  }, []);

  const filteredProducts = useMemo(() => {
    if (!selectedCategory) return products;
    return products.filter(p => p.category === selectedCategory);
  }, [selectedCategory, products]);

  if (isAdminOpen) {
    return (
      <div className="relative">
        <button 
          onClick={() => setIsAdminOpen(false)}
          className="fixed top-4 right-4 z-[300] px-4 py-2 bg-emerald-950 text-white rounded-xl font-bold flex items-center gap-2 shadow-xl"
        >
          <X size={20} />
          Exit Admin
        </button>
        <AdminDashboard />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fdfcf8] font-sans selection:bg-emerald-100 selection:text-emerald-900">
      <Header 
        onOpenCart={() => setIsCartOpen(true)} 
        onOpenAdmin={() => setIsAdminOpen(true)}
      />
      
      <main>
        <Hero />
        
        <CategorySection 
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />
        
        {/* Featured Products */}
        <section id="products" className="py-24 bg-emerald-50/30 min-h-[600px]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 text-[10px] font-bold uppercase tracking-wider mb-4">
                  <Sparkles size={12} />
                  <span>{selectedCategory ? `Category: ${selectedCategory}` : 'Handpicked for You'}</span>
                </div>
                <h2 className="text-4xl md:text-5xl font-bold text-emerald-950">
                  {selectedCategory ? `${selectedCategory} Collection` : 'Featured Products'}
                </h2>
              </div>
              <div className="flex gap-4">
                {selectedCategory && (
                  <button 
                    onClick={() => setSelectedCategory(null)}
                    className="px-6 py-2 rounded-full border border-red-200 text-red-600 font-bold hover:bg-red-50 transition-all flex items-center gap-2"
                  >
                    <FilterX size={18} />
                    Clear Filter
                  </button>
                )}
                <button className="px-6 py-2 rounded-full border border-emerald-200 text-emerald-900 font-bold hover:border-emerald-600 transition-all">
                  All Products
                </button>
              </div>
            </div>
            
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {filteredProducts.map((product) => (
                  <ProductCard 
                    key={product.id} 
                    product={product} 
                    onClick={setSelectedProduct}
                  />
                ))}
              </div>
            ) : (
              <div className="py-20 text-center">
                <p className="text-emerald-900/40 text-lg">No products found in this category.</p>
                <button 
                  onClick={() => setSelectedCategory(null)}
                  className="mt-4 text-emerald-600 font-bold underline"
                >
                  View all products
                </button>
              </div>
            )}
          </div>
        </section>
        
        {/* About Section / Traditional Wisdom */}
        <section className="py-24 bg-white overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div className="relative">
                <div className="absolute -top-10 -left-10 w-40 h-40 bg-emerald-100 rounded-full blur-3xl opacity-50" />
                <img 
                  src="https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=1000" 
                  alt="Herbal Preparation"
                  className="rounded-3xl shadow-2xl relative z-10 w-full h-[500px] object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute -bottom-6 -right-6 bg-emerald-600 text-white p-8 rounded-2xl shadow-xl z-20 max-w-[240px]">
                  <p className="text-3xl font-bold mb-1">25+</p>
                  <p className="text-sm font-medium opacity-80">Years of trust in traditional healing</p>
                </div>
              </div>
              
              <div>
                <span className="text-emerald-600 font-bold uppercase tracking-widest text-xs mb-3 block">Our Heritage</span>
                <h2 className="text-4xl md:text-5xl font-bold text-emerald-950 mb-8 leading-tight">
                  Preserving the Art of <br />
                  <span className="text-emerald-600 italic font-serif">Traditional Healing</span>
                </h2>
                <p className="text-emerald-900/60 text-lg mb-8 leading-relaxed">
                  At Rameez Pansar, we believe that nature holds the key to true wellness. 
                  Our journey began over two decades ago with a simple mission: to bring 
                  authentic, pure, and effective traditional remedies to our community.
                </p>
                <div className="grid grid-cols-2 gap-8 mb-10">
                  <div className="space-y-2">
                    <h4 className="font-bold text-emerald-950">Ethically Sourced</h4>
                    <p className="text-sm text-emerald-900/60">We work directly with farmers to ensure the highest quality herbs and spices.</p>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-bold text-emerald-950">Expert Guidance</h4>
                    <p className="text-sm text-emerald-900/60">Our Hakeems are certified experts in Unani and Ayurvedic medicine.</p>
                  </div>
                </div>
                <button className="text-emerald-600 font-bold flex items-center gap-2 group">
                  Learn More About Our Story 
                  <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          </div>
        </section>
        
        <ConsultationForm />
      </main>
      
      <Footer />
      <HakeemAI />
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
      <ProductDetailModal 
        product={selectedProduct} 
        onClose={() => setSelectedProduct(null)} 
      />
    </div>
  );
}
