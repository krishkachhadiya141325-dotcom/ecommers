

function CartPage({ setPage }) {
  const { cart, removeFromCart, updateQty } = React.useContext(AppContext);
  const subtotal = cart.reduce((a,c) => a + c.price * c.qty, 0);

  if (cart.length === 0) return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center gap-6">
      <div className="text-8xl">🛒</div>
      <h2 className="text-2xl font-bold">Your cart is empty</h2>
      <button onClick={() => setPage('shop')} className="btn-gold px-10 py-3 font-semibold">Continue Shopping</button>
    </div>
  );

  return (
    <div>


      <div className="bg-cream px-6 md:px-16 py-4 flex items-center gap-2 text-sm text-muted">
        <button onClick={() => setPage('home')} className="hover:text-gold">Home</button>
        <span>›</span><span className="text-dark font-medium">Cart</span>
      </div>

      <div className="px-6 md:px-16 py-12 grid grid-cols-1 lg:grid-cols-3 gap-12">


        <div className="lg:col-span-2">
          <div className="hidden md:grid grid-cols-4 gap-4 bg-cream rounded-xl p-5 mb-4 text-sm font-semibold text-dark">
            <span>Product</span><span className="text-center">Price</span>
            <span className="text-center">Quantity</span><span className="text-center">Subtotal</span>
          </div>
          <div className="space-y-4">
            {cart.map(item => (
              <div key={item.id} className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center bg-white border border-gray-100 rounded-xl p-4 shadow-sm">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-lg overflow-hidden bg-cream flex-shrink-0">
                    <img src={item.image} className="w-full h-full object-cover" alt={item.name}/>
                  </div>
                  <span className="font-medium text-dark">{item.name}</span>
                </div>
                <div className="text-center text-muted text-sm">₹{item.price.toLocaleString('en-IN')}</div>
                <div className="flex items-center justify-center gap-2">
                  <button onClick={() => updateQty(item.id, item.qty-1)} className="w-8 h-8 rounded-full border hover:border-gold hover:text-gold transition text-dark font-bold">−</button>
                  <span className="w-8 text-center font-semibold">{item.qty}</span>
                  <button onClick={() => updateQty(item.id, item.qty+1)} className="w-8 h-8 rounded-full border hover:border-gold hover:text-gold transition text-dark font-bold">+</button>
                </div>
                <div className="flex items-center justify-between md:justify-center gap-4">
                  <span className="font-semibold text-dark">₹{(item.price * item.qty).toLocaleString('en-IN')}</span>
                  <button onClick={() => removeFromCart(item.id)} className="text-red-400 hover:text-red-600 transition text-xl">🗑</button>
                </div>
              </div>
            ))}
          </div>
        </div>



        <div className="bg-cream rounded-2xl p-8 h-fit">
          <h3 className="text-2xl font-bold text-dark mb-8">Cart Totals</h3>
          <div className="space-y-4 mb-8">
            <div className="flex justify-between text-sm">
              <span className="text-muted">Subtotal</span>
              <span className="text-dark">₹{subtotal.toLocaleString('en-IN')}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted">Shipping</span>
              <span className="text-green-600 font-medium">Free</span>
            </div>
            <hr/>
            <div className="flex justify-between font-bold text-lg">
              <span>Total</span>
              <span className="text-gold">₹{subtotal.toLocaleString('en-IN')}</span>
            </div>
          </div>
          <button onClick={() => setPage('checkout')}
            className="w-full btn-gold py-4 rounded-full font-semibold text-base hover:shadow-lg transition">
            Check Out
          </button>
          <button onClick={() => setPage('shop')}
            className="w-full mt-4 btn-outline-gold py-3 rounded-full font-semibold text-sm transition">
            Continue Shopping
          </button>
        </div>
      </div>
    </div>
  );
}
