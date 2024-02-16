import "./CouponCard.css";
import {Card, CardContent} from "@mui/material";
import Coupon from "../../../Models/Coupon";
import {NavLink, useNavigate} from "react-router-dom";
import {toast} from "react-toastify";
import errorHandler from "../../../Utils/ErrorHandler";
import companyService from "../../../Services/CompanyService";
import {authStore} from "../../../Redux/OurStore";
import React from "react";


interface CouponProps{
    coupon: Coupon;
    reloadCoupons: () => void;
}
function CouponCard(props:CouponProps): JSX.Element{

    const client = authStore.getState().user?.clientType;
    function deleteMe(){
        companyService.deleteCoupon(props.coupon.id)
            .then(()=> {toast.success("Company deleted");
                              props.reloadCoupons()})
            .catch(err=>errorHandler.showError(err));

    }
    const couponStyle: React.CSSProperties = {
        filter: props.coupon.amount === 0 ? "grayscale(100%)" : "none",
    };
    
    
    return (
        <div className="CouponCard">
			<Card style={couponStyle}>
                <CardContent className={"cardCo"}>
                    {client === "Company" &&(
                        <>
                        <NavLink  to={"/company/coupon/" + props.coupon.id}><h3>{props.coupon.title}</h3></NavLink><br/>
                        </>
                        )}
                    {client !== "Company" &&(
                        <>
                        <NavLink to={"/discovery/coupon/" + props.coupon.id}><h3>{props.coupon.title}</h3></NavLink><br/>
                        </>
                    )}
                    <img src={props.coupon.image as string} alt="coupon image"/> <br/>
                    <br/>
                    <span className={"priceSpan"}>$ {props.coupon.price}</span>
                    <h5>Category: {props.coupon.category}</h5>
                    
                    {client === "Company" &&(
                        <>
                    <button className={"CCardBtn"} onClick={deleteMe}>Delete</button>
                    <button className={"CCardBtn"}><NavLink className={"upNav"} to={"/company/updatecoupon/" + props.coupon.id}>Update</NavLink></button>
                        </>
                    )}
                </CardContent>
            </Card>
            

        </div>
    );
}

export default CouponCard;
