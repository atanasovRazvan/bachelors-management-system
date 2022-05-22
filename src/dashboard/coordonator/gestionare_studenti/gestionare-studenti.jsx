import './gestionare-studenti.scss'
import Table from "../../../table/table";
import {useState} from "react";
import Button from "../../../button/button";

const students = [
    {
        username: "mihai.atanasov@stud.ubbcluj.ro",
        firstName: "Mihai",
        lastName: "Atanasov",
        gradeSesiune: "7",
        gradeRestanta: "9",
    },
    {
        username: "mihai.atanasov@stud.ubbcluj.ro",
        firstName: "Mihai",
        lastName: "Atanasov",
        gradeSesiune: "6",
        gradeRestanta: null,
    },
    {
        username: "dan.suciu@ubb.ro",
        firstName: "Dan",
        lastName: "Suciu",
        gradeSesiune: null,
        gradeRestanta: null,
    },
    {
        username: "mihai.atanasov@stud.ubbcluj.ro",
        firstName: "Mihai",
        lastName: "Atanasov",
        gradeSesiune: "7",
        gradeRestanta: "9",
    },
    {
        username: "mihai.atanasov@stud.ubbcluj.ro",
        firstName: "Mihai",
        lastName: "Atanasov",
        gradeSesiune: "7",
        gradeRestanta: "9",
    },
];

const criterii = [["ASdaasdasd"], ["AOihaifhwapfjapfhf apfpaohfa s"], ["asfoihsafihasfp aspfhpasfh pisafpoasfophaspofhpaohfpoashfpo pasfhposafhpasf"]];

const headers = ["Nume", "Prenume", "Nota Sesiune", "Nota Restante"];

const GestionareStudenti = () => {

    const [data, setData] = useState(students);
    const [changed, setChanged] = useState(false);

    const processedData = () => {
        const processed = data.map((entry) => {
            return Object.values(entry);
        });

        return processed?.map((entry) => {
            return entry.slice(1).map((value) => value === null ? "N/A" : value);
        });
    }

    const onDownload = (page, line) => {
        //TODO: Download data[(page-1)*4+line].username paper
    }

    const onChange = (page, line, column, newValue) => {
        //TODO: make list
        const field = column === 2 ? "gradeSesiune" : "gradeRestanta";
        const newData = data.map((entry, index) => {
            return index === (page - 1) * 4 + line ?
                {...entry, [field]: newValue}
                :
                entry
        });
        setData(newData);
        setChanged(true);
    }

    return(
        <div className="wrapper-status-coordinator">
            <div className="maintable">
                <Table
                    headers={headers}
                    data={processedData()}
                    download={true}
                    paginated={true}
                    onDownload={(page, line) => onDownload(page, line)}
                    onEditTable={(page, column, line, newValue) => onChange(page, line, column, newValue)}
                    editableColumns={[2,3]}
                />
                <Button
                    value={"Salveaza"}
                    disabled={!changed}
                />
            </div>
            <Table
                headers={["Criterii"]}
                data={criterii}
            />
        </div>
    )
}

export default GestionareStudenti;
