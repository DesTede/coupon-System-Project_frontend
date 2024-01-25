import "./Routing.css";
import {Navigate, Route, Routes} from "react-router-dom";
import HomePage from "../../MainArea/HomePage/HomePage";
import Coupons from "../../CouponArea/Coupons/Coupons";
import Login from "../../AuthArea/Login/Login";
import NotFound from "../NotFound/NotFound";
import Companies from "../../CompanyArea/Companies/Companies";
import Customers from "../../CustomerArea/Customers/Customers";
import UpdateCompany from "../../CompanyArea/UpdateCompany/UpdateCompany";
import UpdateCustomer from "../../CustomerArea/UpdateCustomer/UpdateCustomer";
import AddCompany from "../../CompanyArea/AddCompany/AddCompany";
import AddCustomer from "../../CustomerArea/AddCustomer/AddCustomer";
import CompanyDetails from "../../CompanyArea/CompanyDetails/CompanyDetails";
import CustomerDetails from "../../CustomerArea/CustomerDetails/CustomerDetails";
import CouponDetails from "../../CouponArea/CouponDetails/CouponDetails";
import AddCoupon from "../../CouponArea/AddCoupon/AddCoupon";
import UpdateCoupon from "../../CouponArea/UpdateCoupon/UpdateCoupon";
import AboutUs from "../../FooterArea/AboutUs/AboutUs";

function Routing(): JSX.Element {
    return (
        <div className="Routing">
			<Routes>
                <Route path={"home"} element={<HomePage/>} />
                <Route path={"coupons"} element={<Coupons/>}/>
                <Route path={"login"} element={<Login/>}/>
                
                <Route path={"admin/getcompanies"} element={<Companies/>}/>
                {/*<Route path={"admin/getCompany/companyid"} element={<CompanyDetails/>}/>*/}
                <Route path={"admin/addcompany"} element={<AddCompany/>}/>
                <Route path={"admin/updatecompany/id"} element={<UpdateCompany/>}/>
                <Route path={"admin/getcustomers"} element={<Customers/>}/>
                <Route path={"admin/getcustomer/id"} element={<CustomerDetails/>}/>
                <Route path={"admin/addcustomer"} element={<AddCustomer/>}/>
                <Route path={"admin/updatecustomer/id"} element={<UpdateCustomer/>}/>
                
                <Route path={"company/details"} element={<CompanyDetails/>}/>
                <Route path={"company/coupons"} element={<Coupons/>}/>
                <Route path={"company/coupon/id"} element={<CouponDetails/>}/>
                <Route path={"company/couponsbycategory/category"} element={<Coupons/>}/>
                <Route path={"company/couponsbyprice/price"} element={<Coupons/>}/>
                <Route path={"company/addcoupon"} element={<AddCoupon/>}/>
                <Route path={"company/updatecoupon/id"} element={<UpdateCoupon/>}/>
                <Route path={"company/update/id"} element={<UpdateCompany/>}/>
                
                <Route path={"customer/details"} element={<CustomerDetails/>}/>
                <Route path={"customer/purchasedcoupons"} element={<Coupons/>}/>
                <Route path={"customer/availablecoupons"} element={<Coupons/>}/>
                <Route path={"customer/couponsbycategory/category"} element={<Coupons/>}/>
                <Route path={"customer/couponsbyprice/price"} element={<Coupons/>}/>
                {/*<Route path={"customer/purchaseCoupon"} element={<Coupons/>}/>*/}
                
                <Route path={"customer/add"} element={<AddCustomer/>}/>
                <Route path={"customer/update/customerid"} element={<UpdateCustomer/>}/>
                
                <Route path={"aboutUs"} element={<AboutUs/>}/>
                <Route path={"successStories" } element={<AboutUs/>}/>
                
                <Route path={"/"} element={<Navigate to={"home"}/> }/>
                
                <Route path="*" Component={NotFound} />
            </Routes>
        </div>
    );
}

export default Routing;
