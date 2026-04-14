import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { getProductsAPI } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

const SkeletonCard = () => (
  <div className="animate-pulse bg-white rounded-xl overflow-hidden shadow">
    <div className="bg-gray-200 h-48 w-full" />
    <div className="p-4 space-y-2">
      <div className="bg-gray-200 h-4 rounded w-3/4" />
      <div className="bg-gray-200 h-4 rounded w-1/2" />
      <div className="bg-gray-200 h-8 rounded w-full mt-3" />
    </div>
  </div>
);

const categories = ['All', 'Living Room', 'Bedroom', 'Dining', 'Office'];
const sortOptions = [
  { value: '', label: 'Newest' },
  { value: 'price_asc', label: 'Price: Low to High' },
  { value: 'price_desc', label: 'Price: High to Low' },
  { value: 'rating', label: 'Top Rated' },
];

const stars = (value) => Array.from({ length: 5 }, (_, i) => i < value);

const Shop = () => {
  const { user } = useAuth();
  const { addItem } = useCart();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [sort, setSort] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const timer = setTimeout(async () => {
      setLoading(true);
      try {
        const params = {};
        if (category !== 'All') params.category = category;
        if (search.trim()) params.search = search.trim();
        if (sort) params.sort = sort;
        const { data } = await getProductsAPI(params);
        setProducts(data);
      } catch (err) {
        toast.error(err.response?.data?.message || 'Failed to load products');
      } finally {
        setLoading(false);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [category, search, sort]);

  const handleAdd = async (productId) => {
    if (!user) {
      toast.error('Please login to add to cart');
      navigate('/auth', { state: { from: '/shop' } });
      return;
    }
    await addItem(productId, 1);
  };

  const productGrid = useMemo(() => {
    if (loading) {
      return Array.from({ length: 8 }).map((_, idx) => <SkeletonCard key={idx} />);
    }
    if (products.length === 0) {
      return <p className="col-span-full text-center text-slate-500 py-24">No products found. Try a different search or filter.</p>;
    }
    return products.map((product) => (
      <div key={product._id} className="rounded-[32px] bg-white shadow-sm overflow-hidden group">
        <div className="h-72 bg-cover bg-center" style={{ backgroundImage: `url(${product.image})` }} />
        <div className="p-5 space-y-4">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-sm text-slate-500">{product.category}</p>
              <h3 className="text-lg font-semibold text-slate-900">{product.name}</h3>
            </div>
            {product.badge && <span className="rounded-full bg-amber-100 text-amber-700 px-3 py-1 text-xs uppercase tracking-[0.15em]">{product.badge}</span>}
          </div>
          <div className="flex items-center gap-1 text-amber-500 text-sm">
            {stars(Math.round(product.rating)).map((filled, idx) => (
              <span key={idx}>{filled ? '★' : '☆'}</span>
            ))}
            <span className="text-slate-500 ml-2">{product.rating.toFixed(1)}</span>
          </div>
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-lg font-bold text-slate-900">₹{product.price.toLocaleString('en-IN')}</p>
              {product.originalPrice && <p className="text-sm text-slate-500 line-through">₹{product.originalPrice.toLocaleString('en-IN')}</p>}
            </div>
            <button onClick={() => handleAdd(product._id)} disabled={!product.inStock} className="rounded-full bg-amber-600 px-4 py-2 text-sm font-semibold text-white hover:bg-amber-700 transition disabled:cursor-not-allowed disabled:opacity-60">
              {product.inStock ? 'Add to Cart' : 'Out of Stock'}
            </button>
          </div>
        </div>
      </div>
    ));
  }, [loading, products, user]);

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-10 space-y-3">
          <p className="text-sm uppercase tracking-[0.4em] text-amber-600">Shop</p>
          <h1 className="text-4xl font-bold text-slate-900">Browse our full collection</h1>
          <p className="text-slate-600 max-w-2xl">Filter by category, search by name, or sort the collection to find the perfect furniture for your home.</p>
        </div>

        <div className="grid gap-4 lg:grid-cols-[1fr_280px]">
          <section className="space-y-6">
            <div className="grid gap-4 md:grid-cols-[1.5fr_1fr]">
              <div className="rounded-[28px] bg-white border border-slate-200 px-5 py-4">
                <label className="block text-sm font-medium text-slate-700 mb-2">Search</label>
                <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search products..." className="w-full rounded-3xl border border-slate-200 px-4 py-3 text-sm text-slate-900 focus:border-amber-400" />
              </div>
              <div className="rounded-[28px] bg-white border border-slate-200 px-5 py-4">
                <label className="block text-sm font-medium text-slate-700 mb-2">Sort</label>
                <select value={sort} onChange={(e) => setSort(e.target.value)} className="w-full rounded-3xl border border-slate-200 px-4 py-3 text-sm text-slate-900 focus:border-amber-400">
                  {sortOptions.map(option => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="rounded-[32px] bg-white border border-slate-200 p-5">
              <p className="text-sm font-semibold text-slate-900 mb-4">Categories</p>
              <div className="flex flex-wrap gap-3">
                {categories.map((item) => (
                  <button key={item} onClick={() => setCategory(item)} className={`rounded-full px-4 py-2 text-sm font-medium transition ${category === item ? 'bg-amber-600 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}`}>
                    {item}
                  </button>
                ))}
              </div>
            </div>
          </section>

          <section className="rounded-[32px] bg-white border border-slate-200 p-6">
            <p className="text-sm uppercase tracking-[0.4em] text-amber-600 mb-3">Your cart</p>
            <p className="text-slate-700">Add favorites to your cart and checkout when ready.</p>
            <div className="mt-5 rounded-3xl bg-amber-50 p-5">
              <p className="text-sm text-slate-600">Logged in as:</p>
              <p className="font-semibold text-slate-900">{user ? user.name : 'Guest'}</p>
            </div>
          </section>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {productGrid}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Shop;
