import "./CompanyDetails.css";
import {useEffect, useState} from "react";
import Company from "../../../Models/Company";
import {useParams} from "react-router-dom";
import adminService from "../../../Services/AdminService";
import errorHandler from "../../../Services/ErrorHandler";

function CompanyDetails(): JSX.Element {
    
    const [company, setCompany] = useState<Company>();
    const id = +(useParams().companyid!);

    useEffect(() => {
        adminService.getCompany(id)
            .then(comp => setCompany(comp))
            .catch(err => errorHandler.showError(err));
    }, []);
    
    return (
        <div className="CompanyDetails">
			
            
            
        </div>
    );
}

export default CompanyDetails;
