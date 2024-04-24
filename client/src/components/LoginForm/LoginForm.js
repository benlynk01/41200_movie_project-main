import React, { useState, useContext } from 'react'; 
import { useNavigate, Navigate } from 'react-router-dom'; 
import { APIURLContext } from '../../contexts/APIURLContext';
import axios from 'axios';
import useToken from '../../hooks/useToken';
import './LoginForm.css'; 

export default function LoginForm() {
    const [inputs, setInputs] = useState({});
    const apiURL = useContext(APIURLContext);
    const { token, setToken } = useToken();
    const navigate = useNavigate();

    if (token) {
        return <Navigate replace to='/profile' />
    }

    // Function that posts form data to the API
    async function loginUser(credentials) {
        try {
            let res = await axios.post(apiURL + '/users/login', credentials);
            console.log(res.data);
            return res.data;
        } catch (err) {
            console.log(err);
            return null;
        }
    }

    // Handler function for form field changes
    const handleChange = (event) => {
        const fieldName = event.target.name;
        const fieldValue = event.target.value;
        setInputs(values => ({...values, [fieldName]: fieldValue}));
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        // Create an object that contains the username and password that the user entered
        let loginCredentials = {
            username: inputs.username,
            password: inputs.password
        };

        const loginResponse = await loginUser(loginCredentials);
        if (loginResponse === null) {
            alert("That username and password is not valid");
        } else {
            setToken(loginResponse.accessToken);
            console.log("Logging in...");
            navigate('/profile');
        }
    }

    return (
        <div className="form-container">
            <label>Login</label>
            <form method="post" onSubmit={handleSubmit}>
                <input 
                    type="text"
                    placeholder="Username"
                    value={inputs.username || ""} 
                    name="username" 
                    onChange={handleChange}
                />
                <br/>
                <input 
                    type="password" 
                    placeholder="Password"
                    value={inputs.password || ""} 
                    name="password" 
                    onChange={handleChange}
                />
                <br/>
                <div className = "submit-container">
                    <input type="submit" value="Log In" />
                </div>
                
            </form>
        </div>
    );
}
