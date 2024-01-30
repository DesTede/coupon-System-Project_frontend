import "./Footer.css";
import {NavLink} from "react-router-dom";

function Footer(): JSX.Element {
    return (
        <div className="Footer">
			<NavLink to={"/aboutemporium"}>About Us</NavLink>
            &nbsp;|&nbsp;
            {/*<NavLink to={"/contactus"}>Contact Us</NavLink>*/}
            <a href={"mailto:desaleytede@gmail.com"}>Contact Us</a>
        </div>
    );
}

export default Footer;
