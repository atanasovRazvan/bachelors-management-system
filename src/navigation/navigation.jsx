import SiglaUBB from '../utils/sigla_ubb.png';
import SiglaFPSE from '../utils/sigla_fpse.png';
import './navigation.scss';
import Button from "../button/button";

const Navigation = ({ menu = [], active = 1 }) => {

    return (
        <div className="navigation">
            <img className="navigation-ubb" src={SiglaUBB} alt={"Sigla UBB"}/>
            <div className="navigation-content">
                { menu.map((button, index) => (
                    <Button
                        key={button.value}
                        disabled={button.disabled}
                        active={index === active - 1}
                        variant={button.variant}
                        color={button.color}
                        value={button.value}
                    />
                ))}
            </div>
            <img className="navigation-fpse" src={SiglaFPSE} alt={"Sigla FPSE"}/>
        </div>
    )
}

export default Navigation;
