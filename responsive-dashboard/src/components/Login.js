import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for redirection (React Router v6)
import AuthContext from '../contexts/AuthContext';
// import './Auth.css'; // Optional, add your custom styles if needed
import './Login.css'
const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [isRegistering, setIsRegistering] = useState(true); // Toggle between Register and Login

  const { login } = useContext(AuthContext);
  const navigate = useNavigate(); // Initialize useNavigate

  const handleRegister = () => {
    if (!email || !password || !name) {
      setError('All fields are required!');
      return;
    }

    setError('');
    setLoading(true);

    const userData = { email, name, password };

    // Save user data to localStorage
    localStorage.setItem('user', JSON.stringify(userData));

    // Show success message
    setSuccessMessage('Registration successful! User data saved locally.');
    setLoading(false);
  };

  const handleLogin = () => {
    // Validate email and password
    if (!email || !password) {
      setError('Please enter both email and password');
      return; // Prevent login if fields are empty
    }

    setError(''); // Clear any previous error

    const userData = { email, name: 'User' };  // Simplified login
    login(userData);
    
    // Redirect to dashboard after successful login
    navigate('/dashboard'); // React Router v6 uses `navigate` instead of `history.push`
  };

  return (
    <div className="auth">
      {isRegistering ? (
        <>
          <h2>Register</h2>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name"
          />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
          {error && <p className="error-message">{error}</p>}
          {successMessage && <p className="success-message">{successMessage}</p>}
          <button onClick={handleRegister} disabled={loading}>
            {loading ? 'Registering...' : 'Register'}
          </button>
          <p>Already have an account? <span onClick={() => setIsRegistering(false)} className="link">Login</span></p>
        </>
      ) : (
        <>
          <h2>Login</h2>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
          {error && <p className="error-message">{error}</p>}
          <button onClick={handleLogin}>Login</button>
          <p>Don't have an account? <span onClick={() => setIsRegistering(true)} className="link">Register</span></p>
        </>
      )}
    </div>
  );
};

export default Login;
