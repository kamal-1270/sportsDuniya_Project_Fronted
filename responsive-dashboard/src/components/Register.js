// import { useState } from 'react';

// const Register = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [name, setName] = useState('');
//   const [error, setError] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [successMessage, setSuccessMessage] = useState('');

//   const handleRegister = () => {
//     if (!email || !password || !name) {
//       setError('All fields are required!');
//       return;
//     }

//     setError('');
//     setLoading(true);

//     const userData = { email, name, password };

//     // Save user data to localStorage
//     localStorage.setItem('user', JSON.stringify(userData));

//     // Show success message
//     setSuccessMessage('Registration successful! User data saved locally.');
//     setLoading(false);
//   };

//   return (
//     <div className="register">
//       <input
//         type="text"
//         value={name}
//         onChange={(e) => setName(e.target.value)}
//         placeholder="Name"
//       />
//       <input
//         type="email"
//         value={email}
//         onChange={(e) => setEmail(e.target.value)}
//         placeholder="Email"
//       />
//       <input
//         type="password"
//         value={password}
//         onChange={(e) => setPassword(e.target.value)}
//         placeholder="Password"
//       />
//       {error && <p className="error-message">{error}</p>}
//       {successMessage && <p className="success-message">{successMessage}</p>}
//       <button onClick={handleRegister} disabled={loading}>
//         {loading ? 'Registering...' : 'Register'}
//       </button>
//     </div>
//   );
// };

// export default Register;
