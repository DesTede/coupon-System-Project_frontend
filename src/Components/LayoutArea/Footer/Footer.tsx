import "./Footer.css";
import {NavLink} from "react-router-dom";

function Footer(): JSX.Element {
    return (
        <div className="Footer">
			<NavLink className={"aboutBtn"} to={"/aboutemporium"}>About Us</NavLink>
            &nbsp;|&nbsp;
            <a href={"https://github.com/DesTede?tab=repositories"} target={"_blank"}>
                <img src={"/GitHub-Mark-ea2971cee799.png"} alt={"github link"}/>
            </a>
            <NavLink to={"mailto:desaleytede@gmail.com"}>
                <img src={"/free-mail-1437261-1216865.webp"} alt={"mail link"}/>
            </NavLink>
            <a href={"https://www.facebook.com/"} target={"_blank"}>
                <img src={"/46-facebook-512.webp"} alt={"facebook link"}/>
            </a>
            <a href={"https://www.instagram.com/"} target={"_blank"}>
                <img src={"/icon-media-social-instagram-free-vector.jpg"} alt={"instagram link"}/>
            </a>
        </div>
    );
}

export default Footer;
