import React from 'react';
import PropTypes from 'prop-types';
import useLocalStorage from '../utils/CustomHooks';

export const AuthContext = React.createContext();

const AuthProvider = ({ children }) => {
    const [username, setUsername] = useLocalStorage('username', null);
    const [userRole, setUserRole] = useLocalStorage('userRole', null);

    const value = {
        username,
        userRole,
        setUsername,
        setUserRole,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

AuthProvider.defaultProps = {
    children: null,
};

AuthProvider.propTypes = {
    children: PropTypes.node,
};

export default AuthProvider;
