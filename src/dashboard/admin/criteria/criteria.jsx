import Input from "../../../input/input";
import {useEffect, useState} from "react";
import Button from "../../../button/button";
import './criteria.scss';
import axios from "axios";
import {baseUrl} from "../../../utils/constants";

const Criteria = () => {

    const [tab, setTab] = useState(1);
    const [criteria, setCriteria] = useState([]);
    const [changed, setChanged] = useState(false);

    useEffect(() => {
        axios.get(`${baseUrl}criteria`)
            .then((res) => {
                setCriteria(res.data);
            })
    }, []);

    const newCriteria = (value) => {
        setChanged(true);
        return criteria.map((crit, index) => {
            if(index === tab-1)
                return {criteriaId: crit.criteriaId, criteria: value};
            return crit;
        })
    }

    const handleAdd = () => {
        setCriteria([...criteria, {criteria: ""}]);
        setChanged(true);
    }

    const handleDelete = () => {
        setCriteria(criteria.filter((value, index) => index + 1 !== tab ));
        setTab(1);
        setChanged(true);
    }

    const handleSave = () => {
        setChanged(false);
        axios.post(`${baseUrl}criteria`, criteria)
            .then((res) => {
                alert("Criteriile au fost salvate cu succes!");
            })
            .catch(() => {alert("A aparut o eroare la salvarea criteriilor...")});
    }

    return(
        <div className="criteria-wrapper">
            <div className="buttons-and-input">
                <div className="buttons">
                    <div className="left">
                        {criteria.map((value, index) => (
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
                    variant={"textarea"}
                    readonly={criteria?.length <= 0}
                    value={criteria[tab-1]?.criteria}
                    onEdit={(newValue) => setCriteria(newCriteria(newValue))}
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

export default Criteria;
