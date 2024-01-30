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


function CouponDetails(): JSX.Element {

    const navigate = useNavigate();
    const client = authStore.getState().user?.clientType;
    const [coupon, setCoupon] = useState<Coupon>();
    const id = +(useParams().id!);

    useEffect(()=>{
        publicService.getCoupon(id)
            .then( c=> setCoupon(c) )
            .catch(err=>errorHandler.showError(err));
    }, []);
    
    function handlePurchase(){
        customerService.purchaseCoupon(coupon)
            .then(()=>{toast.success("Coupon purchased"); navigate("/public/coupons")})
            .catch(err=>{errorHandler.showError(err);});
    }
    
    
    return (
        <div className="CouponDetails">
            <Card>
                {coupon && <>
                    <img src={coupon.image as string} alt=""/><br/>
                    <h3>{coupon.title}</h3>
                    <h4>Id: {coupon.id}</h4>
                    {/*<h4>Company: {coupon.company?.name}</h4>*/}
                    $ {coupon.price}
                    <p>Description: {coupon.description}</p>
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
            </Card>
        </div>
    );
}

export default CouponDetails;
