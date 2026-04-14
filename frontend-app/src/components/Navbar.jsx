import { useState } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

const navItems = [
  { label: 'Home', path: '/' },
  { label: 'Shop', path: '/shop' },
  { label: 'Blog', path: '/blog' },
  { label: 'Contact', path: '/contact' },
];

const Navbar = () => {
  const { user, logout, isAdmin } = useAuth();
  const { cartCount } = useCart();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <header className="bg-white shadow-sm sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <button onClick={() => navigate('/')} className="text-2xl font-bold text-amber-700">Harmony Furniture</button>

          <nav className="hidden md:flex items-center gap-6">
            {navItems.map(item => (
              <NavLink key={item.path} to={item.path} className={({ isActive }) => `text-sm font-medium ${isActive ? 'text-amber-700' : 'text-slate-600 hover:text-amber-600'}`}>
                {item.label}
              </NavLink>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-4">
            <button onClick={() => navigate('/cart')} className="relative p-2 rounded-full text-slate-600 hover:text-amber-600 transition">
              🛒
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 inline-flex items-center justify-center rounded-full bg-amber-600 text-white text-[10px] font-bold w-5 h-5">{cartCount}</span>
              )}
            </button>
            {user ? (
              <div className="flex items-center gap-3">
                {isAdmin && (
                  <button onClick={() => navigate('/admin')} className="text-xs uppercase tracking-[0.2em] bg-amber-100 text-amber-700 rounded-full px-3 py-1">
                    Admin
                  </button>
                )}
                <button onClick={() => navigate('/my-orders')} className="text-sm text-slate-700 hover:text-amber-600">{user.name}</button>
                <button onClick={logout} className="rounded-full border border-slate-200 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 transition">Logout</button>
              </div>
            ) : (
              <button onClick={() => navigate('/auth')} className="rounded-full bg-amber-600 text-white px-4 py-2 text-sm hover:bg-amber-700 transition">Login</button>
            )}
          </div>

          <button onClick={() => setOpen(prev => !prev)} className="md:hidden p-2 rounded-lg border border-slate-200">
            {open ? '✕' : '☰'}
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden bg-white border-t border-slate-200">
          <div className="px-4 py-4 space-y-3">
            {navItems.map(item => (
              <button key={item.path} onClick={() => { navigate(item.path); setOpen(false); }} className="block w-full text-left text-slate-700 font-medium hover:text-amber-600 transition">
                {item.label}
              </button>
            ))}
            <button onClick={() => { navigate('/cart'); setOpen(false); }} className="flex items-center gap-2 w-full text-left text-slate-700 font-medium hover:text-amber-600 transition">
              🛒 Cart {cartCount > 0 ? `(${cartCount})` : ''}
            </button>
            {user ? (
              <>
                {isAdmin && <button onClick={() => { navigate('/admin'); setOpen(false); }} className="block w-full text-left text-slate-700 font-medium hover:text-amber-600 transition">Admin</button>}
                <button onClick={() => { navigate('/my-orders'); setOpen(false); }} className="block w-full text-left text-slate-700 font-medium hover:text-amber-600 transition">My Orders</button>
                <button onClick={() => { logout(); setOpen(false); }} className="block w-full text-left rounded-full border border-slate-200 px-4 py-2 text-slate-700 hover:bg-slate-50 transition">Logout</button>
              </>
            ) : (
              <button onClick={() => { navigate('/auth'); setOpen(false); }} className="block w-full rounded-full bg-amber-600 text-white px-4 py-2 text-sm hover:bg-amber-700 transition">Login</button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
