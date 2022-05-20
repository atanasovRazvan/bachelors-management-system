import {useContext} from "react";
import {AuthContext} from "../context/AuthProvider";
import { Route, Redirect } from "react-router-dom";

const AuthenticatedRoute = ({ path, exact, component }) => {
    const { userRole } = useContext(AuthContext);
    return (
        userRole === null
            ? (<Route path={path} exact={exact} component={component} />)
            : (<Redirect to="/" />)
    );
};

export default AuthenticatedRoute;
