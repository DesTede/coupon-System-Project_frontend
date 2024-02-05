import "./PurchasedCoupons.css";
import React, {useEffect, useState} from "react";
import Coupon from "../../../Models/Coupon";
import {Category} from "../../../Models/Category";
import publicService from "../../../Services/PublicService";
import errorHandler from "../../../Services/ErrorHandler";
import companyService from "../../../Services/CompanyService";
import Select, {SelectChangeEvent} from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import {Input} from "@mui/material";
import CouponCard from "../../CouponArea/CouponCard/CouponCard";
import customerService from "../../../Services/CustomerService";

function PurchasedCoupons(): JSX.Element {
    const [coupons, setCoupons] = useState<Coupon[]>();
    const [categories, setCategories] = useState<Category[]>();
    const [category, setCategory] = useState<string>("");
    // const cat = useParams().category!;
    const [price, setPrice] = useState<number | "">("");


    useEffect(() => {
        customerService.getCustomerCoupons()
            .then(coup => setCoupons(coup))
            .catch(err => errorHandler.showError(err));


        publicService.getCategories()
            .then(cats => setCategories(cats))
            .catch(err => errorHandler.showError(err));




    }, []);



    const handleChange = (event: SelectChangeEvent) => {
        // publicService.getByCategory(event.target.value as string)
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
                {filteredCoupons?.map(c => <CouponCard key={c.id} coupon={c}/>)}
            </div>
        </div>
    );
}

export default PurchasedCoupons;
