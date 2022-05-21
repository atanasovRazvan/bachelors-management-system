import './sarcini.scss';
import Input from "../../../input/input";
import {useState} from "react";
import Button from "../../../button/button";


const data = [
    {
        number: "1",
        prompt: "asdas dasd asdsad asdasdadasd safasfasfasfsaf asfafafasf asfasfasf afasfasfa sfasfasfa sfasfasfas fasfafasfa sfsafasfasf asfasdas dasd asdsad asdasdadasd safasfasfasfsaf asfafafasf asfasfasf afasfasfa sfasfasfa sfasfasfas fasfafasfa sfsafasfasf asfasdas dasd asdsad asdasdadasd safasfasfasfsaf asfafafasf asfasfasf afasfasfa sfasfasfa sfasfasfas fasfafasfa sfsafasfasf asfasdas dasd asdsad asdasdadasd safasfasfasfsaf asfafafasf asfasfasf afasfasfa sfasfasfa sfasfasfas fasfafasfa sfsafasfasf asfasdas dasd asdsad asdasdadasd safasfasfasfsaf asfafafasf asfasfasf afasfasfa sfasfasfa sfasfasfas fasfafasfa sfsafasfasf asfasdas dasd asdsad asdasdadasd safasfasfasfsaf asfafafasf asfasfasf afasfasfa sfasfasfa sfasfasfas fasfafasfa sfsafasfasf asfasdas dasd asdsad asdasdadasd safasfasfasfsaf asfafafasf asfasfasf afasfasfa sfasfasfa sfasfasfas fasfafasfa sfsafasfasf asfasdas dasd asdsad asdasdadasd safasfasfasfsaf asfafafasf asfasfasf afasfasfa sfasfasfa sfasfasfas fasfafasfa sfsafasfasf asf",
        deadline: "1653323054",
        remaining: "5",
    },
    {
        number: "2",
        prompt: "Sarcina 3",
        deadline: "1653323054",
        remaining: "0",
    },
    {
        number: "3",
        prompt: "sarcina 2",
        deadline: "1653323054",
        remaining: "-1",
    }
]


const SarciniStudent = () => {

    const [tab, setTab] = useState(1);

    const processData = () => {
        return data.sort((a,b) => (a.number > b.number) ? 1 : ((b.number > a.number) ? -1 : 0))
    }

    const uploadPDF = () => {
        //TODO: Upload file
        console.log("upload pdf");
    }

    return(
        <div className="student-assignments-wrapper">
            <div className="left">
                <Input
                    variant="textarea"
                    label="Cerinta"
                    readonly={true}
                    value={processData(data)[tab-1].prompt}
                />

                <Input
                    readonly={true}
                    label={"Termen"}
                    variant={"medium"}
                    value={new Date(processData(data)[tab-1].deadline * 1000).toLocaleDateString()}
                />
                <p>{processData(data)[tab-1].remaining >= 0 ?
                    processData(data)[tab-1].remaining + " zile ramase"
                    :
                    "Termenul este depasit"
                    }
                </p>

                <Button
                    value={"Incarca lucrarea PDF ⇪"}
                    disabled={processData(data)[tab-1].remaining < 0}
                    action={uploadPDF}
                />
            </div>

            <div className="right">
                { data.map((value, index) => (
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
