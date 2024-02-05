import "./CouponCard.css";
import {Card, CardContent} from "@mui/material";
import Coupon from "../../../Models/Coupon";
import {NavLink} from "react-router-dom";
import {toast} from "react-toastify";
import errorHandler from "../../../Services/ErrorHandler";
import companyService from "../../../Services/CompanyService";
import {authStore} from "../../../Redux/OurStore";


interface CouponProps{
    coupon: Coupon;
}
function CouponCard(props:CouponProps): JSX.Element{

    const client = authStore.getState().user?.clientType;
    function deleteMe(){
        companyService.deleteCoupon(props.coupon.id)
            .then(()=> toast.success("Company deleted"))
            .catch(err=>errorHandler.showError(err));

    }
    
    
    return (
        <div className="CouponCard">
			<Card>
                <CardContent className={"cardCo"}>
                    {client === "Company" &&(
                        <>
                        <NavLink to={"/company/coupon/" + props.coupon.id}><h3>{props.coupon.title}</h3></NavLink><br/>
                        </>
                        )}
                    {client !== "Company" &&(
                        <>
                        <NavLink to={"/discovery/coupon/" + props.coupon.id}><h3>{props.coupon.title}</h3></NavLink><br/>
                        </>
                    )}
                    {/*<h4>Id: {props.coupon.id}</h4>*/}
                    <img src={props.coupon.image as string} alt="coupon image"/> <br/>
                    
                    $ {props.coupon.price}
                    {/*<p>Description: {props.coupon.description}</p>*/}
                    <h5>Category: {props.coupon.category}</h5>
                    {/*<h5>Amount: {props.coupon.amount}</h5>*/}
                    {/*<h5>{props.coupon.startDate.toString()}</h5>*/}
                    {/*<h5>Expires at: {props.coupon.endDate.toString()}</h5>*/}
                    {/* add here conditional rendering. if user is not company, then hide these two buttons*/}
                    {client === "Company" &&(
                        <>
                    <button onClick={deleteMe}>Delete</button>
                    <button><NavLink to={"/company/updatecoupon/" + props.coupon.id}>Update</NavLink></button>
                        </>
                    )}
                    

                </CardContent>
            </Card>

        </div>
    );
}

export default CouponCard;
