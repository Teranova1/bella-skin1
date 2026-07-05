'use client';

import { useEffect, useMemo, useState } from 'react';
import { saveAdminSession, loadAdminSession, loadAdminUsers, saveAdminUsers } from '@/lib/admin-storage';
import { AdminUser, Product } from '@/lib/types';
import { CheckCircle2, Eye, EyeOff, LogOut, Plus, Package, Shield, Trash2, ToggleLeft, ToggleRight, X } from 'lucide-react';

interface AdminPanelProps {
  products: Product[];
  onAddProduct: (product: Omit<Product, 'id'>) => void;
  onToggleStock: (productId: string) => void;
  onDeleteProduct: (productId: string) => void;
  onExit: () => void;
}

const categories = ['Hydration', 'Brightening', 'Renewal', 'Soothing', 'Cleansing', 'Sun Care'];

type AuthMode = 'login' | 'signup';

export default function AdminPanel({ products, onAddProduct, onToggleStock, onDeleteProduct, onExit }: AdminPanelProps) {
  const [authMode, setAuthMode] = useState<AuthMode>('login');
  const [sessionUser, setSessionUser] = useState<AdminUser | null>(null);
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [showPassword, setShowPassword] = useState(false);
  const [authError, setAuthError] = useState('');
  const [authSuccess, setAuthSuccess] = useState('');
  const [productSuccess, setProductSuccess] = useState('');

  const [authForm, setAuthForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [productForm, setProductForm] = useState({
    name: '',
    price: '',
    description: '',
    category: 'Hydration',
    image: '',
    inStock: true,
  });

  useEffect(() => {
    const storedUsers = loadAdminUsers();
    const storedSession = loadAdminSession();

    setUsers(storedUsers);
    setSessionUser(storedSession);
  }, []);

  const stats = useMemo(() => {
    const inStockCount = products.filter((product) => product.inStock).length;
    const outOfStockCount = products.length - inStockCount;

    return { total: products.length, inStockCount, outOfStockCount };
  }, [products]);

  const handleAuthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAuthForm((current) => ({ ...current, [name]: value }));
  };

  const handleProductChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const { name, value, type } = e.target;

    setProductForm((current) => ({
      ...current,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const resetMessages = () => {
    setAuthError('');
    setAuthSuccess('');
    setProductSuccess('');
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    resetMessages();

    const matchedUser = users.find(
      (user) => user.email.toLowerCase() === authForm.email.toLowerCase() && user.password === authForm.password,
    );

    if (!matchedUser) {
      setAuthError('Invalid email or password.');
      return;
    }

    setSessionUser(matchedUser);
    saveAdminSession(matchedUser);
    setAuthSuccess(`Welcome back, ${matchedUser.name}.`);
  };

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    resetMessages();

    if (!authForm.name || !authForm.email || !authForm.password || !authForm.confirmPassword) {
      setAuthError('Please complete all sign up fields.');
      return;
    }

    if (authForm.password.length < 6) {
      setAuthError('Password must be at least 6 characters.');
      return;
    }

    if (authForm.password !== authForm.confirmPassword) {
      setAuthError('Passwords do not match.');
      return;
    }

    const existingUser = users.find((user) => user.email.toLowerCase() === authForm.email.toLowerCase());

    if (existingUser) {
      setAuthError('An account with this email already exists.');
      return;
    }

    const newUser: AdminUser = {
      name: authForm.name,
      email: authForm.email,
      password: authForm.password,
    };

    const updatedUsers = [...users, newUser];

    setUsers(updatedUsers);
    saveAdminUsers(updatedUsers);
    setSessionUser(newUser);
    saveAdminSession(newUser);
    setAuthSuccess('Account created successfully.');
  };

  const handleLogout = () => {
    saveAdminSession(null);
    setSessionUser(null);
    setAuthForm({ name: '', email: '', password: '', confirmPassword: '' });
    resetMessages();
    setAuthMode('login');
  };

  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();
    resetMessages();

    if (!productForm.name || !productForm.price || !productForm.description || !productForm.image) {
      setAuthError('Please fill in all product fields.');
      return;
    }

    onAddProduct({
      name: productForm.name,
      price: Number(productForm.price),
      description: productForm.description,
      category: productForm.category,
      image: productForm.image,
      benefits: ['Premium', 'High-quality', 'Effective'],
      inStock: productForm.inStock,
    });

    setProductForm({
      name: '',
      price: '',
      description: '',
      category: 'Hydration',
      image: '',
      inStock: true,
    });
    setProductSuccess('Product saved successfully.');
  };

  const authenticated = Boolean(sessionUser);

  if (!authenticated) {
    return (
      <main className="min-h-screen bg-[linear-gradient(135deg,_#1F1F1F_0%,#2A2A2A_50%,#1F1F1F_100%)] text-white">
        <div className="w-full max-w-7xl mx-auto px-4 md:px-8 py-10">
          <div className="flex items-center justify-between mb-10">
            <div>
              <p className="text-xs uppercase tracking-[0.35em] text-[#E7C1A7]">Bella Admin</p>
              <h1 className="text-4xl md:text-5xl font-bold mt-2">Login or sign up to manage products</h1>
            </div>
            <button
              onClick={onExit}
              className="px-4 py-2 rounded-lg border border-white/20 text-white/80 hover:bg-white/10 transition-colors"
            >
              Exit Store
            </button>
          </div>

          <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-8 items-start">
            <section className="rounded-[28px] border border-white/10 bg-white/6 backdrop-blur-xl p-8 shadow-2xl">
              <div className="grid md:grid-cols-3 gap-4 mb-8">
                <div className="rounded-2xl bg-black/20 p-5 border border-white/10">
                  <p className="text-sm text-white/60">Total products</p>
                  <p className="text-3xl font-bold mt-2">{stats.total}</p>
                </div>
                <div className="rounded-2xl bg-black/20 p-5 border border-white/10">
                  <p className="text-sm text-white/60">In stock</p>
                  <p className="text-3xl font-bold mt-2 text-emerald-300">{stats.inStockCount}</p>
                </div>
                <div className="rounded-2xl bg-black/20 p-5 border border-white/10">
                  <p className="text-sm text-white/60">Out of stock</p>
                  <p className="text-3xl font-bold mt-2 text-rose-300">{stats.outOfStockCount}</p>
                </div>
              </div>

              <div className="space-y-4 text-white/80 text-sm leading-6">
                <p>
                  Use the demo admin account or create a new one with the sign up form. After login, you can add products, review everything that already exists, and toggle any item between in stock and out of stock.
                </p>
                <div className="rounded-2xl bg-black/20 border border-white/10 p-4">
                  <p className="font-semibold text-white mb-1">Demo account</p>
                  <p>admin@bella.com</p>
                  <p>Admin123!</p>
                </div>
              </div>
            </section>

            <section className="rounded-[28px] bg-white text-slate-900 shadow-2xl overflow-hidden">
              <div className="p-3 bg-slate-100 flex gap-2 border-b border-slate-200">
                <button
                  type="button"
                  onClick={() => setAuthMode('login')}
                  className={`flex-1 rounded-2xl px-4 py-3 font-semibold transition-colors ${
                    authMode === 'login' ? 'bg-white shadow-sm text-[#C87137]' : 'text-slate-500'
                  }`}
                >
                  Login
                </button>
                <button
                  type="button"
                  onClick={() => setAuthMode('signup')}
                  className={`flex-1 rounded-2xl px-4 py-3 font-semibold transition-colors ${
                    authMode === 'signup' ? 'bg-white shadow-sm text-[#C87137]' : 'text-slate-500'
                  }`}
                >
                  Sign Up
                </button>
              </div>

              <div className="p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-11 h-11 rounded-2xl bg-[#F9F5F0] flex items-center justify-center text-[#C87137]">
                    <Shield className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-[#3D3D3D]">
                      {authMode === 'login' ? 'Admin Login' : 'Create Admin Account'}
                    </h2>
                    <p className="text-sm text-[#7A6B5D]">Secure access to the product dashboard</p>
                  </div>
                </div>

                {authError && (
                  <div className="mb-5 rounded-2xl bg-rose-50 border border-rose-200 px-4 py-3 text-rose-700 text-sm">
                    {authError}
                  </div>
                )}

                {authSuccess && (
                  <div className="mb-5 rounded-2xl bg-emerald-50 border border-emerald-200 px-4 py-3 text-emerald-700 text-sm flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4" />
                    {authSuccess}
                  </div>
                )}

                {authMode === 'login' ? (
                  <form onSubmit={handleLogin} className="space-y-4">
                    <div>
                      <label className="block text-sm font-semibold text-[#3D3D3D] mb-2">Email</label>
                      <input
                        type="email"
                        name="email"
                        value={authForm.email}
                        onChange={handleAuthChange}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#A0826D]"
                        placeholder="admin@bella.com"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-[#3D3D3D] mb-2">Password</label>
                      <div className="relative">
                        <input
                          type={showPassword ? 'text' : 'password'}
                          name="password"
                          value={authForm.password}
                          onChange={handleAuthChange}
                          className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#A0826D] pr-12"
                          placeholder="Enter password"
                          required
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword((current) => !current)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500"
                        >
                          {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-[#C87137] text-white py-4 rounded-xl font-semibold text-lg hover:bg-[#B85F2F] transition-colors"
                    >
                      Login to Dashboard
                    </button>
                  </form>
                ) : (
                  <form onSubmit={handleSignup} className="space-y-4">
                    <div>
                      <label className="block text-sm font-semibold text-[#3D3D3D] mb-2">Full Name</label>
                      <input
                        type="text"
                        name="name"
                        value={authForm.name}
                        onChange={handleAuthChange}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#A0826D]"
                        placeholder="Bella Admin"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-[#3D3D3D] mb-2">Email</label>
                      <input
                        type="email"
                        name="email"
                        value={authForm.email}
                        onChange={handleAuthChange}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#A0826D]"
                        placeholder="admin@bella.com"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-[#3D3D3D] mb-2">Password</label>
                      <input
                        type="password"
                        name="password"
                        value={authForm.password}
                        onChange={handleAuthChange}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#A0826D]"
                        placeholder="Create a password"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-[#3D3D3D] mb-2">Confirm Password</label>
                      <input
                        type="password"
                        name="confirmPassword"
                        value={authForm.confirmPassword}
                        onChange={handleAuthChange}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#A0826D]"
                        placeholder="Repeat your password"
                        required
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full bg-[#C87137] text-white py-4 rounded-xl font-semibold text-lg hover:bg-[#B85F2F] transition-colors"
                    >
                      Create Admin Account
                    </button>
                  </form>
                )}
              </div>
            </section>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#F9F5F0]">
      <div className="w-full max-w-7xl mx-auto px-4 md:px-8 py-8">
        <div className="flex items-center justify-between gap-4 mb-8">
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-[#C87137] font-semibold">Admin Dashboard</p>
            <h1 className="text-4xl font-bold text-[#3D3D3D] mt-2">Manage Products & Catalog</h1>
            <p className="text-[#A0826D] mt-2 font-medium">Welcome back, {sessionUser?.name}</p>
          </div>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onExit}
              className="px-6 py-3 rounded-xl border border-[#C87137] bg-white text-[#C87137] hover:bg-[#FFF5F0] transition-colors font-semibold"
            >
              Back to Store
            </button>
            <button
              type="button"
              onClick={handleLogout}
              className="px-6 py-3 rounded-xl bg-[#3D3D3D] text-white hover:bg-slate-800 transition-colors inline-flex items-center gap-2 font-semibold"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </div>
        </div>

        <div className="grid xl:grid-cols-[0.95fr_1.05fr] gap-8 items-start">
          <section className="bg-white rounded-3xl p-8 shadow-sm border border-[#E8D4C4] sticky top-24">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-11 h-11 rounded-2xl bg-[#F9F5F0] flex items-center justify-center text-[#C87137]">
                <Plus className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-[#3D3D3D]">Add New Product</h2>
                <p className="text-sm text-[#7A6B5D]">Create a product and choose its stock state</p>
              </div>
            </div>

            {productSuccess && (
              <div className="mb-5 rounded-2xl bg-emerald-50 border border-emerald-200 px-4 py-3 text-emerald-700 text-sm flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" />
                {productSuccess}
              </div>
            )}

            <form onSubmit={handleAddProduct} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-[#3D3D3D] mb-2">Product Name</label>
                <input
                  type="text"
                  name="name"
                  value={productForm.name}
                  onChange={handleProductChange}
                  className="w-full px-4 py-3 rounded-xl border border-[#E8D4C4] focus:outline-none focus:ring-2 focus:ring-[#A0826D]"
                  placeholder="Luxurious Face Cream"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-[#3D3D3D] mb-2">Price ($)</label>
                  <input
                    type="number"
                    name="price"
                    value={productForm.price}
                    onChange={handleProductChange}
                    step="0.01"
                    className="w-full px-4 py-3 rounded-xl border border-[#E8D4C4] focus:outline-none focus:ring-2 focus:ring-[#A0826D]"
                    placeholder="59.99"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-[#3D3D3D] mb-2">Category</label>
                  <select
                    name="category"
                    value={productForm.category}
                    onChange={handleProductChange}
                    className="w-full px-4 py-3 rounded-xl border border-[#E8D4C4] focus:outline-none focus:ring-2 focus:ring-[#A0826D] bg-white"
                  >
                    {categories.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-[#3D3D3D] mb-2">Description</label>
                <textarea
                  name="description"
                  value={productForm.description}
                  onChange={handleProductChange}
                  rows={4}
                  className="w-full px-4 py-3 rounded-xl border border-[#E8D4C4] focus:outline-none focus:ring-2 focus:ring-[#A0826D]"
                  placeholder="Describe the product and its benefits..."
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-[#3D3D3D] mb-2">Image URL</label>
                <input
                  type="url"
                  name="image"
                  value={productForm.image}
                  onChange={handleProductChange}
                  className="w-full px-4 py-3 rounded-xl border border-[#E8D4C4] focus:outline-none focus:ring-2 focus:ring-[#A0826D]"
                  placeholder="https://example.com/image.jpg"
                />
              </div>

              <label className="flex items-center gap-3 rounded-2xl border border-[#E8D4C4] px-4 py-3">
                <input
                  type="checkbox"
                  name="inStock"
                  checked={productForm.inStock}
                  onChange={handleProductChange}
                  className="h-4 w-4 rounded border-[#C87137] text-[#C87137] focus:ring-[#C87137]"
                />
                <div>
                  <p className="font-semibold text-[#3D3D3D]">In stock</p>
                  <p className="text-sm text-[#7A6B5D]">Disable this when the item should be unavailable.</p>
                </div>
              </label>

              <button
                type="submit"
                className="w-full bg-[#C87137] text-white py-4 rounded-xl font-semibold text-lg hover:bg-[#B85F2F] transition-colors"
              >
                Add Product
              </button>
            </form>
          </section>

          <section className="space-y-6">
            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-white rounded-3xl p-5 border border-[#E8D4C4] shadow-sm">
                <p className="text-sm text-[#7A6B5D]">Total products</p>
                <p className="text-3xl font-bold text-[#3D3D3D] mt-2">{stats.total}</p>
              </div>
              <div className="bg-white rounded-3xl p-5 border border-[#E8D4C4] shadow-sm">
                <p className="text-sm text-[#7A6B5D]">In stock</p>
                <p className="text-3xl font-bold text-emerald-600 mt-2">{stats.inStockCount}</p>
              </div>
              <div className="bg-white rounded-3xl p-5 border border-[#E8D4C4] shadow-sm">
                <p className="text-sm text-[#7A6B5D]">Out of stock</p>
                <p className="text-3xl font-bold text-rose-600 mt-2">{stats.outOfStockCount}</p>
              </div>
            </div>

            <div className="bg-white rounded-3xl p-8 border border-[#E8D4C4] shadow-sm">
              <div className="flex items-center justify-between gap-4 mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-[#3D3D3D]">Previously Added Items</h2>
                  <p className="text-sm text-[#7A6B5D]">Toggle stock or remove products from the catalog</p>
                </div>
                <div className="inline-flex items-center gap-2 rounded-full bg-[#F9F5F0] px-4 py-2 text-sm font-semibold text-[#3D3D3D]">
                  <Package className="w-4 h-4 text-[#C87137]" />
                  {products.length} items
                </div>
              </div>

              <div className="grid gap-4">
                {products.map((product) => (
                  <article key={product.id} className="rounded-2xl border border-[#E8D4C4] p-4 flex flex-col md:flex-row md:items-center gap-4">
                    <div className="w-full md:w-28 h-24 rounded-xl overflow-hidden bg-[#F9F5F0] flex-shrink-0">
                      <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        <h3 className="font-semibold text-[#3D3D3D] text-lg line-clamp-1">{product.name}</h3>
                        <span className={`px-2.5 py-1 rounded-full text-xs font-semibold uppercase tracking-widest ${product.inStock ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'}`}>
                          {product.inStock ? 'In Stock' : 'Out of Stock'}
                        </span>
                      </div>
                      <p className="text-sm text-[#7A6B5D] line-clamp-2">{product.description}</p>
                      <div className="mt-3 flex flex-wrap items-center gap-3 text-sm text-[#7A6B5D]">
                        <span className="font-semibold text-[#3D3D3D]">${product.price.toFixed(2)}</span>
                        <span>{product.category}</span>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-2 md:justify-end">
                      <button
                        type="button"
                        onClick={() => onToggleStock(product.id)}
                        className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl font-semibold transition-colors ${product.inStock ? 'bg-rose-50 text-rose-700 hover:bg-rose-100' : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100'}`}
                      >
                        {product.inStock ? <ToggleLeft className="w-4 h-4" /> : <ToggleRight className="w-4 h-4" />}
                        {product.inStock ? 'Mark Out of Stock' : 'Mark In Stock'}
                      </button>
                      <button
                        type="button"
                        onClick={() => onDeleteProduct(product.id)}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-xl font-semibold bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                        Delete
                      </button>
                    </div>
                  </article>
                ))}

                {products.length === 0 && (
                  <div className="rounded-2xl border border-dashed border-[#E8D4C4] p-8 text-center text-[#7A6B5D]">
                    No products yet. Add one using the form.
                  </div>
                )}
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
