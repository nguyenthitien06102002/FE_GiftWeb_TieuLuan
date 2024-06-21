import React from 'react';
import { useNavigate } from 'react-router-dom';
import { logEvent } from './LogPage';

const PrivateRoute = ({ children }) => {
    const userData = JSON.parse(localStorage.getItem('userData'));
    const navigate = useNavigate();

    React.useEffect(() => {
        if (!userData) {
            logEvent('NAVIGATION', 'No user data found','5');
            navigate('/login');
           
        } else if (userData.status !== 0) {

             logEvent('NAVIGATION', 'No admin', '5');
            navigate('/login');
           
        }

    }, [userData, navigate]);

    return userData ? children : null;
};

export default PrivateRoute;