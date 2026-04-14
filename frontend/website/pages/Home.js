

function HomePage({ setPage, navigateToProduct, addToCart }) {
  const featuredProducts = PRODUCTS_DATA.slice(0, 8);

  return (
    <div>


      <section className="relative overflow-hidden bg-cream">
        <div className="flex flex-col md:flex-row items-center min-h-[85vh]">
          <div className="hidden md:block w-3/5 h-[85vh]">
            <img src="hero_room.png" alt="Hero Room" className="w-full h-full object-cover" />
          </div>
          <div className="md:w-2/5 px-10 py-16 md:py-0 bg-cream z-10 flex flex-col justify-center">
            <p className="text-sm text-gold font-semibold tracking-widest uppercase mb-3">New Arrival</p>
            <h1 className="text-4xl md:text-5xl font-bold text-dark leading-tight mb-6">
              Discover Our<br />New Collection
            </h1>
            <p className="text-muted mb-8 leading-relaxed text-sm md:text-base">
              Bringing harmony between form and function — furniture designed to elevate every corner of your home.
            </p>
            <button onClick={() => setPage('shop')} className="btn-gold px-10 py-4 font-semibold text-sm uppercase tracking-widest hover:shadow-lg transition-all w-fit">
              BUY NOW
            </button>
          </div>
        </div>
      </section>



      <section className="py-20 px-6 md:px-16 text-center">
        <p className="text-muted text-sm mb-2">Choose What Fits You</p>
        <h2 className="text-3xl font-bold text-dark mb-12">Browse The Range</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { label: 'Dining', img: 'dining.png' },
            { label: 'Living', img: 'sofa.png' },
            { label: 'Bedroom', img: 'bedroom.png' }
          ].map(cat => (
            <div key={cat.label} onClick={() => setPage('shop')} className="cursor-pointer group">
              <div className="overflow-hidden rounded-xl aspect-[4/5] mb-4">
                <img src={cat.img} alt={cat.label}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <h3 className="text-xl font-semibold">{cat.label}</h3>
            </div>
          ))}
        </div>
      </section>



      <section className="py-16 px-6 md:px-16 bg-white text-center">
        <h2 className="text-3xl font-bold text-dark mb-12">Our Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map(product => (
            <ProductCard key={product.id} product={product} onView={navigateToProduct} onCart={addToCart} />
          ))}
        </div>
        <button onClick={() => setPage('shop')}
          className="mt-12 btn-outline-gold px-12 py-3 font-semibold transition-all">
          Show More
        </button>
      </section>



      <section className="py-16 px-6 md:px-16 bg-cream flex flex-col md:flex-row items-center gap-10">
        <div className="md:w-2/5">
          <p className="text-gold font-semibold text-sm uppercase tracking-widest mb-2">Inspiration</p>
          <h2 className="text-3xl font-bold text-dark mb-4">50+ Beautiful Rooms</h2>
          <p className="text-muted text-sm mb-8 leading-relaxed">Our designs are crafted to inspire creativity and comfort in every room of your home.</p>
          <button className="btn-gold px-10 py-3 font-semibold text-sm transition">Explore More</button>
        </div>
        <div className="md:w-3/5 grid grid-cols-2 gap-4">
          <img src="hero_room.png" className="rounded-xl object-cover w-full h-56" alt="Room 1" />
          <img src="bedroom.png" className="rounded-xl object-cover w-full h-56" alt="Room 2" />
          <img src="dining.png" className="rounded-xl object-cover w-full h-56" alt="Room 3" />
          <img src="sofa.png" className="rounded-xl object-cover w-full h-56" alt="Room 4" />
        </div>
      </section>



      <section className="py-14 px-6 md:px-16 bg-[#FAF3EA]">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { icon: '🏆', title: 'High Quality', sub: 'Crafted from top materials' },
            { icon: '🛡️', title: 'Warranty Protection', sub: 'Over 2 years' },
            { icon: '🚚', title: 'Free Shipping', sub: 'Order over ₹999' },
            { icon: '🎧', title: '24/7 Support', sub: 'Dedicated support' },
          ].map(b => (
            <div key={b.title} className="flex flex-col items-center gap-2">
              <span className="text-4xl">{b.icon}</span>
              <h4 className="font-bold text-dark text-lg">{b.title}</h4>
              <p className="text-muted text-sm">{b.sub}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}



function ProductCard({ product, onView, onCart }) {
  return (
    <div className="product-card relative bg-cream rounded-xl overflow-hidden group cursor-pointer">
      {product.badge && (
        <span className={`absolute top-4 right-4 z-10 text-white text-xs font-bold px-3 py-1 rounded-full ${product.badge === 'Sale' ? 'bg-red-500' : 'bg-green-500'}`}>
          {product.badge}
        </span>
      )}
      <div className="relative h-64 overflow-hidden">
        <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        <div className="product-overlay absolute inset-0 bg-black/40 opacity-0 transition-opacity flex flex-col items-center justify-center gap-3">
          <button onClick={(e) => { e.stopPropagation(); onCart(product); }}
            className="bg-white text-gold font-semibold px-6 py-2 text-sm hover:bg-gold hover:text-white transition">
            Add to Cart
          </button>
          <button onClick={() => onView(product)} className="text-white text-sm underline">View Details</button>
        </div>
      </div>
      <div className="p-5 text-left" onClick={() => onView(product)}>
        <h3 className="font-semibold text-dark text-lg mb-1">{product.name}</h3>
        <p className="text-muted text-sm mb-2">{product.category}</p>
        <div className="flex items-center gap-3">
          <span className="font-bold text-dark">₹{product.price.toLocaleString('en-IN')}</span>
          {product.oldPrice && <span className="text-muted line-through text-sm">₹{product.oldPrice.toLocaleString('en-IN')}</span>}
        </div>
      </div>
    </div>
  );
}
