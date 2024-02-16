import "./AddCoupon.css";
import {useNavigate} from "react-router-dom";
import {useForm} from "react-hook-form";
import {toast} from "react-toastify";
import errorHandler from "../../../Utils/ErrorHandler";
import {Button, FormControl, FormLabel, TextField} from "@mui/material";
import Coupon from "../../../Models/Coupon";
import companyService from "../../../Services/CompanyService";
import React from "react";
import {Category} from "../../../Models/Category";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";


/**
 * Component for adding a new coupon.
 * Allows a company to add a new coupon with title, description, category, start date, end date, amount, price, and image.
 */
function AddCoupon(this: any): JSX.Element {
    
    const navigate = useNavigate();
    
    // Form handling using react-hook-form
    const {register, handleSubmit, setError, formState:{errors}} = useForm<Coupon>({mode:"onChange"});

    // Current date to set min and max values for the start and end date fields
    const currentDate = new Date().toISOString().split('T')[0];

    /**
     * Sends the coupon data to the server for addition.
     * Displays a success message upon the successful addition of the coupon.
     * Shows an error message if the addition fails.
     * @param coupon - The coupon data to be added.
     */
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
            reader.readAsDataURL(imageFile);
            
        }
    }
    /**
     * Handles the blur event for form fields to set custom error messages.
     * @param field - The field being blurred.
     */
    const handleBlur = (field: keyof Coupon) => (e: React.FocusEvent<HTMLInputElement>) => {
        if (!e.target.value) {
            setError(field, { type: 'manual' });
        }
    };
    
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
                    onBlur={handleBlur('title')}
                    error={!!errors.title}
                    helperText={errors.title ? "Title must be between 2 and 100 characters" : ""}

                />
                <TextField
                    className="TextField"
                    
                    variant="outlined"
                    label="Description"
                    id="description"
                    {...register('description',
                            { required: true,
                                     minLength: 2, 
                                     maxLength: 5000 })}
                    onBlur={handleBlur('title')}
                    error={!!errors.description}
                    helperText={errors.description ? "Description must be between 2 and 5000 characters" : ""}
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
                    onBlur={handleBlur('startDate')}
                    error={!!errors.startDate}
                    helperText={errors.startDate ? "Start Date must be entered" : ""}
                    
                />
                <TextField
                    className="TextField"
                    variant="outlined"
                    label="End Date"
                    id="endDate"
                    type={"date"}
                    InputLabelProps={{ shrink: true }}
                    /* add here current date so it will be impossible to add date in the past*/
                    InputProps={{ inputProps: { min: currentDate, max: "2027-12-31" } }}
                    {...register('endDate', 
                            { required: true})}
                    onBlur={handleBlur('endDate')}
                    error={!!errors.endDate}
                    helperText={errors.endDate ? "End Date must be entered" : ""}
                />
                
                <TextField
                    className="TextField"
                    variant="outlined"
                    label="Amount"
                    id="amount"
                    type={"number"}
                    InputProps={{ inputProps: { min: 1, max: 300 } }}
                    {...register('amount', 
                            { required: true, min:1 })}
                    onBlur={handleBlur('amount')}
                    error={!!errors.amount}
                    helperText={errors.amount ? "Amount must be between 1 and 300" : ""}
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
                    onBlur={handleBlur('price')}
                    error={!!errors.price}
                    helperText={errors.price ? "Price must be between 1 and 1000" : ""}
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
                    onBlur={handleBlur('image')}
                    error={!!errors.image}
                    helperText={errors.image ? "Image must be uploaded" : ""}
                />
                
                <Button variant="outlined" onClick={handleSubmit(sendCoupon)}>Add</Button>
            </FormControl>
        </div>
    );
}


export default AddCoupon;
