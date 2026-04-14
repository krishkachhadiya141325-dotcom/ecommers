

function ProductPage({ setPage, addToCart }) {
  const { selectedProduct } = React.useContext(AppContext);
  const product = selectedProduct || PRODUCTS_DATA[0];
  const [qty, setQty] = React.useState(1);
  const [selectedSize, setSelectedSize] = React.useState('L');
  const [selectedColor, setSelectedColor] = React.useState('#8B5CF6');
  const [activeTab, setActiveTab] = React.useState('description');

  const sizes = ['L','XL','XS'];
  const colors = ['#8B5CF6','#1a1a1a','#B88E2F'];
  const related = PRODUCTS_DATA.filter(p => p.id !== product.id).slice(0,4);

  return (
    <div>


      <div className="bg-cream px-6 md:px-16 py-4 flex items-center gap-2 text-sm text-muted">
        <button onClick={() => setPage('home')} className="hover:text-gold">Home</button>
        <span>›</span>
        <button onClick={() => setPage('shop')} className="hover:text-gold">Shop</button>
        <span>›</span>
        <span className="text-dark font-medium">{product.name}</span>
      </div>



      <div className="px-6 md:px-16 py-12 grid grid-cols-1 md:grid-cols-2 gap-12">


        <div className="flex gap-4">
          <div className="flex flex-col gap-3 w-24">
            {[product.image, 'sofa.png', 'bedroom.png'].map((img,i) => (
              <div key={i} className="w-24 h-20 rounded-lg overflow-hidden border-2 border-transparent hover:border-gold cursor-pointer">
                <img src={img} className="w-full h-full object-cover" alt={`thumb-${i}`}/>
              </div>
            ))}
          </div>
          <div className="flex-1 rounded-xl overflow-hidden bg-cream">
            <img src={product.image} className="w-full h-full object-cover" alt={product.name}/>
          </div>
        </div>



        <div>
          <h1 className="text-3xl font-bold text-dark mb-2">{product.name}</h1>
          <p className="text-2xl font-semibold text-muted mb-4">
            ₹{product.price.toLocaleString('en-IN')}
          </p>
          <div className="flex items-center gap-2 mb-6">
            {'★★★★☆'.split('').map((s,i)=>(
              <span key={i} className="text-gold text-lg">{s}</span>
            ))}
            <span className="text-muted text-sm ml-2">| 5 Customer Reviews</span>
          </div>
          <p className="text-muted text-sm leading-relaxed mb-8">
            Setting the bar as one of the loudest speakers in its class, the Oner is a compact, rugged and Afar-reaching sound powerhouse.
          </p>



          <div className="mb-6">
            <p className="text-muted text-sm font-semibold mb-3">Size</p>
            <div className="flex gap-3">
              {sizes.map(s => (
                <button key={s} onClick={() => setSelectedSize(s)}
                  className={`w-10 h-10 rounded-lg text-sm font-semibold transition ${selectedSize===s?'bg-gold text-white':'bg-cream hover:bg-gold hover:text-white'}`}>
                  {s}
                </button>
              ))}
            </div>
          </div>



          <div className="mb-8">
            <p className="text-muted text-sm font-semibold mb-3">Color</p>
            <div className="flex gap-3">
              {colors.map(c => (
                <button key={c} onClick={() => setSelectedColor(c)}
                  className={`w-8 h-8 rounded-full border-4 transition ${selectedColor===c?'border-gray-400':'border-transparent'}`}
                  style={{backgroundColor:c}}/>
              ))}
            </div>
          </div>



          <div className="flex items-center gap-4 flex-wrap">
            <div className="flex items-center border border-gray-200 rounded-full overflow-hidden">
              <button onClick={() => setQty(q=>Math.max(1,q-1))} className="px-4 py-2 text-lg hover:bg-cream transition">−</button>
              <span className="px-5 font-semibold">{qty}</span>
              <button onClick={() => setQty(q=>q+1)} className="px-4 py-2 text-lg hover:bg-cream transition">+</button>
            </div>
            <button onClick={() => addToCart({...product, qty})}
              className="btn-gold px-8 py-3 rounded-full font-semibold text-sm hover:shadow-lg transition">
              Add To Cart
            </button>
            <button className="btn-outline-gold px-8 py-3 rounded-full font-semibold text-sm transition">
              + Compare
            </button>
          </div>

          <hr className="my-8"/>
          <div className="text-sm text-muted space-y-2">
            <p><span className="mr-3">SKU</span>: SS001</p>
            <p><span className="mr-3">Category</span>: {product.category}</p>
            <p><span className="mr-3">Tags</span>: Sofa, Chair, Home, Shop</p>
          </div>
        </div>
      </div>



      <div className="px-6 md:px-16 pb-16">
        <div className="flex gap-8 border-b mb-8">
          {['description','additional information','reviews [5]'].map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)}
              className={`pb-3 text-sm capitalize font-medium transition border-b-2 ${activeTab===tab?'border-gold text-dark':'border-transparent text-muted hover:text-dark'}`}>
              {tab}
            </button>
          ))}
        </div>
        <p className="text-muted text-sm leading-relaxed max-w-2xl">
          {activeTab === 'description' 
            ? 'Embodying the raw, wayward spirit of rock \'n\' roll, the Kilburn portable active stereo speaker takes the premium platform and creates a bold, vibrant piece of luxury equipment. Its 2-way speaker system with a 5" woofer and bright LED ring, Kilburn is an architectural masterpiece with its signature..'
            : activeTab === 'additional information'
            ? 'Weight: 12kg | Dimensions: 220cm × 95cm × 85cm | Material: Premium Fabric, Solid Wood Frame | Colors Available: 3 variants'
            : '⭐⭐⭐⭐⭐ Amazing quality and fast delivery! – Abhishek M.'}
        </p>
      </div>



      <div className="px-6 md:px-16 pb-16 text-center">
        <h2 className="text-2xl font-bold mb-10">Related Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {related.map(p => (
            <ProductCard key={p.id} product={p} onView={(prod) => { window.scrollTo(0,0); }} onCart={addToCart}/>
          ))}
        </div>
      </div>
    </div>
  );
}
