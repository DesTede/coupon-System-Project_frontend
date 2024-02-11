import "./CustomerCard.css";
import Customer from "../../../Models/Customer";
import adminService from "../../../Services/AdminService";
import {toast} from "react-toastify";
import errorHandler from "../../../Services/ErrorHandler";
import {Card, CardContent} from "@mui/material";
import {NavLink, useNavigate} from "react-router-dom";

interface CustomerProps{
    customer:Customer
}
function CustomerCard(props:CustomerProps): JSX.Element {

    const navigate = useNavigate();
    function deleteMe(){
        adminService.deleteCustomer(props.customer.id)
            .then(()=> {toast.success("Customer deleted");navigate("/admin/getcustomers")})
            .catch(err=>errorHandler.showError(err));

    }
    return (
        <div className="CustomerCard">
            <Card>
                <CardContent>
                    <h3>{props.customer.firstName + " " + props.customer.lastName} </h3>
                    <h4>id: { props.customer.id}</h4>
                    <h4>{props.customer.email}</h4>
                    <h4>password: { props.customer.password}</h4>
                    <button onClick={deleteMe}>Delete</button>
                    <button><NavLink to={"/admin/updatecustomer/" + props.customer.id}>Update</NavLink></button>
                </CardContent>
            </Card>
        </div>
    );
}

export default CustomerCard;
