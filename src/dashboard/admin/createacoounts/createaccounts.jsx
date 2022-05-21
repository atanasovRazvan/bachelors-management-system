import './createaccounts.scss';
import Input from "../../../input/input";
import Button from "../../../button/button";
import Error from "../../../message/message";
import {useState} from "react";

const dropdownRole = [
    {
        value: "student",
        label: "Student",
    },
    {
        value: "coordonator",
        label: "Coordonator",
    },
];

const dropdownStudii = [
    {
        value: "licenta",
        label: "Licenta",
    },
    {
        value: "master",
        label: "Master",
    },
];

const dropdownInvatamant = [
    {
        value: "if",
        label: "IF",
    },
    {
        value: "ifr",
        label: "IFR",
    },
    {
        value: "id",
        label: "ID",
    },
];

const CreateAccounts = () => {

    const [error, setError] = useState(null);
    const [username, setUsername] = useState("");
    const [nume, setNume] = useState("");
    const [prenume, setPrenume] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("Student");
    const [nrMatricol, setNrMatricol] = useState("");
    const [specializare, setSpecializare] = useState("");
    const [generatie, setGeneratie] = useState("");
    const [studii, setStudii] = useState("Licenta");
    const [invatamant, setInvatamant] = useState("IF");
    const [grupa, setGrupa] = useState("");

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
            specializare,
            generatie,
            studii,
            invatamant,
            grupa
        };
        console.log(reqObj);
    }

    return(
        <div className="createacctounts-wrapper">
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
                    data={dropdownRole}
                />
            </div>

            <div className="flex-3">
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
                <Input
                    label="Numar Matricol"
                    value={nrMatricol}
                    onEdit={(newValue) => setNrMatricol(newValue)}
                />
            </div>
            <div className="flex-3">
                <Input
                    label="Email"
                    value={email}
                    onEdit={(newValue) => setEmail(newValue)}
                />
                <Input
                    label="Specializare"
                    value={specializare}
                    onEdit={(newValue) => setSpecializare(newValue)}
                />
                <Input
                    label="Generatie"
                    value={generatie}
                    onEdit={(newValue) => setGeneratie(newValue)}
                />
            </div>
            <div className="flex-3">
                <Input
                    label="Forma Studii"
                    value={studii}
                    onEdit={(newValue) => setStudii(newValue)}
                    variant="dropdown"
                    data={dropdownStudii}
                />
                <Input
                    label="Forma Invatamant"
                    value={invatamant}
                    onEdit={(newValue) => setInvatamant(newValue)}
                    variant="dropdown"
                    data={dropdownInvatamant}
                />
                <Input
                    label="Grupa"
                    value={grupa}
                    onEdit={(newValue) => setGrupa(newValue)}
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
