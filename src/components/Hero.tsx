import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Leaf, ShieldCheck, Sparkles } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-[#fdfcf8]">
      {/* Background Elements */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-emerald-50/50 -skew-x-12 translate-x-1/4 z-0" />
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-emerald-100/30 rounded-full blur-3xl z-0" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 text-xs font-bold uppercase tracking-wider mb-6">
              <Sparkles size={14} />
              <span>Authentic Traditional Remedies</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold text-emerald-950 leading-[1.1] mb-6">
              Healing Through <br />
              <span className="text-emerald-600 italic font-serif">Nature's Wisdom</span>
            </h1>
            
            <p className="text-lg text-emerald-900/70 mb-10 max-w-lg leading-relaxed">
              Discover the power of traditional herbs, pure spices, and natural medicines. 
              Trust Rameez Pansar for quality that has been passed down through generations.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <button className="px-8 py-4 bg-emerald-600 text-white rounded-full font-bold hover:bg-emerald-700 transition-all flex items-center gap-2 shadow-lg shadow-emerald-200">
                Shop Products
                <ArrowRight size={20} />
              </button>
              <button className="px-8 py-4 bg-white text-emerald-900 border-2 border-emerald-100 rounded-full font-bold hover:border-emerald-600 transition-all">
                Book Consultation
              </button>
            </div>
            
            <div className="mt-12 grid grid-cols-3 gap-8">
              <div className="flex flex-col gap-1">
                <span className="text-2xl font-bold text-emerald-900">100%</span>
                <span className="text-xs text-emerald-600 uppercase tracking-wider font-bold">Organic</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-2xl font-bold text-emerald-900">500+</span>
                <span className="text-xs text-emerald-600 uppercase tracking-wider font-bold">Herbs</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-2xl font-bold text-emerald-900">25Y+</span>
                <span className="text-xs text-emerald-600 uppercase tracking-wider font-bold">Experience</span>
              </div>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="relative"
          >
            <div className="relative z-10 rounded-3xl overflow-hidden shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1540331547168-8b63109225b7?auto=format&fit=crop&q=80&w=1000" 
                alt="Traditional Herbs"
                className="w-full h-[600px] object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/40 to-transparent" />
            </div>
            
            {/* Floating Cards */}
            <motion.div 
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-6 -right-6 bg-white p-4 rounded-2xl shadow-xl z-20 flex items-center gap-4 border border-emerald-50"
            >
              <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center text-amber-600">
                <ShieldCheck size={24} />
              </div>
              <div>
                <p className="text-sm font-bold text-emerald-950">Certified Quality</p>
                <p className="text-xs text-emerald-600">Lab Tested Products</p>
              </div>
            </motion.div>
            
            <motion.div 
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute -bottom-6 -left-6 bg-white p-4 rounded-2xl shadow-xl z-20 flex items-center gap-4 border border-emerald-50"
            >
              <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center text-emerald-600">
                <Leaf size={24} />
              </div>
              <div>
                <p className="text-sm font-bold text-emerald-950">Pure Sidr Honey</p>
                <p className="text-xs text-emerald-600">Fresh from Farms</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
