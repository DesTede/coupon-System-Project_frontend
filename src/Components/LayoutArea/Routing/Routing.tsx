import "./Routing.css";
import {Navigate, Route, Routes} from "react-router-dom";
import HomePage from "../../MainArea/HomePage/HomePage";
import CompanyCoupons from "../../CouponArea/CompanyCoupons/CompanyCoupons";
import Login from "../../AuthArea/Login/Login";
import NotFound from "../NotFound/NotFound";
import Companies from "../../AdminArea/Companies/Companies";
import Customers from "../../CustomerArea/Customers/Customers";
import UpdateCompany from "../../AdminArea/UpdateCompany/UpdateCompany";
import UpdateCustomer from "../../AdminArea/UpdateCustomer/UpdateCustomer";
import AddCompany from "../../AdminArea/AddCompany/AddCompany";
import AddCustomer from "../../AdminArea/AddCustomer/AddCustomer";
import CompanyDetails from "../../CompanyArea/CompanyDetails/CompanyDetails";
import CustomerDetails from "../../CustomerArea/CustomerDetails/CustomerDetails";
import CouponDetails from "../../CouponArea/CouponDetails/CouponDetails";
import AddCoupon from "../../CompanyArea/AddCoupon/AddCoupon";
import UpdateCoupon from "../../CompanyArea/UpdateCoupon/UpdateCoupon";
import AboutUs from "../../FooterArea/AboutUs/AboutUs";
import PurchaseCoupon from "../../CustomerArea/PurchaseCoupon/PurchaseCoupon";
// import CouponbyCategory from "../../CouponArea/CouponbyCategoryPrice/CouponbyCategory";
// import CouponbyPrice from "../../CouponArea/CouponbyPrice/CouponbyPrice";
import PurchasedCoupons from "../../CustomerArea/PurchasedCoupons/PurchasedCoupons";
import AllCoupons from "../../CouponArea/AllCoupons/AllCoupons";
import SuccessStories from "../../FooterArea/SuccessStories/SuccessStories";
import ContactUs from "../../FooterArea/ContactUs/ContactUs";

function Routing(): JSX.Element {
    return (
        <div className="Routing">
			<Routes>
                
                <Route path={"home"} element={<HomePage/>} />
                <Route path={"/public/coupons"} element={<AllCoupons/>}/>
                <Route path={"/public/coupon/:id"} element={<CouponDetails/>}/>
                <Route path={"login"} element={<Login/>}/>
                
                                    {/* Administrator*/}
                <Route path={"admin/getcompanies"} element={<Companies/>}/>
                <Route path={"admin/getCompany/:id"} element={<CompanyDetails/>}/>
                <Route path={"admin/addcompany"} element={<AddCompany/>}/>
                <Route path={"admin/updatecompany/:id"} element={<UpdateCompany/>}/>
                <Route path={"admin/getcustomers"} element={<Customers/>}/>
                <Route path={"admin/getcustomer/:id"} element={<CustomerDetails/>}/>
                <Route path={"admin/addcustomer"} element={<AddCustomer/>}/>
                <Route path={"admin/updatecustomer/:id"} element={<UpdateCustomer/>}/>
                
                    
                                       {/* Company*/}
                <Route path={"company/details"} element={<CompanyDetails/>}/>
                <Route path={"company/coupons"} element={<CompanyCoupons/>}/>
                <Route path={"company/coupon/:id"} element={<CouponDetails/>}/>
                {/*<Route path={"company/couponsbycategory/:category"} element={<CouponbyCategory/>}/>*/}
                {/*<Route path={"company/couponsbyprice/:price"} element={<CouponbyPrice/>}/>*/}
                <Route path={"company/addcoupon"} element={<AddCoupon/>}/>
                <Route path={"company/updatecoupon/:id"} element={<UpdateCoupon/>}/>
                
                                        {/*Customer*/}
                <Route path={"customer/details"} element={<CustomerDetails/>}/>
                <Route path={"customer/purchasedcoupons"} element={<PurchasedCoupons/>}/>
                <Route path={"customer/availablecoupons"} element={<AllCoupons/>}/>
                {/*<Route path={"customer/purchasedcouponsbycategory/:category"} element={<AllCoupons/>}/>*/}
                {/*<Route path={"customer/purchasedcouponsbyprice/:price"} element={<AllCoupons/>}/>*/}
                <Route path={"customer/purchaseCoupon"} element={<PurchaseCoupon/>}/>
                
                                        {/* Footer */}
                <Route path={"/aboutemporium"} element={<AboutUs/>}/>
                <Route path={"successstories" } element={<SuccessStories/>}/>
                <Route path={"/contactus" } element={<ContactUs/>}/>
                
                
                <Route path={"/"} element={<Navigate to={"home"}/> }/>
                
                <Route path="/*" element={<NotFound/>} />
            </Routes>
        </div>
    );
}

export default Routing;
