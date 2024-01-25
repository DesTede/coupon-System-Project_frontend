import "./CouponDetails.css";
import Coupon from "../../../Models/Coupon";
import {useEffect, useState} from "react";
import companyService from "../../../Services/CompanyService";
import errorHandler from "../../../Services/ErrorHandler";
import {useParams} from "react-router-dom";


function CouponDetails(): JSX.Element {

    const [coupon, setCoupon] = useState<Coupon>();
    const id = +(useParams().id!);

    useEffect(()=>{
        companyService.getCoupon(id)
            .then( e=> setCoupon(e) )
            .catch(err=>errorHandler.showError(err));
    }, []);
    
    return (
        <div className="CouponDetails">
            {coupon && <>
            <img src={coupon.imageUrl} alt=""/><br/>
            <h3>{coupon.title}</h3>
            <h4>Id: {coupon.id}</h4>
            $ {coupon.price}
            <p>Description: {coupon.description}</p>
            <h5>Category: {coupon.category}</h5>
            <h5>Amount: {coupon.amount}</h5>
            <h5>{coupon.startDate.toString()}</h5>
            <h5>Expires at: {coupon.endDate.toString()}</h5>
            </>
            }
        </div>
    );
}

export default CouponDetails;
