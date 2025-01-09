import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { NewsProvider } from './contexts/NewsContext';
import Dashboard from './components/Dashboard';
// import Login from './components/Login';
import Register from './components/Register';
import Login from './components/Login';

const App = () => {
  return (
    <AuthProvider>
      <NewsProvider>
        <Router>
          <Routes>
            {/* <Route path="/" element={<Register />} /> */}
            <Route path="/" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </Router>
      </NewsProvider>
    </AuthProvider>
  );
};

export default App;
