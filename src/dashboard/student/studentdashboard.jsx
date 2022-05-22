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
import {baseUrl} from "../../utils/constants";
import axios from "axios";

const StudentDashboard = () => {

    const { isAsigned, hasRequest, coordinatorUsername, username, setIsAsigned, setHasRequest, setCoordinatorName } = useContext(AuthContext);
    const [content, setContent] = useState(1);
    const [status, setStatus] = useState({isAsigned, hasRequest, coordinatorUsername});
    const [changed, setChanged] = useState(false);
    const [coordinator, setCoordinator] = useState("");
    const [message, setMessage] = useState("");
    const [coordinators, setCoordinators] = useState([]);
    const [interests, setInterests] = useState([]);

    const displayedInterests = () => {
        const index = coordinators.findIndex(el => el.value === coordinator);
        if(coordinator === "")
            return [];
        return interests[index];
    };

    useEffect(() => {
        axios.get(`${baseUrl}coordinator`)
            .then((res) => {
                const newCoordinators = [{
                    value: "",
                    label: "Selecteaza...",
                }];
                const newInterests = [[]];
                res.data.forEach((coordinator) => {
                    const newCoordinator = {
                        value: coordinator.username,
                        label: coordinator.firstName + " " + coordinator.lastName,
                    };
                    newCoordinators.push(newCoordinator);
                    const newInterest = [];
                    coordinator?.interests.forEach((interest) => newInterest.push([interest]));
                    newInterests.push(newInterest);
                });
                setCoordinators(newCoordinators);
                setInterests(newInterests);
            })

    }, [])

    const onSelectCoordinator = (newValue) => {
        setCoordinator(newValue);
        if (newValue !== "")
            setChanged(true);
        else
            setChanged(false);
    }

    const handleSubmit = () => {
        axios.post(`${baseUrl}request/${username}`, {
            coordinatorUsername: coordinator,
            text: message,
        }).then((res) => {
            if(res.status === 200) {
                setChanged(false);
                setStatus({...status, hasRequest: true});
                setHasRequest(true);
            }
        })
    }

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
                    data={coordinators}
                    onEdit={onSelectCoordinator}
                    label={"Coordonator"}
                />
                {coordinator !== "" ?
                    <Table
                        headers={["Interese"]}
                        data={() => displayedInterests()}
                    />
                    :
                    null
                }
                {coordinator !== "" ?
                    <Input
                        variant="textarea"
                        label="Mesaj"
                        value={message}
                        onEdit={(newValue) => setMessage(newValue)}
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

        if (status.isAsigned)
            return <div className="container"> <Navigation menu={navigation} active={content} /><div className="content">{renderContent()}</div></div>

        if (status.hasRequest)
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
