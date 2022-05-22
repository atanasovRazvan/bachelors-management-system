import './interese.scss'
import {useContext, useEffect, useState} from "react";
import Button from "../../../button/button";
import Input from "../../../input/input";
import axios from "axios";
import {baseUrl} from "../../../utils/constants";
import {AuthContext} from "../../../context/AuthProvider";

const Interese = () => {

    const [tab, setTab] = useState(1);
    const { username } = useContext(AuthContext);
    const [interests, setInterests] = useState([]);
    const [changed, setChanged] = useState(false);

    useEffect(() => {
        axios.get(`${baseUrl}coordinator/${username}/interests`)
            .then((res) => {
                setInterests(res.data);
            });
    }, []);

    const newInterest = (value) => {
        setChanged(true);
        return interests.map((interest, index) => {
            if(index === tab-1)
                return value;
            return interest;
        })
    }

    const handleAdd = () => {
        setInterests([...interests, ""]);
        setChanged(true);
    }

    const handleDelete = () => {
        setInterests(interests.filter((value, index) => index + 1 !== tab ));
        setTab(1);
        setChanged(true);
    }

    const handleSave = () => {
        setChanged(false);
        axios.post(`${baseUrl}coordinator/${username}/interests`, interests)
            .then(() => {
                alert("Interese salvate cu succes!");
            })
            .catch(() => {
                alert("A aparut o problema la salvarea intereselor...");
            });
    }

    return(
        <div className="interests-wrapper">
            <div className="buttons-and-input">
                <div className="buttons">
                    <div className="left">
                        {interests.map((value, index) => (
                            <Button
                                variant="circle"
                                value={index+1}
                                active={index+1 === tab}
                                action={() => setTab(index+1)}
                            />
                        ))}
                    </div>
                    <div className="right">
                        <Button
                            variant="circle"
                            value="+"
                            action={handleAdd}
                        />
                        <Button
                            variant="circle"
                            value="♲"
                            action={handleDelete}
                        />
                    </div>
                </div>
                <Input
                    readonly={interests?.length <= 0}
                    variant={"textarea"}
                    value={interests[tab-1]}
                    onEdit={(newValue) => setInterests(newInterest(newValue))}
                />
            </div>
            <Button
                value="Salveaza"
                disabled={!changed}
                action={handleSave}
            />
        </div>
    );

}

export default Interese;
