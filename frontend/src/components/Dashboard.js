import React, { useState, useEffect } from 'react';

const Dashboard = () => {
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeCard, setActiveCard] = useState(null);
  const [ripples, setRipples] = useState([]);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    setIsLoaded(true);

    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      clearInterval(timer);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const handleCardClick = (action, e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const newRipple = {
      id: Date.now(),
      x,
      y
    };

    setRipples(prev => [...prev, newRipple]);

    setTimeout(() => {
      setRipples(prev => prev.filter(r => r.id !== newRipple.id));
    }, 600);

    setTimeout(() => {
      // Navigate without refresh by updating state
      setCurrentPage(action);
      setIsLoaded(false); // Reset animation
      setTimeout(() => setIsLoaded(true), 50); // Trigger page load animation
    }, 300);
  };

  const handleBackToDashboard = () => {
    setCurrentPage('dashboard');
    setIsLoaded(false);
    setTimeout(() => setIsLoaded(true), 50);
  };

  const backgroundStyle = {
    minHeight: '100vh',
    background: `
      radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(124, 58, 237, 0.15) 0%, transparent 50%),
      linear-gradient(135deg, #0f0f23 0%, #1a1a2e 25%, #16213e 50%, #0f3460 75%, #533a71 100%)
    `,
    position: 'relative',
    overflow: 'hidden',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif"
  };

  const containerStyle = {
    position: 'relative',
    width: '100%',
    maxWidth: '1200px',
    padding: '2rem',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '2rem'
  };

  const headerStyle = {
    textAlign: 'center',
    marginBottom: '2rem',
    opacity: isLoaded ? 1 : 0,
    transform: isLoaded ? 'translateY(0)' : 'translateY(-30px)',
    transition: 'all 1s cubic-bezier(0.4, 0, 0.2, 1)'
  };

  const titleStyle = {
    fontSize: '4rem',
    fontWeight: '900',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 25%, #f093fb 50%, #f5576c 75%, #4facfe 100%)',
    backgroundSize: '300% 300%',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    animation: 'gradientShift 4s ease-in-out infinite',
    marginBottom: '1rem',
    textShadow: '0 0 30px rgba(102, 126, 234, 0.5)'
  };

  const subtitleStyle = {
    fontSize: '1.5rem',
    color: 'rgba(255, 255, 255, 0.8)',
    fontWeight: '300',
    letterSpacing: '0.5px'
  };

  const cardsContainerStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '2rem',
    width: '100%',
    maxWidth: '800px'
  };

  const cardStyle = (isActive) => ({
    position: 'relative',
    padding: '2rem',
    borderRadius: '24px',
    background: isActive
      ? 'linear-gradient(135deg, rgba(124, 58, 237, 0.2) 0%, rgba(139, 92, 246, 0.2) 100%)'
      : 'rgba(255, 255, 255, 0.05)',
    backdropFilter: 'blur(20px)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    cursor: 'pointer',
    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
    transform: isActive ? 'translateY(-8px) scale(1.02)' : 'translateY(0) scale(1)',
    boxShadow: isActive
      ? '0 20px 40px rgba(124, 58, 237, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.2)'
      : '0 8px 32px rgba(0, 0, 0, 0.3)',
    overflow: 'hidden'
  });

  const pageStyle = {
    opacity: isLoaded ? 1 : 0,
    transform: isLoaded ? 'translateY(0)' : 'translateY(30px)',
    transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
    maxWidth: '400px',
    width: '100%'
  };

  const formStyle = {
    background: 'rgba(255, 255, 255, 0.05)',
    backdropFilter: 'blur(20px)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    borderRadius: '24px',
    padding: '3rem',
    textAlign: 'center'
  };

  const inputStyle = {
    width: '100%',
    padding: '1rem',
    margin: '0.5rem 0',
    background: 'rgba(255, 255, 255, 0.1)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    borderRadius: '12px',
    color: 'white',
    fontSize: '1rem',
    outline: 'none',
    transition: 'all 0.3s ease'
  };

  const buttonStyle = {
    width: '100%',
    padding: '1rem',
    margin: '1rem 0',
    background: 'linear-gradient(135deg, #667eea, #764ba2)',
    border: 'none',
    borderRadius: '12px',
    color: 'white',
    fontSize: '1rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    transform: 'translateY(0)'
  };

  const backButtonStyle = {
    position: 'absolute',
    top: '2rem',
    left: '2rem',
    background: 'rgba(255, 255, 255, 0.1)',
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    borderRadius: '50px',
    padding: '0.8rem 1.5rem',
    color: 'white',
    cursor: 'pointer',
    fontSize: '0.9rem',
    fontWeight: '500',
    transition: 'all 0.3s ease'
  };

  const iconStyle = {
    fontSize: '3rem',
    marginBottom: '1rem',
    display: 'block'
  };

  const cardTitleStyle = {
    fontSize: '1.5rem',
    fontWeight: '600',
    color: 'white',
    marginBottom: '0.5rem'
  };

  const cardDescStyle = {
    fontSize: '1rem',
    color: 'rgba(255, 255, 255, 0.7)',
    lineHeight: '1.6'
  };

  const timeStyle = {
    position: 'absolute',
    top: '2rem',
    right: '2rem',
    background: 'rgba(255, 255, 255, 0.1)',
    backdropFilter: 'blur(10px)',
    padding: '0.8rem 1.5rem',
    borderRadius: '50px',
    color: 'white',
    fontSize: '0.9rem',
    fontWeight: '500',
    border: '1px solid rgba(255, 255, 255, 0.2)'
  };

  const floatingElementsStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    pointerEvents: 'none',
    overflow: 'hidden'
  };

  const rippleStyle = (ripple) => ({
    position: 'absolute',
    left: ripple.x,
    top: ripple.y,
    width: '0',
    height: '0',
    borderRadius: '50%',
    background: 'radial-gradient(circle, rgba(255, 255, 255, 0.6) 0%, transparent 70%)',
    animation: 'rippleEffect 0.6s ease-out',
    transform: 'translate(-50%, -50%)',
    pointerEvents: 'none'
  });

  const statsStyle = {
    display: 'flex',
    justifyContent: 'center',
    gap: '3rem',
    marginTop: '3rem',
    opacity: isLoaded ? 1 : 0,
    transform: isLoaded ? 'translateY(0)' : 'translateY(30px)',
    transition: 'all 1s cubic-bezier(0.4, 0, 0.2, 1) 0.5s'
  };

  const statItemStyle = {
    textAlign: 'center',
    color: 'rgba(255, 255, 255, 0.8)'
  };

  const statNumberStyle = {
    fontSize: '2.5rem',
    fontWeight: '700',
    background: 'linear-gradient(135deg, #667eea, #764ba2)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    display: 'block',
    marginBottom: '0.5rem'
  };

  const statLabelStyle = {
    fontSize: '0.9rem',
    textTransform: 'uppercase',
    letterSpacing: '1px',
    opacity: 0.8
  };

  const renderDashboard = () => (
    <div style={containerStyle}>
      <div style={headerStyle}>
        <h1 style={titleStyle}>UserManager</h1>
        <p style={subtitleStyle}>Next-generation authentication platform</p>
      </div>

      <div style={cardsContainerStyle}>
        <div
          className="glow-effect"
          style={cardStyle(activeCard === 'login')}
          onMouseEnter={() => setActiveCard('login')}
          onMouseLeave={() => setActiveCard(null)}
          onClick={(e) => handleCardClick('login', e)}
        >
          <div style={{ position: 'relative', zIndex: 1 }}>
            <span style={iconStyle}>🔐</span>
            <h3 style={cardTitleStyle}>Secure Login</h3>
            <p style={cardDescStyle}>
              Access your account with advanced biometric authentication and multi-factor security
            </p>
          </div>
          {ripples.map(ripple => (
            <div key={ripple.id} style={rippleStyle(ripple)} />
          ))}
        </div>

        <div
          className="glow-effect"
          style={cardStyle(activeCard === 'register')}
          onMouseEnter={() => setActiveCard('register')}
          onMouseLeave={() => setActiveCard(null)}
          onClick={(e) => handleCardClick('register', e)}
        >
          <div style={{ position: 'relative', zIndex: 1 }}>
            <span style={iconStyle}>✨</span>
            <h3 style={cardTitleStyle}>Create Account</h3>
            <p style={cardDescStyle}>
              Join our secure platform with instant verification and enterprise-grade protection
            </p>
          </div>
          {ripples.map(ripple => (
            <div key={ripple.id} style={rippleStyle(ripple)} />
          ))}
        </div>
      </div>

      <div style={statsStyle}>
        <div style={statItemStyle}>
          <span style={statNumberStyle}>99.9%</span>
          <span style={statLabelStyle}>Uptime</span>
        </div>
        <div style={statItemStyle}>
          <span style={statNumberStyle}>256-bit</span>
          <span style={statLabelStyle}>Security</span>
        </div>
        <div style={statItemStyle}>
          <span style={statNumberStyle}>50ms</span>
          <span style={statLabelStyle}>Response</span>
        </div>
      </div>
    </div>
  );

  const renderLoginPage = () => (
    <div style={pageStyle}>
      <div style={formStyle}>
        <h2 style={{ ...titleStyle, fontSize: '2.5rem', marginBottom: '2rem' }}>Welcome Back</h2>
        <input
          type="email"
          placeholder="Email address"
          style={inputStyle}
          onFocus={(e) => e.target.style.borderColor = 'rgba(102, 126, 234, 0.5)'}
          onBlur={(e) => e.target.style.borderColor = 'rgba(255, 255, 255, 0.2)'}
        />
        <input
          type="password"
          placeholder="Password"
          style={inputStyle}
          onFocus={(e) => e.target.style.borderColor = 'rgba(102, 126, 234, 0.5)'}
          onBlur={(e) => e.target.style.borderColor = 'rgba(255, 255, 255, 0.2)'}
        />
        <button
          style={buttonStyle}
          onMouseEnter={(e) => e.target.style.transform = 'translateY(-2px)'}
          onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}
          onClick={() => alert('Login functionality would be implemented here')}
        >
          Sign In
        </button>
        <p style={{ color: 'rgba(255, 255, 255, 0.7)', marginTop: '1rem' }}>
          Don't have an account? <span style={{ color: '#667eea', cursor: 'pointer' }} onClick={() => setCurrentPage('register')}>Sign up</span>
        </p>
      </div>
    </div>
  );

  const renderRegisterPage = () => (
    <div style={pageStyle}>
      <div style={formStyle}>
        <h2 style={{ ...titleStyle, fontSize: '2.5rem', marginBottom: '2rem' }}>Create Account</h2>
        <input
          type="text"
          placeholder="Full name"
          style={inputStyle}
          onFocus={(e) => e.target.style.borderColor = 'rgba(102, 126, 234, 0.5)'}
          onBlur={(e) => e.target.style.borderColor = 'rgba(255, 255, 255, 0.2)'}
        />
        <input
          type="email"
          placeholder="Email address"
          style={inputStyle}
          onFocus={(e) => e.target.style.borderColor = 'rgba(102, 126, 234, 0.5)'}
          onBlur={(e) => e.target.style.borderColor = 'rgba(255, 255, 255, 0.2)'}
        />
        <input
          type="password"
          placeholder="Password"
          style={inputStyle}
          onFocus={(e) => e.target.style.borderColor = 'rgba(102, 126, 234, 0.5)'}
          onBlur={(e) => e.target.style.borderColor = 'rgba(255, 255, 255, 0.2)'}
        />
        <input
          type="password"
          placeholder="Confirm password"
          style={inputStyle}
          onFocus={(e) => e.target.style.borderColor = 'rgba(102, 126, 234, 0.5)'}
          onBlur={(e) => e.target.style.borderColor = 'rgba(255, 255, 255, 0.2)'}
        />
        <button
          style={buttonStyle}
          onMouseEnter={(e) => e.target.style.transform = 'translateY(-2px)'}
          onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}
          onClick={() => alert('Registration functionality would be implemented here')}
        >
          Create Account
        </button>
        <p style={{ color: 'rgba(255, 255, 255, 0.7)', marginTop: '1rem' }}>
          Already have an account? <span style={{ color: '#667eea', cursor: 'pointer' }} onClick={() => setCurrentPage('login')}>Sign in</span>
        </p>
      </div>
    </div>
  );

  return (
    <>
      <style>{`
        @keyframes gradientShift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }

        @keyframes rippleEffect {
          0% {
            width: 0;
            height: 0;
            opacity: 1;
          }
          100% {
            width: 300px;
            height: 300px;
            opacity: 0;
          }
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-10px) rotate(180deg); }
        }

        .floating-orb {
          position: absolute;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(124, 58, 237, 0.3) 0%, rgba(139, 92, 246, 0.1) 70%, transparent 100%);
          animation: float 6s ease-in-out infinite;
          pointer-events: none;
        }

        .floating-orb:nth-child(1) {
          width: 100px;
          height: 100px;
          top: 10%;
          left: 10%;
          animation-delay: 0s;
        }

        .floating-orb:nth-child(2) {
          width: 60px;
          height: 60px;
          top: 70%;
          right: 20%;
          animation-delay: -2s;
        }

        .floating-orb:nth-child(3) {
          width: 80px;
          height: 80px;
          bottom: 20%;
          left: 70%;
          animation-delay: -4s;
        }

        .glow-effect {
          position: relative;
        }

        .glow-effect::before {
          content: '';
          position: absolute;
          top: -2px;
          left: -2px;
          right: -2px;
          bottom: -2px;
          background: linear-gradient(45deg, #667eea, #764ba2, #f093fb, #f5576c, #4facfe, #667eea);
          border-radius: 26px;
          z-index: -1;
          animation: rotateGlow 4s linear infinite;
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .glow-effect:hover::before {
          opacity: 0.8;
        }

        @keyframes rotateGlow {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>

      <div style={backgroundStyle}>
        <div style={floatingElementsStyle}>
          <div className="floating-orb"></div>
          <div className="floating-orb"></div>
          <div className="floating-orb"></div>
        </div>

        <div style={timeStyle}>
          {currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </div>

        {currentPage !== 'dashboard' && (
          <button
            style={backButtonStyle}
            onClick={handleBackToDashboard}
            onMouseEnter={(e) => e.target.style.background = 'rgba(255, 255, 255, 0.2)'}
            onMouseLeave={(e) => e.target.style.background = 'rgba(255, 255, 255, 0.1)'}
          >
            ← Back to Dashboard
          </button>
        )}

        {currentPage === 'dashboard' && renderDashboard()}
        {currentPage === 'login' && renderLoginPage()}
        {currentPage === 'register' && renderRegisterPage()}
      </div>
    </>
  );
};

export default Dashboard;