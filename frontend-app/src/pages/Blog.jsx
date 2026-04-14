import { useState } from 'react';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

const BLOG_POSTS = [
  {
    id: 1,
    title: 'Going all-in with millennial design',
    date: '14 Oct 2023',
    author: 'Admin',
    category: 'Design',
    img: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1000&q=80',
    excerpt: 'The millennial design trend has transformed how we think about living spaces. Bold choices, earthy tones, and purposeful minimalism are leading the conversation.',
  },
  {
    id: 2,
    title: 'Exploring new ways of decorating',
    date: '03 Nov 2023',
    author: 'Admin',
    category: 'Crafts',
    img: 'https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=1000&q=80',
    excerpt: 'Decoration is not just about aesthetics — it\'s about creating an experience. We explore the latest ideas shaping how modern homes feel and function.',
  },
  {
    id: 3,
    title: 'Handmade pieces that shine bright',
    date: '19 Nov 2023',
    author: 'Admin',
    category: 'Handmade',
    img: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1000&q=80',
    excerpt: 'We bring attention back to the beauty of handcrafted furniture, celebrating artisans who put soul into every piece they create for your home.',
  },
  {
    id: 4,
    title: 'Transforming spaces with smart interior choices',
    date: '12 Dec 2023',
    author: 'Admin',
    category: 'Interior',
    img: 'https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=1000&q=80',
    excerpt: 'Interior design is more than arranging furniture. Discover how lighting, layout, and purpose can completely transform the energy of a room.',
  },
  {
    id: 5,
    title: 'The timeless appeal of solid wood',
    date: '05 Jan 2024',
    author: 'Admin',
    category: 'Wood',
    img: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1000&q=80',
    excerpt: 'Solid wood brings warmth, character, and durability to any environment. Learn why investing in authentic wood furniture is always a smart choice.',
  },
];

const Blog = () => {
  const [searchValue, setSearchValue] = useState('');
  const [activePost, setActivePost] = useState(null);

  const filtered = BLOG_POSTS.filter((post) =>
    post.title.toLowerCase().includes(searchValue.toLowerCase()) || post.category.toLowerCase().includes(searchValue.toLowerCase()),
  );

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="rounded-[32px] bg-cream p-12 text-center">
          <p className="text-sm uppercase tracking-[0.4em] text-amber-600 mb-3">Harmony Journal</p>
          <h1 className="text-4xl font-bold text-slate-900">Design ideas, style tips & inspiration</h1>
          <p className="text-slate-600 mt-4 max-w-2xl mx-auto">Curated stories and decorating guides to help you create more beautiful and functional spaces.</p>
        </div>

        {activePost ? (
          <article className="mt-12 rounded-[32px] bg-white border border-slate-200 p-8 shadow-sm">
            <button onClick={() => setActivePost(null)} className="text-sm text-amber-600 hover:text-amber-700">← Back to Blog</button>
            <img src={activePost.img} alt={activePost.title} className="mt-6 w-full h-80 object-cover rounded-[32px]" />
            <div className="mt-6 flex flex-wrap items-center gap-3 text-sm text-slate-500">
              <span>📅 {activePost.date}</span>
              <span>✍️ {activePost.author}</span>
              <span className="rounded-full bg-amber-100 px-3 py-1 text-amber-700">{activePost.category}</span>
            </div>
            <h2 className="text-3xl font-semibold text-slate-900 mt-4">{activePost.title}</h2>
            <p className="mt-4 text-slate-600 leading-relaxed">{activePost.excerpt}</p>
            <p className="mt-4 text-slate-600 leading-relaxed">Harmony Furniture is committed to bringing you designs that transcend trends. Each piece is crafted to complement the unique story of your home, blending modern aesthetics with timeless craftsmanship. From the selection of raw materials to the finishing touches, our team ensures that every product meets the highest standards of quality and design.</p>
          </article>
        ) : (
          <div className="grid gap-12 lg:grid-cols-[1.8fr_0.9fr] mt-12">
            <div className="space-y-10">
              {filtered.map((post) => (
                <article key={post.id} className="group rounded-[32px] overflow-hidden bg-white border border-slate-200 shadow-sm">
                  <div className="h-80 bg-cover bg-center" style={{ backgroundImage: `url(${post.img})` }} />
                  <div className="p-8">
                    <div className="flex flex-wrap items-center gap-3 text-sm text-slate-500 mb-4">
                      <span>📅 {post.date}</span>
                      <span>✍️ {post.author}</span>
                      <span className="rounded-full bg-amber-100 px-3 py-1 text-amber-700">{post.category}</span>
                    </div>
                    <h2 onClick={() => setActivePost(post)} className="cursor-pointer text-2xl font-semibold text-slate-900 hover:text-amber-600 transition">{post.title}</h2>
                    <p className="mt-4 text-slate-600 leading-relaxed">{post.excerpt}</p>
                    <button onClick={() => setActivePost(post)} className="mt-6 text-sm font-semibold text-amber-600 hover:text-amber-700">Read More →</button>
                  </div>
                </article>
              ))}
              {filtered.length === 0 && <p className="text-slate-500">No posts found.</p>}
            </div>
            <aside className="space-y-10">
              <div className="rounded-[32px] bg-white border border-slate-200 p-6 shadow-sm">
                <h3 className="text-xl font-semibold text-slate-900 mb-4">Search</h3>
                <div className="flex items-center gap-2 rounded-3xl border border-slate-200 px-4 py-3">
                  <input value={searchValue} onChange={(e) => setSearchValue(e.target.value)} placeholder="Search posts..." className="w-full bg-transparent text-sm text-slate-900 outline-none" />
                  <span className="text-amber-600">🔍</span>
                </div>
              </div>
              <div className="rounded-[32px] bg-white border border-slate-200 p-6 shadow-sm">
                <h3 className="text-xl font-semibold text-slate-900 mb-4">Categories</h3>
                <div className="space-y-2">
                  {['Crafts', 'Design', 'Handmade', 'Interior', 'Wood'].map((category) => (
                    <button key={category} onClick={() => setSearchValue(category)} className="flex w-full justify-between rounded-3xl px-4 py-3 text-sm text-slate-700 hover:bg-slate-100 transition">
                      <span>{category}</span>
                      <span className="rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-600">{Math.floor(Math.random() * 10) + 1}</span>
                    </button>
                  ))}
                </div>
              </div>
              <div className="rounded-[32px] bg-white border border-slate-200 p-6 shadow-sm">
                <h3 className="text-xl font-semibold text-slate-900 mb-4">Recent Posts</h3>
                <div className="space-y-4">
                  {BLOG_POSTS.map((post) => (
                    <button key={post.id} onClick={() => setActivePost(post)} className="flex items-center gap-3 text-left w-full rounded-3xl px-3 py-3 hover:bg-slate-100 transition">
                      <img src={post.img} alt={post.title} className="h-16 w-16 rounded-2xl object-cover" />
                      <div className="text-sm text-slate-700">
                        <p className="font-medium">{post.title}</p>
                        <p className="text-slate-500 mt-1">{post.date}</p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </aside>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Blog;
