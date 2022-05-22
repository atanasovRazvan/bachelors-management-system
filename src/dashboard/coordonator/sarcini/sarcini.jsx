import './sarcini.scss';
import Input from "../../../input/input";
import {useContext, useEffect, useState} from "react";
import Button from "../../../button/button";
import axios from "axios";
import {baseUrl} from "../../../utils/constants";
import {AuthContext} from "../../../context/AuthProvider";

const emptyObject = {
    details: "",
    dueDate: null,
    grade: 0,
}

const SarciniCoordonator = () => {

    const [studentUsername, setStudentUsername] = useState("");
    const [students, setStudents] = useState([]);
    const { username } = useContext(AuthContext);
    const [assignments, setAssignments] = useState([]);
    const [tab, setTab] = useState(1);
    const [changed, setChanged] = useState(false);

    useEffect(() => {
        axios.get(`${baseUrl}coordinator/${username}/students`)
            .then((res) => {
                setStudents(res.data);
                setStudentUsername(res.data[0]?.username);
            });
    }, []);

    useEffect(() => {
        if(studentUsername.length > 0)
            axios.get(`${baseUrl}assignment/get/${studentUsername}/${username}`)
                .then((res) => {
                    setAssignments(res.data);
                });
    }, [studentUsername])

    const dropdownStudents = students.map((student) => ({label: student.firstName + " " + student.lastName, value: student.username}));

    console.log(assignments);

    const getAssignments = (value) => {
        setStudentUsername(value);
        axios.get(`${baseUrl}assignment/get/${studentUsername}/${username}`)
            .then((res) => {
                setAssignments(res.data);
            });
        setChanged(false);
    }

    const handleSave = () => {
        setChanged(false);
        axios.post(`${baseUrl}assignment/assign/${studentUsername}/${username}`, assignments)
            .then(() => {
                alert("Sarcini actualizate cu succes!");
            })
            .catch(() => {
                alert("A aparut o problema in actualizarea sarcinilor...");
            });
    }

    const editPrompt = (value) => {
        const newAssignments = assignments.map((assignment, index) => {
            if (index === tab - 1)
                return {...assignment, details: value}
            return assignment;
        });
        setAssignments(newAssignments);
        setChanged(true);
    }

    const changeDeadline = (value) => {
        const newAssignments = assignments.map((assignment, index) => {
            if (index === tab - 1)
                return {...assignment, dueDate: new Date(value).toISOString().split('T')[0]}
            return assignment;
        });
        setAssignments(newAssignments);
        setChanged(true);
    }

    const changeGrade = (value) => {
        const newAssignments = assignments.map((assignment, index) => {
            if (index === tab - 1)
                return {...assignment, grade: value}
            return assignment;
        });
        setAssignments(newAssignments);
        setChanged(true);
    }

    const downloadPaper = () => {
        const { fileName } = students[students.findIndex((student) => student.username === studentUsername)]
        if(fileName && fileName.length > 0){
            window.open(`${baseUrl}paper/${fileName}`);
        }
        else{
            alert("Acest student nu are un fisier incarcat.");
        }
    }

    const handleAdd = () => {
        setAssignments([...assignments, emptyObject]);
        setChanged(true);
        setTab(1);
    }

    return (
        <div className="coordinator-assignment-wrapper">
            <div className="left">
                <Input
                    variant={"dropdown"}
                    label={"Student"}
                    data={dropdownStudents}
                    onEdit={(value) => getAssignments(value)}
                />

                <div className="downloadpdf">
                    <Button
                        value={"Descarca lucrarea PDF"}
                        action={downloadPaper}
                    />
                    <p>Ultima versiune</p>
                </div>
            </div>

            <div className="right">
                <div className="wrapper">
                    <Input
                        variant="textarea"
                        label="Cerinta"
                        readonly={assignments[tab-1]?.daysLeft < 0 || assignments.length <= 0}
                        value={assignments[tab-1]?.details}
                        onEdit={(value) => editPrompt(value)}
                    />
                    <div className="inline">
                        <Input
                            readonly={assignments[tab-1]?.daysLeft < 0 || assignments.length <= 0}
                            label={"Termen"}
                            variant={"datepicker"}
                            value={assignments[tab-1]?.dueDate && assignments.length > 0 ? new Date(assignments[tab-1]?.dueDate).toISOString().slice(0, 10) : ""}
                            onEdit={changeDeadline}
                        />

                        <Input
                            readonly={assignments[tab-1]?.daysLeft < 0 || assignments.length <= 0}
                            label={"Nota"}
                            variant={"small"}
                            value={assignments[tab-1]?.grade ? assignments[tab-1]?.grade : "N/A"}
                            onEdit={changeGrade}
                        />
                    </div>

                    <Button
                        value={"Salveaza"}
                        action={handleSave}
                        disabled={!changed}
                    />
                </div>

                <div className="buttons">
                    { assignments.map((value, index) => (
                        <Button
                            variant="circle"
                            value={index+1}
                            action={() => setTab(index+1)}
                            active={index === tab-1}
                        />
                    ))}

                    <Button
                        variant="circle"
                        value="+"
                        action={handleAdd}
                    />
                </div>
            </div>
        </div>
    );
};

export default SarciniCoordonator;
