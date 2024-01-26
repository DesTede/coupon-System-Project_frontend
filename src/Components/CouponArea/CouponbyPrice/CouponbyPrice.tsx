import "./CouponbyPrice.css";
import {useEffect, useState} from "react";
import Coupon from "../../../Models/Coupon";
import {NavLink, useParams} from "react-router-dom";
import companyService from "../../../Services/CompanyService";
import errorHandler from "../../../Services/ErrorHandler";
import {companyStore} from "../../../Redux/OurStore";
import CouponCard from "../CouponCard/CouponCard";

function CouponbyPrice(): JSX.Element {
    const [couponsPrice, setCouponsPrice] = useState<Coupon[]>();
    let price = +(useParams().price!);

    useEffect(() => {
        companyService.getCouponByPrice(price)
            .then(cats => setCouponsPrice(cats))
            .catch(err => errorHandler.showError(err));

        const unsubscribe =  companyStore.subscribe(() => {
            companyService.getCouponByPrice(price)
                .then(cups => setCouponsPrice(cups))
                .catch(err => errorHandler.showError(err));

        })

        return () => {
            unsubscribe();
        }
    }, []);

    return (
        <div className="CouponbyPrice">

            
            <div className="container">
                {couponsPrice?.map(c => <CouponCard key={c.id} coupon={c}/>)}
            </div>
        </div>
    );
}

export default CouponbyPrice;
