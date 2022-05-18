import './button.scss';

const Button = ({ action = () => {console.log("clicked")}, disabled, active, variant = "normal", color = "blue", value }) => {

    const classes = `
        button
        ${ disabled ? 'button-disabled' : '' }
        ${ active ? 'button-active' : '' }
        button-${variant}
        button-${color}
    `;

    return(
        <button className={classes} disabled={disabled} onClick={action}>
            { variant === "icon" ?
                <img src={value} alt={"Custom Image"} width={25} height={25}/>
                :
                value
            }
        </button>
    );
}

export default Button;
