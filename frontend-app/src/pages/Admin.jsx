import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { createProductAPI, deleteProductAPI, getAllOrdersAPI, getOrderStatsAPI, getProductsAPI, updateOrderStatusAPI, updateProductAPI } from '../services/api';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

const categories = ['Living Room', 'Bedroom', 'Dining', 'Office'];
const badges = ['', 'New', 'Sale', 'Popular'];
const statusClasses = {
  pending: 'bg-amber-100 text-amber-700',
  processing: 'bg-sky-100 text-sky-700',
  shipped: 'bg-orange-100 text-orange-700',
  delivered: 'bg-emerald-100 text-emerald-700',
  cancelled: 'bg-red-100 text-red-700',
};

const Admin = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [stats, setStats] = useState({ totalOrders: 0, totalRevenue: 0, recentOrders: [] });
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formOpen, setFormOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [saving, setSaving] = useState(false);
  const [productForm, setProductForm] = useState({ name: '', description: '', price: '', originalPrice: '', category: 'Living Room', image: '', badge: '', inStock: true });
  const [formErrors, setFormErrors] = useState({});

  const loadData = async () => {
    setLoading(true);
    try {
      const statsRes = await getOrderStatsAPI();
      const productsRes = await getProductsAPI({});
      const ordersRes = await getAllOrdersAPI();
      setStats(statsRes.data);
      setProducts(productsRes.data);
      setOrders(ordersRes.data);
    } catch (err) {
      toast.error('Could not load admin data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const resetForm = () => {
    setEditingProduct(null);
    setProductForm({ name: '', description: '', price: '', originalPrice: '', category: 'Living Room', image: '', badge: '', inStock: true });
    setFormErrors({});
  };

  const openNewProduct = () => {
    resetForm();
    setFormOpen(true);
  };

  const editProduct = (product) => {
    setEditingProduct(product);
    setProductForm({
      name: product.name || '',
      description: product.description || '',
      price: product.price || '',
      originalPrice: product.originalPrice || '',
      category: product.category || 'Living Room',
      image: product.image || '',
      badge: product.badge || '',
      inStock: product.inStock ?? true,
    });
    setFormOpen(true);
  };

  const saveProduct = async () => {
    const errors = {};
    if (!productForm.name.trim()) errors.name = 'Product name is required';
    if (!productForm.description.trim()) errors.description = 'Description is required';
    if (!productForm.category.trim()) errors.category = 'Category is required';
    if (!productForm.image.trim()) errors.image = 'Image URL is required';
    if (!productForm.price || Number(productForm.price) <= 0) errors.price = 'Price must be a positive number';
    if (productForm.originalPrice && Number(productForm.originalPrice) <= 0) errors.originalPrice = 'Original price must be positive';
    setFormErrors(errors);
    if (Object.keys(errors).length) {
      toast.error('Please fix the highlighted fields');
      return;
    }
    setSaving(true);
    try {
      const payload = {
        ...productForm,
        price: Number(productForm.price),
        originalPrice: productForm.originalPrice ? Number(productForm.originalPrice) : null,
      };
      if (editingProduct) {
        await updateProductAPI(editingProduct._id, payload);
        toast.success('Product updated');
      } else {
        await createProductAPI(payload);
        toast.success('Product created');
      }
      await loadData();
      setFormOpen(false);
      resetForm();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Could not save product');
    } finally {
      setSaving(false);
    }
  };

  const deleteProduct = async (productId) => {
    if (!window.confirm('Delete this product?')) return;
    try {
      await deleteProductAPI(productId);
      toast.success('Product deleted');
      await loadData();
    } catch (err) {
      toast.error('Failed to delete product');
    }
  };

  const updateStatus = async (orderId, status) => {
    try {
      await updateOrderStatusAPI(orderId, status);
      toast.success('Order status updated');
      await loadData();
    } catch (err) {
      toast.error('Failed to update status');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <p className="text-sm uppercase tracking-[0.4em] text-amber-600">Admin panel</p>
          <h1 className="text-4xl font-bold text-slate-900">Dashboard</h1>
        </div>

        <div className="flex flex-wrap gap-3 mb-8">
          {['dashboard', 'products', 'orders'].map((tab) => (
            <button key={tab} onClick={() => setActiveTab(tab)} className={`rounded-full px-5 py-3 text-sm font-semibold transition ${activeTab === tab ? 'bg-amber-600 text-white' : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'}`}>
              {tab === 'dashboard' ? 'Dashboard' : tab === 'products' ? 'Products' : 'Orders'}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="space-y-6">
            {Array.from({ length: 3 }).map((_, idx) => (
              <div key={idx} className="h-40 rounded-[32px] bg-slate-200 animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="space-y-10">
            {activeTab === 'dashboard' && (
              <div className="space-y-8">
                <div className="grid gap-6 md:grid-cols-3">
                  <div className="rounded-[32px] bg-white border border-slate-200 p-8 shadow-sm">
                    <p className="text-sm text-slate-500 uppercase tracking-[0.3em] mb-4">Total Revenue</p>
                    <p className="text-3xl font-semibold text-slate-900">₹{Number(stats.totalRevenue).toLocaleString('en-IN')}</p>
                  </div>
                  <div className="rounded-[32px] bg-white border border-slate-200 p-8 shadow-sm">
                    <p className="text-sm text-slate-500 uppercase tracking-[0.3em] mb-4">Total Orders</p>
                    <p className="text-3xl font-semibold text-slate-900">{stats.totalOrders}</p>
                  </div>
                  <div className="rounded-[32px] bg-white border border-slate-200 p-8 shadow-sm">
                    <p className="text-sm text-slate-500 uppercase tracking-[0.3em] mb-4">Recent Orders</p>
                    <p className="text-3xl font-semibold text-slate-900">{stats.recentOrders?.length || 0}</p>
                  </div>
                </div>
                <div className="rounded-[32px] bg-white border border-slate-200 p-8 shadow-sm">
                  <h2 className="text-2xl font-semibold text-slate-900 mb-6">Recent orders</h2>
                  <div className="overflow-x-auto">
                    <table className="min-w-full text-left text-sm">
                      <thead>
                        <tr className="border-b border-slate-200">
                          <th className="py-3">Order</th>
                          <th className="py-3">Customer</th>
                          <th className="py-3">Total</th>
                          <th className="py-3">Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {stats.recentOrders?.map((order) => (
                          <tr key={order._id} className="border-b border-slate-100">
                            <td className="py-4">{order._id.slice(-8).toUpperCase()}</td>
                            <td className="py-4">{order.user?.name || 'Customer'}</td>
                            <td className="py-4">₹{order.totalAmount.toLocaleString('en-IN')}</td>
                            <td className="py-4"><span className={`rounded-full px-3 py-1 text-xs font-semibold ${statusClasses[order.status] || 'bg-slate-100 text-slate-700'}`}>{order.status}</span></td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'products' && (
              <div className="space-y-6">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <h2 className="text-2xl font-semibold text-slate-900">Products</h2>
                  <button onClick={openNewProduct} className="rounded-full bg-amber-600 px-6 py-3 text-sm font-semibold text-white hover:bg-amber-700 transition">Add Product</button>
                </div>
                <div className="overflow-x-auto rounded-[32px] bg-white border border-slate-200 shadow-sm">
                  <table className="min-w-full text-left text-sm">
                    <thead className="bg-slate-50">
                      <tr>
                        <th className="px-6 py-4">Image</th>
                        <th className="px-6 py-4">Name</th>
                        <th className="px-6 py-4">Category</th>
                        <th className="px-6 py-4">Price</th>
                        <th className="px-6 py-4">Stock</th>
                        <th className="px-6 py-4">Badge</th>
                        <th className="px-6 py-4">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {products.map((product) => (
                        <tr key={product._id} className="border-t border-slate-100 hover:bg-slate-50">
                          <td className="px-6 py-4"><img src={product.image} alt={product.name} className="h-16 w-24 rounded-2xl object-cover" /></td>
                          <td className="px-6 py-4">{product.name}</td>
                          <td className="px-6 py-4">{product.category}</td>
                          <td className="px-6 py-4">₹{product.price.toLocaleString('en-IN')}</td>
                          <td className="px-6 py-4">{product.inStock ? 'Yes' : 'No'}</td>
                          <td className="px-6 py-4">{product.badge || '-'}</td>
                          <td className="px-6 py-4 flex flex-wrap gap-2">
                            <button onClick={() => editProduct(product)} className="rounded-full bg-slate-100 px-4 py-2 text-xs font-semibold text-slate-800 hover:bg-slate-200 transition">Edit</button>
                            <button onClick={() => deleteProduct(product._id)} className="rounded-full bg-red-100 px-4 py-2 text-xs font-semibold text-red-700 hover:bg-red-200 transition">Delete</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {formOpen && (
                  <div className="rounded-[32px] bg-white border border-slate-200 p-8 shadow-sm">
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                      <h3 className="text-xl font-semibold text-slate-900">{editingProduct ? 'Edit Product' : 'Add Product'}</h3>
                      <button onClick={() => { setFormOpen(false); resetForm(); }} className="text-sm text-slate-500 hover:text-slate-800">Close panel</button>
                    </div>
                    <div className="grid gap-6 md:grid-cols-2 mt-6">
                      {[
                        { label: 'Product Name', key: 'name' },
                        { label: 'Category', key: 'category', type: 'select', options: categories },
                        { label: 'Price', key: 'price', type: 'number' },
                        { label: 'Original Price', key: 'originalPrice', type: 'number' },
                        { label: 'Image URL', key: 'image' },
                        { label: 'Badge', key: 'badge', type: 'select', options: badges },
                      ].map((field) => (
                        <div key={field.key}>
                          <label className="block text-sm font-medium text-slate-700 mb-2">{field.label}</label>
                          {field.type === 'select' ? (
                            <select value={productForm[field.key]} onChange={(e) => setProductForm({ ...productForm, [field.key]: e.target.value })} className={`w-full rounded-3xl border px-4 py-3 text-sm text-slate-900 focus:border-amber-400 ${formErrors[field.key] ? 'border-red-400' : 'border-slate-200'}`}>
                              {field.options.map((option) => (
                                <option key={option} value={option}>{option || 'None'}</option>
                              ))}
                            </select>
                          ) : (
                            <input value={productForm[field.key]} onChange={(e) => setProductForm({ ...productForm, [field.key]: e.target.value })} type={field.type || 'text'} className={`w-full rounded-3xl border px-4 py-3 text-sm text-slate-900 focus:border-amber-400 ${formErrors[field.key] ? 'border-red-400' : 'border-slate-200'}`} />
                          )}
                          {formErrors[field.key] && <p className="text-xs text-red-600 mt-2">{formErrors[field.key]}</p>}
                        </div>
                      ))}
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-slate-700 mb-2">Description</label>
                        <textarea value={productForm.description} onChange={(e) => setProductForm({ ...productForm, description: e.target.value })} rows={4} className="w-full rounded-3xl border border-slate-200 px-4 py-3 text-sm text-slate-900 focus:border-amber-400" />
                      </div>
                      <div className="flex items-center gap-3">
                        <input id="stockToggle" type="checkbox" checked={productForm.inStock} onChange={(e) => setProductForm({ ...productForm, inStock: e.target.checked })} className="h-4 w-4 text-amber-600 border-slate-300 rounded" />
                        <label htmlFor="stockToggle" className="text-sm text-slate-700">In stock</label>
                      </div>
                    </div>
                    <div className="mt-6 flex flex-wrap gap-3">
                      <button onClick={saveProduct} disabled={saving} className="rounded-full bg-amber-600 px-6 py-3 text-sm font-semibold text-white hover:bg-amber-700 transition disabled:opacity-60">
                        {saving ? 'Saving...' : editingProduct ? 'Update Product' : 'Create Product'}
                      </button>
                      <button onClick={() => { resetForm(); setFormOpen(false); }} className="rounded-full border border-slate-300 px-6 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-100 transition">Cancel</button>
                    </div>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'orders' && (
              <div className="space-y-6">
                <div className="rounded-[32px] bg-white border border-slate-200 p-8 shadow-sm overflow-x-auto">
                  <table className="min-w-full text-left text-sm">
                    <thead className="bg-slate-50">
                      <tr>
                        <th className="px-6 py-4">Order</th>
                        <th className="px-6 py-4">Customer</th>
                        <th className="px-6 py-4">Items</th>
                        <th className="px-6 py-4">Total</th>
                        <th className="px-6 py-4">Status</th>
                        <th className="px-6 py-4">Update</th>
                      </tr>
                    </thead>
                    <tbody>
                      {orders.map((order) => (
                        <tr key={order._id} className="border-t border-slate-100 hover:bg-slate-50">
                          <td className="px-6 py-4">{order._id.slice(-8).toUpperCase()}</td>
                          <td className="px-6 py-4">{order.user?.name || 'Guest'}</td>
                          <td className="px-6 py-4">{order.items.length}</td>
                          <td className="px-6 py-4">₹{order.totalAmount.toLocaleString('en-IN')}</td>
                          <td className="px-6 py-4"><span className={`rounded-full px-3 py-1 text-xs font-semibold ${statusClasses[order.status] || 'bg-slate-100 text-slate-700'}`}>{order.status}</span></td>
                          <td className="px-6 py-4">
                            <select value={order.status} onChange={(e) => updateStatus(order._id, e.target.value)} className="rounded-3xl border border-slate-200 px-3 py-2 text-sm text-slate-900">
                              {['pending', 'processing', 'shipped', 'delivered', 'cancelled'].map((status) => (
                                <option key={status} value={status}>{status}</option>
                              ))}
                            </select>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Admin;
