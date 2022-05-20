import Input from "../../../input/input";
import {useState} from "react";
import Button from "../../../button/button";
import './criteria.scss';

const initialCriteria = ["Criteriul 1", "Criteriul 2", "as;oansglas oasjl asfl asl fasf asfasf asfasfl aslfi asfjlasifh sa;ojfo;asf;oashfof sd"];

const Criteria = () => {

    const [tab, setTab] = useState(1);
    //TODO: get criteria
    const [criteria, setCriteria] = useState(initialCriteria);
    const [changed, setChanged] = useState(false);

    const newCriteria = (value) => {
        setChanged(true);
        return criteria.map((crit, index) => {
            if(index === tab-1)
                return value;
            return crit;
        })
    }

    const handleAdd = () => {
        setCriteria([...criteria, ""]);
        setChanged(true);
    }

    const handleDelete = () => {
        setCriteria(criteria.filter((value, index) => index + 1 !== tab ));
        setTab(1);
        setChanged(true);
    }

    const handleSave = () => {
        setChanged(false);
        //TODO: send criteria
    }

    return(
        <div className="wrapper">
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
                    value={criteria[tab-1]}
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
