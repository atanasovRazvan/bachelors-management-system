import React from 'react';
import PropTypes from 'prop-types';
import useLocalStorage from '../utils/CustomHooks';

export const AuthContext = React.createContext();

const AuthProvider = ({ children }) => {
    const [username, setUsername] = useLocalStorage('username', null);
    const [userRole, setUserRole] = useLocalStorage('userRole', null);
    const [isAsigned, setIsAsigned] = useLocalStorage('isAsigned', null);
    const [hasRequest, setHasRequest] = useLocalStorage('hasRequest', false);
    const [coordinatorUsername, setCoordinatorUsername] = useLocalStorage('coordinator', "");

    const value = {
        username,
        userRole,
        isAsigned,
        hasRequest,
        coordinatorUsername,
        setUsername,
        setUserRole,
        setIsAsigned,
        setHasRequest,
        setCoordinatorUsername,
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
