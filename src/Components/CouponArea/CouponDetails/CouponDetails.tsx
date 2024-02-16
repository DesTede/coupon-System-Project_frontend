import "./CouponDetails.css";
import Coupon from "../../../Models/Coupon";
import React, {useEffect, useState} from "react";
import errorHandler from "../../../Utils/ErrorHandler";
import {NavLink, useNavigate, useParams} from "react-router-dom";
import discoveryService from "../../../Services/DiscoveryService";
import {authStore} from "../../../Redux/OurStore";
import {Button, Card} from "@mui/material";
import customerService from "../../../Services/CustomerService";
import {toast} from "react-toastify";


/**
 * Displays detailed information about a specific coupon.
 * Allows customers to purchase coupons if logged in.
 * Redirects users to the appropriate coupon listing page after actions.
 */
function CouponDetails(): JSX.Element {

    // Navigation hook for redirecting users to the appropriate page after actions.
    const navigate = useNavigate();
    
    // Retrieves the user's client type from the Redux store.
    const client = authStore.getState().user?.clientType;
    
    // Component state for storing the coupon to be displayed.
    const [coupon, setCoupon] = useState<Coupon>();
    
    // Retrieves the coupon's id from the URL.
    const id = +(useParams().id!);

    /**
     * Fetches the coupon details from the server upon component mount
     */
    useEffect(()=>{
        function fetchCoupon() {
            discoveryService.getCoupon(id)
                .then(c => {
                    setCoupon(c);
                })
                .catch(err => errorHandler.showError(err));
        }
        fetchCoupon();
        return () => {
        }
       
    }, [id]);
    
    /**
     * Handles the purchase of a coupon by a customer.
     * Calls the customer service to make the purchase.
     * Redirects the user to the coupon listing page after the purchase.
     */
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
                    
                    {client === "Company" &&(
                    <h4>Id: {coupon.id}</h4>
                    )}
                    $ {coupon.price}
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
