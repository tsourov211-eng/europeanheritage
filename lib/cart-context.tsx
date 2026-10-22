'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

export interface CartItem {
  id: string; // unique item id e.g. `${productId}-tile` or `${productId}-sample`
  productId: string;
  name: string;
  brand: string;
  image: string;
  price: number; // price per unit (or 0 for sample)
  quantity: number; // area in m² for tiles, or sample count
  type: 'tile' | 'sample';
  unit?: string; // 'm²' or 'sample'
  estimatedTiles?: number;
  colorTag?: string;
}

export interface UserProfile {
  name: string;
  email: string;
  accountType: 'retail' | 'trade';
  company?: string;
  phone?: string;
}

interface CartContextType {
  cart: CartItem[];
  isCartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  addToCart: (item: Omit<CartItem, 'id'>) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalSamples: number;
  subtotal: number;
  freeDeliveryThreshold: number;
  wishlist: Record<string, boolean>;
  toggleWishlist: (productId: string) => void;
  isWishlisted: (productId: string) => boolean;
  wishlistCount: number;
  user: UserProfile | null;
  login: (profile: UserProfile) => void;
  logout: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_STORAGE_KEY = 'eh_cart_items_v1';
const WISHLIST_STORAGE_KEY = 'eh_wishlist_v1';
const USER_STORAGE_KEY = 'eh_user_v1';

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<Record<string, boolean>>({});
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);


  // Initialize from localStorage after client mounts to avoid hydration mismatch
  useEffect(() => {
    try {
      const storedCart = localStorage.getItem(CART_STORAGE_KEY);
      if (storedCart) {
        setCart(JSON.parse(storedCart));
      }
      const storedWishlist = localStorage.getItem(WISHLIST_STORAGE_KEY);
      if (storedWishlist) {
        setWishlist(JSON.parse(storedWishlist));
      }
      const storedUser = localStorage.getItem(USER_STORAGE_KEY);
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } catch (e) {
      console.error('Error loading data from localStorage', e);
    }
    setHasMounted(true);
  }, []);

  // Save cart to localStorage
  useEffect(() => {
    if (!hasMounted) return;
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    } catch (e) {
      console.error('Error persisting cart', e);
    }
  }, [cart, hasMounted]);

  // Save wishlist to localStorage
  useEffect(() => {
    if (!hasMounted) return;
    try {
      localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(wishlist));
    } catch (e) {
      console.error('Error persisting wishlist', e);
    }
  }, [wishlist, hasMounted]);

  // Save user to localStorage
  useEffect(() => {
    if (!hasMounted) return;
    try {
      if (user) {
        localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
      } else {
        localStorage.removeItem(USER_STORAGE_KEY);
      }
    } catch (e) {
      console.error('Error persisting user', e);
    }
  }, [user, hasMounted]);

  const login = (profile: UserProfile) => {
    setUser(profile);
  };

  const logout = () => {
    setUser(null);
  };


  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);
  const toggleCart = () => setIsCartOpen((prev) => !prev);

  const addToCart = (newItem: Omit<CartItem, 'id'>) => {
    const id = `${newItem.productId}-${newItem.type}`;
    setCart((prevCart) => {
      const existingIndex = prevCart.findIndex((item) => item.id === id);
      if (existingIndex > -1) {
        const updated = [...prevCart];
        if (newItem.type === 'sample') {
          // Samples max 1 per unique tile
          return updated;
        }
        // Increment area for tiles
        const current = updated[existingIndex];
        const newQty = parseFloat((current.quantity + newItem.quantity).toFixed(2));
        updated[existingIndex] = {
          ...current,
          quantity: newQty,
          estimatedTiles: Math.ceil(newQty * 1.1 * 59),
        };
        return updated;
      }
      return [...prevCart, { ...newItem, id }];
    });
  };

  const removeFromCart = (id: string) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id);
      return;
    }
    setCart((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const validQty = Math.max(0.5, parseFloat(quantity.toFixed(2)));
          return {
            ...item,
            quantity: validQty,
            estimatedTiles: item.type === 'tile' ? Math.ceil(validQty * 1.1 * 59) : undefined,
          };
        }
        return item;
      })
    );
  };

  const clearCart = () => setCart([]);

  const toggleWishlist = (productId: string) => {
    setWishlist((prev) => ({
      ...prev,
      [productId]: !prev[productId],
    }));
  };

  const isWishlisted = (productId: string) => Boolean(wishlist[productId]);

  const wishlistCount = Object.values(wishlist).filter(Boolean).length;

  const totalItems = cart.length;
  const totalSamples = cart.filter((item) => item.type === 'sample').length;
  const subtotal = cart.reduce((sum, item) => {
    if (item.type === 'sample') return sum;
    return sum + item.price * item.quantity;
  }, 0);

  const freeDeliveryThreshold = 250;

  return (
    <CartContext.Provider
      value={{
        cart,
        isCartOpen,
        openCart,
        closeCart,
        toggleCart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItems,
        totalSamples,
        subtotal,
        freeDeliveryThreshold,
        wishlist,
        toggleWishlist,
        isWishlisted,
        wishlistCount,
        user,
        login,
        logout,
      }}
    >
      {children}

    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
