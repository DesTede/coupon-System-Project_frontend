import "./CompanyCard.css";
import {Card, CardContent} from "@mui/material";
import Company from "../../../Models/Company";
import adminService from "../../../Services/AdminService";
import {toast} from "react-toastify";
import errorHandler from "../../../Utils/ErrorHandler";
import { NavLink} from "react-router-dom";

interface CompanyProps{
    company:Company
}
function CompanyCard(props:CompanyProps): JSX.Element{
    
    function deleteMe(){
        adminService.deleteCompany(props.company.id)
            .then(()=> toast.success("Company deleted"))
            .catch(err=>errorHandler.showError(err));
        
    }
    return (
        <div className="CompanyCard">
            <Card>
                <CardContent className={"companyCardContent"}>
                     <h3>{props.company.name}</h3>
                    <h4>Id: {props.company.id}</h4>
                    <h4>{props.company.email}</h4>
                    <h4>Password: {props.company.password}</h4>
                    {/*<img src={props.company.imageUrl} alt="company image" />*/}
                    <button className={"companyButton"} onClick={deleteMe}>Delete</button> 
                    <button className={"companyButton"}><NavLink className={"companyUpdateLink"} to={"/admin/updatecompany/" + props.company.id}>Update</NavLink></button>
                </CardContent>
            </Card>
        </div>
    );
}

export default CompanyCard;
