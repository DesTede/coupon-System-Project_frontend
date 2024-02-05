import "./AddCoupon.css";
import {useNavigate} from "react-router-dom";
import {useForm} from "react-hook-form";
import {toast} from "react-toastify";
import errorHandler from "../../../Services/ErrorHandler";
import {Button, FormControl, FormLabel, TextField} from "@mui/material";
import Coupon from "../../../Models/Coupon";
import companyService from "../../../Services/CompanyService";
import React from "react";
import {Category} from "../../../Models/Category";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

function AddCoupon(): JSX.Element {
    
    const navigate = useNavigate();
    const {register, handleSubmit} = useForm<Coupon>();

    
    function sendCoupon(coupon:Coupon){
        if (coupon.image){
            const imageFile = (coupon.image as FileList)[0];
            let reader = new FileReader();
            // reader.readAsDataURL(coupon.image);
            
            reader.onload = function (){
                const base64String = reader.result as string;
                coupon.image = base64String;
                console.log(base64String);
                companyService.addCoupon(coupon)
                    .then(t => {toast.success("Coupon added! ");navigate("/company/coupons");
                        console.log(coupon)})
                    .catch(err => errorHandler.showError(err))
            };
            // reader.onerror = function (error){
            //     console.log("Error:", error);
            reader.readAsDataURL(imageFile);
            
        }
    }
    
    return (
        <div className="AddCoupon">
            <FormControl>
                <FormLabel>New Coupon</FormLabel>
                <TextField
                    className="TextField"
                    variant="outlined"
                    label="Title"
                    id="title"
                    {...register('title', 
                            { required: true,
                                     minLength: 2, 
                                     maxLength: 100 })}
                />
                <TextField
                    className="TextField"
                    
                    variant="outlined"
                    label="Description"
                    id="description"
                    {...register('description',
                            { required: true,
                                     minLength: 2, 
                                     maxLength: 100 })}
                />
                <Select
                    variant="outlined"
                    label="Category"
                    id="category"
                    defaultValue={"Others"}
                    {...register('category',
                        { required: true})}
                    >
                
                    {Object.values(Category)
                        .filter(cat => typeof cat === "string")
                        .map(cat => (
                            <MenuItem key={cat} value={cat as string}>{cat}</MenuItem>
                    ))}
                </Select>
                
                <TextField
                    className="TextField"
                    variant="outlined"
                    label="Start Date"
                    id="startDate"
                    type={"date"}
                    InputLabelProps={{ shrink: true }}
                    InputProps={{ inputProps: { min: "2024-01-01", max: "2025-01-01" } }}
                    {...register('startDate', 
                            { required: true })}
                />
                <TextField
                    className="TextField"
                    variant="outlined"
                    label="End Date"
                    id="endDate"
                    type={"date"}
                    InputLabelProps={{ shrink: true }}
                    InputProps={{ inputProps: { min: "2024-01-01", max: "2027-12-31" } }}
                    {...register('endDate', 
                            { required: true})}
                />
                
                <TextField
                    className="TextField"
                    variant="outlined"
                    label="Amount"
                    id="amount"
                    type={"number"}
                    InputProps={{ inputProps: { min: 1, max: 300 } }}
                    {...register('amount', 
                            { required: true })}
                />
                <TextField
                    className="TextField"
                    variant="outlined"
                    label="Price"
                    id="price"
                    type={"number"}
                    InputProps={{ inputProps: { min: 1, max: 1000 } }}
                    {...register('price', 
                            { required: true})}
                />
                <TextField
                    className="TextField"
                    variant="outlined"
                    label="Image"
                    id="image"
                    type={"file"}
                    InputLabelProps={{ shrink: true }}
                    {...register('image',
                        { required: true,
                                 minLength: 2,
                                 maxLength: 1000 })}
                />
                
                <Button variant="outlined" onClick={handleSubmit(sendCoupon)}>Add</Button>
            </FormControl>
        </div>
    );
}


export default AddCoupon;
