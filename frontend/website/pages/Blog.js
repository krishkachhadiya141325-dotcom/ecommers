

const BLOG_POSTS = [
  {
    id: 1, title: 'Going all-in with millennial design', date: '14 Oct 2023', author: 'Admin', category: 'Design', img: 'hero_room.png',
    excerpt: 'The millennial design trend has transformed how we think about living spaces. Bold choices, earthy tones, and purposeful minimalism are leading the conversation.'
  },
  {
    id: 2, title: 'Exploring new ways of decorating', date: '03 Nov 2023', author: 'Admin', category: 'Crafts', img: 'bedroom.png',
    excerpt: 'Decoration is not just about aesthetics — it\'s about creating an experience. We explore the latest ideas shaping how modern homes feel and function.'
  },
  {
    id: 3, title: 'Handmade pieces that shine bright', date: '19 Nov 2023', author: 'Admin', category: 'Handmade', img: 'dining.png',
    excerpt: 'We bring attention back to the beauty of handcrafted furniture, celebrating artisans who put soul into every piece they create for your home.'
  },
  {
    id: 4, title: 'Transforming spaces with smart interior choices', date: '12 Dec 2023', author: 'Admin', category: 'Interior', img: 'bedroom.png',
    excerpt: 'Interior design is more than arranging furniture. Discover how lighting, layout, and purpose can completely transform the energy of a room.'
  },
  {
    id: 5, title: 'The timeless appeal of solid wood', date: '05 Jan 2024', author: 'Admin', category: 'Wood', img: 'sofa.png',
    excerpt: 'Solid wood brings warmth, character, and durability to any environment. Learn why investing in authentic wood furniture is always a smart choice.'
  },
];

function BlogPage() {
  const [searchVal, setSearchVal] = React.useState('');
  const [activePost, setActivePost] = React.useState(null);

  const filtered = BLOG_POSTS.filter(p =>
    p.title.toLowerCase().includes(searchVal.toLowerCase()) ||
    p.category.toLowerCase().includes(searchVal.toLowerCase())
  );

  if (activePost) return (
    <div className="px-6 md:px-16 py-12 max-w-4xl mx-auto">
      <button onClick={() => setActivePost(null)} className="text-gold hover:underline text-sm mb-6 flex items-center gap-1">← Back to Blog</button>
      <img src={activePost.img} className="w-full h-72 object-cover rounded-2xl mb-8" alt={activePost.title} />
      <div className="flex gap-4 text-muted text-xs mb-4">
        <span>📅 {activePost.date}</span><span>✍️ {activePost.author}</span>
        <span className="bg-gold/10 text-gold px-3 py-0.5 rounded-full">{activePost.category}</span>
      </div>
      <h1 className="text-3xl font-bold text-dark mb-6">{activePost.title}</h1>
      <p className="text-muted leading-relaxed text-sm">{activePost.excerpt}</p>
      <p className="text-muted leading-relaxed text-sm mt-4">Harmony Furniture is committed to bringing you designs that transcend trends. Each piece is crafted to complement the unique story of your home, blending modern aesthetics with timeless craftsmanship. From the selection of raw materials to the finishing touches, our team ensures that every product meets the highest standards of quality and design.</p>
    </div>
  );

  return (
    <div>
      <div className="bg-cream text-center py-14 mb-12">
        <h1 className="text-4xl font-bold text-dark">Our Blog</h1>
        <p className="text-muted text-sm mt-2">Design ideas, style tips & inspiration</p>
      </div>

      <div className="px-6 md:px-16 grid grid-cols-1 lg:grid-cols-3 gap-12 pb-16">


        <div className="lg:col-span-2 space-y-10">
          {filtered.map(post => (
            <article key={post.id} className="group">
              <div className="rounded-2xl overflow-hidden mb-5 h-64">
                <img src={post.img} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="flex gap-4 text-muted text-xs mb-3">
                <span>📅 {post.date}</span>
                <span>✍️ {post.author}</span>
                <span className="bg-gold/10 text-gold px-3 py-0.5 rounded-full">{post.category}</span>
              </div>
              <h2 className="text-xl font-bold text-dark mb-3 group-hover:text-gold transition cursor-pointer"
                onClick={() => setActivePost(post)}>{post.title}</h2>
              <p className="text-muted text-sm leading-relaxed mb-4">{post.excerpt}</p>
              <button onClick={() => setActivePost(post)} className="text-dark font-semibold text-sm border-b-2 border-dark hover:border-gold hover:text-gold transition">
                Read More →
              </button>
            </article>
          ))}
          {filtered.length === 0 && <p className="text-muted text-center py-16">No posts found.</p>}
        </div>



        <aside className="space-y-10">


          <div>
            <h4 className="font-bold text-dark mb-4">Search</h4>
            <div className="flex border border-gray-200 rounded-lg overflow-hidden">
              <input value={searchVal} onChange={e => setSearchVal(e.target.value)}
                placeholder="Search posts..." className="flex-1 py-3 px-4 text-sm outline-none" />
              <button className="bg-gold text-white px-4 hover:bg-amber-700 transition">🔍</button>
            </div>
          </div>



          <div>
            <h4 className="font-bold text-dark mb-4">Categories</h4>
            <ul className="space-y-2">
              {['Crafts', 'Design', 'Handmade', 'Interior', 'Wood'].map(cat => (
                <li key={cat}>
                  <button onClick={() => setSearchVal(cat)}
                    className="flex justify-between w-full text-muted text-sm hover:text-gold transition py-1">
                    <span>{cat}</span><span className="text-xs bg-cream px-2 py-0.5 rounded">{Math.floor(Math.random() * 10) + 1}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>



          <div>
            <h4 className="font-bold text-dark mb-4">Recent Posts</h4>
            <div className="space-y-4">
              {BLOG_POSTS.map(post => (
                <div key={post.id} onClick={() => setActivePost(post)}
                  className="flex gap-3 cursor-pointer group">
                  <img src={post.img} className="w-16 h-16 rounded-lg object-cover flex-shrink-0" alt={post.title} />
                  <div>
                    <p className="text-sm font-medium group-hover:text-gold transition leading-snug">{post.title}</p>
                    <p className="text-xs text-muted mt-1">{post.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
