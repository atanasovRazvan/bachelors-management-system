import {useContext, useState} from "react";
import Input from "../input/input";
import Button from "../button/button";
import {AuthContext} from "../context/AuthProvider";
import './login.scss';
import axios from "axios";
import {baseUrl} from "../utils/constants";
import Message from "../message/message";

const Login = () => {
    const [username, setUser] = useState('');
    const [password, setPassword] = useState('');
    const { setUsername, setUserRole, setIsAsigned, setHasRequest, setCoordinatorUsername } = useContext(AuthContext);
    const [message, setMessage] = useState("");

    const handleClick = () => {
        axios.post(`${baseUrl}auth/signin`, {
            userName: username,
            password,
        }).then((res) => {
            if(res.status === 200){
                if(res.data.role === "student"){
                    setIsAsigned(res.data.isAssigned);
                    setHasRequest(res.data.isRequestSent);
                    setCoordinatorUsername(res.data.coordinatorUsername);
                }
                setUsername(username);
                setUserRole(res.data.role);
            }
            else{
                setMessage("Eroare: Username sau Parola incorecte!");
            }
        }).catch((err) => {
            setMessage(err.message);
        });
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
                <Message variant="error" message={message} />
            </div>
        </div>
    );
}

export default Login;
