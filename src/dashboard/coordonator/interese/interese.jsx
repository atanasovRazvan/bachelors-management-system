import './interese.scss'
import {useState} from "react";
import Button from "../../../button/button";
import Input from "../../../input/input";

const initialInterests = ["Interes 1", "Interes 2", "as;oansglas oasjl asfl asl fasf asfasf asfasfl aslfi asfjlasifh sa;ojfo;asf;oashfof sd"];

const Interese = () => {

    const [tab, setTab] = useState(1);
    //TODO: get interests
    const [interests, setInterests] = useState(initialInterests);
    const [changed, setChanged] = useState(false);

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
        //TODO: send interests
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
