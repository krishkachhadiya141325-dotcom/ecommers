import { useNavigate } from 'react-router-dom';

const Footer = () => {
  const navigate = useNavigate();
  const links = [
    { label: 'Home', path: '/' },
    { label: 'Shop', path: '/shop' },
    { label: 'Blog', path: '/blog' },
    { label: 'Contact', path: '/contact' },
  ];

  return (
    <footer className="bg-slate-900 text-slate-200 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid gap-8 md:grid-cols-3">
        <div>
          <h2 className="text-xl font-bold text-white">Harmony Furniture</h2>
          <p className="mt-3 text-sm text-slate-400">Modern furniture curated for comfort, style, and everyday living.</p>
        </div>
        <div>
          <h3 className="font-semibold text-white mb-4">Quick Links</h3>
          <div className="space-y-2">
            {links.map(link => (
              <button key={link.label} onClick={() => navigate(link.path)} className="text-sm text-slate-400 hover:text-amber-400 transition block text-left">
                {link.label}
              </button>
            ))}
          </div>
        </div>
        <div>
          <h3 className="font-semibold text-white mb-4">Contact</h3>
          <p className="text-sm text-slate-400">Marwadi University, Rajkot</p>
          <p className="text-sm text-slate-400 mt-2">support@harmonyfurniture.com</p>
        </div>
      </div>
      <div className="mt-10 border-t border-slate-800 pt-6 text-center text-sm text-slate-500">
        © 2024 Harmony Furniture. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
