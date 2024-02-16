import "./CompanyProfile.css";
import {useEffect, useState} from "react";
import Company from "../../../Models/Company";
import {NavLink} from "react-router-dom";
import errorHandler from "../../../Utils/ErrorHandler";
import {Card, CardContent} from "@mui/material";
import companyService from "../../../Services/CompanyService";

/**
 * Displays the profile details of the logged-in company.
 * It fetches and shows the company's name, ID, email, and password.
 */
function CompanyProfile(): JSX.Element {

    // State variable to hold the company data
    const [company, setCompany] = useState<Company>();

    /**
     * Fetches company details when the component mounts
     */
    useEffect(()=>{
        companyService.getDetails()
            .then( e=> setCompany(e) )
            .catch(err=>errorHandler.showError(err));
    }, []);

    
    return (
        <div className="CustomerProfile">
            <Card>
                <CardContent className={"companyC"}>
                    {company && <>
                    <h3>{company.name}</h3>
                    <h4>Id: {company.id}</h4>
                    <h4>{company.email}</h4>
                    <h4>{company.password}</h4>
                    {/*<img src={company.imageUrl} alt="company image" />*/}
                    <NavLink to={"/homepage"}><button>Back</button></NavLink>
                    </>
                    }
                </CardContent>
            </Card>
        </div>
    );
}


export default CompanyProfile;
