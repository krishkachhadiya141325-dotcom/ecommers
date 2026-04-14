


function CheckoutPage({ setPage }) {
  const { cart } = React.useContext(AppContext);
  const [form, setForm] = React.useState({ firstName:'', lastName:'', email:'', phone:'', address:'', city:'', country:'India', zip:'', payment:'bank' });
  const [placed, setPlaced] = React.useState(false);
  const subtotal = cart.reduce((a,c) => a + c.price * c.qty, 0);
  const update = k => e => setForm(f => ({...f, [k]: e.target.value}));

  if (placed) return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center gap-6 text-center px-6">
      <div className="text-8xl">🎉</div>
      <h2 className="text-3xl font-bold text-dark">Order Placed Successfully!</h2>
      <p className="text-muted">Thank you for shopping with Harmony. Your order is being processed.</p>
      <button onClick={() => setPage('home')} className="btn-gold px-12 py-4 font-semibold rounded-full">Back to Home</button>
    </div>
  );

  const InputField = ({ label, k, type='text', placeholder }) => (
    <div>
      <label className="block text-sm font-medium text-dark mb-1">{label}</label>
      <input type={type} value={form[k]} onChange={update(k)} placeholder={placeholder}
        className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm outline-none focus:border-gold transition"/>
    </div>
  );

  return (
    <div>
      <div className="bg-cream px-6 md:px-16 py-4 flex items-center gap-2 text-sm text-muted">
        <button onClick={() => setPage('home')} className="hover:text-gold">Home</button>
        <span>›</span><span className="text-dark font-medium">Checkout</span>
      </div>
      <div className="px-6 md:px-16 py-12 grid grid-cols-1 lg:grid-cols-5 gap-12">


        <div className="lg:col-span-3">
          <h2 className="text-2xl font-bold mb-8">Billing Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <InputField label="First Name *" k="firstName" placeholder="John"/>
            <InputField label="Last Name *" k="lastName" placeholder="Doe"/>
            <div className="md:col-span-2"><InputField label="Email *" k="email" type="email" placeholder="john@example.com"/></div>
            <InputField label="Phone *" k="phone" placeholder="+91 98765 43210"/>
            <div>
              <label className="block text-sm font-medium text-dark mb-1">Country / Region</label>
              <select value={form.country} onChange={update('country')} className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm outline-none focus:border-gold transition">
                <option>India</option><option>USA</option><option>UK</option><option>Australia</option>
              </select>
            </div>
            <InputField label="City" k="city" placeholder="Mumbai"/>
            <div className="md:col-span-2"><InputField label="Street Address *" k="address" placeholder="123 Main Street, Apartment 4B"/></div>
            <div className="md:col-span-2"><InputField label="ZIP Code" k="zip" placeholder="400001"/></div>
          </div>
        </div>



        <div className="lg:col-span-2">
          <div className="bg-cream rounded-2xl p-8">
            <h3 className="text-xl font-bold mb-6">Your Order</h3>
            <div className="space-y-3 mb-6">
              {cart.map(item => (
                <div key={item.id} className="flex justify-between text-sm">
                  <span className="text-muted">{item.name} × {item.qty}</span>
                  <span className="font-medium">₹{(item.price*item.qty).toLocaleString('en-IN')}</span>
                </div>
              ))}
              <hr/>
              <div className="flex justify-between font-bold text-lg">
                <span>Total</span>
                <span className="text-gold">₹{subtotal.toLocaleString('en-IN')}</span>
              </div>
            </div>



            <div className="space-y-3 mb-6">
              {[
                { value:'bank', label:'Direct Bank Transfer' },
                { value:'cod',  label:'Cash On Delivery' },
                { value:'card', label:'Credit/Debit Card' },
              ].map(opt => (
                <label key={opt.value} className="flex items-center gap-3 cursor-pointer">
                  <input type="radio" name="payment" value={opt.value} checked={form.payment===opt.value}
                    onChange={update('payment')} className="accent-gold w-4 h-4"/>
                  <span className="text-sm font-medium">{opt.label}</span>
                </label>
              ))}
            </div>
            <button onClick={() => setPlaced(true)}
              className="w-full btn-gold py-4 rounded-full font-semibold text-base hover:shadow-lg transition">
              Place Order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
