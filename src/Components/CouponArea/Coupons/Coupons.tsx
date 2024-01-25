import "./Coupons.css";
import {useEffect, useState} from "react";
import adminService from "../../../Services/AdminService";
import {adminStore} from "../../../Redux/OurStore";
import {NavLink} from "react-router-dom";
import CompanyCard from "../../CompanyArea/CompanyCard/CompanyCard";
import Coupon from "../../../Models/Coupon";
import companyService from "../../../Services/CompanyService";
import CouponCard from "../CouponCard/CouponCard";

function Coupons(): JSX.Element {
    
    const [coupons, setCoupons] = useState<Coupon[]>();

    useEffect(() => {
        companyService.getCoupons()
            .then(coup => setCoupons(coup))
            .catch(err => alert(err.message))

        const unsubscribe =  adminStore.subscribe(() => {
            companyService.getCoupons()
                .then(cups => setCoupons(cups))
                .catch(err => alert(err.message))
        })

        return () => {
            unsubscribe();
        }

    }, []);


    return (
        <div className="Coupons">
            <NavLink to={"/company/addcoupon"}> <button>Add new coupon</button></NavLink>
            <div className="container">
                {coupons?.map(c => <CouponCard key={c.id} coupon={c} />)}
            </div>
        </div>
    );
}

export default Coupons;
