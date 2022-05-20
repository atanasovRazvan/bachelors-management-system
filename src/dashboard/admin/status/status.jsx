import {useState} from "react";
import Table from "../../../table/table";
import Button from "../../../button/button";
import './status.scss'

const initialData = Array(13).fill({
        username: "mihai.atanasov@stud.ubbcluj.ro",
        nume: "Atanasov",
        prenume: "Razvan",
        nrMatricol: "12345",
        email: "atanasov.razvan99@gmail.com",
        coordonator: "dan.suciu@ubb.ro",
        notaSesiune: "5",
        notaRestanta: "8",
    }
)

const Status = () => {

    const [data, setData] = useState(initialData);
    const columns = ["Username", "Nume", "Prenume", "Numar Matricol", "Email", "Coordonator", "Nota Sesiune", "Nota Restanta"];

    const processData = () => {
        return data.map((entry) => {
            return Object.values(entry);
        });
    }

    const generateExcel = () => {
        console.log("Se downloadeaza excel");
    }

    const handleEdit = (page, column, line, value) => {
        //TODO: Make the edit
        console.log(page + column + line + value);
    }

    return(
        <div className="status-wrapper">
            <Table
                data={processData()}
                headers={columns}
                paginated={true}
                editableColumns={[5]}
                onEditTable={(page, column, line, value) => handleEdit(page, column, line, value)}
            />
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
