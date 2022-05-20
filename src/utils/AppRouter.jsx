import {AuthContext} from "../context/AuthProvider";
import {useContext} from "react";
import {BrowserRouter as Router, Redirect, Route, Switch} from "react-router-dom";
import AuthenticatedRoute from "./AuthenticatedRoute";
import Storybook from "../storybook-page/storybook";
import Login from "../login/login";
import Dashboard from "../dashboard/dashboard";
import NotFound from "../notfound/notfound";


const AppRouter = () => {
    const { username } = useContext(AuthContext);
    return (
        <Router>
            <Switch>
                <Route path={"/storybook"} component={Storybook} />
                <AuthenticatedRoute path={"/login"} component={Login} />
                {
                    username ?
                        <Route exact path="/" component={Dashboard} />
                        :
                        <Redirect from="/" to="/login" />
                }
                <Route exact path="/notfound" component={NotFound} />
                <Redirect from="*" to="/notfound" />
            </Switch>
        </Router>
    );
}

export default AppRouter;
