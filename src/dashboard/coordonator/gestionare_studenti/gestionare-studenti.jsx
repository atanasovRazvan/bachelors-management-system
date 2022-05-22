import './gestionare-studenti.scss'
import Table from "../../../table/table";
import {useContext, useEffect, useState} from "react";
import Button from "../../../button/button";
import axios from "axios";
import {baseUrl} from "../../../utils/constants";
import {AuthContext} from "../../../context/AuthProvider";

const headers = ["Nume", "Prenume", "Nota Sesiune", "Nota Restante"];

const GestionareStudenti = () => {

    const [data, setData] = useState([]);
    const [changed, setChanged] = useState(false);
    const [criterii, setCriterii] = useState([]);
    const { username } = useContext(AuthContext);

    console.log(data);

    useEffect(() => {
        axios.get(`${baseUrl}criteria`)
            .then((res) => setCriterii(res.data.map((criteriu) => [criteriu.criteria])));
        axios.get(`${baseUrl}coordinator/${username}/students`)
            .then((res) => setData(res.data));
    }, []);

    const processedData = () => {
        const processed = data.map((entry) => {
            return Object.values(entry);
        });

        return processed?.map((entry) => {
            entry.pop();
            return entry.slice(1).map((value) => value === null ? "N/A" : value);
        });
    }

    const onDownload = (page, line) => {
        const { fileName } = data[(page - 1) * 4 + line];
        if(fileName && fileName.length > 0){
            window.open(`${baseUrl}paper/${fileName}`);
        }
        else{
            alert("Acest student nu are un fisier incarcat.");
        }
    }

    const onChange = (page, line, column, newValue) => {
        const field = column === 2 ? "normalGrade" : "retakenGrade";
        const newData = data.map((entry, index) => {
            return index === (page - 1) * 4 + line ?
                {...entry, [field]: newValue}
                :
                entry
        });
        setData(newData);
        setChanged(true);
    }

    const onSave = () => {
        const grades = data.map((entry) => ({userName: entry.username, normalGrade: entry.normalGrade, retakenGrade: entry.retakenGrade}));
        axios.post(`${baseUrl}student/grade`, grades)
            .then(() => {
                alert("Note salvate cu succes!");
            })
            .catch(() => {
                alert("A aparut o problema in salvarea notelor...");
            });
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
                    action={onSave}
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
