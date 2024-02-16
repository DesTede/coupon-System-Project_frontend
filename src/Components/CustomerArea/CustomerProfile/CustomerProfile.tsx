import "./CustomerProfile.css";
import {useEffect, useState} from "react";
import errorHandler from "../../../Utils/ErrorHandler";
import {Card, CardContent} from "@mui/material";
import {NavLink} from "react-router-dom";
import Customer from "../../../Models/Customer";
import customerService from "../../../Services/CustomerService";
import {authStore} from "../../../Redux/OurStore";

/**
 * Represents the profile page of a customer.
 * Displays the customer's details such as name, email, and password.
 * Provides navigation back to the homepage.
 */
function CustomerProfile(): JSX.Element {
    
    // Get the client type from the store
    const client = authStore.getState().user?.clientType;
    
    // Set the customer state
    const [customer, setCustomer] = useState<Customer>();

    /**
     * Fetches the details of the logged-in customer and sets the state, on component load.
     */
    useEffect(()=>{
        customerService.getDetails()
            .then( c=> setCustomer(c) )
            .catch(err=>errorHandler.showError(err));
    }, []);


    return (
        <div className="CustomerProfile">
            <Card>
                <CardContent className={"customerC"}>
                    {customer && <>
                        <h3>{customer.firstName} {customer.lastName}</h3>
                        {client === "Administrator" && (
                        <h4>Id: {customer.id}</h4>
                            )}
                        <h4>{customer.email}</h4>
                        <h4>Password: {customer.password}</h4>
                        <NavLink to={"/homepage"}><button>Home</button></NavLink>
                    </>
                    }
                </CardContent>
            </Card>
        </div>
    );
}

export default CustomerProfile;
