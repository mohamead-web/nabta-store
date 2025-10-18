
import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { type CartItem, type Product } from '../types';

type Language = 'ar' | 'en';

interface AppContextType {
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
  cartCount: number;
  cartTotal: number;
  isCartOpen: boolean;
  toggleCart: () => void;
  openCart: () => void;
  language: Language;
  toggleLanguage: () => void;
  setLanguage: (lang: Language) => void;
  t: (ar: string, en: string) => string;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const item = window.localStorage.getItem('nabta-cart');
      return item ? JSON.parse(item) : [];
    } catch (error) {
      console.error(error);
      return [];
    }
  });
  
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [language, setLanguage] = useState<Language>('ar');

  useEffect(() => {
    try {
      window.localStorage.setItem('nabta-cart', JSON.stringify(cart));
    } catch (error) {
      console.error(error);
    }
  }, [cart]);

  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
  }, [language]);


  const addToCart = (product: Product, quantity = 1) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id);
      if (existingItem) {
        return prevCart.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [...prevCart, { ...product, quantity }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (productId: number) => {
    setCart(prevCart => prevCart.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
    } else {
      setCart(prevCart =>
        prevCart.map(item => (item.id === productId ? { ...item, quantity } : item))
      );
    }
  };

  const clearCart = () => {
    setCart([]);
  };

  const toggleCart = () => setIsCartOpen(!isCartOpen);
  const openCart = () => setIsCartOpen(true);

  const toggleLanguage = () => {
    setLanguage(prevLang => (prevLang === 'ar' ? 'en' : 'ar'));
  };

  const t = useCallback((ar: string, en: string): string => {
    return language === 'ar' ? ar : en;
  }, [language]);

  const cartCount = cart.reduce((count, item) => count + item.quantity, 0);
  const cartTotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <AppContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartCount,
        cartTotal,
        isCartOpen,
        toggleCart,
        openCart,
        language,
        toggleLanguage,
        setLanguage,
        t,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = (): AppContextType => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};
