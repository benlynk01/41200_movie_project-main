import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { APIURLContext } from '../../contexts/APIURLContext';
import axios from 'axios';
import './RegistrationForm.css';
import useToken from '../../hooks/useToken';  // Manage the token

export default function RegistrationForm() {
    const [inputs, setInputs] = useState({
        firstName: '',
        lastName: '',
        username: '',
        password: '',
    });
    const apiURL = useContext(APIURLContext);
    const { setToken } = useToken();
    const navigate = useNavigate();

    async function registerUser(details) {
        try {
            let response = await axios.post(`${apiURL}/users/register`, details);
            if (response.data && response.data.accessToken) {
                console.log("Registration successful.");
                setToken(response.data.accessToken);  // Store the access token
                navigate('/profile');

                // Send an "Ok" response to the API after successful registration
                await axios.post(`${apiURL}/response`, { message: "Ok" });
            } else {
                alert("Registration failed: " + (response.data.message || "Please check your details."));
            }
        } catch (err) {
            console.error("Registration error:", err.response ? err.response.data : err);
            alert("Registration failed: " + (err.response?.data.message || "Please check your details."));
        }
    }

    const handleChange = (event) => {
        const { name, value } = event.target;
        setInputs(values => ({ ...values, [name]: value }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        await registerUser(inputs);
    };

    return (
        <div className="form-container">
            <label>Register</label>
            <form method="post" onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="First Name"
                    name="firstName"
                    value={inputs.firstName}
                    onChange={handleChange}
                />
                <input
                    type="text"
                    placeholder="Last Name"
                    name="lastName"
                    value={inputs.lastName}
                    onChange={handleChange}
                />
                <input
                    type="text"
                    placeholder="Username"
                    name="username"
                    value={inputs.username}
                    onChange={handleChange}
                />
                <input
                    type="password"
                    placeholder="Password"
                    name="password"
                    value={inputs.password}
                    onChange={handleChange}
                />
                <div className="submit-container">
                    <input type="submit" value="Register" />
                </div>
            </form>
        </div>
    );
}
