import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [authData, setAuthData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProfile = async () => {
            const token = localStorage.getItem('token');
            if (token) {
                try {
                    const response = await axios.get('http://petcare-backend-193c8a8cd9bf.herokuapp.com/api/profile', {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    });
                    setAuthData({
                        ...response.data.data,
                        token
                    });
                } catch (error) {
                    console.error('Error fetching profile:', error);
                }
            }
            setLoading(false);
        };

        fetchProfile();
    }, []);

    return (
        <AuthContext.Provider value={{ authData, loading }}>
            {children}
        </AuthContext.Provider>
    );
};
