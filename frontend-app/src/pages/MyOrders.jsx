import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { getMyOrdersAPI } from '../services/api';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

const statusColors = {
  pending: 'bg-amber-100 text-amber-700',
  processing: 'bg-sky-100 text-sky-700',
  shipped: 'bg-orange-100 text-orange-700',
  delivered: 'bg-emerald-100 text-emerald-700',
  cancelled: 'bg-red-100 text-red-700',
};

const MyOrders = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const { data } = await getMyOrdersAPI();
        setOrders(data);
      } catch (err) {
        toast.error(err.response?.data?.message || 'Failed to load your orders');
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <p className="text-sm uppercase tracking-[0.4em] text-amber-600">My Orders</p>
          <h1 className="text-4xl font-bold text-slate-900">Order history</h1>
        </div>
        {loading ? (
          <div className="space-y-6">
            {Array.from({ length: 3 }).map((_, idx) => (
              <div key={idx} className="h-44 rounded-[32px] bg-slate-200 animate-pulse" />
            ))}
          </div>
        ) : orders.length === 0 ? (
          <div className="rounded-[32px] bg-white border border-slate-200 p-12 text-center">
            <p className="text-2xl font-semibold text-slate-900 mb-4">No orders yet</p>
            <p className="text-slate-600 mb-8">Once you place an order, it will appear here.</p>
            <button onClick={() => navigate('/shop')} className="rounded-full bg-amber-600 px-8 py-3 text-sm font-semibold text-white hover:bg-amber-700 transition">Start Shopping</button>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <div key={order._id} className="rounded-[32px] bg-white border border-slate-200 p-6 shadow-sm">
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                  <div>
                    <p className="text-sm text-slate-500">Order ID</p>
                    <p className="font-semibold text-slate-900">{order._id.slice(-8).toUpperCase()}</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-500">Placed on</p>
                    <p className="font-semibold text-slate-900">{new Date(order.createdAt).toLocaleDateString('en-IN')}</p>
                  </div>
                  <span className={`rounded-full px-3 py-1 text-xs font-semibold ${statusColors[order.status] || 'bg-slate-100 text-slate-700'}`}>{order.status}</span>
                </div>
                <div className="mt-6 grid gap-4 md:grid-cols-2">
                  <div>
                    <p className="text-sm text-slate-500 mb-2">Items</p>
                    <ul className="space-y-2 text-slate-700">
                      {order.items.map((item) => (
                        <li key={item.product} className="flex items-center justify-between">
                          <span>{item.name} x {item.quantity}</span>
                          <span>₹{(item.price * item.quantity).toLocaleString('en-IN')}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="text-sm text-slate-500 mb-2">Total</p>
                    <p className="text-2xl font-semibold text-slate-900">₹{order.totalAmount.toLocaleString('en-IN')}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default MyOrders;
