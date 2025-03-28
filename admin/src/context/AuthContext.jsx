// src/context/AuthContext.js
import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            try {
                const userData = JSON.parse(atob(token.split('.')[1])); // Decode the token to get user data
                setUser(userData);
            } catch (error) {
                console.error('Failed to decode token:', error);
                localStorage.removeItem('token'); // Clear invalid token
            }
        }
    }, []);

    const login = (userData) => {
        setUser(userData);
        const token = userData.token; // Assuming token is returned from the login API
        localStorage.setItem('token', token); // Store token in localStorage
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('token'); // Remove token from localStorage
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};