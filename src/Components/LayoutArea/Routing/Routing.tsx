import "./Routing.css";
import {Navigate, Route, Routes} from "react-router-dom";
import HomePage from "../../MainArea/HomePage/HomePage";
import Coupons from "../../CouponArea/Coupons/Coupons";
import Login from "../../AuthArea/Login/Login";
import NotFound from "../NotFound/NotFound";
import Companies from "../../CompanyArea/Companies/Companies";
import CompanyCard from "../../CompanyArea/CompanyCard/CompanyCard";
import Customers from "../../CustomerArea/Customers/Customers";
import CustomerCard from "../../CustomerArea/CustomerCard/CustomerCard";
import UpdateCompany from "../../CompanyArea/UpdateCompany/UpdateCompany";
import UpdateCustomer from "../../CustomerArea/UpdateCustomer/UpdateCustomer";
import AddCompany from "../../CompanyArea/AddCompany/AddCompany";
import AddCustomer from "../../CustomerArea/AddCustomer/AddCustomer";

function Routing(): JSX.Element {
    return (
        <div className="Routing">
			<Routes>
                <Route path={"home"} element={<HomePage/>} />
                <Route path={"coupons"} element={<Coupons/>}/>
                <Route path={"login"} element={<Login/>}/>
                
                <Route path={"companies"} element={<Companies/>}/>
                <Route path={"company/companyid"} element={<CompanyCard/>}/>
                <Route path={"company/add"} element={<AddCompany/>}/>
                <Route path={"company/update/companyid"} element={<UpdateCompany/>}/>
                
                <Route path={"customers"} element={<Customers/>}/>
                <Route path={"customer/customerid"} element={<CustomerCard/>}/>
                <Route path={"customer/add"} element={<AddCustomer/>}/>
                <Route path={"customer/update/customerid"} element={<UpdateCustomer/>}/>
                
                <Route/>
                <Route/>
                <Route path={"/"} element={<Navigate to={"home"}/> }/>
                <Route path={"*"} element={<NotFound/>} />
            </Routes>
        </div>
    );
}

export default Routing;
