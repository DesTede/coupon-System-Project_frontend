import "./CompanyCoupons.css";
import {useEffect, useState} from "react";
import {companyStore} from "../../../Redux/OurStore";
import {NavLink} from "react-router-dom";
import Coupon from "../../../Models/Coupon";
import companyService from "../../../Services/CompanyService";
import CouponCard from "../CouponCard/CouponCard";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import {Category} from "../../../Models/Category";
import errorHandler from "../../../Services/ErrorHandler";


 
function CompanyCoupons(): JSX.Element {
     
    const [coupons, setCoupons] = useState<Coupon[]>();
    const [categories, setCategories] = useState<Category[]>();
    const [category, setCategory] = useState<string>("");

    useEffect(() => {
        companyService.getCoupons()
            .then(coup => setCoupons(coup))
            .catch(err => errorHandler.showError(err));
        
        companyService.getCategories()
            .then(cats => setCategories(cats))
            .catch(err => errorHandler.showError(err));
        
        const unsubscribe =  companyStore.subscribe(() => {
            companyService.getCoupons()
                .then(cups => setCoupons(cups))
                .catch(err => errorHandler.showError(err));
        })

        return () => {
            unsubscribe();
        }

    }, []);


    

        const handleChange = (event: SelectChangeEvent) => {
            setCategory(event.target.value as string);
        };


    

    return (
        <div className="CompanyCoupons">

            <div>
                <span>Filter by category: </span>
                <FormControl sx={{m: 1, minWidth: 80}}>
                    <InputLabel id="demo-simple-select-autowidth-label">Category</InputLabel>
                    <Select
                        labelId="demo-simple-select-autowidth-label"
                        id="demo-simple-select-autowidth"
                        value={category}
                        onChange={handleChange}
                        autoWidth
                        label="Category"
                    >
                        <MenuItem value="">
                            <em>None</em>
                        </MenuItem>
                        {Object.values(Category).map(cat => (
                            <MenuItem key={cat} value={cat}>{cat}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </div>


            <NavLink to={"/company/addcoupon"}>
                
                <button>Add new coupon</button>
            </NavLink>
            <div className="container">
                {coupons?.map(c => <CouponCard key={c.id} coupon={c}/>)}
            </div>
        </div>
    );
}

export default CompanyCoupons;
