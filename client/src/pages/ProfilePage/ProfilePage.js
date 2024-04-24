import React, { useState, useEffect } from 'react';
import { Navigate, Link } from 'react-router-dom';
import useToken from '../../hooks/useToken';
import axios from 'axios';
import { jwtDecode as jwt_decode } from 'jwt-decode';
import './ProfilePage.css';

export default function ProfilePage() {
    const { token, setToken } = useToken();
    const [user, setUser] = useState(null);
    const [viewMode, setViewMode] = useState('watchlist'); // Default to 'watchlist'

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                // Retrieve the access token from local storage
                const accessToken = localStorage.getItem('accessToken');

                // Decode the access token to extract payload
                const decodedToken = jwt_decode(accessToken);
                console.log(decodedToken);

                // Extract email, first name, and last name from the decoded payload
                const { name, username } = decodedToken;

                // Set the email, first name, and last name in the state
                setUser({ firstName: name.first, lastName: name.last, username });

            } catch (error) {
                console.error('Error fetching user profile:', error);
            }
        };

        fetchUserProfile();
    }, []);

    // If there isn't a token set, redirect the user to the login page
    if (!token) {
        return <Navigate to='/login' replace />;
    }

    // Handler function for logout
    const handleLogout = () => {
        // Clear authentication token
        setToken(null);
    };

    const handleViewModeChange = (mode) => {
        setViewMode(mode);
    };
    
    return (
        <div className="profile-container">
            {user && (
                <div>
                    <h1>Welcome back, {user.firstName}.</h1>
                    <div className="options-container">
                        <button
                            onClick={() => handleViewModeChange('watchlist')}
                            className={viewMode === 'watchlist' ? 'active' : ''}
                        >
                            View Your Watchlist
                        </button>
                        <button
                            onClick={() => handleViewModeChange('account')}
                            className={viewMode === 'account' ? 'active' : ''}
                        >
                            View Account Information
                        </button>
                    </div>
                    {viewMode === 'watchlist' && (
                        <div>
                            {/* Watchlist content goes here */}
                        </div>
                    )}
                    {viewMode === 'account' && (
                        <div className = "account-info">
                            <h2>Account Information</h2>
                            <p><strong>Username</strong> - {user.username}</p>
                            <p><strong>First Name</strong> - {user.firstName}</p>
                            <p><strong>Last Name</strong> - {user.lastName}</p>
                        </div>
                    )}
                </div>
            )}
            <button onClick={handleLogout}>Logout</button>
        </div>
    );
}
