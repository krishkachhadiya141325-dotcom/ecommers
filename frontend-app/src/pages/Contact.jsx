import { useState } from 'react';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

const Contact = () => {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [sent, setSent] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    setSent(true);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="rounded-[32px] bg-cream p-12 text-center">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">Get in touch with us</h1>
          <p className="text-slate-600 max-w-2xl mx-auto">For more information about our products and services, please send us a message and we&apos;ll get back to you soon.</p>
        </div>

        <div className="mt-12 grid gap-12 lg:grid-cols-2">
          <div className="rounded-[32px] bg-white border border-slate-200 p-10 shadow-sm space-y-8">
            {[
              { icon: '📍', title: 'Address', detail: 'Marwadi University, Rajkot 360001' },
              { icon: '📞', title: 'Phone', detail: '+91 98765 43210' },
              { icon: '🕐', title: 'Working Time', detail: 'Monday–Friday: 9:00–22:00\nSaturday–Sunday: 9:00–21:00' },
            ].map((info) => (
              <div key={info.title} className="flex gap-5">
                <div className="text-3xl mt-1">{info.icon}</div>
                <div>
                  <h3 className="font-semibold text-slate-900 text-lg mb-1">{info.title}</h3>
                  <p className="text-slate-500 whitespace-pre-line">{info.detail}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="rounded-[32px] bg-white border border-slate-200 p-10 shadow-sm">
            {sent ? (
              <div className="flex flex-col items-center justify-center gap-4 text-center py-16">
                <span className="text-6xl">✅</span>
                <h2 className="text-2xl font-semibold text-slate-900">Message sent!</h2>
                <p className="text-slate-600">We&apos;ll get back to you within 24 hours.</p>
                <button onClick={() => { setSent(false); setForm({ name: '', email: '', subject: '', message: '' }); }} className="rounded-full border border-amber-600 px-8 py-3 text-sm font-semibold text-amber-600 hover:bg-amber-50 transition">Send another message</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {['name', 'email', 'subject'].map((field) => (
                  <div key={field}>
                    <label className="block text-sm font-medium text-slate-700 mb-2">{field === 'name' ? 'Your name' : field === 'email' ? 'Email address' : 'Subject'}</label>
                    <input value={form[field]} onChange={(e) => setForm({ ...form, [field]: e.target.value })} type={field === 'email' ? 'email' : 'text'} className="w-full rounded-3xl border border-slate-200 px-4 py-3 text-sm text-slate-900 focus:border-amber-400" />
                  </div>
                ))}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Message</label>
                  <textarea value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} rows={5} className="w-full rounded-3xl border border-slate-200 px-4 py-3 text-sm text-slate-900 focus:border-amber-400 resize-none" placeholder="Hi! I'd like to ask about..." />
                </div>
                <button type="submit" className="rounded-full bg-amber-600 px-8 py-3 text-sm font-semibold text-white hover:bg-amber-700 transition">Submit</button>
              </form>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Contact;
