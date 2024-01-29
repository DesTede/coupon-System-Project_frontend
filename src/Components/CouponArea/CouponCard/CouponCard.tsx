import "./CouponCard.css";
import {Card, CardContent} from "@mui/material";
import Coupon from "../../../Models/Coupon";
import {NavLink} from "react-router-dom";
import adminService from "../../../Services/AdminService";
import {toast} from "react-toastify";
import errorHandler from "../../../Services/ErrorHandler";
import companyService from "../../../Services/CompanyService";


interface CouponProps{
    coupon: Coupon;
}
function CouponCard(props:CouponProps): JSX.Element {

    function deleteMe(){
        companyService.deleteCoupon(props.coupon.id)
            .then(()=> toast.success("Company deleted"))
            .catch(err=>errorHandler.showError(err));

    }
    
    
    return (
        <div className="CouponCard">
			<Card>
                <CardContent>
                    <NavLink to={"/company/coupon/" + props.coupon.id}><h3>{props.coupon.title}</h3></NavLink><br/>
                    {/*<h4>Id: {props.coupon.id}</h4>*/}
                    <img src={props.coupon.image as string} alt=""/> <br/>
                    
                    $ {props.coupon.price}
                    {/*<p>Description: {props.coupon.description}</p>*/}
                    <h5>Category: {props.coupon.category}</h5>
                    {/*<h5>Amount: {props.coupon.amount}</h5>*/}
                    {/*<h5>{props.coupon.startDate.toString()}</h5>*/}
                    {/*<h5>Expires at: {props.coupon.endDate.toString()}</h5>*/}
                    <button onClick={deleteMe}>Delete</button>
                    <button><NavLink to={"/company/updatecoupon/" + props.coupon.id}>Update</NavLink></button>

                </CardContent>
            </Card>

        </div>
    );
}

export default CouponCard;
