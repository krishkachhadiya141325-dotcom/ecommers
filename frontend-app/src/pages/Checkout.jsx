import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { placeOrderAPI } from '../services/api';
import { useCart } from '../context/CartContext';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

const initialForm = {
  name: '',
  address: '',
  city: '',
  state: '',
  zip: '',
  country: 'India',
};

const Checkout = () => {
  const navigate = useNavigate();
  const { cartItems, cartTotal, cartCount, clearCart, cartLoading } = useCart();
  const [form, setForm] = useState(initialForm);
  const [paymentMethod, setPaymentMethod] = useState('Cash on Delivery');
  const [loading, setLoading] = useState(false);
  const [formErrors, setFormErrors] = useState({});

  const shipping = cartTotal > 5000 ? 0 : 499;
  const total = cartTotal + shipping;

  useEffect(() => {
    if (!cartLoading && cartCount === 0) {
      navigate('/cart');
    }
  }, [cartCount, cartLoading, navigate]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const nextErrors = {};
    Object.entries(form).forEach(([key, value]) => {
      if (!value.trim()) nextErrors[key] = 'This field is required';
    });
    setFormErrors(nextErrors);
    if (Object.keys(nextErrors).length) {
      toast.error('Please fill in all shipping fields');
      return;
    }
    if (cartCount === 0) {
      toast.error('Your cart is empty');
      navigate('/cart');
      return;
    }
    setLoading(true);
    try {
      await placeOrderAPI({ shippingAddress: form, paymentMethod });
      await clearCart();
      toast.success('Order placed successfully!');
      navigate('/my-orders');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to place order');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <p className="text-sm uppercase tracking-[0.4em] text-amber-600">Checkout</p>
          <h1 className="text-4xl font-bold text-slate-900">Complete your order</h1>
        </div>

        <div className="grid gap-8 xl:grid-cols-[1.3fr_0.9fr]">
          <form onSubmit={handleSubmit} className="rounded-[32px] bg-white border border-slate-200 p-8 shadow-sm space-y-6">
            <h2 className="text-2xl font-semibold text-slate-900">Shipping information</h2>
            {['name','address','city','state','zip','country'].map((key) => (
              <div key={key}>
                <label className="block text-sm font-medium text-slate-700 mb-2">{key === 'zip' ? 'ZIP / Postal code' : key === 'country' ? 'Country' : key.charAt(0).toUpperCase() + key.slice(1)}</label>
                <input value={form[key]} onChange={(e) => setForm({ ...form, [key]: e.target.value })} className={`w-full rounded-3xl border px-4 py-3 text-sm text-slate-900 focus:border-amber-400 ${formErrors[key] ? 'border-red-400' : 'border-slate-200'}`} />
                {formErrors[key] && <p className="text-xs text-red-600 mt-2">{formErrors[key]}</p>}
              </div>
            ))}
            <div className="space-y-3">
              <h2 className="text-2xl font-semibold text-slate-900">Payment method</h2>
              {['Cash on Delivery', 'Online Payment'].map((option) => (
                <label key={option} className="flex items-center gap-3 rounded-3xl border border-slate-200 px-4 py-3 cursor-pointer">
                  <input type="radio" name="payment" value={option} checked={paymentMethod === option} onChange={() => setPaymentMethod(option)} className="h-4 w-4 text-amber-600" />
                  <span className="text-sm text-slate-700">{option}</span>
                </label>
              ))}
            </div>
            <button type="submit" disabled={loading} className="w-full rounded-full bg-amber-600 px-6 py-3 text-sm font-semibold text-white hover:bg-amber-700 transition disabled:opacity-60">
              {loading ? 'Placing order...' : 'Place Order'}
            </button>
          </form>

          <aside className="rounded-[32px] bg-white border border-slate-200 p-8 shadow-sm">
            <h2 className="text-2xl font-semibold text-slate-900 mb-6">Order summary</h2>
            <div className="space-y-4 text-sm text-slate-600">
              <div className="flex justify-between"><span>Items</span><span>{cartCount}</span></div>
              <div className="flex justify-between"><span>Subtotal</span><span>₹{cartTotal.toLocaleString('en-IN')}</span></div>
              <div className="flex justify-between"><span>Shipping</span><span>{shipping === 0 ? 'FREE' : `₹${shipping.toLocaleString('en-IN')}`}</span></div>
              <div className="border-t border-slate-200 pt-4 flex justify-between text-base font-semibold text-slate-900"><span>Total</span><span>₹{total.toLocaleString('en-IN')}</span></div>
            </div>
          </aside>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Checkout;
