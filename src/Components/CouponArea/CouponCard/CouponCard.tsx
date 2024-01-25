import "./CouponCard.css";
import {Card, CardContent} from "@mui/material";
import Coupon from "../../../Models/Coupon";
import {NavLink} from "react-router-dom";


interface CouponProps{
    coupon: Coupon;
}
function CouponCard(props:CouponProps): JSX.Element {
    
    
    
    return (
        <div className="CouponCard">
			<Card>
                <CardContent>
                     <img src={props.coupon.imageUrl} alt=""/> <br/>
                <NavLink to={"/company/coupon/" + props.coupon.id}><h3>{props.coupon.title}</h3></NavLink><br/>
                    {/*<h4>Id: {props.coupon.id}</h4>*/}
                    $ {props.coupon.price}
                    {/*<p>Description: {props.coupon.description}</p>*/}
                    <h5>Category: {props.coupon.category}</h5>
                    {/*<h5>Amount: {props.coupon.amount}</h5>*/}
                    {/*<h5>{props.coupon.startDate.toString()}</h5>*/}
                    {/*<h5>Expires at: {props.coupon.endDate.toString()}</h5>*/}

                </CardContent>
            </Card>

        </div>
    );
}

export default CouponCard;
