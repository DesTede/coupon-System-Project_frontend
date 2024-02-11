import "./Companies.css";
import {NavLink} from "react-router-dom";
import Company from "../../../Models/Company";
import React, {useEffect, useState} from "react";
import adminService from "../../../Services/AdminService";
import {adminStore} from "../../../Redux/OurStore";
import CompanyCard from "../../CompanyArea/CompanyCard/CompanyCard";
import Loading from "../../LayoutArea/Loading/Loading";
import CouponCard from "../../CouponArea/CouponCard/CouponCard";

function Companies(): JSX.Element {
    
    const [companies, setCompanies] = useState<Company[]>();
    
    useEffect(() => {
        adminService.getCompanies()
            .then(comps => setCompanies(comps))
            .catch(err => alert(err.message))
        
        const unsubscribe = adminStore.subscribe(() => {
            adminService.getCompanies()
                .then(comps => setCompanies(comps))
                .catch(err => alert(err.message))
        })
        
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
            
            
            {/*<div className="container">*/}
            {/*    */}
            {/*    {companies?.map(c => <CompanyCard key={c.id} company={c} />)} */}
            {/*</div>*/}
        </div>
    );
}

export default Companies;
