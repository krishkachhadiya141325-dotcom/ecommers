import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import { addReviewAPI, getProductByIdAPI, getProductsAPI } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

const Product = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { addItem } = useCart();
  const [product, setProduct] = useState(null);
  const [related, setRelated] = useState([]);
  const [qty, setQty] = useState(1);
  const [loading, setLoading] = useState(false);
  const [reviewLoading, setReviewLoading] = useState(false);
  const [reviewData, setReviewData] = useState({ rating: 5, comment: '' });
  const [reviewError, setReviewError] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const loadProduct = async () => {
      setLoading(true);
      setError('');
      try {
        const { data } = await getProductByIdAPI(id);
        setProduct(data);
        const { data: relatedData } = await getProductsAPI({ category: data.category });
        setRelated(relatedData.filter((item) => item._id !== data._id).slice(0, 4));
      } catch (err) {
        setError(err.response?.data?.message || 'Product not found');
      } finally {
        setLoading(false);
      }
    };
    loadProduct();
  }, [id]);

  const handleAddToCart = async () => {
    if (!user) {
      toast.error('Please login to add to cart');
      navigate('/auth', { state: { from: `/product/${id}` } });
      return;
    }
    await addItem(product._id, qty);
    toast.success('Added to cart');
  };

  const hasReviewed = product?.reviews?.some((reviewItem) => String(reviewItem.user) === String(user?.id || user?._id));

  const submitReview = async (event) => {
    event.preventDefault();
    if (!user) {
      toast.error('Please login to submit a review');
      navigate('/auth', { state: { from: `/product/${id}` } });
      return;
    }
    if (!reviewData.comment.trim()) {
      setReviewError('Comment is required');
      return;
    }
    setReviewError('');
    setReviewLoading(true);
    try {
      await addReviewAPI(id, { rating: reviewData.rating, comment: reviewData.comment.trim(), name: user.name });
      toast.success('Review submitted');
      const { data } = await getProductByIdAPI(id);
      setProduct(data);
      setReviewData({ rating: 5, comment: '' });
    } catch (err) {
      toast.error(err.response?.data?.message || 'Review submission failed');
    } finally {
      setReviewLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {loading ? (
          <div className="space-y-6">
            <div className="h-10 rounded-2xl bg-slate-200 animate-pulse" />
            <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
              <div className="h-96 rounded-[32px] bg-slate-200 animate-pulse" />
              <div className="space-y-4">
                <div className="h-8 rounded-2xl bg-slate-200 animate-pulse" />
                <div className="h-6 rounded-2xl bg-slate-200 animate-pulse" />
                <div className="h-20 rounded-2xl bg-slate-200 animate-pulse" />
                <div className="h-12 rounded-2xl bg-slate-200 animate-pulse" />
              </div>
            </div>
          </div>
        ) : error ? (
          <div className="rounded-[32px] bg-white border border-slate-200 p-10 text-center text-slate-700">{error}</div>
        ) : product ? (
          <div className="space-y-10">
            <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] items-start">
              <div className="rounded-[32px] overflow-hidden shadow-sm bg-white">
                <img src={product.image} alt={product.name} className="w-full h-[520px] object-cover" />
              </div>
              <div className="space-y-6">
                <div className="rounded-[32px] bg-white border border-slate-200 p-8 shadow-sm space-y-4">
                  <p className="text-sm uppercase tracking-[0.4em] text-amber-600">{product.category}</p>
                  <h1 className="text-3xl font-semibold text-slate-900">{product.name}</h1>
                  <p className="text-slate-600 leading-relaxed">{product.description}</p>
                  <div className="flex flex-wrap items-center gap-3">
                    <div className="text-3xl font-bold text-slate-900">₹{product.price.toLocaleString('en-IN')}</div>
                    {product.originalPrice && <div className="text-sm text-slate-500 line-through">₹{product.originalPrice.toLocaleString('en-IN')}</div>}
                    <div className="rounded-full bg-amber-100 text-amber-700 px-3 py-1 text-xs font-semibold uppercase tracking-[0.15em]">{product.inStock ? 'In Stock' : 'Out of Stock'}</div>
                  </div>
                  <div className="flex flex-wrap items-center gap-2 text-amber-500 text-sm">
                    {Array.from({ length: 5 }, (_, idx) => (
                      <span key={idx}>{idx < Math.round(product.rating) ? '★' : '☆'}</span>
                    ))}
                    <span className="text-slate-500">{product.rating.toFixed(1)} rating</span>
                  </div>
                  <div className="flex flex-wrap items-center gap-3">
                    <div className="flex items-center gap-2">
                      <label className="text-sm font-medium text-slate-700">Qty:</label>
                      <input type="number" min="1" max="10" value={qty} onChange={(e) => setQty(Number(e.target.value))} className="w-20 rounded-3xl border border-slate-200 px-4 py-2 text-sm" />
                    </div>
                    <button onClick={handleAddToCart} disabled={!product.inStock} className="rounded-full bg-amber-600 px-6 py-3 text-sm font-semibold text-white hover:bg-amber-700 transition disabled:opacity-60">
                      Add to Cart
                    </button>
                  </div>
                </div>

                <div className="rounded-[32px] bg-white border border-slate-200 p-8 shadow-sm">
                  <h2 className="text-xl font-semibold text-slate-900 mb-4">Reviews</h2>
                  {product.reviews.length === 0 ? (
                    <p className="text-slate-500">No reviews yet. Be the first to review this product.</p>
                  ) : (
                    <div className="space-y-5">
                      {product.reviews.map((review) => (
                        <div key={review._id || `${review.user}-${review.comment}`} className="rounded-3xl bg-slate-50 p-5">
                          <div className="flex items-center justify-between gap-3 mb-3">
                            <div>
                              <p className="font-semibold text-slate-900">{review.name}</p>
                              <p className="text-xs text-slate-500">{new Date(review.createdAt).toLocaleDateString('en-IN')}</p>
                            </div>
                            <div className="text-amber-500 text-sm">{Array.from({ length: 5 }, (_, idx) => <span key={idx}>{idx < review.rating ? '★' : '☆'}</span>)}</div>
                          </div>
                          <p className="text-slate-700 text-sm leading-relaxed">{review.comment}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="rounded-[32px] bg-white border border-slate-200 p-8 shadow-sm">
                  <h2 className="text-xl font-semibold text-slate-900 mb-4">Leave a review</h2>
                  {hasReviewed ? (
                    <p className="text-slate-500">You already reviewed this product.</p>
                  ) : (
                    <form className="space-y-4" onSubmit={submitReview}>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">Rating</label>
                        <select value={reviewData.rating} onChange={(e) => setReviewData({ ...reviewData, rating: Number(e.target.value) })} className="w-full rounded-3xl border border-slate-200 px-4 py-3 text-sm text-slate-900 focus:border-amber-400">
                          {[5, 4, 3, 2, 1].map((value) => (
                            <option key={value} value={value}>{value} Star{value > 1 ? 's' : ''}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">Comment</label>
                        <textarea value={reviewData.comment} onChange={(e) => setReviewData({ ...reviewData, comment: e.target.value })} rows={5} className="w-full rounded-3xl border border-slate-200 px-4 py-3 text-sm text-slate-900 focus:border-amber-400" />
                        {reviewError && <p className="text-xs text-red-600 mt-2">{reviewError}</p>}
                      </div>
                      <button type="submit" disabled={reviewLoading} className="rounded-full bg-amber-600 px-6 py-3 text-sm font-semibold text-white hover:bg-amber-700 transition disabled:opacity-60">
                        {reviewLoading ? 'Submitting...' : 'Submit Review'}
                      </button>
                    </form>
                  )}
                </div>
              </div>
            </div>

            {related.length > 0 && (
              <section className="space-y-6">
                <div className="flex items-center justify-between gap-4">
                  <h2 className="text-2xl font-semibold text-slate-900">Related Products</h2>
                  <button onClick={() => navigate('/shop')} className="text-sm text-amber-600 hover:text-amber-700">View all products</button>
                </div>
                <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
                  {related.map((item) => (
                    <button key={item._id} onClick={() => navigate(`/product/${item._id}`)} className="group rounded-[32px] overflow-hidden bg-white border border-slate-200 shadow-sm text-left">
                      <div className="h-48 bg-cover bg-center" style={{ backgroundImage: `url(${item.image})` }} />
                      <div className="p-4">
                        <p className="text-sm text-slate-500 mb-2">{item.category}</p>
                        <h3 className="text-lg font-semibold text-slate-900">{item.name}</h3>
                      </div>
                    </button>
                  ))}
                </div>
              </section>
            )}
          </div>
        ) : null}
      </main>
      <Footer />
    </div>
  );
};

export default Product;
