import {useState} from "react";
import Table from "../../../table/table";
import Button from "../../../button/button";
import './status.scss'

const initialData = Array(13).fill({
        username: "mihai.atanasov@stud.ubbcluj.ro",
        nume: "Atanasov",
        prenume: "Razvan",
        email: "atanasov.razvan99@gmail.com",
        coordonator: "dan.suciu@ubb.ro",
        notaSesiune: "5",
        notaRestanta: "8",
    }
)

const Status = () => {

    const [data, setData] = useState(initialData);
    const columns = ["Username", "Nume", "Prenume", "Email", "Coordonator", "Nota Sesiune", "Nota Restanta"];
    const [changed, setChanged] = useState(false);

    const processData = () => {
        return data.map((entry) => {
            return Object.values(entry);
        });
    }

    const generateExcel = () => {
        //TODO: Download Excel
        console.log("Se downloadeaza excel");
    }

    const handleEdit = (page, column, line, value) => {
        const newData = data.map((entry, index) => {
            if (index === (page-1) * 4 + line){
                return {...entry, coordonator: value};
            }
            return entry;
        });
        setData(newData);
        setChanged(true);
    }

    const handleSave = () => {
        //TODO: Save to back
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
