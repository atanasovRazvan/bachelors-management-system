import './cereri.scss'
import {useContext, useEffect, useState} from "react";
import Input from "../../../input/input";
import Button from "../../../button/button";
import SadPanda from "../../../utils/sadpanad.png";
import axios from "axios";
import {baseUrl} from "../../../utils/constants";
import {AuthContext} from "../../../context/AuthProvider";

const Cereri = () => {

    const [requests, setRequests] = useState([]);
    const [index, setIndex] = useState(0);
    const { username } = useContext(AuthContext);
    const processedData = requests.sort((a,b) => (a.daysLeft > b.daysLeft) ? 1 : ((b.daysLeft > a.daysLeft) ? -1 : 0))

    useEffect(() => {
        axios.get(`${baseUrl}request/${username}`)
            .then((res) => {
                setRequests(res.data);
            });
    }, []);

    const handleAccept = () => {
        const newData = requests.filter((value, no) => no !== index);
        axios.post(`${baseUrl}request/accept/${requests[index].requestId}`)
            .then(() => {});
        if(index === requests.length - 1)
            setIndex(index-1);
        setRequests(newData);
    }

    const handleSkip = () => {
        if (index === requests.length - 1)
            setIndex(0);
        else
            setIndex(index+1);
    }

    const handleReject = () => {
        const newData = requests.filter((value, no) => no !== index);
        axios.post(`${baseUrl}request/reject/${requests[index].requestId}`)
            .then(() => {});
        if(index === requests.length - 1)
            setIndex(index-1);
        setRequests(newData);
    }

    const renderNoRequests = () => {
        return(
            <div className="wrapper-requests">
                <p className="norequests">Nu sunt cereri momentan.</p>
                <img src={SadPanda} alt="sad panda" />
            </div>
        )
    }

    const renderRequests = () => (
        <div className="wrapper-requests">
            <div className="text">
                <span>Timp ramas pentru raspuns: </span>
                <span className="red">{processedData[index]?.daysLeft} zile</span>
            </div>
            <div className="container">
                <div className="inputs">
                    <Input
                        label="Nume: "
                        value={processedData[index]?.userLastName}
                        readonly={true}
                    />
                    <Input
                        label="Prenume: "
                        value={processedData[index]?.userFirstName}
                        readonly={true}
                    />
                </div>
                <div className="message">
                    <Input
                        variant="textarea"
                        label="Message: "
                        value={processedData[index]?.text}
                        readonly={true}
                    />
                </div>
                <div className="buttons">
                    <Button
                        variant="green"
                        value="Accepta"
                        action={handleAccept}
                    />
                    <Button
                        variant="purple"
                        value="Sari peste"
                        action={handleSkip}
                    />
                    <Button
                        variant="red"
                        value="Respinge"
                        action={handleReject}
                    />
                </div>
            </div>
        </div>
    );

    return(
        requests?.length > 0 ?
            renderRequests()
            :
            renderNoRequests()
    );

}

export default Cereri
