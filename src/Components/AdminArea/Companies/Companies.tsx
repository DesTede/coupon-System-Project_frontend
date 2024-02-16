import "./Companies.css";
import {NavLink} from "react-router-dom";
import Company from "../../../Models/Company";
import React, {useEffect, useState} from "react";
import adminService from "../../../Services/AdminService";
import {adminStore} from "../../../Redux/OurStore";
import CompanyCard from "../../CompanyArea/CompanyCard/CompanyCard";
import Loading from "../../LayoutArea/Loading/Loading";

/**
 * Component for displaying a list of companies.
 * Allows users to view existing companies and add new ones.
 */
function Companies(): JSX.Element {
    
    const [companies, setCompanies] = useState<Company[]>();

    /**
     * Fetches the list of companies from the server.
     * Sets the retrieved companies in the component state.
     * Displays an alert message in case of an error.
     */
    function fetchCompanies() {
        adminService.getCompanies()
            .then(comps => setCompanies(comps))
            .catch(err => alert(err.message))
    }
    
    useEffect(() => {
        fetchCompanies();

        // Subscribes to changes in the adminStore to fetch companies on updates
        const unsubscribe = adminStore.subscribe(fetchCompanies);

        // Unsubscribe from the adminStore on component unmount
        return () => {
            unsubscribe();
        }
        
    }, []);
    

    return (
        <div className="Companies">
            <NavLink to={"/admin/addcompany"}> <button>Add Company</button></NavLink>

            {companies === null ? (
                    <Loading/>
                )
                : (
                    <>

                        <div className="container">
                                {companies?.map(c => <CompanyCard key={c.id} company={c} />)} 

                        </div>

                    </>

                )}
        </div>
    );
}

export default Companies;
