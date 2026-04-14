

function ShopPage({ setPage, navigateToProduct, addToCart }) {
  const [filter, setFilter] = React.useState('All');
  const [sortBy, setSortBy] = React.useState('default');
  const [page, setCurrentPage] = React.useState(1);
  const perPage = 8;
  const categories = ['All','Living','Dining','Bedroom'];

  let filtered = filter === 'All' ? PRODUCTS_DATA : PRODUCTS_DATA.filter(p => p.category === filter);
  if (sortBy === 'low') filtered = [...filtered].sort((a,b) => a.price - b.price);
  if (sortBy === 'high') filtered = [...filtered].sort((a,b) => b.price - a.price);
  const totalPages = Math.ceil(filtered.length / perPage);
  const paginated = filtered.slice((page-1)*perPage, page*perPage);

  return (
    <div>


      <div className="relative h-52 bg-cover bg-center flex items-center justify-center" style={{backgroundImage:'url(dining.png)'}}>
        <div className="absolute inset-0 bg-white/70"/>
        <div className="relative text-center">
          <h1 className="text-4xl font-bold text-dark">Shop</h1>
          <p className="text-muted text-sm mt-1">
            <button onClick={() => setPage('home')} className="hover:text-gold">Home</button>
            <span className="mx-2">›</span><span className="text-gold">Shop</span>
          </p>
        </div>
      </div>



      <div className="bg-cream px-6 md:px-16 py-4 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4 flex-wrap">
          <span className="font-semibold text-sm">Filter:</span>
          {categories.map(c => (
            <button key={c} onClick={() => { setFilter(c); setCurrentPage(1); }}
              className={`px-4 py-1 rounded-full text-sm font-medium transition ${filter===c ? 'bg-gold text-white' : 'bg-white text-dark border hover:border-gold hover:text-gold'}`}>
              {c}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-4">
          <span className="text-sm text-muted">Showing {paginated.length} of {filtered.length} results</span>
          <select value={sortBy} onChange={e=>setSortBy(e.target.value)}
            className="text-sm border border-gray-200 rounded px-3 py-1.5 outline-none focus:border-gold">
            <option value="default">Sort by: Default</option>
            <option value="low">Price: Low to High</option>
            <option value="high">Price: High to Low</option>
          </select>
        </div>
      </div>



      <div className="px-6 md:px-16 py-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {paginated.map(product => (
          <ProductCard key={product.id} product={product} onView={navigateToProduct} onCart={addToCart}/>
        ))}
      </div>



      {totalPages > 1 && (
        <div className="flex justify-center gap-3 pb-12">
          {Array.from({length:totalPages},(_,i)=>i+1).map(p => (
            <button key={p} onClick={() => setCurrentPage(p)}
              className={`w-10 h-10 rounded-full font-medium text-sm transition ${page===p?'bg-gold text-white':'bg-cream hover:bg-gold hover:text-white'}`}>
              {p}
            </button>
          ))}
          {page < totalPages && (
            <button onClick={() => setCurrentPage(p=>p+1)}
              className="px-5 h-10 rounded-full bg-cream hover:bg-gold hover:text-white font-medium text-sm transition">
              Next
            </button>
          )}
        </div>
      )}
    </div>
  );
}
