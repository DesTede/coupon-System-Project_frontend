import "./CouponbyCategory.css";
import {useEffect, useState} from "react";
import companyService from "../../../Services/CompanyService";
import {companyStore} from "../../../Redux/OurStore";
import { useParams} from "react-router-dom";
import CouponCard from "../CouponCard/CouponCard";
import errorHandler from "../../../Services/ErrorHandler";
import Coupon from "../../../Models/Coupon";

function CouponbyCategory(): JSX.Element {
    
    const [couponsCategory, setCouponsCategory] = useState<Coupon[]>();
    let category = useParams().category!;

    useEffect(() => {
        companyService.getCouponByCategory(category)
            .then(cats => setCouponsCategory(cats))
            .catch(err => errorHandler.showError(err));
        
        const unsubscribe =  companyStore.subscribe(() => {
            companyService.getCouponByCategory(category)
                .then(cups => setCouponsCategory(cups))
                .catch(err => errorHandler.showError(err));
            
        })

        return () => {
            unsubscribe();
        }
    }, []);
    
    return (
        <div className="CouponbyCategory">
            
            
            <div className="container">
                {couponsCategory?.map(c => <CouponCard key={c.id} coupon={c}/>)}
            </div>
        </div>
    );
}

export default CouponbyCategory;
