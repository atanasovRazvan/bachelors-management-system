import './sarcini.scss';
import Input from "../../../input/input";
import {useState} from "react";
import Button from "../../../button/button";

const studenti = [
    {
        username: "a@a.com",
        firstName: "First",
        lastName: "Last",
    },
    {
        username: "b@b.com",
        firstName: "Birst",
        lastName: "Bast",
    },
    {
        username: "c@c.com",
        firstName: "Cirst",
        lastName: "Cast",
    },
]

const initialAssignments = [
    {
        number: "1",
        prompt: "asdas dasd asdsad asdasdadasd safasfasfasfsaf asfafafasf asfasfasf afasfasfa sfasfasfa sfasfasfas fasfafasfa sfsafasfasf asfasdas dasd asdsad asdasdadasd safasfasfasfsaf asfafafasf asfasfasf afasfasfa sfasfasfa sfasfasfas fasfafasfa sfsafasfasf asfasdas dasd asdsad asdasdadasd safasfasfasfsaf asfafafasf asfasfasf afasfasfa sfasfasfa sfasfasfas fasfafasfa sfsafasfasf asfasdas dasd asdsad asdasdadasd safasfasfasfsaf asfafafasf asfasfasf afasfasfa sfasfasfa sfasfasfas fasfafasfa sfsafasfasf asfasdas dasd asdsad asdasdadasd safasfasfasfsaf asfafafasf asfasfasf afasfasfa sfasfasfa sfasfasfas fasfafasfa sfsafasfasf asfasdas dasd asdsad asdasdadasd safasfasfasfsaf asfafafasf asfasfasf afasfasfa sfasfasfa sfasfasfas fasfafasfa sfsafasfasf asfasdas dasd asdsad asdasdadasd safasfasfasfsaf asfafafasf asfasfasf afasfasfa sfasfasfa sfasfasfas fasfafasfa sfsafasfasf asfasdas dasd asdsad asdasdadasd safasfasfasfsaf asfafafasf asfasfasf afasfasfa sfasfasfa sfasfasfas fasfafasfa sfsafasfasf asf",
        deadline: null,
        remaining: null,
        grade: "5",
    },
    {
        number: "2",
        prompt: "Sarcina 3",
        deadline: "1653323054",
        remaining: "0",
        grade: null,
    },
    {
        number: "3",
        prompt: "sarcina 2",
        deadline: "1653323054",
        remaining: "-1",
        grade: null,
    }
]

const emptyObject = {
    number: null,
    prompt: null,
    deadline: null,
    remaining: null,
    grade: null,
};

const SarciniCoordonator = () => {

    const [studentUsername, setStudentUsername] = useState(studenti[0]);
    const [assignments, setAssignments] = useState([]);
    const [tab, setTab] = useState(1);
    const [changed, setChanged] = useState(false);

    const dropdownStudents = studenti.map((student) => ({label: student.firstName + " " + student.lastName, value: student.username}));

    console.log(assignments);

    const getAssignments = (username) => {
        //TODO: Get assignments
        console.log(username);
        setAssignments(initialAssignments);
        setChanged(false);
    }

    const handleSave = () => {
        //TODO: Save assignments
        console.log("save");
        setChanged(false);
    }

    const editPrompt = (value) => {
        const newAssignments = assignments.map((assignment, index) => {
            if (index === tab - 1)
                return {...assignment, prompt: value}
            return assignment;
        });
        setAssignments(newAssignments);
        setChanged(true);
    }

    const changeDeadline = (value) => {
        const newAssignments = assignments.map((assignment, index) => {
            if (index === tab - 1)
                return {...assignment, deadline: new Date(value).getTime() / 1000}
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
        //TODO: Download Paper
        console.log("downloadPaper");
    }

    const handleAdd = () => {
        setAssignments([...assignments, emptyObject]);
        setChanged(true);
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
                        readonly={assignments[tab-1]?.remaining < 0}
                        value={assignments[tab-1]?.prompt}
                        onEdit={(value) => editPrompt(value)}
                    />
                    <div className="inline">
                        <Input
                            readonly={assignments[tab-1]?.remaining !== null}
                            label={"Termen"}
                            variant={"datepicker"}
                            value={assignments[tab-1]?.deadline ? new Date(assignments[tab-1]?.deadline * 1000).toISOString().slice(0, 10) : ""}
                            onEdit={changeDeadline}
                        />

                        <Input
                            readonly={assignments[tab-1]?.grade !== null}
                            label={"Nota"}
                            variant={"small"}
                            value={assignments[tab-1]?.grade !== null ? assignments[tab-1]?.grade : "N/A"}
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
