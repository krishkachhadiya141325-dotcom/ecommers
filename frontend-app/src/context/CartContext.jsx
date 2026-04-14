import { createContext, useContext, useState, useEffect } from 'react';
import { getCartAPI, addToCartAPI, updateCartItemAPI, removeFromCartAPI, clearCartAPI } from '../services/api';
import { useAuth } from './AuthContext';
import toast from 'react-hot-toast';

const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
  const { user } = useAuth();
  const [cartItems, setCartItems] = useState([]);
  const [cartTotal, setCartTotal] = useState(0);
  const [cartLoading, setCartLoading] = useState(false);

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const fetchCart = async () => {
    if (!user) {
      setCartItems([]);
      setCartTotal(0);
      return;
    }
    try {
      setCartLoading(true);
      const { data } = await getCartAPI();
      setCartItems(data.items || []);
      setCartTotal(data.total || 0);
    } catch {
      // silent fail
    } finally {
      setCartLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, [user]);

  const addItem = async (productId, quantity = 1) => {
    try {
      await addToCartAPI(productId, quantity);
      await fetchCart();
      toast.success('Added to cart!');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to add to cart');
    }
  };

  const updateQuantity = async (productId, quantity) => {
    try {
      await updateCartItemAPI(productId, quantity);
      await fetchCart();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to update cart');
    }
  };

  const removeItem = async (productId) => {
    try {
      await removeFromCartAPI(productId);
      await fetchCart();
      toast.success('Item removed');
    } catch {
      toast.error('Failed to remove item');
    }
  };

  const clearCart = async () => {
    try {
      await clearCartAPI();
      setCartItems([]);
      setCartTotal(0);
    } catch {
      // silent
    }
  };

  return (
    <CartContext.Provider value={{ cartItems, cartTotal, cartCount, cartLoading, addItem, updateQuantity, removeItem, clearCart, fetchCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used inside CartProvider');
  return ctx;
};
