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
    const {register, handleSubmit} = useForm<Coupon>();
    
    const [company,setCompany] = useState<Company>()
    
    useEffect(() => {
        companyService.getDetails()
            .then(comp => setCompany(comp))
            .catch(err => errorHandler.showError(err));
    }, []);

    // function getBase64(file: File) {
    //     // let document: string | ArrayBuffer = "";
    //     let reader = new FileReader();
    //     reader.readAsDataURL(file);
    //     reader.onloadend = function () {
    //         console.log(reader.result);
    //         // document = reader.result;
    //        
    //
    //     };
    //     reader.onerror = function (error) {
    //         console.log('Error: ', error);
    //     };
    //    
    // }

    //
    // function sendCoupon(coupon:Coupon) {
    //     let image = document.getElementById("image") as HTMLInputElement;
    //     if (image?.files && image.files.length > 0) {
    //         const imageFile = image.files[0];
    //         const base64String = getBase64(imageFile);
    //         coupon.image = base64String;
    //     }
    //     // coupon.company = company;
    //     console.log(coupon)
    //     companyService.addCoupon(coupon)
    //         .then(t => {
    //             toast.success("Coupon added! ");navigate("/company/coupons")})
    //         .catch(err => errorHandler.showError(err))
    // }
    
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
                <FormLabel>New Company</FormLabel>
                <TextField
                    variant="outlined"
                    label="Title"
                    id="title"
                    {...register('title', 
                            { required: true,
                                     minLength: 2, 
                                     maxLength: 100 })}
                />
                <TextField
                    variant="outlined"
                    label="Description"
                    id="description"
                    {...register('description',
                            { required: true,
                                     minLength: 2, 
                                     maxLength: 100 })}
                />
                 {/*add select for a dropdown menu from existing categories*/}
                <TextField
                    variant="outlined"
                    label="Category"
                    id="category"
                    {...register('category', 
                            { required: true,
                                     minLength: 2,
                                     maxLength: 100 })}
                />
                <TextField
                    variant="outlined"
                    label="Start Date"
                    id="startDate"
                    type={"date"}
                    InputProps={{ inputProps: { min: "2024-01-01", max: "2025-01-01" } }}
                    {...register('startDate', 
                            { required: true })}
                />
                <TextField
                    variant="outlined"
                    label="End Date"
                    id="endDate"
                    type={"date"}
                    InputProps={{ inputProps: { min: "2024-01-01", max: "2027-12-31" } }}
                    {...register('endDate', 
                            { required: true})}
                />
                <TextField
                    variant="outlined"
                    label="Amount"
                    id="amount"
                    type={"number"}
                    InputProps={{ inputProps: { min: 1, max: 300 } }}
                    {...register('amount', 
                            { required: true })}
                />
                <TextField
                    variant="outlined"
                    label="Price"
                    id="price"
                    type={"number"}
                    InputProps={{ inputProps: { min: 1, max: 1000 } }}
                    {...register('price', 
                            { required: true})}
                />
                {/*<TextField*/}
                {/*    variant="outlined"*/}
                {/*    label={company?.name}*/}
                {/*    id="company"*/}
                {/*    // type={}*/}
                {/*    defaultValue={company}*/}
                {/*    InputProps={ {readOnly: true}}*/}
                {/*    {...register('company')}*/}
                {/*/>*/}
                <TextField
                    variant="outlined"
                    label="Image"
                    id="image"
                    type={"file"}
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
