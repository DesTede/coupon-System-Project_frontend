import "./CustomerProfile.css";
import {useEffect, useState} from "react";
import errorHandler from "../../../Utils/ErrorHandler";
import {Card, CardContent} from "@mui/material";
import {NavLink} from "react-router-dom";
import Customer from "../../../Models/Customer";
import customerService from "../../../Services/CustomerService";

function CustomerProfile(): JSX.Element {
    const [customer, setCustomer] = useState<Customer>();

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
                        <h4>Id: {customer.id}</h4>
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
