import "./CouponDetails.css";
import Coupon from "../../../Models/Coupon";
import React, {useEffect, useState} from "react";
import errorHandler from "../../../Services/ErrorHandler";
import {NavLink, useNavigate, useParams} from "react-router-dom";
import discoveryService from "../../../Services/DiscoveryService";
import {authStore} from "../../../Redux/OurStore";
import {Button, Card} from "@mui/material";
import customerService from "../../../Services/CustomerService";
import {toast} from "react-toastify";


function CouponDetails(): JSX.Element {

    const navigate = useNavigate();
    const client = authStore.getState().user?.clientType;
    const [coupon, setCoupon] = useState<Coupon>();
    // const [company, setCompany] = useState<Company>();
    const id = +(useParams().id!);
    // let company:Company;

    useEffect(()=>{
        discoveryService.getCoupon(id)
            .then( c=> {setCoupon(c);})
            .catch(err=>errorHandler.showError(err));
        
       
    }, []);
    
    function handlePurchase(){
        customerService.purchaseCoupon(coupon.id)
            .then(()=>{toast.success("Coupon purchased"); navigate("/discovery/coupons")})
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
                      <Button className={"loginBtn"} onClick={handlePurchase}>Purchase coupon</Button>
                    </>
                )}
                {client !== "Customer" && client !== "Company" &&(
                    <>
                    <Button  className={"loginBtn"} ><NavLink to={"/login"}>Purchase coupon</NavLink></Button>
                    </>
                )}
            </Card>
            {client === "Company" ?(
                <>
            <NavLink className={"CardBtn"} to= {"/company/coupons"}>Back to Coupons</NavLink>
                </>
            ):(
                <>
            <NavLink className={"CardBtn"} to= {"/discovery/coupons"}>Back to Coupons</NavLink>
                </>
            )}
            
        </div>
    );
}

export default CouponDetails;
