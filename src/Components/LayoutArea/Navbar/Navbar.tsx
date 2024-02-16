import "./Navbar.css";
import React, {useEffect, useState} from "react";
import {authStore} from "../../../Redux/OurStore";
import AdminNavbar from "../../NavbarArea/AdminNavbar/AdminNavbar";
import CompanyNavbar from "../../NavbarArea/CompanyNavbar/CompanyNavbar";
import CustomerNavbar from "../../NavbarArea/CustomerNavbar/CustomerNavbar";
import DiscoveryNavbar from "../../NavbarArea/DiscoveryNavbar/DiscoveryNavbar";


/**
 * Navbar component dynamically renders different navigation bars based on the user's client type.
 * It subscribes to changes in the user's client type from the Redux store and updates the navigation bar accordingly.
 */
function Navbar(): JSX.Element {

    /**
     * State to hold the current navigation bar component
     */
    const [nav, setNav] = useState<any>(); 

    /**
     * Function to update the navbar based on the user's client type
     */
    useEffect(() => {
        const updateNavbar = () => {
            switch (authStore.getState().user?.clientType) {
                case "Administrator":
                    setNav(<AdminNavbar/>);
                    break;
                case "Company":
                    setNav(<CompanyNavbar/>);
                    break;
                case "Customer":
                    setNav(<CustomerNavbar/>);
                    break;
                default:
                    setNav(<DiscoveryNavbar/>);
                    break;
            }
        };

        // Subscribe to changes in the user's client type
        const unsubscribe = authStore.subscribe(updateNavbar);
        updateNavbar();
        
        // Unsubscribe from changes when the component unmounts
        return ()=> {
            unsubscribe();
        };

    }, []);
    return (
        <div className="Navbar">
            {nav}
        </div>
    );
}

export default Navbar;
