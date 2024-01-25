import "./CompanyDetails.css";
import {useEffect, useState} from "react";
import Company from "../../../Models/Company";
import {NavLink, useParams} from "react-router-dom";
import errorHandler from "../../../Services/ErrorHandler";
import {Card, CardContent} from "@mui/material";
import companyService from "../../../Services/CompanyService";


function CompanyDetails(): JSX.Element {
    
    const [company, setCompany] = useState<Company>();
    // const id = +(useParams().empid!);

    useEffect(()=>{
        companyService.getDetails()
            .then( e=> setCompany(e) )
            .catch(err=>errorHandler.showError(err));
    }, []);

    
    return (
        <div className="CompanyDetails">
            <Card>
                <CardContent>
                    {company && <>
                    <h3>{company.name}</h3>
                    <h4>Id: {company.id}</h4>
                    <h4>{company.email}</h4>
                    <h4>{company.password}</h4>
                    {/*<img src={company.imageUrl} alt="company image" />*/}
                    <NavLink to={"/home"}><button>Back</button></NavLink>
                    </>
                    }
                </CardContent>
            </Card>
        </div>
    );
}


export default CompanyDetails;
