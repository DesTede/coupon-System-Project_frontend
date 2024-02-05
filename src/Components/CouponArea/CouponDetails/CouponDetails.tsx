import "./CouponDetails.css";
import Coupon from "../../../Models/Coupon";
import {useEffect, useState} from "react";
import errorHandler from "../../../Services/ErrorHandler";
import {NavLink, useNavigate, useParams} from "react-router-dom";
import publicService from "../../../Services/PublicService";
import {authStore} from "../../../Redux/OurStore";
import {Button, Card} from "@mui/material";
import customerService from "../../../Services/CustomerService";
import {toast} from "react-toastify";
import Company from "../../../Models/Company";
import companyService from "../../../Services/CompanyService";


function CouponDetails(): JSX.Element {

    const navigate = useNavigate();
    const client = authStore.getState().user?.clientType;
    const [coupon, setCoupon] = useState<Coupon>();
    // const [company, setCompany] = useState<Company>();
    const id = +(useParams().id!);
    // let company:Company;

    useEffect(()=>{
        publicService.getCoupon(id)
            .then( c=> {setCoupon(c);})
            .catch(err=>errorHandler.showError(err));
        
       
    }, []);
    
    function handlePurchase(){
        customerService.purchaseCoupon(coupon.id)
            .then(()=>{toast.success("Coupon purchased"); navigate("/public/coupons")})
            .catch(err=>{errorHandler.showError(err);});
    }
    
    
    return (
        <div className="CouponDetails">
            <Card className={"CouponCard"}>
                {coupon && <>
                    <img src={coupon.image as string} alt=""/><br/>
                    <h3>{coupon.title}</h3>
                    <h4>Id: {coupon.id}</h4>
                    {/*<h4>Company: {coupon.company?.name}</h4>*/}
                    $ {coupon.price}
                    {/*<h4>Description:</h4>*/}
                    <p><span className={"descSpan"}>Description:</span><br/>
                        {coupon.description}</p>
                    <h5>Category: {coupon.category}</h5>
                    <h5>Amount: {coupon.amount}</h5>
                    <h5>{coupon.startDate.toString()}</h5>
                    <h5>Expires at: {coupon.endDate.toString()}</h5>
                </>
                }
                {client === "Customer" &&(
                    <>
                      <Button onClick={handlePurchase}>Purchase coupon</Button>
                    </>
                )}
                {client !== "Customer" && client !== "Company" &&(
                    <>
                        <NavLink to={"/login"}>Purchase coupon</NavLink>
                    </>
                )}
            </Card>
        </div>
    );
}

export default CouponDetails;
