

function ContactPage() {
  const [form, setForm] = React.useState({ name:'', email:'', subject:'', message:'' });
  const [sent, setSent] = React.useState(false);

  return (
    <div>


      <div className="bg-cream text-center py-16">
        <h1 className="text-4xl font-bold text-dark mb-2">Get In Touch With Us</h1>
        <p className="text-muted max-w-md mx-auto text-sm">For more information about our products & services, please feel free to drop us an email or contact us.</p>
      </div>

      <div className="px-6 md:px-16 py-16 grid grid-cols-1 md:grid-cols-2 gap-16 max-w-5xl mx-auto">


        <div className="space-y-10">
          {[
            { icon:'📍', title:'Address', detail:'Marwadi University, uplaa kaatha 3699999' },
            { icon:'📞', title:'Phone', detail:'+1 202-555-0104' },
            { icon:'🕐', title:'Working Time', detail:'Monday–Friday: 9:00–22:00\nSaturday–Sunday: 9:00–21:00' },
          ].map(info => (
            <div key={info.title} className="flex gap-5">
              <div className="text-3xl mt-1">{info.icon}</div>
              <div>
                <h4 className="font-bold text-dark text-lg mb-1">{info.title}</h4>
                <p className="text-muted text-sm leading-relaxed whitespace-pre-line">{info.detail}</p>
              </div>
            </div>
          ))}
        </div>



        <div>
          {sent ? (
            <div className="flex flex-col items-center justify-center h-full gap-4 text-center">
              <span className="text-6xl">✅</span>
              <h3 className="text-xl font-bold">Message Sent!</h3>
              <p className="text-muted text-sm">We'll get back to you within 24 hours.</p>
              <button onClick={() => setSent(false)} className="btn-outline-gold px-8 py-3 rounded-full text-sm font-semibold transition mt-2">Send Another</button>
            </div>
          ) : (
            <form onSubmit={e => { e.preventDefault(); setSent(true); }} className="space-y-5">
              {[
                { label:'Your name', key:'name', type:'text' },
                { label:'Email address', key:'email', type:'email' },
                { label:'Subject', key:'subject', type:'text' },
              ].map(f => (
                <div key={f.key}>
                  <label className="block text-sm font-medium text-dark mb-1">{f.label}</label>
                  <input type={f.type} value={form[f.key]} onChange={e => setForm(p=>({...p,[f.key]:e.target.value}))}
                    className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm outline-none focus:border-gold transition"/>
                </div>
              ))}
              <div>
                <label className="block text-sm font-medium text-dark mb-1">Message</label>
                <textarea rows={5} value={form.message} onChange={e => setForm(p=>({...p,message:e.target.value}))}
                  placeholder="Hi! I'd like to ask about..."
                  className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm outline-none focus:border-gold transition resize-none"/>
              </div>
              <button type="submit" className="btn-gold px-14 py-3 rounded-full font-semibold text-sm hover:shadow-lg transition">Submit</button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
