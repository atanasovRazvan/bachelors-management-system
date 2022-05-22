import './sarcini.scss';
import Input from "../../../input/input";
import {useContext, useEffect, useState} from "react";
import Button from "../../../button/button";
import {AuthContext} from "../../../context/AuthProvider";
import axios from "axios";
import {baseUrl} from "../../../utils/constants";

const SarciniStudent = () => {

    const { username, coordinatorUsername } = useContext(AuthContext);
    const [tab, setTab] = useState(1);
    const [assignments, setAssignments] = useState([]);

    useEffect(() => {
        axios.get(`${baseUrl}assignment/get/${username}/${coordinatorUsername}`)
            .then((res) => {
                if(res.status === 200){
                    setAssignments(res.data);
                }
            })
    }, []);

    const clickUpload = () => {
        document.getElementById('uploadpdf').click();
    }

    const handleUpload = () => {
        const pdf = document.getElementById("uploadpdf").files[0];
        let formData = new FormData();
        formData.append("file", pdf);
        axios.post(`${baseUrl}paper/${username}`, formData).then(() => {
            alert("Fisier incarcat cu succes!");
        });
    }

    return(
        <div className="student-assignments-wrapper">
            <div className="left">
                <Input
                    variant="textarea"
                    label="Cerinta"
                    readonly={true}
                    value={assignments[tab-1]?.details}
                />

                <Input
                    readonly={true}
                    label={"Termen"}
                    variant={"medium"}
                    value={assignments[tab-1]?.dueDate}
                />
                <p>{
                    assignments[tab-1]?.daysLeft >= 0 ?
                        assignments[tab-1]?.daysLeft + " zile ramase"
                        :
                        "Termenul este depasit"
                    }
                </p>

                <input type="file" name="uploadpdf" id="uploadpdf" onChange={handleUpload} className="uploadinput"/>
                <Button
                    value={"Incarca lucrarea PDF ⇪"}
                    disabled={assignments[tab-1]?.daysLeft < 0}
                    action={clickUpload}
                />
            </div>

            <div className="right">
                { assignments.map((value, index) => (
                    <Button
                        variant="circle"
                        value={index+1}
                        action={() => setTab(index+1)}
                        active={index === tab-1}
                    />
                ))}
            </div>
        </div>
    )
};

export default SarciniStudent;
