import React, { useState, useEffect } from 'react';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [focusedField, setFocusedField] = useState(null);

  // State to store user data (replacing localStorage for demo purposes)
  const [authState, setAuthState] = useState({ token: null, user: null });

  useEffect(() => {
    setIsVisible(true);

    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      // Real API call using fetch (axios equivalent)
      const response = await fetch('http://localhost:8080/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error('Login failed');
      }

      const data = await response.json();
      const { token, user } = data;

      // Store token and user data
      // Note: In a real app, you'd use localStorage:
      // localStorage.setItem('token', token);
      // localStorage.setItem('user', JSON.stringify(user));

      // For demo purposes, using React state:
      setAuthState({ token, user });

      alert('Login successful!');
      console.log('User logged in:', user);

      // In a real app, redirect to dashboard:
      // window.location.href = '/dashboard';
      // Or use React Router's navigate()

    } catch (err) {
      console.error('Login failed:', err);
      setError('Invalid email or password');
    } finally {
      setIsLoading(false);
    }
  };

  /*
  // For use in your actual application (with axios):
  import axios from 'axios';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const response = await axios.post('http://localhost:8080/api/auth/login', {
        email,
        password
      });

      const { token, user } = response.data;

      // Store token in localStorage (or cookie if preferred)
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));

      alert('Login successful!');
      console.log('User logged in:', user);

      // Redirect to dashboard
      window.location.href = '/dashboard';
      // Or use React Router's navigate()

    } catch (err) {
      console.error('Login failed:', err);
      setError('Invalid email or password');
    } finally {
      setIsLoading(false);
    }
  };
  */

  const backgroundStyle = {
    minHeight: '100vh',
    background: `
      radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(124, 58, 237, 0.15) 0%, transparent 50%),
      linear-gradient(135deg, #0f0f23 0%, #1a1a2e 25%, #16213e 50%, #0f3460 75%, #533a71 100%)
    `,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
    position: 'relative',
    overflow: 'hidden'
  };

  const containerStyle = {
    position: 'relative',
    width: '100%',
    maxWidth: '450px',
    padding: '2rem',
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? 'translateY(0) scale(1)' : 'translateY(30px) scale(0.95)',
    transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)'
  };

  const cardStyle = {
    background: 'rgba(255, 255, 255, 0.05)',
    backdropFilter: 'blur(20px)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    borderRadius: '24px',
    padding: '3rem',
    boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)',
    position: 'relative',
    overflow: 'hidden'
  };

  const titleStyle = {
    fontSize: '2.5rem',
    fontWeight: '700',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 25%, #f093fb 50%, #f5576c 75%, #4facfe 100%)',
    backgroundSize: '300% 300%',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    animation: 'gradientShift 4s ease-in-out infinite',
    textAlign: 'center',
    marginBottom: '2rem'
  };

  const formGroupStyle = {
    marginBottom: '1.5rem',
    position: 'relative'
  };

  const labelStyle = {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: '0.9rem',
    fontWeight: '500',
    marginBottom: '0.5rem',
    display: 'block',
    textTransform: 'uppercase',
    letterSpacing: '0.5px'
  };

  const inputStyle = (fieldName) => ({
    width: '100%',
    padding: '1rem 1.5rem',
    backgroundColor: focusedField === fieldName ? 'rgba(124, 58, 237, 0.1)' : 'rgba(255, 255, 255, 0.05)',
    border: focusedField === fieldName ? '2px solid #7c3aed' : '1px solid rgba(255, 255, 255, 0.2)',
    borderRadius: '12px',
    color: 'white',
    fontSize: '1rem',
    fontWeight: '400',
    outline: 'none',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    backdropFilter: 'blur(10px)',
    boxShadow: focusedField === fieldName ? '0 0 20px rgba(124, 58, 237, 0.3)' : '0 2px 10px rgba(0, 0, 0, 0.1)'
  });

  const buttonStyle = {
    width: '100%',
    padding: '1rem 2rem',
    background: isLoading
      ? 'linear-gradient(135deg, #6b7280, #9ca3af)'
      : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    border: 'none',
    borderRadius: '12px',
    color: 'white',
    fontSize: '1.1rem',
    fontWeight: '600',
    cursor: isLoading ? 'not-allowed' : 'pointer',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    transform: isLoading ? 'scale(0.98)' : 'scale(1)',
    boxShadow: isLoading
      ? '0 4px 15px rgba(0, 0, 0, 0.2)'
      : '0 8px 25px rgba(124, 58, 237, 0.4)',
    position: 'relative',
    overflow: 'hidden'
  };

  const errorStyle = {
    backgroundColor: 'rgba(239, 68, 68, 0.1)',
    border: '1px solid rgba(239, 68, 68, 0.3)',
    borderRadius: '8px',
    padding: '0.75rem 1rem',
    color: '#fca5a5',
    fontSize: '0.9rem',
    marginBottom: '1rem',
    backdropFilter: 'blur(10px)'
  };

  const loadingSpinnerStyle = {
    display: 'inline-block',
    width: '20px',
    height: '20px',
    border: '2px solid rgba(255, 255, 255, 0.3)',
    borderTop: '2px solid white',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite',
    marginRight: '0.5rem'
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

  const successStyle = {
    backgroundColor: 'rgba(34, 197, 94, 0.1)',
    border: '1px solid rgba(34, 197, 94, 0.3)',
    borderRadius: '8px',
    padding: '0.75rem 1rem',
    color: '#86efac',
    fontSize: '0.9rem',
    marginBottom: '1rem',
    backdropFilter: 'blur(10px)'
  };

  return (
    <>
      <style jsx>{`
        @keyframes gradientShift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-10px) rotate(180deg); }
        }

        @keyframes pulse {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 0.8; }
        }

        .floating-orb {
          position: absolute;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(124, 58, 237, 0.3) 0%, rgba(139, 92, 246, 0.1) 70%, transparent 100%);
          animation: float 8s ease-in-out infinite;
          pointer-events: none;
        }

        .floating-orb:nth-child(1) {
          width: 80px;
          height: 80px;
          top: 15%;
          left: 10%;
          animation-delay: 0s;
        }

        .floating-orb:nth-child(2) {
          width: 60px;
          height: 60px;
          top: 70%;
          right: 15%;
          animation-delay: -3s;
        }

        .floating-orb:nth-child(3) {
          width: 40px;
          height: 40px;
          bottom: 20%;
          left: 80%;
          animation-delay: -6s;
        }

        .card-glow::before {
          content: '';
          position: absolute;
          top: -1px;
          left: -1px;
          right: -1px;
          bottom: -1px;
          background: linear-gradient(45deg, #667eea, #764ba2, #f093fb, #f5576c, #4facfe, #667eea);
          border-radius: 25px;
          z-index: -1;
          animation: rotateGlow 6s linear infinite;
          opacity: 0.3;
        }

        @keyframes rotateGlow {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        input::placeholder {
          color: rgba(255, 255, 255, 0.4);
          font-weight: 300;
        }

        .button-shimmer::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
          transition: left 0.5s;
        }

        .button-shimmer:hover::before {
          left: 100%;
        }
      `}</style>

      <div style={backgroundStyle}>
        {/* Floating Background Elements */}
        <div style={floatingElementsStyle}>
          <div className="floating-orb"></div>
          <div className="floating-orb"></div>
          <div className="floating-orb"></div>
        </div>

        <div style={containerStyle}>
          <div className="card-glow" style={cardStyle}>
            <h2 style={titleStyle}>Welcome Back</h2>

            {authState.token && (
              <div style={successStyle}>
                ✅ Login successful! Welcome {authState.user?.name || 'User'}!
              </div>
            )}

            {error && (
              <div style={errorStyle}>
                ⚠️ {error}
              </div>
            )}

            <div onSubmit={handleSubmit}>
              <div style={formGroupStyle}>
                <div style={labelStyle}>Email Address</div>
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onFocus={() => setFocusedField('email')}
                  onBlur={() => setFocusedField(null)}
                  style={inputStyle('email')}
                  required
                />
              </div>

              <div style={formGroupStyle}>
                <div style={labelStyle}>Password</div>
                <input
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onFocus={() => setFocusedField('password')}
                  onBlur={() => setFocusedField(null)}
                  style={inputStyle('password')}
                  required
                />
              </div>

              <button
                type="button"
                disabled={isLoading}
                onClick={handleSubmit}
                style={buttonStyle}
                className="button-shimmer"
              >
                {isLoading ? (
                  <>
                    <span style={loadingSpinnerStyle}></span>
                    Authenticating...
                  </>
                ) : (
                  '🔐 Sign In'
                )}
              </button>
            </div>

            <div style={{
              textAlign: 'center',
              marginTop: '1.5rem',
              color: 'rgba(255, 255, 255, 0.6)',
              fontSize: '0.9rem'
            }}>
              Don't have an account? <span style={{ color: '#667eea', cursor: 'pointer' }}>Sign up</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginForm;