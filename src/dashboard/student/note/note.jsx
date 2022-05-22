import './note.scss';
import Table from "../../../table/table";
import Input from "../../../input/input";
import {useContext, useEffect, useState} from "react";
import axios from "axios";
import {baseUrl} from "../../../utils/constants";
import {AuthContext} from "../../../context/AuthProvider";

const Note = () => {

    const [assignments, setAssignments] = useState([]);
    const [grades, setGrades] = useState({normalGrade: "N/A", retakenGrade: "N/A"});
    const { username, coordinatorUsername } = useContext(AuthContext);

    console.log(assignments);
    console.log(grades);

    useEffect(() => {
        axios.get(`${baseUrl}assignment/get/${username}/${coordinatorUsername}`)
            .then((res) => {
                if(res.status === 200){
                    setAssignments(res.data.map((assignment) => ({
                        prompt: assignment.details,
                        grade: assignment.grade > 0 ? assignment.grade : "N/A"
                    })));
                }
            });

        axios.get(`${baseUrl}student/${username}/grade`)
            .then((res) => {
                if(res.status === 200){
                    setGrades(res.data);
                }
            });
    }, [])

    const columns = ["Cerinta", "Nota"];

    const processData = () => {
        return assignments.map((entry) => {
            return Object.values(entry);
        });
    }

    return(
        <div className="note-wrapper">
            <div className="table">
                <Table
                    headers={columns}
                    data={processData()}
                />
            </div>
            <div className="sesiune">
                <Input
                    variant="small"
                    value={grades.normalGrade}
                    label="Nota Sesiune"
                    readonly={true}
                />
                <Input
                    variant="small"
                    value={grades.retakenGrade}
                    label="Nota Restante"
                    readonly={true}
                />
            </div>
        </div>
    )
}

export default Note;
