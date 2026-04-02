import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ShoppingBag, Trash2, Plus, Minus, ArrowRight, CheckCircle2 } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function CartDrawer({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
  const { cart, removeFromCart, updateQuantity, totalPrice, clearCart } = useCart();
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleCheckout = () => {
    setIsCheckingOut(true);
    // Simulate checkout
    setTimeout(() => {
      setIsCheckingOut(false);
      setIsSuccess(true);
      setTimeout(() => {
        setIsSuccess(false);
        clearCart();
        onClose();
      }, 3000);
    }, 2000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[100]"
          />
          
          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full max-w-md bg-white shadow-2xl z-[101] flex flex-col"
          >
            {/* Header */}
            <div className="p-6 border-b border-emerald-50 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <ShoppingBag className="text-emerald-600" size={24} />
                <h2 className="text-xl font-bold text-emerald-950">Your Cart</h2>
              </div>
              <button 
                onClick={onClose}
                className="p-2 hover:bg-emerald-50 rounded-full transition-colors"
              >
                <X size={24} className="text-emerald-900" />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6">
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                  <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center text-emerald-200">
                    <ShoppingBag size={40} />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-emerald-950">Your cart is empty</h3>
                    <p className="text-emerald-900/40 text-sm">Looks like you haven't added anything yet.</p>
                  </div>
                  <button 
                    onClick={onClose}
                    className="px-8 py-3 bg-emerald-600 text-white rounded-full font-bold hover:bg-emerald-700 transition-all"
                  >
                    Start Shopping
                  </button>
                </div>
              ) : (
                <div className="space-y-6">
                  {cart.map((item) => (
                    <div key={item.id} className="flex gap-4 group">
                      <div className="w-20 h-20 rounded-xl overflow-hidden shrink-0 border border-emerald-50">
                        <img 
                          src={item.image} 
                          alt={item.name} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start mb-1">
                          <h4 className="font-bold text-emerald-950 truncate pr-4">{item.name}</h4>
                          <button 
                            onClick={() => removeFromCart(item.id)}
                            className="text-emerald-200 hover:text-red-500 transition-colors"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                        <p className="text-xs text-emerald-600 font-bold mb-3">Rs. {item.price} / {item.unit}</p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3 bg-emerald-50 rounded-lg p-1">
                            <button 
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="w-6 h-6 flex items-center justify-center text-emerald-600 hover:bg-white rounded-md transition-all"
                            >
                              <Minus size={14} />
                            </button>
                            <span className="text-sm font-bold text-emerald-950 w-4 text-center">{item.quantity}</span>
                            <button 
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="w-6 h-6 flex items-center justify-center text-emerald-600 hover:bg-white rounded-md transition-all"
                            >
                              <Plus size={14} />
                            </button>
                          </div>
                          <span className="font-bold text-emerald-950">Rs. {item.price * item.quantity}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {cart.length > 0 && (
              <div className="p-6 border-t border-emerald-50 bg-emerald-50/30 space-y-4">
                <div className="flex items-center justify-between text-lg">
                  <span className="text-emerald-900/60 font-medium">Total Amount</span>
                  <span className="text-2xl font-bold text-emerald-950">Rs. {totalPrice}</span>
                </div>
                
                {isSuccess ? (
                  <div className="bg-emerald-600 text-white p-4 rounded-xl flex items-center justify-center gap-3">
                    <CheckCircle2 size={24} />
                    <span className="font-bold">Order Placed Successfully!</span>
                  </div>
                ) : (
                  <button 
                    onClick={handleCheckout}
                    disabled={isCheckingOut}
                    className="w-full py-4 bg-emerald-600 text-white rounded-xl font-bold hover:bg-emerald-700 transition-all flex items-center justify-center gap-2 shadow-lg shadow-emerald-100 disabled:opacity-70"
                  >
                    {isCheckingOut ? (
                      <>
                        <motion.div 
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                        />
                        Processing...
                      </>
                    ) : (
                      <>
                        Checkout Now
                        <ArrowRight size={20} />
                      </>
                    )}
                  </button>
                )}
                
                <p className="text-[10px] text-center text-emerald-900/40">
                  By checking out, you agree to our terms and conditions. 
                  Cash on delivery available in Hyderabad.
                </p>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
