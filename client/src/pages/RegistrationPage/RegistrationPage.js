import React from 'react';
import RegistrationForm from '../../components/RegistrationForm/RegistrationForm.js';  
import './RegistrationPage.css';

export default function RegistrationPage({ setIsLoggedIn }) {
    // Function to handle actions after successful registration
    const handleRegistrationSuccess = () => {
        setIsLoggedIn(true);  // Optionally set user as logged in right after registration
    };

    return (
        <div className="registration-page-container">
            <RegistrationForm onRegistrationSuccess={handleRegistrationSuccess} />
        </div>
    );
}
