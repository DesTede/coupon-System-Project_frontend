import "./Customers.css";
import {useEffect, useState} from "react";
import Customer from "../../../Models/Customer";
import adminService from "../../../Services/AdminService";
import {adminStore} from "../../../Redux/OurStore";
import {NavLink} from "react-router-dom";
import CustomerCard from "../../CustomerArea/CustomerCard/CustomerCard";
import errorHandler from "../../../Services/ErrorHandler";
import Loading from "../../LayoutArea/Loading/Loading";

function Customers(): JSX.Element {
    
    const [customers, setCustomers ] = useState<Customer[]>();

    useEffect(() => {
    //     const fetchData = async () => {
    //         try {
    //             const cou = await adminService.getCustomers();
    //             setCustomers(cou);
    //         } catch (error) {
    //             errorHandler.showError(error);
    //         }
    //     };
    //     fetchData();
    //     return () => {
    //
    //     };
    // },[]);
        adminService.getCustomers()
            .then(cous => setCustomers(cous))
            .catch(err => errorHandler.showError(err));
            
        
        const unsubscribe =  adminStore.subscribe(
            () => {
            adminService.getCustomers()
                .then(cous => setCustomers(cous))
                .catch(err => errorHandler.showError(err));
        })

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
            
            
            {/*<div className="container">*/}
            {/*    {customers?.map(custom => <CustomerCard key={custom.id} customer={custom} />)}*/}
            {/*</div>*/}
        </div>
    );
}

export default Customers;
