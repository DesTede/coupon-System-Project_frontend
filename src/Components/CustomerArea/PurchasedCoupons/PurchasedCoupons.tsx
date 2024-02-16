import "./PurchasedCoupons.css";
import React, {useEffect, useState} from "react";
import Coupon from "../../../Models/Coupon";
import {Category} from "../../../Models/Category";
import errorHandler from "../../../Utils/ErrorHandler";
import Select, {SelectChangeEvent} from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import {Input} from "@mui/material";
import CouponCard from "../../CouponArea/CouponCard/CouponCard";
import customerService from "../../../Services/CustomerService";


/**
 * Represents the page displaying coupons purchased by the current customer.
 * Allows filtering coupons by category and price.
 * Displays the purchased coupons using CouponCard components.
 */
function PurchasedCoupons(): JSX.Element {

    /**
     * Represents the state of the coupons, category and price.
     */
    const [coupons, setCoupons] = useState<Coupon[]>();
    const [category, setCategory] = useState<string>("");
    const [price, setPrice] = useState<number | "">("");


    /**
     * Fetches the coupons purchased by the current customer and sets the state,on component mount.
     */
    useEffect(() => {
        customerService.getCustomerCoupons()
            .then(coup => setCoupons(coup))
            .catch(err => errorHandler.showError(err));
    }, []);


    /**
     * Handles the change in category filter.
     * @param event - The event object containing the new category value.
     */
    const handleChange = (event: SelectChangeEvent) => {
        setCategory(event.target.value === "None" ? "" : event.target.value as string);
    };

    /**
     * Handles the change in price filter.
     * @param event - The event object containing the new price value.
     */
    const handleChangePrice = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPrice(event.target.value as number | "");
    };


    /**
     * Filters the coupons based on the selected category and price.
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
                        <MenuItem value="">
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

            <div className="container">
                {filteredCoupons?.map(c => <CouponCard key={c.id} coupon={c} reloadCoupons={() => {}}/>)}
            </div>
        </div>
    );
}

export default PurchasedCoupons;
