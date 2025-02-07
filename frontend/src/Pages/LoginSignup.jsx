import React from 'react'
import { useState } from 'react';
import './CSS/LoginSignup.css'
const LoginSignup = () => {
    const [isSignUp, setIsSignUp] = useState(false); // Toggle between login and sign-up

    const handleToggleForm = () => {
        setIsSignUp(!isSignUp); // Toggle form between login and signup
    };
    return (
        <div className="login-page">
            <h2>{isSignUp ? "Sign Up" : "Login"}</h2>
            <form className="login-form">
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" placeholder="Enter your email" required />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" placeholder="Enter your password" required />
                </div>
                <button type="submit">{isSignUp ? "Sign Up" : "Login"}</button>
            </form>

            <p>
                {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
                <button onClick={handleToggleForm}>
                    {isSignUp ? "Login" : "Sign Up"}
                </button>
            </p>
        </div>
    )
}

export default LoginSignup
