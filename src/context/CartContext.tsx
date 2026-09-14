'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { CartItem, CartState } from '@/types';
import { useToast } from './ToastContext';

interface AddToCartParams {
  serviceId: string;
  serviceTitle: string;
  image: string;
  selectedOption: string;
  selectedAddons?: string[];
  unitPriceSAR: number;
  qty?: number;
  notes?: string;
  uploadedFiles?: string[];
  customDetails?: Record<string, any>;
}

interface CartContextType {
  cartState: CartState;
  items: CartItem[];
  totalItemsCount: number;
  subtotalSAR: number;
  discountSAR: number;
  grandTotalSAR: number;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  isCheckoutOpen: boolean;
  setIsCheckoutOpen: (open: boolean) => void;
  addToCart: (params: AddToCartParams) => void;
  removeFromCart: (uniqueCartId: string) => void;
  updateQuantity: (uniqueCartId: string, qty: number) => void;
  applyCoupon: (couponCode: string) => { success: boolean; message: string };
  removeCoupon: () => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const VALID_COUPONS: Record<string, number> = {
  COBALT20: 20,
  WELCOME10: 10,
  VIP25: 25
};

export function CartProvider({ children }: { children: React.ReactNode }) {
  const { showToast } = useToast();
  const [cartState, setCartState] = useState<CartState>({
    items: [],
    appliedCoupon: null,
    discountPercentage: 0
  });
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState<boolean>(false);
  const [isInitialized, setIsInitialized] = useState<boolean>(false);

  // Load cart from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem('cobalt_cart_data');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed && Array.isArray(parsed.items)) {
          setCartState(parsed);
        }
      }
    } catch {
      // ignore
    } finally {
      setIsInitialized(true);
    }
  }, []);

  // Save cart to localStorage
  useEffect(() => {
    if (isInitialized) {
      try {
        localStorage.setItem('cobalt_cart_data', JSON.stringify(cartState));
      } catch {
        // ignore
      }
    }
  }, [cartState, isInitialized]);

  const addToCart = ({
    serviceId,
    serviceTitle,
    image,
    selectedOption,
    selectedAddons = [],
    unitPriceSAR,
    qty = 1,
    notes = '',
    uploadedFiles = [],
    customDetails
  }: AddToCartParams) => {
    const validQty = Math.max(1, qty);
    const uniqueCartId = `${serviceId}_${selectedOption}_${selectedAddons.sort().join('-')}_${Date.now()}`;

    const newItem: CartItem = {
      uniqueCartId,
      serviceId,
      serviceTitle,
      image,
      selectedOption,
      selectedAddons,
      unitPriceSAR,
      qty: validQty,
      notes,
      uploadedFiles,
      customDetails
    };

    setCartState((prev) => ({
      ...prev,
      items: [...prev.items, newItem]
    }));

    showToast(`تمت إضافة "${serviceTitle}" إلى سلة المشتريات!`, 'success');
    setIsCartOpen(true);
  };

  const removeFromCart = (uniqueCartId: string) => {
    setCartState((prev) => ({
      ...prev,
      items: prev.items.filter((item) => item.uniqueCartId !== uniqueCartId)
    }));
    showToast('تم حذف العنصر من السلة', 'info');
  };

  const updateQuantity = (uniqueCartId: string, newQty: number) => {
    if (newQty <= 0) {
      removeFromCart(uniqueCartId);
      return;
    }

    setCartState((prev) => ({
      ...prev,
      items: prev.items.map((item) =>
        item.uniqueCartId === uniqueCartId ? { ...item, qty: newQty } : item
      )
    }));
  };

  const applyCoupon = (code: string) => {
    const cleanCode = code.trim().toUpperCase();
    if (!cleanCode) {
      return { success: false, message: 'يرجى إدخال رمز الكوبون' };
    }

    if (VALID_COUPONS[cleanCode]) {
      const discount = VALID_COUPONS[cleanCode];
      setCartState((prev) => ({
        ...prev,
        appliedCoupon: cleanCode,
        discountPercentage: discount
      }));
      showToast(`تهانينا! تم تفعيل كود الخصم ${cleanCode} بنجاح (${discount}%)`, 'success');
      return { success: true, message: `تم تفعيل خصم ${discount}%` };
    } else {
      showToast('كود الخصم غير صالح أو منتهي الصلاحية', 'error');
      return { success: false, message: 'كود الخصم غير صحيح' };
    }
  };

  const removeCoupon = () => {
    setCartState((prev) => ({
      ...prev,
      appliedCoupon: null,
      discountPercentage: 0
    }));
    showToast('تم إلغاء كود الخصم', 'info');
  };

  const clearCart = () => {
    setCartState({
      items: [],
      appliedCoupon: null,
      discountPercentage: 0
    });
  };

  const totalItemsCount = cartState.items.reduce((sum, item) => sum + item.qty, 0);

  const subtotalSAR = cartState.items.reduce(
    (sum, item) => sum + item.unitPriceSAR * item.qty,
    0
  );

  const discountSAR = Math.round((subtotalSAR * cartState.discountPercentage) / 100);
  const grandTotalSAR = Math.max(0, subtotalSAR - discountSAR);

  return (
    <CartContext.Provider
      value={{
        cartState,
        items: cartState.items,
        totalItemsCount,
        subtotalSAR,
        discountSAR,
        grandTotalSAR,
        isCartOpen,
        setIsCartOpen,
        isCheckoutOpen,
        setIsCheckoutOpen,
        addToCart,
        removeFromCart,
        updateQuantity,
        applyCoupon,
        removeCoupon,
        clearCart
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
