import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { getProductsAPI } from '../services/api';
import { useCart } from '../context/CartContext';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

const Home = () => {
  const [featured, setFeatured] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { addItem } = useCart();

  useEffect(() => {
    const loadProducts = async () => {
      setLoading(true);
      try {
        const { data } = await getProductsAPI({ sort: 'rating' });
        setFeatured(data.slice(0, 4));
      } catch (err) {
        toast.error(err.response?.data?.message || 'Failed to load featured products');
      } finally {
        setLoading(false);
      }
    };
    loadProducts();
  }, []);

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <section className="mt-8 grid gap-10 lg:grid-cols-[1.2fr_0.8fr] items-center bg-cream rounded-[36px] overflow-hidden shadow-sm">
          <div className="p-10">
            <p className="text-sm uppercase tracking-[0.4em] text-amber-600 mb-4">New Arrival</p>
            <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 leading-tight mb-6">Discover our newest furniture collection</h1>
            <p className="text-slate-600 max-w-xl mb-8">Harmony Furniture blends beauty and comfort to elevate every room. Shop modern designs crafted for luxury living and everyday warmth.</p>
            <div className="flex flex-wrap gap-4">
              <button onClick={() => navigate('/shop')} className="rounded-full bg-amber-600 px-8 py-3 text-sm font-semibold text-white hover:bg-amber-700 transition">Shop Now</button>
              <button onClick={() => navigate('/contact')} className="rounded-full border border-slate-300 px-8 py-3 text-sm font-semibold text-slate-700 hover:border-amber-500 hover:text-amber-600 transition">Contact Us</button>
            </div>
          </div>
          <div className="h-80 sm:h-[520px] bg-[url('https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1000&q=80')] bg-cover bg-center"></div>
        </section>

        <section className="mt-16 text-center">
          <p className="text-sm text-amber-600 uppercase tracking-[0.4em] mb-3">Explore categories</p>
          <h2 className="text-3xl font-bold text-slate-900 mb-10">Find furniture for every room</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { label: 'Living Room', image: 'https://images.unsplash.com/photo-1540575467063-178a50dd11b6?auto=format&fit=crop&w=800&q=80' },
              { label: 'Bedroom', image: 'https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=800&q=80' },
              { label: 'Dining', image: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=800&q=80' },
            ].map((category) => (
              <button key={category.label} onClick={() => navigate('/shop')} className="group overflow-hidden rounded-[32px] bg-white shadow-sm text-left">
                <div className="h-64 bg-cover bg-center" style={{ backgroundImage: `url(${category.image})` }} />
                <div className="px-6 py-5">
                  <h3 className="text-xl font-semibold text-slate-900 group-hover:text-amber-600 transition">{category.label}</h3>
                  <p className="text-sm text-slate-500 mt-2">Curated pieces for your {category.label.toLowerCase()}.</p>
                </div>
              </button>
            ))}
          </div>
        </section>

        <section className="mt-16">
          <div className="flex flex-col sm:flex-row items-center justify-between mb-8 gap-4">
            <div>
              <p className="text-sm uppercase tracking-[0.4em] text-amber-600 mb-2">Featured Products</p>
              <h2 className="text-3xl font-bold text-slate-900">Top rated picks</h2>
            </div>
            <button onClick={() => navigate('/shop')} className="rounded-full border border-slate-300 px-6 py-3 text-sm font-semibold text-slate-700 hover:border-amber-500 hover:text-amber-600 transition">Browse All</button>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
            {loading ? Array.from({ length: 4 }).map((_, idx) => (
              <div key={idx} className="h-96 rounded-[32px] bg-slate-200 animate-pulse" />
            )) : featured.map((product) => (
              <div key={product._id} className="rounded-[32px] bg-white shadow-sm overflow-hidden group">
                <div className="h-64 bg-cover bg-center" style={{ backgroundImage: `url(${product.image})` }} />
                <div className="p-5 space-y-4">
                  <div className="flex items-center justify-between gap-2">
                    <div>
                      <p className="text-sm text-slate-500">{product.category}</p>
                      <h3 className="text-lg font-semibold text-slate-900">{product.name}</h3>
                    </div>
                    {product.badge && <span className="rounded-full bg-amber-100 text-amber-700 px-3 py-1 text-xs font-semibold">{product.badge}</span>}
                  </div>
                  <div className="flex items-center justify-between gap-3">
                    <div className="text-lg font-bold text-slate-900">₹{product.price.toLocaleString('en-IN')}</div>
                    <button onClick={() => addItem(product._id, 1)} className="rounded-full bg-amber-600 px-4 py-2 text-sm font-semibold text-white hover:bg-amber-700 transition">Add to Cart</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-16 rounded-[32px] bg-white shadow-sm p-10 grid gap-8 lg:grid-cols-4 text-center">
          {[
            { icon: '🏆', title: 'Premium Quality', label: 'Fine materials with elegant finishes.' },
            { icon: '🚚', title: 'Free Shipping', label: 'Free delivery on orders over ₹5,000.' },
            { icon: '🕒', title: 'Fast Support', label: 'Expert help available 24/7.' },
            { icon: '🎨', title: 'Stylish Designs', label: 'Modern collections for every room.' },
          ].map((feature) => (
            <div key={feature.title} className="rounded-[28px] border border-slate-200 p-6">
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">{feature.title}</h3>
              <p className="text-sm text-slate-500">{feature.label}</p>
            </div>
          ))}
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Home;
