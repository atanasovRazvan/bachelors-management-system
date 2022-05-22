import './coordonatordashboard.scss';
import {useContext, useEffect, useState} from "react";
import {AuthContext} from "../../context/AuthProvider";
import Navigation from "../../navigation/navigation";
import GestionareStudenti from "./gestionare_studenti/gestionare-studenti";
import SarciniCoordonator from "./sarcini/sarcini";
import Interese from "./interese/interese";
import Cereri from "./cereri/cereri";
import axios from "axios";
import {baseUrl} from "../../utils/constants";

const CoordonatorDashboard = () => {

    const [content, setContent] = useState(1);
    const [requests, setRequests] = useState(false);
    const { username, userRole } = useContext(AuthContext);

    useEffect(() => {
        if(userRole === "coordinator") {
            axios.get(`${baseUrl}request/${username}`)
                .then((res) => {
                    if (res.data.length > 0)
                        setRequests(true);
                });
        }
    }, []);

    const {setUsername, setUserRole} = useContext(AuthContext);
    if ( content === 5 ){
        setUsername(null);
        setUserRole(null);
        return;
    }

    const navigation = [
        {
            variant: "menu",
            value: "Studenti",
            action: () => setContent(1),
        },
        {
            variant: "menu",
            value: "Sarcini",
            action: () => setContent(2),
        },
        {
            variant: "menu",
            value: `Cereri${requests ? " 🔔" : ""}`,
            action: () => setContent(3),
        },
        {
            variant: "menu",
            value: "Interes",
            action: () => setContent(4),
        },
        {
            variant: "menu",
            value: `Iesi din cont ➾`,
            action: () => setContent(5),
        }
    ]

    const renderContent = () => {
        if (content === 1)
            return <GestionareStudenti />;

        if (content === 2)
            return <SarciniCoordonator />

        if (content === 3)
            return <Cereri />

        if (content === 4)
            return <Interese />
    }

    return (
        <div className="container">
            <Navigation menu={navigation} active={content} />
            <div className="content">
                {renderContent()}
            </div>
        </div>
    )
}

export default CoordonatorDashboard;
