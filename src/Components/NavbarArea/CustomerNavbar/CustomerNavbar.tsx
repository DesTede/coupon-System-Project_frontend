import "./CustomerNavbar.css";
import {useNavigate} from "react-router-dom";
import errorHandler from "../../../Services/ErrorHandler";
import authService from "../../../Services/AuthenticationService";

function CustomerNavbar(): JSX.Element {

    const navigate = useNavigate();
    function logout() {
        authService.logout()
            .then(() => navigate("/"))
            .catch(err => errorHandler.showError(err));
    }
        
    return (
        <div className="CustomerNavbar">
            CustomerNavbar Area
            <button onClick={logout}>Logout</button>
            
        </div>
    );
}

export default CustomerNavbar;
