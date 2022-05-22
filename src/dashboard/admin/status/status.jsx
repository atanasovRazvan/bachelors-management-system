import {useEffect, useState} from "react";
import Table from "../../../table/table";
import Button from "../../../button/button";
import './status.scss'
import axios from "axios";
import {baseUrl} from "../../../utils/constants";

const Status = () => {

    const [students, setStudents] = useState([]);
    const columns = ["Username", "Nume", "Prenume", "Email", "Coordonator", "Nota Sesiune", "Nota Restanta"];
    const [changed, setChanged] = useState(false);
    const validGrades = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

    useEffect(() => {
        axios.get(`${baseUrl}student`)
            .then((res) => {
                setStudents(res.data);
            });
    }, [])

    const processData = () => {
        return students.map((entry) => {
            return [entry.username, entry.lastName, entry.firstName, entry.email, entry.coordinator, validGrades.includes(entry.normalGrade) ? entry.normalGrade : "N/A", validGrades.includes(entry.retakeGrade) ? entry.retakeGrade : "N/A"]
        });
    }

    const generateExcel = () => {
        window.open(`${baseUrl}generate/excel`);
    }

    const handleEdit = (page, column, line, value) => {
        const newStudents = students.map((entry, index) => {
            if (index === (page-1) * 4 + line){
                return {...entry, coordinator: value};
            }
            return entry;
        });
        setStudents(newStudents);
        setChanged(true);
    }

    const handleSave = () => {
        const payload = students.map((student) => ({studentUsername: student.username, coordinatorUsername: student.coordinator}));

        axios.post(`${baseUrl}student/assignCoordinators`, payload)
            .then((res) => {
                alert("Modificari salvate cu succes!");
            }).catch(() => {
                alert("A aparut o problema la salvare...");
        })

        setChanged(false);
    }

    return(
        <div className="status-wrapper">
            <Table
                data={processData()}
                headers={columns}
                paginated={true}
                editableColumns={[4]}
                onEditTable={(page, column, line, value) => handleEdit(page, column, line, value)}
            />
            <div className="status-save">
                <Button
                    value={"Salveaza Modificarile"}
                    action={handleSave}
                    disabled={!changed}
                />
            </div>
            <div className="status-button">
                <Button
                    value={"Genereaza Excel"}
                    action={generateExcel}
                />
            </div>
        </div>
    )
}

export default Status;
