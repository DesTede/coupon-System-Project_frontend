import "./AllCoupons.css";
import React, {useEffect, useState} from "react";
import Coupon from "../../../Models/Coupon";
import {Category} from "../../../Models/Category";
import Select, {SelectChangeEvent} from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import CouponCard from "../CouponCard/CouponCard";
import {Input} from "@mui/material";
import Loading from "../../LayoutArea/Loading/Loading";
import discoveryService from "../../../Services/DiscoveryService";
import errorHandler from "../../../Utils/ErrorHandler";

/**
 * Renders a list of all available coupons with filtering options by category and price.
 * Allows users to filter coupons by category and price range.
 * Displays a loading indicator while fetching coupon data from the server.
 */
function AllCoupons(): JSX.Element {

    // State variables to manage coupon data, selected category, and price range
    const [coupons, setCoupons] = useState<Coupon[] | null>(null);
    const [category, setCategory] = useState<string>("");
    const [price, setPrice] = useState<number | "">("");


    /**
     * Fetches the list of coupons when the component mounts
     */
    useEffect(() => {
        loadCouponList();
    }, []);

    // Function to load the list of coupons from the server
    function loadCouponList() {
        discoveryService.getAllCoupons()
            .then(coup => setCoupons(coup))
            .catch(err => errorHandler.showError(err));
    }
    
    // Function to reload coupons when needed
    const reloadCoupons = () => {
        loadCouponList();
    }

    /**
     * Event handler for category filter selection
     * @param event - the event object
     */
    const handleChange = (event: SelectChangeEvent) => {
        setCategory(event.target.value === "None" ? "" : event.target.value as string);
    };
    
    /**
     * Event handler for price filter input
     * @param event - the event object
     */
    const handleChangePrice = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPrice(event.target.value as number | "");
    };


    /**
     * Filters the list of coupons based on the selected category and price range
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
            
            {coupons === null ? (
                    <Loading/>
                )
                : (
                    <>
                        
                        <div className="container">
                            {filteredCoupons?.map(c => <CouponCard key={c.id} coupon={c} reloadCoupons={reloadCoupons} />)}
                        </div>

                    </>

                )}

        </div>
    );
}

export default AllCoupons;
