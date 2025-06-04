import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [company, setCompany] = useState(() => {
    const savedCompany = localStorage.getItem('company');
    return savedCompany ? JSON.parse(savedCompany) : null;
  });
  const [loading, setLoading] = useState(false);

  const login = async (companyData) => {
    try {
      setLoading(true);
      localStorage.setItem('company', JSON.stringify(companyData));
      localStorage.setItem('token', companyData.token);
      setCompany(companyData);
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const updateCompany = async (updatedData) => {
    try {
      setLoading(true);
      // Get the current token
      const token = localStorage.getItem('token');
      
      // Make API call to update user data
      const response = await fetch('http://localhost:4000/company/auth/update', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(updatedData)
      });

      if (!response.ok) {
        throw new Error('Failed to update user');
      }

      const updatedUser = await response.json();
      
      // Update local storage and state
      const newUserData = { ...company, ...updatedUser };
      localStorage.setItem('company', JSON.stringify(newUserData));
      setCompany(newUserData);
      
      return updatedUser;
    } catch (error) {
      console.error('Update error:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('company');
    localStorage.removeItem('token');
    setCompany(null);
  };

  const value = {
    company,
    loading,
    login,
    logout,
    updateCompany
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};