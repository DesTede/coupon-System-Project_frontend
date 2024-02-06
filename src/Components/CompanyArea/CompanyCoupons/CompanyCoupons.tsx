import "./CompanyCoupons.css";
import React, {useEffect, useState} from "react";
import {authStore, companyStore, discoveryStore} from "../../../Redux/OurStore";
import {NavLink, useNavigate} from "react-router-dom";
import Coupon from "../../../Models/Coupon";
import companyService from "../../../Services/CompanyService";
import CouponCard from "../../CouponArea/CouponCard/CouponCard";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import {Category} from "../../../Models/Category";
import errorHandler from "../../../Services/ErrorHandler";
import {Button, Input} from "@mui/material";
import authService from "../../../Services/AuthService";
import discoveryService from "../../../Services/DiscoveryService";


 
function CompanyCoupons(): JSX.Element {
     
    const [coupons, setCoupons] = useState<Coupon[]>();
    const [categories, setCategories] = useState<Category[]>();
    const [category, setCategory] = useState<string>("");
    const [price, setPrice] = useState<number | "">("");

    useEffect(() => {
        companyService.getCoupons()
            .then(coup => setCoupons(coup))
            .catch(err => errorHandler.showError(err));
        
        discoveryService.getCategories()
            .then(cats => setCategories(cats))
            .catch(err => errorHandler.showError(err));
        
        // companyService.getCategories()
        //     .then(cats => setCategories(cats))
        //     .catch(err => errorHandler.showError(err));
        
        const unsubscribe =  companyStore.subscribe(() => {
            companyService.getCoupons()
                .then(coup => setCoupons(coup))
                .catch(err => errorHandler.showError(err));
        })

        return () => {
            unsubscribe();
        }
        
        

    }, []);



    const handleChange = (event: SelectChangeEvent) => {
        // discoveryService.getByCategory(event.target.value as string)
        setCategory(event.target.value as string);
    };

    const handleChangePrice = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPrice(event.target.value as number | "");
    };

    

    const filteredCoupons = coupons?.filter(c =>
        (!category || c.category.toString() === category) &&
        (!price || c.price <= (price as number))
    );

    

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
                        <MenuItem value="Others">
                            <em></em>
                        </MenuItem>
                        {Object.values(Category)
                            .filter(cat => typeof cat === "string")
                            .map(cat => (
                            <MenuItem key={cat} value={cat}>{cat}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </div>

            <span>Filter by price: </span>
            <FormControl sx={{m: 1, minWidth: 80}}>
                <InputLabel htmlFor="price-input">Price</InputLabel>
                <Input
                    id="price-input"
                    type="number"
                    value={price === "" ? "" : (price as number).toString()}
                    onChange={handleChangePrice}
                />
            </FormControl>

            <br/>
            <NavLink  to={"/company/addcoupon"}>

                <button className={"addBtn"}>Add new coupon</button>
            </NavLink>
            <div className="container">
                {filteredCoupons?.map(c => <CouponCard key={c.id} coupon={c}/>)}
            </div>
            
        </div>
    );
}

export default CompanyCoupons;
