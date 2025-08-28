"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { supabase } from '@/utils/supabase/client';
import { useRouter } from 'next/navigation';

// Types
interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string;
  category: string;
  stock: number;
}

interface CartItem extends Product {
  quantity: number;
}

interface User {
  id: string;
  email: string;
  full_name?: string;
}

export default function Dashboard() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [activeTab, setActiveTab] = useState('products');
  const [products, setProducts] = useState<Product[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  // Mock products data - replace with actual Supabase queries
  const mockProducts: Product[] = [
    {
      id: '1',
      name: 'Whey Protein Powder',
      price: 49.99,
      image: '/api/placeholder/300/300',
      description: 'Premium whey protein for muscle building',
      category: 'supplements',
      stock: 50
    },
    {
      id: '2',
      name: 'Pre-Workout Energy',
      price: 34.99,
      image: '/api/placeholder/300/300',
      description: 'Boost your workout performance',
      category: 'supplements',
      stock: 30
    },
    {
      id: '3',
      name: 'Resistance Bands Set',
      price: 24.99,
      image: '/api/placeholder/300/300',
      description: 'Complete set of resistance bands',
      category: 'equipment',
      stock: 25
    },
    {
      id: '4',
      name: 'Yoga Mat Premium',
      price: 39.99,
      image: '/api/placeholder/300/300',
      description: 'Non-slip premium yoga mat',
      category: 'equipment',
      stock: 40
    },
    {
      id: '5',
      name: 'Organic Protein Bars (12 pack)',
      price: 19.99,
      image: '/api/placeholder/300/300',
      description: 'Healthy organic protein bars',
      category: 'nutrition',
      stock: 60
    },
    {
      id: '6',
      name: 'Multivitamin Complex',
      price: 29.99,
      image: '/api/placeholder/300/300',
      description: 'Complete daily vitamin supplement',
      category: 'supplements',
      stock: 45
    }
  ];

  const categories = [
    { value: 'all', label: 'All Products' },
    { value: 'supplements', label: 'Supplements' },
    { value: 'equipment', label: 'Equipment' },
    { value: 'nutrition', label: 'Nutrition' }
  ];

  // Check authentication and load user data
  useEffect(() => {
    const checkAuth = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.push('/login');
        return;
      }
      setUser({
        id: user.id,
        email: user.email ?? '',
        full_name: (user.user_metadata && user.user_metadata.full_name) ? user.user_metadata.full_name : undefined
      });
      setLoading(false);
    };

    checkAuth();
    setProducts(mockProducts);
  }, [router]);

  // Handle logout
  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/');
  };

  // Add to cart
  const addToCart = (product: Product) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id);
      if (existingItem) {
        return prevCart.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  // Remove from cart
  const removeFromCart = (productId: string) => {
    setCart(prevCart => prevCart.filter(item => item.id !== productId));
  };

  // Update cart quantity
  const updateCartQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart(prevCart =>
      prevCart.map(item =>
        item.id === productId ? { ...item, quantity } : item
      )
    );
  };

  // Filter products
  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Calculate cart total
  const cartTotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Image src="/logo.svg" alt="FitFuel Logo" width={40} height={40} />
              <h1 className="ml-3 text-xl font-bold text-gray-900">FitFuel Store</h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">Welcome, {user?.email}</span>
              <button
                onClick={() => setActiveTab('cart')}
                className="relative p-2 text-gray-600 hover:text-gray-900"
              >
                🛒
                {cartItemCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-green-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {cartItemCount}
                  </span>
                )}
              </button>
              <button
                onClick={handleLogout}
                className="bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded-lg text-sm"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <nav className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8">
            {[
              { key: 'products', label: 'Products' },
              { key: 'cart', label: `Cart (${cartItemCount})` },
              { key: 'orders', label: 'My Orders' },
              { key: 'profile', label: 'Profile' }
            ].map(tab => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.key
                    ? 'border-green-500 text-green-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Products Tab */}
        {activeTab === 'products' && (
          <div>
            {/* Filters */}
            <div className="mb-6 flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                />
              </div>
              <label htmlFor="category-select" className="sr-only">
                Filter by category
              </label>
              <select
                id="category-select"
                title="Filter by category"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
              >
                {categories.map(category => (
                  <option key={category.value} value={category.value}>
                    {category.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map(product => (
                <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                  <div className="aspect-square bg-gray-200 flex items-center justify-center">
                    <span className="text-gray-400">📦</span>
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-lg mb-2">{product.name}</h3>
                    <p className="text-gray-600 text-sm mb-3">{product.description}</p>
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-2xl font-bold text-green-600">${product.price}</span>
                      <span className="text-sm text-gray-500">Stock: {product.stock}</span>
                    </div>
                    <button
                      onClick={() => addToCart(product)}
                      className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Cart Tab */}
        {activeTab === 'cart' && (
          <div>
            <h2 className="text-2xl font-bold mb-6">Shopping Cart</h2>
            {cart.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-500 mb-4">Your cart is empty</p>
                <button
                  onClick={() => setActiveTab('products')}
                  className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg"
                >
                  Continue Shopping
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {cart.map(item => (
                  <div key={item.id} className="bg-white p-4 rounded-lg shadow flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="w-16 h-16 bg-gray-200 rounded flex items-center justify-center">
                        <span>📦</span>
                      </div>
                      <div>
                        <h3 className="font-semibold">{item.name}</h3>
                        <p className="text-green-600 font-medium">${item.price}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                          className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center"
                        >
                          −
                        </button>
                        <span className="w-8 text-center">{item.quantity}</span>
                        <button
                          onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                          className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center"
                        >
                          +
                        </button>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">${(item.price * item.quantity).toFixed(2)}</p>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-red-500 hover:text-red-700 text-sm"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
                
                {/* Cart Summary */}
                <div className="bg-white p-6 rounded-lg shadow">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-xl font-semibold">Total: ${cartTotal.toFixed(2)}</span>
                  </div>
                  <button className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg text-lg">
                    Proceed to Checkout
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Orders Tab */}
        {activeTab === 'orders' && (
          <div>
            <h2 className="text-2xl font-bold mb-6">My Orders</h2>
            <div className="bg-white p-6 rounded-lg shadow text-center">
              <p className="text-gray-500 mb-4">No orders yet</p>
              <button
                onClick={() => setActiveTab('products')}
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg"
              >
                Start Shopping
              </button>
            </div>
          </div>
        )}

        {/* Profile Tab */}
        {activeTab === 'profile' && (
          <div>
            <h2 className="text-2xl font-bold mb-6">My Profile</h2>
            <div className="bg-white p-6 rounded-lg shadow max-w-md">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    value={user?.email || ''}
                    disabled
                    placeholder="Email"
                    className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                  <input
                    type="text"
                    placeholder="Enter your full name"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                  />
                </div>
                <button className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg">
                  Update Profile
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}