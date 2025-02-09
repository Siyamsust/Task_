import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../Context/AuthContext';
import AuthForm from '../../Components/AuthForm/AuthForm';
import AuthTabs from '../../Components/AuthTabs/AuthTabs';
import SocialLogin from '../../Components/SocialLogin/SocialLogin';
import './LoginSignup.css';

const LoginSignup = () => {
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    confirmPassword: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle authentication logic here
    handleLogin(formData);
  };

  const handleLogin = async (credentials) => {
    try {
      await login(credentials);
      
      // After successful login, redirect to the intended page or chat
      if (location.state?.from) {
        navigate(location.state.from);
      } else {
        navigate('/');
      }
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <div className="auth-header">
          <h2>{isLogin ? 'Welcome Back!' : 'Create Account'}</h2>
          <p>{isLogin ? 'Login to access your account' : 'Sign up to get started'}</p>
        </div>

        {location.state?.message && (
          <div className="login-message">
            {location.state.message}
          </div>
        )}

        <AuthTabs isLogin={isLogin} setIsLogin={setIsLogin} />
        
        <AuthForm 
          isLogin={isLogin}
          formData={formData}
          setFormData={setFormData}
          handleSubmit={handleSubmit}
        />

        <SocialLogin />
      </div>
    </div>
  );
};

export default LoginSignup; 