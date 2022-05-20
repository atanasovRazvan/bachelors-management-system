import './createaccounts.scss';
import Input from "../../../input/input";
import Button from "../../../button/button";
import Error from "../../../message/message";
import {useState} from "react";

const dropdownData = [
    {
        value: "student",
        label: "Student",
    },
    {
        value: "coordonator",
        label: "Coordonator",
    },
]

const CreateAccounts = () => {

    const [error, setError] = useState(null);
    const [username, setUsername] = useState("");
    const [nume, setNume] = useState("");
    const [prenume, setPrenume] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("Student");
    const [nrMatricol, setNrMatricol] = useState("");

    const handleSubmit = () => {
        //TODO: Legatura la back
        const reqObj = {
            username,
            nume,
            prenume,
            email,
            password,
            role,
            nr_matricol: nrMatricol,
        };
        console.log(reqObj);
    }

    return(
        <div className="wrapper">
            <div className="flex-3">
                <Input
                    label="Nume de utilizator"
                    value={username}
                    onEdit={(newValue) => setUsername(newValue)}
                />
                <Input
                    label="Parola initiala"
                    value={password}
                    onEdit={(newValue) => setPassword(newValue)}
                />
                <Input
                    label="Rol"
                    variant="dropdown"
                    value={role}
                    onEdit={(newValue) => setRole(newValue)}
                    data={dropdownData}
                />
            </div>

            <div className="flex-2">
                <Input
                    label="Nume"
                    value={nume}
                    onEdit={(newValue) => setNume(newValue)}
                />
                <Input
                    label="Prenume"
                    value={prenume}
                    onEdit={(newValue) => setPrenume(newValue)}
                />
            </div>
            <div className="flex-2">
                <Input
                    label="Numar Matricol"
                    value={nrMatricol}
                    onEdit={(newValue) => setNrMatricol(newValue)}
                />
                <Input
                    label="Email"
                    value={email}
                    onEdit={(newValue) => setEmail(newValue)}
                />
            </div>
            <div className="button">
                <Button
                    value="Salveaza"
                    action={handleSubmit}
                />
            </div>
            {
                error ?
                    <Error message={error}/>
                    :
                    null
            }
        </div>
    )
}

export default CreateAccounts;
