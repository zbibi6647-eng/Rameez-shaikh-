import React, { useState, useEffect } from 'react';
import { ShoppingCart, Search, Menu, X, Leaf, Phone, MapPin, User, LogIn, LayoutDashboard } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';
import { useCart } from '../context/CartContext';
import { useAuth } from '../hooks/useAuth';

export default function Header({ onOpenCart, onOpenAdmin }: { onOpenCart: () => void, onOpenAdmin: () => void }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { totalItems } = useCart();
  const { user, isAdmin, signInWithGoogle, loading: authLoading } = useAuth();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#' },
    { name: 'Products', href: '#products' },
    { name: 'Categories', href: '#categories' },
    { name: 'Consultation', href: '#consultation' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <header 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled ? "bg-white/95 backdrop-blur-md shadow-md py-2" : "bg-white/50 backdrop-blur-sm py-4"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-emerald-600 rounded-full flex items-center justify-center text-white shadow-lg shadow-emerald-100">
              <Leaf size={24} />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight text-emerald-950">
                Rameez
              </h1>
              <p className="text-[10px] uppercase tracking-[0.2em] text-emerald-600 font-semibold leading-none">
                Pansar & Dawakhana
              </p>
            </div>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-sm font-bold text-emerald-900/70 hover:text-emerald-600 transition-colors uppercase tracking-wider"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2 sm:gap-4">
            {authLoading ? (
              <div className="w-6 h-6 border-2 border-emerald-600 border-t-transparent rounded-full animate-spin" />
            ) : !user ? (
              <button 
                onClick={() => signInWithGoogle()}
                className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-full transition-all hover:bg-emerald-700 shadow-lg shadow-emerald-100"
              >
                <LogIn size={18} />
                <span className="text-sm font-bold hidden sm:inline">Admin Login</span>
              </button>
            ) : isAdmin ? (
              <button 
                onClick={onOpenAdmin}
                className="flex items-center gap-2 px-4 py-2 bg-amber-500 text-white rounded-full text-sm font-bold hover:bg-amber-600 transition-all shadow-lg shadow-amber-100"
              >
                <LayoutDashboard size={18} />
                <span>Dashboard</span>
              </button>
            ) : (
              <div className="flex items-center gap-2 px-3 py-1.5 bg-emerald-50 text-emerald-700 rounded-full border border-emerald-100">
                <div className="w-6 h-6 bg-emerald-600 text-white rounded-full flex items-center justify-center text-xs font-bold">
                  {user.email?.[0].toUpperCase()}
                </div>
                <span className="text-xs font-bold hidden sm:inline">{user.email?.split('@')[0]}</span>
              </div>
            )}

            <div className="h-8 w-[1px] bg-emerald-100 mx-1 hidden sm:block" />

            <button className="p-2 text-emerald-900 hover:bg-emerald-50 rounded-full transition-colors">
              <Search size={20} />
            </button>
            
            <button 
              onClick={onOpenCart}
              className="p-2 text-emerald-900 hover:bg-emerald-50 rounded-full transition-colors relative"
            >
              <ShoppingCart size={20} />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-emerald-600 text-white text-[10px] flex items-center justify-center rounded-full border-2 border-white">
                  {totalItems}
                </span>
              )}
            </button>
            <button 
              className="md:hidden p-2 text-emerald-900 hover:bg-emerald-50 rounded-full"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t border-emerald-100 overflow-hidden"
          >
            <div className="px-4 py-6 space-y-4">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="block text-lg font-medium text-emerald-900 hover:text-emerald-600"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.name}
                </a>
              ))}
              <div className="pt-4 border-t border-emerald-50 space-y-3">
                <div className="flex items-center gap-3 text-emerald-700">
                  <Phone size={18} />
                  <span className="text-sm">03273470385</span>
                </div>
                <div className="flex items-center gap-3 text-emerald-700">
                  <MapPin size={18} />
                  <span className="text-sm">Hyderabad latifabad no 7 mazdor chock Haseen plaza dukan no 12</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
