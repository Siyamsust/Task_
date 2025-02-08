import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthForm from '../../Components/AuthForm/AuthForm';
import AuthTabs from '../../Components/AuthTabs/AuthTabs';
import SocialLogin from '../../Components/SocialLogin/SocialLogin';
import './LoginSignup.css';

const LoginSignup = () => {
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    confirmPassword: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle authentication logic here
    navigate('/profile');
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <div className="auth-header">
          <h2>{isLogin ? 'Welcome Back!' : 'Create Account'}</h2>
          <p>{isLogin ? 'Login to access your account' : 'Sign up to get started'}</p>
        </div>

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