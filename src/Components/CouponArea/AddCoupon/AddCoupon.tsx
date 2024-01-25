import "./AddCoupon.css";
import {useNavigate} from "react-router-dom";
import {useForm} from "react-hook-form";
import {toast} from "react-toastify";
import errorHandler from "../../../Services/ErrorHandler";
import {Button, FormControl, FormLabel, TextField} from "@mui/material";
import Coupon from "../../../Models/Coupon";
import companyService from "../../../Services/CompanyService";
import {useEffect, useState} from "react";
import Company from "../../../Models/Company";

function AddCoupon(): JSX.Element {
    const navigate = useNavigate();
    const {register, handleSubmit, formState, } = useForm<Coupon>();

    const [company,setCompany] = useState<Company>()
    useEffect(() => {
        companyService.getDetails()
            .then(comp => setCompany(comp))
            .catch(err => errorHandler.showError(err));
    }, []);
    
    function  getBase64(file: any){
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function () {
            console.log(file);
            
        };
        reader.onerror = function (error) {
            errorHandler.showError(error);
        };
    }
    
    function sendCoupon(coupon:Coupon) {
        getBase64(coupon.imageUrl);
        
        companyService.addCoupon(coupon)
            .then(t => {
                toast.success("Coupon added! ");navigate("/company/coupons")})
            .catch(err => errorHandler.showError(err))
    }

    return (
        <div className="AddCoupon">
            <FormControl>
                <FormLabel>New Company</FormLabel>
                <TextField
                    variant="outlined"
                    label="Title"
                    id="title"
                    {...register('title', { required: true, minLength: 2, maxLength: 100 })}
                />
                <TextField
                    variant="outlined"
                    label="Description"
                    id="descripsion"
                    {...register('description', { required: true, minLength: 2, maxLength: 100 })}
                />
                <TextField
                    variant="outlined"
                    label="Category"
                    id="category"
                    {...register('category', { required: true, minLength: 2, maxLength: 100 })}
                />
                <TextField
                    variant="outlined"
                    label="Start Date"
                    id="startDate"
                    type={"date"}
                    InputProps={{ inputProps: { min: "2024-01-01", max: "2025-01-01" } }}
                    {...register('startDate', { required: true })}
                />
                <TextField
                    variant="outlined"
                    label="End Date"
                    id="endDate"
                    type={"date"}
                    InputProps={{ inputProps: { min: "2024-01-01", max: "2027-12-31" } }}
                    {...register('endDate', { required: true})}
                />
                <TextField
                    variant="outlined"
                    label="Amount"
                    id="amount"
                    type={"number"}
                    InputProps={{ inputProps: { min: 1, max: 300 } }}
                    {...register('amount', { required: true })}
                />
                <TextField
                    variant="outlined"
                    label="Price"
                    id="price"
                    type={"number"}
                    InputProps={{ inputProps: { min: 1, max: 1000 } }}
                    {...register('price', { required: true})}
                />
                <TextField
                    variant="outlined"
                    label={company.name}
                    id="company"
                    // type={}
                    defaultValue={company.name}
                    InputProps={ {readOnly: true}}
                    {...register('company')}
                />
                <TextField
                    variant="outlined"
                    label="Image"
                    id="imageUrl"
                    type={"file"}
                    {...register('imageUrl', { required: true, minLength: 2, maxLength: 15 })}
                />
                
                <Button variant="outlined" onClick={handleSubmit(sendCoupon)}>Add</Button>
            </FormControl>
        </div>
    );
}


export default AddCoupon;
