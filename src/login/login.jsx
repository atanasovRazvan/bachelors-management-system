import {useContext, useState} from "react";
import Input from "../input/input";
import Button from "../button/button";
import {AuthContext} from "../context/AuthProvider";
import './login.scss';

const Login = () => {
    const [username, setUser] = useState('');
    const [password, setPassword] = useState('');
    const { setUsername, setUserRole } = useContext(AuthContext);

    const handleClick = () => {
        console.log("Username: " + username);
        console.log("Password: " + password);

        // TODO: POST Login
        // IF all good, do:
        setUsername(username);
        setUserRole('student');
    }

    return(
        <div className="login">
            <div className="login-bg" />
            <div className="login-content">
                <Input
                    label={"Username"}
                    value={username}
                    onEdit={setUser}
                    required={true}
                />
                <Input
                    label={"Password"}
                    value={password}
                    onEdit={setPassword}
                    type={"password"}
                    required={true}
                />
                <div className="login-button">
                    <Button
                        value={"Trimite"}
                        action={handleClick}
                    />
                </div>
            </div>
        </div>
    );
}

export default Login;
