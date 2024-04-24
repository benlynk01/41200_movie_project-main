import { useState } from 'react';

export default function useToken() {
    function retrieveToken() {
        const tokenString = localStorage.getItem('accessToken');
        if (!tokenString) {
            return null; // Token not found in localStorage
        }
        try {
            const userToken = JSON.parse(tokenString);
            return userToken;
        } catch (error) {
            console.error('Error parsing token:', error);
            return null; // Return null if parsing fails
        }
    }

    
 
    const [token, setToken] = useState(retrieveToken());

    // Function that sets accessToken in LocalStorage
    function saveToken(userToken) {
        localStorage.setItem('accessToken', JSON.stringify(userToken));
        setToken(userToken);
    }

    // Return an object that allows invoking the custom hook
    return {
        token,
        setToken: saveToken
    };
}