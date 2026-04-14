import { useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Navbar />
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-12 text-center">
        <h1 className="text-[8rem] font-black leading-none text-slate-200">404</h1>
        <h2 className="text-3xl font-semibold text-slate-900 mt-6">Page Not Found</h2>
        <p className="text-slate-500 mt-4 max-w-xl">The page you&apos;re looking for doesn&apos;t exist or has been moved. Let&apos;s get you back home.</p>
        <button onClick={() => navigate('/')} className="mt-8 rounded-full bg-amber-600 px-8 py-3 text-sm font-semibold text-white hover:bg-amber-700 transition">Go Home</button>
      </div>
      <Footer />
    </div>
  );
};

export default NotFound;
