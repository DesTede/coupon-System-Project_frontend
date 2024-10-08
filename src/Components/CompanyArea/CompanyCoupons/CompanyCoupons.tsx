import "./CompanyCoupons.css";
import React, {useEffect, useState} from "react";
import {NavLink} from "react-router-dom";
import Coupon from "../../../Models/Coupon";
import companyService from "../../../Services/CompanyService";
import CouponCard from "../../CouponArea/CouponCard/CouponCard";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import {Category} from "../../../Models/Category";
import errorHandler from "../../../Utils/ErrorHandler";
import {Input} from "@mui/material";


/**
 * Displays a list of coupons belonging to a company and provides filtering options by category and price.
 */
function CompanyCoupons(): JSX.Element {
    
    // State variables to hold coupon data, selected category, and selected price
    const [coupons, setCoupons] = useState<Coupon[]>();
    const [category, setCategory] = useState<string>("");
    const [price, setPrice] = useState<number | "">("");

    /**
     * Fetches coupons belonging to the company when the component mounts.
     */
    useEffect(() => {
        fetchCompanyCoupons();
    }, []);

    
     // Fetches coupons belonging to the company.
    const fetchCompanyCoupons = () => {
        companyService.getCompanyCoupons()
            .then(coup => setCoupons(coup))
            .catch(err => errorHandler.showError(err));
    };
    
    // Reloads coupons by fetching them again from the server.
    const reloadCoupons = () => {
        fetchCompanyCoupons();
    }

    /**
     * Handles change in the selected category for filtering.
     * @param event The change event from the category select component.
     */
    const handleChange = (event: SelectChangeEvent) => {
        setCategory(event.target.value === "None" ? "" : event.target.value as string);
    };

    /**
     * Handles change in the selected price for filtering.
     * @param event The change event from the price input component.
     */
    const handleChangePrice = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPrice(event.target.value as number | "");
    };

    /**
     * Filters coupons based on the selected category and price.
     */
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
                        <MenuItem value="None">
                            <em>None</em>
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
                {filteredCoupons?.map(c => <CouponCard key={c.id} coupon={c} reloadCoupons={reloadCoupons}/>)}
            </div>
            
        </div>
    );
}

export default CompanyCoupons;
