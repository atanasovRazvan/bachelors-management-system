import './input.scss';

const Input = ( { label, variant = "normal", data = [], value, onEdit, type = "text", required = false } ) => {

    const classes = `
        input
        input-${variant}
        ${required ? 'input-required' : ''}
    `;

    console.log(data);

    const renderSimpleDropdown = () => (
        <select
            className="input-input input-dropdown"
            onChange={(event) => onEdit(event.target.value)}
        >
            <option value='value' selected="selected">Value</option>
            { data.map((entry) => (<option value={entry.value}>{entry.label}</option>)) }
        </select>
    );

    const renderNormal = () => (
      <input
          className="input-input"
          value={value}
          onChange={(event) => onEdit(event.target.value)}
          type={type}
      >
      </input>
    );

    const renderTextarea = () => (
        <textarea
            className="input-input input-textarea"
            value={value}
            onChange={(event) => onEdit(event.target.value)}
        >
        </textarea>
    );

    const renderDatepicker = () => (
        <input
            className="input-input input-date"
            value={value}
            onChange={(event) => onEdit(event.target.value)}
            type="date"
        >
        </input>
    )

    const renderInput = () => {
        if (variant === "dropdown"){
            return renderSimpleDropdown();
        }

        if (variant === "textarea"){
            return renderTextarea();
        }

        if(variant === "datepicker"){
            return renderDatepicker();
        }

        return renderNormal();
    }

    return(
        <div className={classes}>
            <div className={"input-label"}>
                {label}
            </div>
            {renderInput()}
        </div>
    )
}

export default Input;
