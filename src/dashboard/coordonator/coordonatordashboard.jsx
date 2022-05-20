import './coordonatordashboard.scss';
import {useContext, useState} from "react";
import {AuthContext} from "../../context/AuthProvider";
import Navigation from "../../navigation/navigation";

const CoordonatorDashboard = () => {
    const [content, setContent] = useState(1);

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
            value: "Cereri",
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

    return (
        <div className="container">
            <Navigation menu={navigation} active={content} />
            <div className="content">
                <h1> Content of {navigation[content-1].value} </h1>
            </div>
        </div>
    )
}

export default CoordonatorDashboard;
