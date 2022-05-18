import './storybook.scss';
import '../button/button'
import Button from "../button/button";
import Navigation from "../navigation/navigation";
import Input from "../input/input";
import {useState} from "react";
import Error from "../error/error";
import Table from "../table/table";

const navMenu = [
    {
        disabled: false,
        variant: "menu",
        color: "blue",
        value: "Menu item 1",
    },
    {
        disabled: false,
        variant: "menu",
        color: "blue",
        value: "Menu item 2",
    },
    {
        disabled: false,
        variant: "menu",
        color: "blue",
        value: "Menu item 3",
    },
];

const data = [
    {
        value: "option1",
        label: "Some Option",
    },
    {
        value: "option2",
        label: "Other Option",
    },
    {
        value: "option3",
        label:"Third Option",
    },
];

const headers = ["Header 1", "Header 2", "Nume", "Prenume"];
const tableData = Array(6).fill(["Data 1", "Data 2", "Data 3", "Data 4"]);

const Storybook = () => {

    const [inputValue, setInputValue] = useState("value");

    const onEdit = (newValue) => {
        setInputValue(newValue);
    }

    const renderButton = () => (
        <div>
            <Button
                disabled={false}
                active={false}
                variant={"normal"}
                color={"blue"}
                value={"Normal Button"}
            />
            <Button
                disabled={true}
                active={false}
                variant={"normal"}
                color={"blue"}
                value={"Disabled Button"}
            />
            <Button
                disabled={false}
                active={true}
                variant={"normal"}
                color={"blue"}
                value={"Active Button"}
            />
            <Button
                disabled={false}
                active={false}
                variant={"circle"}
                color={"blue"}
                value={"2"}
            />
            <Button
                disabled={false}
                active={true}
                variant={"circle"}
                color={"blue"}
                value={"1"}
            />
            <Button
                disabled={false}
                active={false}
                variant={"normal"}
                color={"red"}
                value={"Coloured Button"}
            />
            <Button
                disabled={false}
                active={false}
                variant={"normal"}
                color={"green"}
                value={"Coloured Button"}
            />
            <Button
                disabled={false}
                active={false}
                variant={"normal"}
                color={"purple"}
                value={"Coloured Button"}
            />
            <Button
                disabled={false}
                active={false}
                variant={"menu"}
                color={"blue"}
                value={"Menu Item"}
            />
            <Button
                disabled={false}
                active={true}
                variant={"menu"}
                color={"blue"}
                value={"Long Menu Item"}
            />
        </div>
    );

    const renderNavigation = () => (
        <Navigation menu={navMenu} active={1}/>
    )

    const renderInput = () => (
        <div>
            <Input
                label="Label"
                variant="normal"
                value={inputValue}
                type="password"
                onEdit={onEdit}
            />
            <Input
                label="Label"
                variant="normal"
                value={inputValue}
                type="text"
                onEdit={onEdit}
                required={true}
            />
            <Input
                label="Small"
                variant="small"
                value={inputValue}
                type="text"
                onEdit={onEdit}
            />
            <Input
                label="Date picker"
                variant="datepicker"
                type="text"
                onEdit={onEdit}
            />
            <Input
                label="Longer Label"
                data={data}
                variant="dropdown"
                value={inputValue}
                onEdit={onEdit}
            />
            <Input
                label="Textarea"
                variant="textarea"
                value={inputValue}
                onEdit={onEdit}
            />
        </div>
    );

    return(
      <div className="storybook">
          <div className="storybook-bg" />
          {renderNavigation()}
          <hr />
          {renderButton()}
          <hr />
          {renderInput()}
          <hr />
          <Error message={"Utilizator sau parola incorecte"} />
          <hr />
          <Table
            data={tableData}
            headers={headers}
            paginated={false}
            download={false}
          />
          <hr />
          <Table
              data={tableData}
              headers={headers}
              paginated={true}
              download={false}
          />
          <hr />
          <Table
              data={tableData}
              headers={headers}
              paginated={false}
              download={true}
          />
          <hr />
      </div>
    );
};

export default Storybook;
