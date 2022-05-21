import './studentdashboard.scss';
import {useContext, useEffect, useState} from "react";
import {AuthContext} from "../../context/AuthProvider";
import Navigation from "../../navigation/navigation";
import SarciniStudent from "./sarcini-student/sarcini";
import Note from "./note/note";
import Input from "../../input/input";
import LoadingSpinner from "../../utils/loading/loading";
import Button from "../../button/button";
import Table from "../../table/table";

const state = {
    asignat: null,
    cerere: true,
    coordonator: "dan.suciu@ubb.ro",
};

const state2 = {
    asignat: null,
    cerere: false,
    coordonator: null,
}

const state3 = {
    asignat: "dan.suciu@ubb.ro",
    cerere: null,
    coordonator: null,
}

const coordonatori = [
    {
        value: "",
        label: "Selecteaza...",
    },
    {
        value:"dan.suciu@ubb.ro",
        label:"dan.suciu@ubb.ro",
    },
    {
        value:"atanasov.razvan@ubb.ro",
        label:"atanasov.razvan@ubb.ro",
    },
    {
        value:"cosmin.cojocaru@ubb.ro",
        label:"cosmin.cojocaru@ubb.ro",
    },
    {
        value:"whatever@ubb.ro",
        label:"whatever@ubb.ro",
    },
];

const interes = [["Interes 1"], ["Sunt foarte interesant cafea"], ["Psihologia e de cacat dar e Daniel David la noi"]];

const StudentDashboard = () => {
    const [content, setContent] = useState(1);
    const [status, setStatus] = useState(null);
    const [changed, setChanged] = useState(false);
    const [coordinator, setCoordinator] = useState("");

    const onSelectCoordinator = (newValue) => {
        setCoordinator(newValue);
        if (newValue !== "")
            setChanged(true);
        else
            setChanged(false);
    }

    const handleSubmit = () => {
        setChanged(false);
        setStatus(state3);
    }

    useEffect(() => {
        setStatus(state2);
    }, [])

    const {setUsername, setUserRole} = useContext(AuthContext);
    if ( content === 3 ){
        setUsername(null);
        setUserRole(null);
        return;
    }

    const navigation = [
        {
            variant: "menu",
            value: "Sarcini",
            action: () => setContent(1),
        },
        {
            variant: "menu",
            value: "Note",
            action: () => setContent(2),
        },
        {
            variant: "menu",
            value: `Iesi din cont ➾`,
            action: () => setContent(3),
        }
    ]

    const renderContent = () => {
        if (content === 1) {
            return <SarciniStudent />
        }

        if (content === 2) {
            return <Note />
        }
    }

    const renderWaitingForResponse = () => {
        return(
            <div className="waiting-wrapper">
                <p>Coordonatorul nu a solutionat inca cererea.</p>
                <LoadingSpinner />
            </div>
        )
    }

    const renderPickCoordinator = () => {
        return(
            <div className="wrapper-request">
                <Input
                    variant={"dropdown"}
                    data={coordonatori}
                    onEdit={onSelectCoordinator}
                    label={"Coordonator"}
                />
                {coordinator !== "" ?
                    <Table
                        headers={["Interese"]}
                        data={interes}
                    />
                    :
                    null
                }
                <Button
                    value={"Trimite"}
                    disabled={!changed}
                    action={handleSubmit}
                />
            </div>
        )
    }

    const renderPage = () => {
        if (status === null)
            return <div className="container" />

        if (status.asignat)
            return <div className="container"> <Navigation menu={navigation} active={content} /><div className="content">{renderContent()}</div></div>

        if (status.cerere)
            return <div className="container"> <Navigation menu={[navigation[2]]}/><div className="content">{renderWaitingForResponse()}</div></div>

        return <div className="container"> <Navigation menu={[navigation[2]]}/><div className="content">{renderPickCoordinator()}</div></div>
    }

    return (
        <div className="container">
            {renderPage()}
        </div>
    )
}

export default StudentDashboard;
