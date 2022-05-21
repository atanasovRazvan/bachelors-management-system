import './note.scss';
import Table from "../../../table/table";
import Input from "../../../input/input";

const Note = () => {

    const assignments = [
        {
            number: "1",
            description: "Sarcina 1",
            grade: "7",
        },
        {
            number: "3",
            description: "Sarcina 3",
            grade: "10",
        },
        {
            number: "2",
            description: "Sarcina saddsad sad as dsadasdas fas fasfsafsaf asfasfaef rgagawgfak  gaskigagsfgaslfgaskf sakgfkugasfkafgsusafgukasgf iasglfgsaifglasfgl",
            grade: "5",
        }
    ];

    const noteFinale = [
        {
            sesiune: "N",
            nota: "9",
        },
        {
            sesiune: "R",
            nota: null,
        }
    ]

    const columns = ["Numar", "Cerinta", "Nota"];

    const processData = () => {
        assignments.sort((a,b) => (a.number > b.number) ? 1 : ((b.number > a.number) ? -1 : 0))
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
                    value={noteFinale[0]["nota"] ? noteFinale[0]["nota"] : "N/A"}
                    label="Nota Sesiune"
                    readonly={true}
                />
                <Input
                    variant="small"
                    value={noteFinale[1]["nota"] ? noteFinale[1]["nota"] : "N/A"}
                    label="Nota Restante"
                    readonly={true}
                />
            </div>
        </div>
    )
}

export default Note;
