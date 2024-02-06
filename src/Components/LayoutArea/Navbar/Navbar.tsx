import "./Navbar.css";
import React, {useEffect, useState} from "react";
import {authStore} from "../../../Redux/OurStore";
import AdminNavbar from "../../NavbarArea/AdminNavbar/AdminNavbar";
import CompanyNavbar from "../../NavbarArea/CompanyNavbar/CompanyNavbar";
import CustomerNavbar from "../../NavbarArea/CustomerNavbar/CustomerNavbar";
import DiscoveryNavbar from "../../NavbarArea/DiscoveryNavbar/DiscoveryNavbar";

function Navbar(): JSX.Element {

    const [nav, setNav] = useState<any>(); // need to update this type

    useEffect(() => {
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
        const unsubscribe = authStore.subscribe(() => {
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
            }});

        return ()=> {
            unsubscribe();
        }

    }, []);
    return (
        <div className="Navbar">
            {nav}
        </div>
    );
}

export default Navbar;
