import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  LayoutDashboard, 
  Package, 
  ShoppingBag, 
  Settings, 
  Plus, 
  Search, 
  Edit2, 
  Trash2, 
  Save, 
  X, 
  Upload, 
  CheckCircle2, 
  AlertCircle,
  Database,
  LogOut
} from 'lucide-react';
import { db, handleFirestoreError, OperationType } from '../firebase';
import { 
  collection, 
  getDocs, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc, 
  serverTimestamp, 
  query, 
  orderBy 
} from 'firebase/firestore';
import { products as staticProducts, categories as staticCategories } from '../data/products';
import { Product, Category } from '../types';
import { useAuth } from '../hooks/useAuth';

export default function AdminDashboard() {
  const { user, profile, isAdmin, loading, logOut } = useAuth();
  const [activeTab, setActiveTab] = useState<'products' | 'orders' | 'settings'>('products');
  const [products, setProducts] = useState<Product[]>([]);
  const [isEditing, setIsEditing] = useState<Product | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [status, setStatus] = useState<{ type: 'success' | 'error', message: string } | null>(null);

  useEffect(() => {
    if (isAdmin) {
      fetchProducts();
    }
  }, [isAdmin]);

  const fetchProducts = async () => {
    try {
      const q = query(collection(db, 'products'), orderBy('name'));
      const querySnapshot = await getDocs(q);
      const fetchedProducts = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Product[];
      setProducts(fetchedProducts);
    } catch (error) {
      handleFirestoreError(error, OperationType.LIST, 'products');
    }
  };

  const migrateData = async () => {
    if (!window.confirm('This will migrate all static products to Firestore. Continue?')) return;
    
    try {
      const productsRef = collection(db, 'products');
      for (const product of staticProducts) {
        const { id, ...productData } = product;
        await addDoc(productsRef, {
          ...productData,
          updatedAt: serverTimestamp()
        });
      }
      setStatus({ type: 'success', message: 'Data migrated successfully!' });
      fetchProducts();
    } catch (error) {
      setStatus({ type: 'error', message: 'Migration failed: ' + (error as Error).message });
    }
  };

  const handleSaveProduct = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const productData = {
      name: formData.get('name') as string,
      category: formData.get('category') as any,
      price: Number(formData.get('price')),
      unit: formData.get('unit') as string,
      description: formData.get('description') as string,
      image: formData.get('image') as string,
      benefits: (formData.get('benefits') as string).split(',').map(b => b.trim()),
      updatedAt: serverTimestamp()
    };

    try {
      if (isEditing) {
        await updateDoc(doc(db, 'products', isEditing.id), productData);
        setStatus({ type: 'success', message: 'Product updated successfully!' });
      } else {
        await addDoc(collection(db, 'products'), productData);
        setStatus({ type: 'success', message: 'Product added successfully!' });
      }
      setIsEditing(null);
      setIsAdding(false);
      fetchProducts();
    } catch (error) {
      setStatus({ type: 'error', message: 'Failed to save product: ' + (error as Error).message });
    }
  };

  const handleDeleteProduct = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this product?')) return;
    try {
      await deleteDoc(doc(db, 'products', id));
      setStatus({ type: 'success', message: 'Product deleted successfully!' });
      fetchProducts();
    } catch (error) {
      setStatus({ type: 'error', message: 'Failed to delete product: ' + (error as Error).message });
    }
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  if (!isAdmin) return <div className="min-h-screen flex items-center justify-center text-red-600 font-bold">Access Denied. Admins Only.</div>;

  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    p.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-emerald-50/30 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-emerald-950 text-white p-6 flex flex-col">
        <div className="flex items-center gap-3 mb-12">
          <div className="w-10 h-10 bg-emerald-600 rounded-xl flex items-center justify-center">
            <LayoutDashboard size={24} />
          </div>
          <span className="text-xl font-bold">Admin Panel</span>
        </div>

        <nav className="flex-1 space-y-2">
          <button 
            onClick={() => setActiveTab('products')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'products' ? 'bg-emerald-600 text-white' : 'text-emerald-100/60 hover:bg-white/10'}`}
          >
            <Package size={20} />
            Products
          </button>
          <button 
            onClick={() => setActiveTab('orders')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'orders' ? 'bg-emerald-600 text-white' : 'text-emerald-100/60 hover:bg-white/10'}`}
          >
            <ShoppingBag size={20} />
            Orders
          </button>
          <button 
            onClick={() => setActiveTab('settings')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'settings' ? 'bg-emerald-600 text-white' : 'text-emerald-100/60 hover:bg-white/10'}`}
          >
            <Settings size={20} />
            Settings
          </button>
        </nav>

        <div className="pt-6 border-t border-white/10">
          <div className="flex items-center gap-3 mb-4 px-4">
            <div className="w-8 h-8 bg-emerald-800 rounded-full flex items-center justify-center text-xs font-bold">
              {profile?.email[0].toUpperCase()}
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-bold truncate w-32">{profile?.email}</span>
              <span className="text-[10px] text-emerald-400 uppercase tracking-widest">Administrator</span>
            </div>
          </div>
          <button 
            onClick={() => logOut()}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-400 hover:bg-red-400/10 transition-all"
          >
            <LogOut size={20} />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-y-auto">
        <header className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-emerald-950">
              {activeTab === 'products' && 'Product Management'}
              {activeTab === 'orders' && 'Order Management'}
              {activeTab === 'settings' && 'Store Settings'}
            </h1>
            <p className="text-emerald-900/60">Welcome back, {profile?.email}</p>
          </div>
          
          {activeTab === 'products' && (
            <div className="flex gap-4">
              {products.length === 0 && (
                <button 
                  onClick={migrateData}
                  className="flex items-center gap-2 px-6 py-3 bg-amber-600 text-white rounded-xl font-bold hover:bg-amber-700 transition-all shadow-lg shadow-amber-100"
                >
                  <Database size={20} />
                  Migrate Static Data
                </button>
              )}
              <button 
                onClick={() => setIsAdding(true)}
                className="flex items-center gap-2 px-6 py-3 bg-emerald-600 text-white rounded-xl font-bold hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-100"
              >
                <Plus size={20} />
                Add New Product
              </button>
            </div>
          )}
        </header>

        {status && (
          <div className={`mb-6 p-4 rounded-xl flex items-center gap-3 ${status.type === 'success' ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'}`}>
            {status.type === 'success' ? <CheckCircle2 size={20} /> : <AlertCircle size={20} />}
            <span className="font-medium">{status.message}</span>
            <button onClick={() => setStatus(null)} className="ml-auto"><X size={16} /></button>
          </div>
        )}

        {activeTab === 'products' && (
          <div className="bg-white rounded-3xl shadow-sm border border-emerald-100 overflow-hidden">
            <div className="p-6 border-b border-emerald-50 flex items-center gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-emerald-900/30" size={20} />
                <input 
                  type="text" 
                  placeholder="Search products by name or category..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-emerald-50/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-600/20 transition-all"
                />
              </div>
              <div className="text-sm text-emerald-900/40 font-medium">
                Showing {filteredProducts.length} products
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-emerald-50/50 text-emerald-900/60 text-xs font-bold uppercase tracking-widest">
                  <tr>
                    <th className="px-6 py-4">Product</th>
                    <th className="px-6 py-4">Category</th>
                    <th className="px-6 py-4">Price</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-emerald-50">
                  {filteredProducts.map((product) => (
                    <tr key={product.id} className="hover:bg-emerald-50/30 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-4">
                          <img 
                            src={product.image} 
                            alt={product.name}
                            className="w-12 h-12 rounded-lg object-cover"
                            referrerPolicy="no-referrer"
                          />
                          <div>
                            <div className="font-bold text-emerald-950">{product.name}</div>
                            <div className="text-xs text-emerald-900/40 truncate w-48">{product.description}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="px-3 py-1 bg-emerald-100 text-emerald-700 text-[10px] font-bold uppercase tracking-wider rounded-full">
                          {product.category}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="font-bold text-emerald-950">Rs. {product.price}</div>
                        <div className="text-[10px] text-emerald-900/40">per {product.unit}</div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="flex items-center gap-1.5 text-emerald-600 text-xs font-bold">
                          <div className="w-1.5 h-1.5 bg-emerald-600 rounded-full" />
                          In Stock
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button 
                            onClick={() => setIsEditing(product)}
                            className="p-2 text-emerald-600 hover:bg-emerald-100 rounded-lg transition-colors"
                          >
                            <Edit2 size={18} />
                          </button>
                          <button 
                            onClick={() => handleDeleteProduct(product.id)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>

      {/* Product Edit/Add Modal */}
      <AnimatePresence>
        {(isEditing || isAdding) && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => { setIsEditing(null); setIsAdding(false); }}
              className="fixed inset-0 bg-emerald-950/60 backdrop-blur-sm z-[200]"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="fixed inset-4 md:inset-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-full md:max-w-2xl bg-white rounded-3xl shadow-2xl z-[201] overflow-hidden"
            >
              <div className="p-6 border-b border-emerald-50 flex items-center justify-between">
                <h2 className="text-2xl font-bold text-emerald-950">
                  {isEditing ? 'Edit Product' : 'Add New Product'}
                </h2>
                <button onClick={() => { setIsEditing(null); setIsAdding(false); }} className="p-2 hover:bg-emerald-50 rounded-full">
                  <X size={24} />
                </button>
              </div>

              <form onSubmit={handleSaveProduct} className="p-8 space-y-6 overflow-y-auto max-h-[70vh]">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-emerald-900/60 uppercase tracking-widest">Product Name</label>
                    <input 
                      name="name"
                      defaultValue={isEditing?.name}
                      required
                      className="w-full px-4 py-3 bg-emerald-50/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-600/20 transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-emerald-900/60 uppercase tracking-widest">Category</label>
                    <select 
                      name="category"
                      defaultValue={isEditing?.category}
                      required
                      className="w-full px-4 py-3 bg-emerald-50/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-600/20 transition-all"
                    >
                      {['Herbs', 'Spices', 'Oils', 'Medicines', 'Honey', 'Sharbat', 'Pakki'].map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-emerald-900/60 uppercase tracking-widest">Price (Rs.)</label>
                    <input 
                      name="price"
                      type="number"
                      defaultValue={isEditing?.price}
                      required
                      className="w-full px-4 py-3 bg-emerald-50/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-600/20 transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-emerald-900/60 uppercase tracking-widest">Unit (e.g. kg, 100g)</label>
                    <input 
                      name="unit"
                      defaultValue={isEditing?.unit}
                      required
                      className="w-full px-4 py-3 bg-emerald-50/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-600/20 transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-emerald-900/60 uppercase tracking-widest">Description</label>
                  <textarea 
                    name="description"
                    defaultValue={isEditing?.description}
                    required
                    rows={3}
                    className="w-full px-4 py-3 bg-emerald-50/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-600/20 transition-all"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-emerald-900/60 uppercase tracking-widest">Image URL</label>
                  <input 
                    name="image"
                    defaultValue={isEditing?.image}
                    required
                    className="w-full px-4 py-3 bg-emerald-50/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-600/20 transition-all"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-emerald-900/60 uppercase tracking-widest">Benefits (comma separated)</label>
                  <input 
                    name="benefits"
                    defaultValue={isEditing?.benefits.join(', ')}
                    placeholder="Benefit 1, Benefit 2, Benefit 3"
                    className="w-full px-4 py-3 bg-emerald-50/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-600/20 transition-all"
                  />
                </div>

                <div className="pt-6 flex gap-4">
                  <button 
                    type="button"
                    onClick={() => { setIsEditing(null); setIsAdding(false); }}
                    className="flex-1 px-6 py-4 border border-emerald-100 text-emerald-900 font-bold rounded-2xl hover:bg-emerald-50 transition-all"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit"
                    className="flex-1 px-6 py-4 bg-emerald-600 text-white font-bold rounded-2xl hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-100 flex items-center justify-center gap-2"
                  >
                    <Save size={20} />
                    {isEditing ? 'Update Product' : 'Save Product'}
                  </button>
                </div>
              </form>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
