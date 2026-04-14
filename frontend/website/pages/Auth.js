
function AuthPage({ onLogin }) {
  const [tab, setTab] = React.useState('login');
  const [loginForm, setLoginForm] = React.useState({ email: '', password: '' });
  const [regForm, setRegForm] = React.useState({ name: '', email: '', password: '', confirm: '' });
  const [loginError, setLoginError] = React.useState('');
  const [regError, setRegError] = React.useState('');
  const [regSuccess, setRegSuccess] = React.useState(false);
  const [showLoginPw, setShowLoginPw] = React.useState(false);
  const [showRegPw, setShowRegPw] = React.useState(false);
  const [loading, setLoading] = React.useState(false);



  const CREDENTIALS = {
    'admin123': 'admin',
    'shop123':  'user',
  };

  const handleLogin = (e) => {
    e.preventDefault();
    setLoginError('');
    if (!loginForm.email || !loginForm.password) {
      setLoginError('Please fill in all fields.');
      return;
    }
    setLoading(true);
    setTimeout(() => {
      const role = CREDENTIALS[loginForm.password];
      if (role) {
        onLogin(role);
      } else {
        setLoginError('Invalid credentials. Please try again.');
      }
      setLoading(false);
    }, 700);
  };

  const handleRegister = (e) => {
    e.preventDefault();
    setRegError('');
    if (!regForm.name || !regForm.email || !regForm.password || !regForm.confirm) {
      setRegError('Please fill in all fields.');
      return;
    }
    if (regForm.password.length < 6) {
      setRegError('Password must be at least 6 characters.');
      return;
    }
    if (regForm.password !== regForm.confirm) {
      setRegError('Passwords do not match.');
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setRegSuccess(true);
      setTimeout(() => onLogin('user'), 1200);
    }, 700);
  };

  const updateLogin = (k) => (e) => setLoginForm(f => ({ ...f, [k]: e.target.value }));
  const updateReg   = (k) => (e) => setRegForm(f => ({ ...f, [k]: e.target.value }));

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 40%, #0f3460 70%, #533483 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: "'Poppins', sans-serif",
      padding: '20px',
      position: 'relative',
      overflow: 'hidden',
    }}>

      


      <div style={{position:'absolute',top:'-80px',left:'-80px',width:'320px',height:'320px',borderRadius:'50%',background:'rgba(184,142,47,0.15)',filter:'blur(60px)',pointerEvents:'none'}}/>
      <div style={{position:'absolute',bottom:'-100px',right:'-60px',width:'380px',height:'380px',borderRadius:'50%',background:'rgba(83,52,131,0.25)',filter:'blur(80px)',pointerEvents:'none'}}/>
      <div style={{position:'absolute',top:'50%',left:'10%',width:'200px',height:'200px',borderRadius:'50%',background:'rgba(184,142,47,0.08)',filter:'blur(40px)',pointerEvents:'none'}}/>

      


      <div style={{
        display:'flex', flexDirection:'row', width:'100%', maxWidth:'900px',
        borderRadius:'24px', overflow:'hidden',
        boxShadow:'0 40px 80px rgba(0,0,0,0.5)',
        backdropFilter:'blur(10px)',
        minHeight:'580px',
      }}>

        


        <div style={{
          flex:'1', background:'linear-gradient(160deg,#B88E2F,#9a7528 60%,#6b4f15)',
          display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center',
          padding:'48px 36px', color:'white', position:'relative', overflow:'hidden',
        }}
          className="hidden md:flex"
        >
          <div style={{position:'absolute',top:'-60px',right:'-60px',width:'200px',height:'200px',borderRadius:'50%',background:'rgba(255,255,255,0.08)'}}/>
          <div style={{position:'absolute',bottom:'-40px',left:'-40px',width:'160px',height:'160px',borderRadius:'50%',background:'rgba(255,255,255,0.06)'}}/>

          <div style={{fontSize:'52px',marginBottom:'16px'}}>✦</div>
          <h1 style={{fontSize:'32px',fontWeight:'800',marginBottom:'12px',textAlign:'center',letterSpacing:'-0.5px'}}>Harmony</h1>
          <p style={{fontSize:'14px',opacity:'0.85',textAlign:'center',lineHeight:'1.7',maxWidth:'220px'}}>
            Premium furniture crafted for modern living. Welcome back!
          </p>

          <div style={{marginTop:'40px',display:'flex',flexDirection:'column',gap:'16px',width:'100%',maxWidth:'240px'}}>
            {[
              {icon:'🛋️', text:'8+ Premium Collections'},
              {icon:'🚚', text:'Free Delivery over ₹999'},
              {icon:'🛡️', text:'2-Year Warranty'},
            ].map(f => (
              <div key={f.text} style={{display:'flex',alignItems:'center',gap:'12px',background:'rgba(255,255,255,0.12)',borderRadius:'12px',padding:'10px 16px'}}>
                <span style={{fontSize:'20px'}}>{f.icon}</span>
                <span style={{fontSize:'13px',fontWeight:'500'}}>{f.text}</span>
              </div>
            ))}
          </div>
        </div>

        


        <div style={{
          flex:'1', background:'rgba(255,255,255,0.97)',
          display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center',
          padding:'48px 40px',
        }}>

          


          <div style={{display:'flex',alignItems:'center',gap:'8px',marginBottom:'28px',fontSize:'22px',fontWeight:'800',color:'#3A3A3A'}} className="md:hidden">
            <span style={{color:'#B88E2F'}}>✦</span> Harmony
          </div>

          


          <div style={{display:'flex',background:'#F9F1E7',borderRadius:'12px',padding:'4px',width:'100%',maxWidth:'360px',marginBottom:'32px'}}>
            {['login','register'].map(t => (
              <button key={t} onClick={() => { setTab(t); setLoginError(''); setRegError(''); }}
                style={{
                  flex:'1', padding:'10px', borderRadius:'10px', fontWeight:'600',
                  fontSize:'14px', border:'none', cursor:'pointer', transition:'all 0.25s',
                  background: tab === t ? '#B88E2F' : 'transparent',
                  color: tab === t ? 'white' : '#9F9F9F',
                  textTransform:'capitalize',
                }}>
                {t === 'login' ? '🔑 Login' : '📝 Register'}
              </button>
            ))}
          </div>

          <div style={{width:'100%',maxWidth:'360px'}}>

            


            {tab === 'login' && (
              <form onSubmit={handleLogin} style={{display:'flex',flexDirection:'column',gap:'18px'}}>
                <div>
                  <p style={{fontSize:'22px',fontWeight:'700',color:'#3A3A3A',margin:'0 0 4px'}}>Welcome Back 👋</p>
                  <p style={{fontSize:'13px',color:'#9F9F9F',margin:'0 0 20px'}}>Sign in to continue to Harmony</p>
                </div>

                <div style={{display:'flex',flexDirection:'column',gap:'6px'}}>
                  <label style={{fontSize:'13px',fontWeight:'600',color:'#3A3A3A'}}>Email address</label>
                  <input type="email" value={loginForm.email} onChange={updateLogin('email')}
                    placeholder="you@example.com"
                    style={{width:'100%',border:'1.5px solid #E8E8E8',borderRadius:'10px',padding:'12px 14px',fontSize:'14px',outline:'none',boxSizing:'border-box',fontFamily:'Poppins,sans-serif',transition:'border-color 0.2s'}}
                    onFocus={e=>e.target.style.borderColor='#B88E2F'}
                    onBlur={e=>e.target.style.borderColor='#E8E8E8'}
                  />
                </div>

                <div style={{display:'flex',flexDirection:'column',gap:'6px'}}>
                  <label style={{fontSize:'13px',fontWeight:'600',color:'#3A3A3A'}}>Password</label>
                  <div style={{position:'relative'}}>
                    <input type={showLoginPw ? 'text' : 'password'} value={loginForm.password} onChange={updateLogin('password')}
                      placeholder="Enter your password"
                      style={{width:'100%',border:'1.5px solid #E8E8E8',borderRadius:'10px',padding:'12px 44px 12px 14px',fontSize:'14px',outline:'none',boxSizing:'border-box',fontFamily:'Poppins,sans-serif',transition:'border-color 0.2s'}}
                      onFocus={e=>e.target.style.borderColor='#B88E2F'}
                      onBlur={e=>e.target.style.borderColor='#E8E8E8'}
                    />
                    <button type="button" onClick={() => setShowLoginPw(p => !p)}
                      style={{position:'absolute',right:'12px',top:'50%',transform:'translateY(-50%)',background:'none',border:'none',cursor:'pointer',fontSize:'16px',color:'#9F9F9F'}}>
                      {showLoginPw ? '🙈' : '👁️'}
                    </button>
                  </div>
                </div>

                {loginError && (
                  <div style={{background:'#FEF2F2',border:'1px solid #FCA5A5',borderRadius:'10px',padding:'10px 14px',fontSize:'13px',color:'#DC2626',display:'flex',alignItems:'center',gap:'8px'}}>
                    ⚠️ {loginError}
                  </div>
                )}

                <button type="submit" disabled={loading}
                  style={{width:'100%',background:loading?'#c9a84c':'#B88E2F',color:'white',border:'none',borderRadius:'12px',padding:'14px',fontSize:'15px',fontWeight:'700',cursor:loading?'not-allowed':'pointer',transition:'all 0.2s',fontFamily:'Poppins,sans-serif',boxShadow:'0 4px 15px rgba(184,142,47,0.35)'}}>
                  {loading ? '⏳ Signing in...' : 'Sign In →'}
                </button>

                <p style={{textAlign:'center',fontSize:'12px',color:'#9F9F9F',marginTop:'4px'}}>
                  💡 <strong>User:</strong> shop123 &nbsp;|&nbsp; <strong>Admin:</strong> admin123
                </p>
              </form>
            )}

            


            {tab === 'register' && (
              <form onSubmit={handleRegister} style={{display:'flex',flexDirection:'column',gap:'16px'}}>
                <div>
                  <p style={{fontSize:'22px',fontWeight:'700',color:'#3A3A3A',margin:'0 0 4px'}}>Create Account ✨</p>
                  <p style={{fontSize:'13px',color:'#9F9F9F',margin:'0 0 16px'}}>Join Harmony and start shopping</p>
                </div>

                {['name','email'].map(k => (
                  <div key={k} style={{display:'flex',flexDirection:'column',gap:'6px'}}>
                    <label style={{fontSize:'13px',fontWeight:'600',color:'#3A3A3A',textTransform:'capitalize'}}>{k === 'name' ? 'Full Name' : 'Email address'}</label>
                    <input type={k === 'email' ? 'email' : 'text'} value={regForm[k]} onChange={updateReg(k)}
                      placeholder={k === 'name' ? 'John Doe' : 'you@example.com'}
                      style={{width:'100%',border:'1.5px solid #E8E8E8',borderRadius:'10px',padding:'12px 14px',fontSize:'14px',outline:'none',boxSizing:'border-box',fontFamily:'Poppins,sans-serif',transition:'border-color 0.2s'}}
                      onFocus={e=>e.target.style.borderColor='#B88E2F'}
                      onBlur={e=>e.target.style.borderColor='#E8E8E8'}
                    />
                  </div>
                ))}

                <div style={{display:'flex',flexDirection:'column',gap:'6px'}}>
                  <label style={{fontSize:'13px',fontWeight:'600',color:'#3A3A3A'}}>Password</label>
                  <div style={{position:'relative'}}>
                    <input type={showRegPw ? 'text' : 'password'} value={regForm.password} onChange={updateReg('password')}
                      placeholder="Min. 6 characters"
                      style={{width:'100%',border:'1.5px solid #E8E8E8',borderRadius:'10px',padding:'12px 44px 12px 14px',fontSize:'14px',outline:'none',boxSizing:'border-box',fontFamily:'Poppins,sans-serif',transition:'border-color 0.2s'}}
                      onFocus={e=>e.target.style.borderColor='#B88E2F'}
                      onBlur={e=>e.target.style.borderColor='#E8E8E8'}
                    />
                    <button type="button" onClick={() => setShowRegPw(p => !p)}
                      style={{position:'absolute',right:'12px',top:'50%',transform:'translateY(-50%)',background:'none',border:'none',cursor:'pointer',fontSize:'16px',color:'#9F9F9F'}}>
                      {showRegPw ? '🙈' : '👁️'}
                    </button>
                  </div>
                </div>

                <div style={{display:'flex',flexDirection:'column',gap:'6px'}}>
                  <label style={{fontSize:'13px',fontWeight:'600',color:'#3A3A3A'}}>Confirm Password</label>
                  <input type="password" value={regForm.confirm} onChange={updateReg('confirm')}
                    placeholder="Re-enter password"
                    style={{width:'100%',border:'1.5px solid #E8E8E8',borderRadius:'10px',padding:'12px 14px',fontSize:'14px',outline:'none',boxSizing:'border-box',fontFamily:'Poppins,sans-serif',transition:'border-color 0.2s'}}
                    onFocus={e=>e.target.style.borderColor='#B88E2F'}
                    onBlur={e=>e.target.style.borderColor='#E8E8E8'}
                  />
                </div>

                {regError && (
                  <div style={{background:'#FEF2F2',border:'1px solid #FCA5A5',borderRadius:'10px',padding:'10px 14px',fontSize:'13px',color:'#DC2626',display:'flex',alignItems:'center',gap:'8px'}}>
                    ⚠️ {regError}
                  </div>
                )}

                {regSuccess && (
                  <div style={{background:'#F0FDF4',border:'1px solid #86EFAC',borderRadius:'10px',padding:'10px 14px',fontSize:'13px',color:'#16A34A',display:'flex',alignItems:'center',gap:'8px'}}>
                    ✅ Account created! Redirecting...
                  </div>
                )}

                <button type="submit" disabled={loading || regSuccess}
                  style={{width:'100%',background:loading||regSuccess?'#c9a84c':'#B88E2F',color:'white',border:'none',borderRadius:'12px',padding:'14px',fontSize:'15px',fontWeight:'700',cursor:(loading||regSuccess)?'not-allowed':'pointer',transition:'all 0.2s',fontFamily:'Poppins,sans-serif',boxShadow:'0 4px 15px rgba(184,142,47,0.35)'}}>
                  {loading ? '⏳ Creating account...' : regSuccess ? '✅ Done!' : 'Create Account →'}
                </button>
              </form>
            )}

            <p style={{textAlign:'center',marginTop:'24px',fontSize:'13px',color:'#9F9F9F'}}>
              {tab === 'login'
                ? <>Don't have an account? <button onClick={() => setTab('register')} style={{color:'#B88E2F',fontWeight:'700',background:'none',border:'none',cursor:'pointer',fontSize:'13px'}}>Register</button></>
                : <>Already have an account? <button onClick={() => setTab('login')} style={{color:'#B88E2F',fontWeight:'700',background:'none',border:'none',cursor:'pointer',fontSize:'13px'}}>Login</button></>
              }
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
