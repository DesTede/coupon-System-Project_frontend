import "./Customers.css";
import {useEffect, useState} from "react";
import Customer from "../../../Models/Customer";
import adminService from "../../../Services/AdminService";
import {adminStore} from "../../../Redux/OurStore";
import {NavLink} from "react-router-dom";
import CustomerCard from "../../CustomerArea/CustomerCard/CustomerCard";
import errorHandler from "../../../Utils/ErrorHandler";
import Loading from "../../LayoutArea/Loading/Loading";

/**
 * Component for displaying a list of customers.
 * Allows users to view existing customers and add new ones.
 */
function Customers(): JSX.Element {
    
    const [customers, setCustomers ] = useState<Customer[]>();

    /**
     * Fetches the list of customers from the server.
     * Sets the retrieved customers in the component state.
     * Displays an error message using the error handler in case of an error.
     */
    const fetchCustomers = () => {
        adminService.getCustomers()
            .then(cous => setCustomers(cous))
            .catch(err => errorHandler.showError(err));
    };
    useEffect(() => {
            fetchCustomers();

        // Subscribes to changes in the adminStore to fetch customers on updates
        const unsubscribe =  adminStore.subscribe(fetchCustomers);

        // Unsubscribe from the adminStore on component unmount
        return () => {
            unsubscribe();
        }
    
    }, []);

    

    return (
        <div className="Customers">
            <NavLink to={"/admin/addcustomer"}> <button>Add Customer</button></NavLink>

            {customers === null ? (
                    <Loading/>
                )
                : (
                    <>
                        <div className="container">
                                {customers?.map(custom => <CustomerCard key={custom.id} customer={custom} />)}

                        </div>

                    </>

                )}
            
        </div>
    );
}

export default Customers;
