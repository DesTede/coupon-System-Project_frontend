import "./CustomerCard.css";
import Customer from "../../../Models/Customer";
import adminService from "../../../Services/AdminService";
import {toast} from "react-toastify";
import errorHandler from "../../../Utils/ErrorHandler";
import {Card, CardContent} from "@mui/material";
import {NavLink, useNavigate} from "react-router-dom";


/**
 * CustomerProps - The properties passed to the component.
 * @param customer - The customer to display.
 */
interface CustomerProps{
    customer:Customer
}

/**
 * Represents a card component displaying information about a customer.
 * Allows administrators to delete the customer.
 * Provides navigation links for updating customer details.
 *
 */
function CustomerCard(props:CustomerProps): JSX.Element {

    const navigate = useNavigate();

    /**
     * Handles the deletion of the customer.
     * Deletes the customer from the system and triggers a success toast notification.
     */
    function deleteMe(){
        adminService.deleteCustomer(props.customer.id)
            .then(()=> {toast.success("Customer deleted");navigate("/admin/getcustomers")})
            .catch(err=>errorHandler.showError(err));

    }
    return (
        <div className="CustomerCard">
            <Card>
                <CardContent className={"customerCardContent"}>
                    <h3>{props.customer.firstName + " " + props.customer.lastName} </h3>
                    <h4>id: { props.customer.id}</h4>
                    <h4>{props.customer.email}</h4>
                    <h4>password: { props.customer.password}</h4>
                    <button className={"customerButtons"} onClick={deleteMe}>Delete</button>
                    <button className={"customerButtons"}><NavLink className={"customerUpdateLink"} to={"/admin/updatecustomer/" + props.customer.id}>Update</NavLink></button>
                </CardContent>
            </Card>
        </div>
    );
}

export default CustomerCard;
