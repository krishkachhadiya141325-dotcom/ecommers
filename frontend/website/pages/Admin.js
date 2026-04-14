
function AdminPanel({ setPage, page, cart, onLogout }) {
  const [adminPage, setAdminPage] = React.useState('dashboard');
  const [products, setProducts] = React.useState(PRODUCTS_DATA.map(p=>({...p})));
  const [editProduct, setEditProduct] = React.useState(null);
  const [showForm, setShowForm] = React.useState(false);
  const [formData, setFormData] = React.useState({ name:'', category:'Living', price:'', oldPrice:'', badge:'' });
  const [orders] = React.useState([
    { id:'ORD-001', customer:'Rahul Sharma', items:'Syltherine × 2', total:5000000, status:'Delivered', date:'2024-01-15' },
    { id:'ORD-002', customer:'Priya Patel',  items:'Leviosa × 1',   total:2500000, status:'Processing', date:'2024-01-18' },
    { id:'ORD-003', customer:'Amit Singh',   items:'Lolito × 1',    total:7000000, status:'Shipped',    date:'2024-01-20' },
    { id:'ORD-004', customer:'Sneha Joshi',  items:'Respira × 3',   total:1500000, status:'Pending',    date:'2024-01-22' },
    { id:'ORD-005', customer:'Vijay Kumar',  items:'Grifo × 1',     total:1500000, status:'Delivered',  date:'2024-01-23' },
  ]);

  const totalRevenue = orders.reduce((a,o)=>a+o.total,0);

  const Sidebar = () => (
    <aside className="w-64 bg-dark text-white flex-shrink-0 flex flex-col min-h-screen">
      <div className="p-6 border-b border-white/10">
        <h2 className="font-bold text-xl"><span className="text-gold">✦</span> Harmony</h2>
        <p className="text-xs text-white/40 mt-1">Admin Panel</p>
      </div>
      <nav className="flex-1 p-4 space-y-1">
        {[
          { id:'dashboard', icon:'📊', label:'Dashboard' },
          { id:'products',  icon:'🛋️', label:'Products' },
          { id:'orders',    icon:'📦', label:'Orders' },
          { id:'customers', icon:'👥', label:'Customers' },
          { id:'analytics', icon:'📈', label:'Analytics' },
          { id:'settings',  icon:'⚙️', label:'Settings' },
        ].map(item => (
          <button key={item.id} onClick={() => setAdminPage(item.id)}
            className={`sidebar-link w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-left transition
              ${adminPage===item.id ? 'bg-gold text-white' : 'text-white/70 hover:bg-white/10 hover:text-white'}`}>
            <span>{item.icon}</span>{item.label}
          </button>
        ))}
      </nav>
      <div className="p-4 border-t border-white/10 space-y-1">
        <button onClick={() => onLogout && onLogout()}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm text-red-400 hover:text-white hover:bg-red-500/20 transition font-medium">
          <span>🚪</span> Logout
        </button>
      </div>
    </aside>
  );

  const StatusBadge = ({ status }) => {
    const colors = { Delivered:'bg-green-100 text-green-700', Processing:'bg-blue-100 text-blue-700', Shipped:'bg-purple-100 text-purple-700', Pending:'bg-yellow-100 text-yellow-700' };
    return <span className={`text-xs font-semibold px-3 py-1 rounded-full ${colors[status]||'bg-gray-100 text-gray-600'}`}>{status}</span>;
  };

  const Dashboard = () => (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-dark">Dashboard</h1>
        <p className="text-muted text-sm">Welcome back! Here's what's happening.</p>
      </div>


      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
        {[
          { label:'Total Revenue', value:`₹${(totalRevenue/1000000).toFixed(1)}M`, icon:'💰', color:'bg-gold', change:'+12%' },
          { label:'Total Orders',  value:orders.length,           icon:'📦', color:'bg-blue-500',   change:'+5%' },
          { label:'Products',      value:products.length,         icon:'🛋️', color:'bg-purple-500', change:'+2' },
          { label:'Customers',     value:128,                     icon:'👥', color:'bg-green-500',  change:'+18%' },
        ].map(kpi => (
          <div key={kpi.label} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex items-center gap-5">
            <div className={`${kpi.color} text-white text-2xl w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0`}>
              {kpi.icon}
            </div>
            <div>
              <p className="text-muted text-xs font-medium">{kpi.label}</p>
              <p className="text-2xl font-bold text-dark mt-0.5">{kpi.value}</p>
              <p className="text-green-600 text-xs font-medium mt-1">{kpi.change} this month</p>
            </div>
          </div>
        ))}
      </div>



      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100 flex items-center justify-between">
          <h3 className="font-bold text-dark">Recent Orders</h3>
          <button onClick={() => setAdminPage('orders')} className="text-gold text-sm hover:underline">View All</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50">
              <tr>{['Order ID','Customer','Items','Total','Status','Date'].map(h=>(
                <th key={h} className="px-6 py-3 text-left text-xs font-semibold text-muted uppercase tracking-wider">{h}</th>
              ))}</tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {orders.slice(0,4).map(order => (
                <tr key={order.id} className="hover:bg-gray-50 transition">
                  <td className="px-6 py-4 font-medium text-gold">{order.id}</td>
                  <td className="px-6 py-4 text-dark">{order.customer}</td>
                  <td className="px-6 py-4 text-muted">{order.items}</td>
                  <td className="px-6 py-4 font-semibold">₹{order.total.toLocaleString('en-IN')}</td>
                  <td className="px-6 py-4"><StatusBadge status={order.status}/></td>
                  <td className="px-6 py-4 text-muted">{order.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const ProductsPage = () => {
    const startEdit = (p) => { setEditProduct(p.id); setFormData({name:p.name,category:p.category,price:p.price,oldPrice:p.oldPrice||'',badge:p.badge||''}); setShowForm(true); };
    const deleteProduct = (id) => setProducts(ps => ps.filter(p => p.id !== id));
    const saveProduct = () => {
      if (editProduct) {
        setProducts(ps => ps.map(p => p.id===editProduct ? {...p,...formData,price:Number(formData.price),oldPrice:formData.oldPrice?Number(formData.oldPrice):null} : p));
      } else {
        setProducts(ps => [...ps, {...formData, id:Date.now(), price:Number(formData.price), oldPrice:formData.oldPrice?Number(formData.oldPrice):null, image:'sofa.png', rating:4}]);
      }
      setShowForm(false); setEditProduct(null); setFormData({name:'',category:'Living',price:'',oldPrice:'',badge:''});
    };
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div><h1 className="text-2xl font-bold text-dark">Products</h1><p className="text-muted text-sm">{products.length} total products</p></div>
          <button onClick={() => { setEditProduct(null); setFormData({name:'',category:'Living',price:'',oldPrice:'',badge:''}); setShowForm(true); }}
            className="btn-gold px-6 py-3 rounded-xl font-semibold text-sm flex items-center gap-2">
            + Add Product
          </button>
        </div>

        {showForm && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl p-8 w-full max-w-md shadow-2xl">
              <h3 className="text-xl font-bold mb-6">{editProduct ? 'Edit Product' : 'Add New Product'}</h3>
              <div className="space-y-4">
                {[{label:'Product Name',key:'name'},{label:'Price (Rs.)',key:'price',type:'number'},{label:'Old Price (Rs.)',key:'oldPrice',type:'number'}].map(f=>(
                  <div key={f.key}>
                    <label className="block text-sm font-medium mb-1">{f.label}</label>
                    <input type={f.type||'text'} value={formData[f.key]} onChange={e=>setFormData(p=>({...p,[f.key]:e.target.value}))}
                      className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-gold transition"/>
                  </div>
                ))}
                <div>
                  <label className="block text-sm font-medium mb-1">Category</label>
                  <select value={formData.category} onChange={e=>setFormData(p=>({...p,category:e.target.value}))}
                    className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-gold transition">
                    {['Living','Dining','Bedroom'].map(c=><option key={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Badge</label>
                  <select value={formData.badge} onChange={e=>setFormData(p=>({...p,badge:e.target.value}))}
                    className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-gold transition">
                    <option value=''>None</option><option value='Sale'>Sale</option><option value='New'>New</option>
                  </select>
                </div>
              </div>
              <div className="flex gap-3 mt-6">
                <button onClick={saveProduct} className="flex-1 btn-gold py-3 rounded-xl font-semibold text-sm">Save</button>
                <button onClick={() => setShowForm(false)} className="flex-1 border border-gray-200 py-3 rounded-xl font-semibold text-sm hover:bg-gray-50 transition">Cancel</button>
              </div>
            </div>
          </div>
        )}

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50">
                <tr>{['Product','Category','Price','Old Price','Badge','Actions'].map(h=>(
                  <th key={h} className="px-6 py-4 text-left text-xs font-semibold text-muted uppercase tracking-wider">{h}</th>
                ))}</tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {products.map(p => (
                  <tr key={p.id} className="hover:bg-gray-50 transition">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <img src={p.image} className="w-10 h-10 rounded-lg object-cover bg-cream" alt={p.name}/>
                        <span className="font-medium text-dark">{p.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-muted">{p.category}</td>
                    <td className="px-6 py-4 font-semibold">₹{Number(p.price).toLocaleString('en-IN')}</td>
                    <td className="px-6 py-4 text-muted">{p.oldPrice ? `₹${Number(p.oldPrice).toLocaleString('en-IN')}` : '—'}</td>
                    <td className="px-6 py-4">
                      {p.badge ? <span className={`text-xs font-bold px-3 py-1 rounded-full ${p.badge==='Sale'?'bg-red-100 text-red-600':'bg-green-100 text-green-600'}`}>{p.badge}</span> : '—'}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <button onClick={() => startEdit(p)} className="text-blue-500 hover:text-blue-700 text-lg transition">✏️</button>
                        <button onClick={() => deleteProduct(p.id)} className="text-red-400 hover:text-red-600 text-lg transition">🗑️</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  };

  const OrdersPage = () => (
    <div className="space-y-6">
      <div><h1 className="text-2xl font-bold text-dark">Orders</h1><p className="text-muted text-sm">{orders.length} total orders</p></div>
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50">
              <tr>{['Order ID','Customer','Items','Total','Status','Date','Action'].map(h=>(
                <th key={h} className="px-6 py-4 text-left text-xs font-semibold text-muted uppercase tracking-wider">{h}</th>
              ))}</tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {orders.map(order => (
                <tr key={order.id} className="hover:bg-gray-50 transition">
                  <td className="px-6 py-4 font-medium text-gold">{order.id}</td>
                  <td className="px-6 py-4 font-medium text-dark">{order.customer}</td>
                  <td className="px-6 py-4 text-muted">{order.items}</td>
                  <td className="px-6 py-4 font-semibold">₹{order.total.toLocaleString('en-IN')}</td>
                  <td className="px-6 py-4"><StatusBadge status={order.status}/></td>
                  <td className="px-6 py-4 text-muted">{order.date}</td>
                  <td className="px-6 py-4"><button className="text-xs text-gold hover:underline font-medium">View</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const SimpleSection = ({ title, sub }) => (
    <div className="flex flex-col items-center justify-center h-64 text-center">
      <div className="text-6xl mb-4">{sub}</div>
      <h2 className="text-xl font-bold text-dark">{title}</h2>
      <p className="text-muted text-sm mt-2">This section is available in the premium version.</p>
    </div>
  );

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar/>
      <main className="flex-1 p-8 overflow-auto">
        {adminPage === 'dashboard'  && <Dashboard/>}
        {adminPage === 'products'   && <ProductsPage/>}
        {adminPage === 'orders'     && <OrdersPage/>}
        {adminPage === 'customers'  && <SimpleSection title="Customers" sub="👥"/>}
        {adminPage === 'analytics'  && <SimpleSection title="Analytics" sub="📈"/>}
        {adminPage === 'settings'   && <SimpleSection title="Settings"  sub="⚙️"/>}
      </main>
    </div>
  );
}
