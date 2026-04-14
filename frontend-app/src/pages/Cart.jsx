import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

const Cart = () => {
  const { cartItems, cartTotal, cartCount, cartLoading, updateQuantity, removeItem } = useCart();
  const navigate = useNavigate();
  const shipping = cartTotal > 5000 ? 0 : 499;
  const total = cartTotal + shipping;

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <p className="text-sm uppercase tracking-[0.4em] text-amber-600">Cart</p>
          <h1 className="text-4xl font-bold text-slate-900">Your shopping cart</h1>
          <p className="text-slate-600 mt-2">Review items in your cart before checking out.</p>
        </div>

        {cartLoading ? (
          <div className="space-y-6">
            {Array.from({ length: 3 }).map((_, idx) => (
              <div key={idx} className="h-40 rounded-[32px] bg-slate-200 animate-pulse" />
            ))}
          </div>
        ) : cartItems.length === 0 ? (
          <div className="rounded-[32px] bg-white border border-slate-200 p-12 text-center">
            <p className="text-2xl font-semibold text-slate-900 mb-4">Your cart is empty</p>
            <p className="text-slate-600 mb-8">Browse our collection and add the furniture you love.</p>
            <button onClick={() => navigate('/shop')} className="rounded-full bg-amber-600 px-8 py-3 text-sm font-semibold text-white hover:bg-amber-700 transition">Continue Shopping</button>
          </div>
        ) : (
          <div className="grid gap-8 xl:grid-cols-[1.6fr_0.9fr]">
            <div className="space-y-6">
              {cartItems.map((item) => (
                <div key={item.product._id} className="rounded-[32px] bg-white border border-slate-200 p-6 flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
                  <div className="flex items-start gap-5">
                    <img src={item.product.image} alt={item.product.name} className="w-32 h-32 rounded-3xl object-cover" />
                    <div>
                      <p className="text-sm text-slate-500">{item.product.category}</p>
                      <h2 className="text-xl font-semibold text-slate-900">{item.product.name}</h2>
                      <p className="mt-2 text-slate-600">₹{item.product.price.toLocaleString('en-IN')}</p>
                    </div>
                  </div>
                  <div className="flex flex-col gap-4 items-start md:items-end">
                    <div className="flex items-center gap-2 rounded-full bg-slate-100 px-3 py-2">
                      <button disabled={item.quantity <= 1} onClick={() => updateQuantity(item.product._id, item.quantity - 1)} className="rounded-full bg-white px-3 py-1 text-slate-700 hover:bg-slate-200 transition disabled:cursor-not-allowed disabled:opacity-50">-</button>
                      <span className="w-10 text-center text-sm font-semibold">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.product._id, item.quantity + 1)} className="rounded-full bg-white px-3 py-1 text-slate-700 hover:bg-slate-200 transition">+</button>
                    </div>
                    <button onClick={() => removeItem(item.product._id)} className="text-sm text-red-600 hover:text-red-700">Remove</button>
                  </div>
                </div>
              ))}
            </div>

            <aside className="rounded-[32px] bg-white border border-slate-200 p-6 shadow-sm">
              <h2 className="text-xl font-semibold text-slate-900 mb-6">Order summary</h2>
              <div className="space-y-4 text-sm text-slate-600">
                <div className="flex justify-between"><span>Subtotal</span><span>₹{cartTotal.toLocaleString('en-IN')}</span></div>
                <div className="flex justify-between"><span>Shipping</span><span>{shipping === 0 ? 'FREE' : `₹${shipping.toLocaleString('en-IN')}`}</span></div>
                <div className="border-t border-slate-200 pt-4 flex justify-between text-base font-semibold text-slate-900"><span>Total</span><span>₹{total.toLocaleString('en-IN')}</span></div>
              </div>
              <button onClick={() => navigate('/checkout')} className="mt-8 w-full rounded-full bg-amber-600 px-6 py-3 text-sm font-semibold text-white hover:bg-amber-700 transition">Proceed to Checkout</button>
            </aside>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Cart;
