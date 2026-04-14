import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const Auth = () => {
  const { user, login, register } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';

  const [mode, setMode] = useState('login');
  const [form, setForm] = useState({ name: '', email: '', password: '', confirmPassword: '' });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState('');

  useEffect(() => {
    if (user && location.pathname === '/auth') {
      navigate('/');
    }
  }, [user, navigate, location.pathname]);

  const validate = () => {
    const next = {};
    if (!form.email.trim()) next.email = 'Email is required';
    else if (!emailRegex.test(form.email)) next.email = 'Please enter a valid email';
    if (!form.password.trim()) next.password = 'Password is required';
    if (mode === 'register') {
      if (!form.name.trim()) next.name = 'Name is required';
      else if (form.name.trim().length < 2) next.name = 'Name must be at least 2 characters';
      if (!form.confirmPassword.trim()) next.confirmPassword = 'Please confirm your password';
      else if (form.password !== form.confirmPassword) next.confirmPassword = 'Passwords must match';
      if (form.password.length < 6) next.password = 'Password must be at least 6 characters';
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setApiError('');
    if (!validate()) return;

    try {
      setLoading(true);
      if (mode === 'login') {
        const loggedIn = await login(form.email.trim(), form.password);
        if (loggedIn.role === 'admin') {
          navigate('/admin');
        } else {
          navigate(from === '/auth' ? '/' : from);
        }
      } else {
        await register(form.name.trim(), form.email.trim(), form.password);
        navigate('/');
      }
    } catch (err) {
      const message = err?.response?.data?.message || err?.message || 'Something went wrong';
      setApiError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  const handleForgot = () => toast('Password reset coming soon!');

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar />
      <main className="flex-1 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto grid gap-12 lg:grid-cols-[1.2fr_0.8fr] items-center">
          <div className="space-y-6">
            <p className="text-sm uppercase tracking-[0.4em] text-amber-600">Harmony Furniture</p>
            <h1 className="text-4xl font-bold text-slate-900">Welcome back, let&apos;s get you moving.</h1>
            <p className="text-slate-600 leading-relaxed">Access your account, view orders, and manage your cart with a frictionless shopping experience.</p>
            <div className="flex gap-3">
              <button onClick={() => setMode('login')} className={`px-5 py-3 rounded-full font-semibold transition ${mode === 'login' ? 'bg-amber-600 text-white' : 'bg-white text-slate-700 border border-slate-200 hover:border-amber-300'}`}>Login</button>
              <button onClick={() => setMode('register')} className={`px-5 py-3 rounded-full font-semibold transition ${mode === 'register' ? 'bg-amber-600 text-white' : 'bg-white text-slate-700 border border-slate-200 hover:border-amber-300'}`}>Register</button>
            </div>
          </div>

          <section className="rounded-[32px] bg-white p-8 shadow-lg border border-slate-200">
            <h2 className="text-2xl font-semibold text-slate-900 mb-6">{mode === 'login' ? 'Sign in to your account' : 'Create your account'}</h2>
            {apiError && <p className="text-sm text-red-600 mb-4">{apiError}</p>}
            <form className="space-y-5" onSubmit={handleSubmit}>
              {mode === 'register' && (
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Name</label>
                  <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full rounded-3xl border border-slate-200 px-4 py-3 text-sm text-slate-900 focus:border-amber-400" />
                  {errors.name && <p className="text-xs text-red-600 mt-1">{errors.name}</p>}
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Email address</label>
                <input value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} type="email" className="w-full rounded-3xl border border-slate-200 px-4 py-3 text-sm text-slate-900 focus:border-amber-400" />
                {errors.email && <p className="text-xs text-red-600 mt-1">{errors.email}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Password</label>
                <input value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} type="password" className="w-full rounded-3xl border border-slate-200 px-4 py-3 text-sm text-slate-900 focus:border-amber-400" />
                {errors.password && <p className="text-xs text-red-600 mt-1">{errors.password}</p>}
              </div>

              {mode === 'register' && (
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Confirm Password</label>
                  <input value={form.confirmPassword} onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })} type="password" className="w-full rounded-3xl border border-slate-200 px-4 py-3 text-sm text-slate-900 focus:border-amber-400" />
                  {errors.confirmPassword && <p className="text-xs text-red-600 mt-1">{errors.confirmPassword}</p>}
                </div>
              )}

              <div className="flex items-center justify-between">
                <button type="submit" disabled={loading} className="inline-flex items-center justify-center rounded-full bg-amber-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-amber-700 disabled:opacity-70">
                  {loading ? 'Processing...' : mode === 'login' ? 'Login' : 'Register'}
                </button>
                {mode === 'login' && (
                  <button type="button" onClick={handleForgot} className="text-sm text-slate-500 hover:text-amber-600 transition">Forgot Password?</button>
                )}
              </div>
            </form>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Auth;
