// AuthContext.js

import { createContext, useContext, useState } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [authenticated, setAuthenticated] = useState(
        localStorage.getItem('accessToken') ? true : false
    );

    const login = async (username, password) => {
        try {
            console.log('Sending request with:', { username, password });
            const response = await axios.post(
                'http://localhost:8090/api/auth/signin',
                { username, password },
                { withCredentials: true }
            );

            const accessToken = response.data.accessToken;
            const cartid = response.data.cartid;

            if (accessToken) {
                setAuthenticated(true);
                console.log(response.data)
                localStorage.setItem('accessToken', accessToken);
                localStorage.setItem('cartid', cartid);
                console.log(response.data.cartid)
            } else {
                throw new Error('Invalid credentials');
            }
        } catch (error) {
            console.error('Login error:', error.response || error);
            console.error('Login error:', error);
            throw error; // Rethrow the error to be caught by the calling component
        }
    };

    const logout = async () => {
        try {
            await new Promise((resolve) => setTimeout(resolve, 1000));
            // Call your backend to invalidate the token
            await axios.post('http://localhost:8090/api/auth/signout', null, {
                withCredentials: true,
            });

            
            // Remove the token from storage
            window.location.reload();
            localStorage.removeItem('accessToken');
            setAuthenticated(false);

        } catch (error) {
            console.error('Logout error:', error);
        }
    };

    return (
        <AuthContext.Provider value={{ authenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};
