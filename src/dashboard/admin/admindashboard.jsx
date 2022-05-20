import './admindashboard.scss';
import Navigation from "../../navigation/navigation";
import {useContext, useState} from "react";
import {AuthContext} from "../../context/AuthProvider";

const AdminDashboard = () => {

    const [content, setContent] = useState(1);

    const {setUsername, setUserRole} = useContext(AuthContext);
    if ( content === 4 ){
        setUsername(null);
        setUserRole(null);
        return;
    }

    const navigation = [
        {
            variant: "menu",
            value: "Creare Conturi",
            action: () => setContent(1),
        },
        {
            variant: "menu",
            value: "Status Studenti",
            action: () => setContent(2),
        },
        {
            variant: "menu",
            value: "Criterii",
            action: () => setContent(3),
        },
        {
            variant: "menu",
            value: `Iesi din cont ➾`,
            action: () => setContent(4),
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

export default AdminDashboard;
