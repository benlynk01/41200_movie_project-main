import React from 'react';
import LoginForm from '../../components/LoginForm/LoginForm.js';
import './LoginPage.css';

export default function LoginPage({ setIsLoggedIn }) {
    const handleLogin = () => {
        setIsLoggedIn(true);
    };

    return (
        <div className="login-page-container"> 
            <LoginForm onLogin={handleLogin} />
        </div>
    );
}