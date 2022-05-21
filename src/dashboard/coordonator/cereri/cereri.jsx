import './cereri.scss'
import {useState} from "react";
import Input from "../../../input/input";
import Button from "../../../button/button";
import SadPanda from "../../../utils/sadpanad.png";

const initialRequests = [
    {
        requestId: "1",
        firstName: "Smth",
        lastName: "Other",
        text: "hai doamna te rog",
        daysLeft: "8",
    },
    {
        requestId: "2",
        firstName: "AAA",
        lastName: "bbb",
        text: "hai doamna te rog",
        daysLeft: "13",
    },
    {
        requestId: "3",
        firstName: "Adasdasd",
        lastName: "Ahmed",
        text: "hai doamna te rog",
        daysLeft: "9",
    },
    {
        requestId: "4",
        firstName: "Da ce vrei",
        lastName: "De la mn",
        text: "hai doamna te rog",
        daysLeft: "2",
    },
]

const Cereri = () => {

    const [data, setData] = useState(initialRequests);
    const [index, setIndex] = useState(0);
    const processedData = data.sort((a,b) => (a.daysLeft > b.daysLeft) ? 1 : ((b.daysLeft > a.daysLeft) ? -1 : 0))

    const handleAccept = () => {
        //TODO: /request/accept/id
        const newData = data.filter((value, no) => no !== index);
        if(index === data.length - 1)
            setIndex(index-1);
        setData(newData);
    }

    const handleSkip = () => {
        if (index === data.length - 1)
            setIndex(0);
        else
            setIndex(index+1);
    }

    const handleReject = () => {
        //TODO: /request/reject/id
        const newData = data.filter((value, no) => no !== index);
        if(index === data.length - 1)
            setIndex(index-1);
        setData(newData);
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
                        value={processedData[index]?.lastName}
                        readonly={true}
                    />
                    <Input
                        label="Prenume: "
                        value={processedData[index]?.firstName}
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
        data.length > 0 ?
            renderRequests()
            :
            renderNoRequests()
    );

}

export default Cereri
