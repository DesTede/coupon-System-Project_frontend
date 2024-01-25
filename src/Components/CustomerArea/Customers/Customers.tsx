import "./Customers.css";
import {useEffect, useState} from "react";
import Customer from "../../../Models/Customer";
import adminService from "../../../Services/AdminService";
import {adminStore} from "../../../Redux/OurStore";
import {NavLink} from "react-router-dom";
import CustomerCard from "../CustomerCard/CustomerCard";

function Customers(): JSX.Element {
    
    const [customers, setCustomers ] = useState<Customer[]>();

    useEffect(() => {
        adminService.getCustomers()
            .then(cus => setCustomers(cus))
            .catch(err => alert(err.message))

        const unsubscribe =  adminStore.subscribe(() => {
            adminService.getCustomers()
                .then(cus => setCustomers(cus))
                .catch(err => alert(err.message))
        })

        return () => {
            unsubscribe();
        }

    }, []);


    return (
        <div className="Customers">
            <NavLink to={"/admin/addcustomer"}> <button>Add Customer</button></NavLink>
            <div className="container">
                {customers?.map(c => <CustomerCard key={c.id} customer={c} />)}
            </div>
        </div>
    );
}

export default Customers;
