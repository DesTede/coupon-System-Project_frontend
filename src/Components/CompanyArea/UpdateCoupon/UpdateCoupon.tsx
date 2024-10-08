import "./UpdateCoupon.css";
import {useForm} from "react-hook-form";
import {useNavigate, useParams} from "react-router-dom";
import React, {useEffect} from "react";
import errorHandler from "../../../Utils/ErrorHandler";
import {toast} from "react-toastify";
import {Button, FormControl, FormLabel, TextField} from "@mui/material";
import companyService from "../../../Services/CompanyService";
import Coupon from "../../../Models/Coupon";

/**
 * Renders a form to update a coupon's details.
 * Allows the company to modify the coupon's title, description, category, start and end dates, amount, price, and image.
 * Upon submission, sends the updated coupon data to the server.
 */
function UpdateCoupon(): JSX.Element {

    // Form handling using react-hook-form
    const {register, handleSubmit, setValue, setError, formState:{errors} } = useForm<Coupon>({mode:"onChange"});
    const navigate = useNavigate();
    
    // Extracts the coupon's id from the URL
    const id:number = +(useParams().id!);

    // Current date to set min and max values for the start and end date fields
    const currentDate = new Date().toISOString().split('T')[0];

    /**
     * Fetches the coupon details and populates the form fields when the component mounts
     */
    useEffect(() => {
        companyService.getCoupon(id)
            .then(coup => {
                setValue("title", coup.title);
                setValue("description", coup.description);
                setValue("category", coup.category);
                setValue("price", coup.price);
                setValue("amount", coup.amount);
                setValue("startDate", coup.startDate);
                setValue("endDate", coup.endDate);
                setValue("image", coup.image);
                
            })
            .catch(err=> {errorHandler.showError(err); navigate("/company/coupons")});
    }, []);

    
    /**
     * Handles form submission by updating the coupon data on the server
     * @param coup - the updated coupon data
     */
    function sendForm(coup: Coupon){
        if (coup.image) {
            const imageFile = (coup.image as FileList)[0];
            let reader = new FileReader();
            // reader.readAsDataURL(coupon.image);

            reader.onload = function () {
                coup.image = reader.result as string;
                // console.log(base64String);
                coup.id = id;
                companyService.updateCoupon(coup)
                    .then(c => {
                        toast.success("Coupon updated!");
                        navigate("/company/coupons")
                    })
                    .catch(err => errorHandler.showError(err));
            };
            reader.readAsDataURL(imageFile);
        }
    }

    /**
     * Handles input blur events to validate the form fields
     * @param field - the field to validate
     */
    const handleBlur = (field: keyof Coupon) => (e: React.FocusEvent<HTMLInputElement>) => {
        if (!e.target.value) {
            setError(field, { type: 'manual' });
        }
    };
    

    return (
        <div className="UpdateCompany">
            <FormControl>
                <FormLabel>Update Coupon</FormLabel>
                <TextField
                    variant="outlined"
                    label="Title"
                    id="title"
                    InputLabelProps={{ shrink: true }}
                    {...register('title',
                        { required: false,
                                 minLength: 2,
                                 maxLength: 100 })}
                    onBlur={handleBlur('title')}
                    error={!!errors.title}
                    helperText={errors.title ? "Title must be between 2 and 100 characters" : ""}
                />
                <TextField
                    variant="outlined"
                    label="Description"
                    id="description"
                    InputLabelProps={{ shrink: true }}
                    {...register('description',
                        { required: false,
                                 minLength: 2,
                                 maxLength: 5000 })}
                    onBlur={handleBlur('description')}
                    error={!!errors.description}
                    helperText={errors.description ? "Description must be between 2 and 5000 characters" : ""}
                />
                <TextField
                    variant="outlined"
                    label="Category"
                    id="category"
                    InputLabelProps={{ shrink: true }}
                    {...register('category',
                        { required: false,
                                  minLength: 2,
                                  maxLength: 100 })}
                />
                <TextField
                    variant="outlined"
                    label="Start Date"
                    id="startDate"
                    type={"date"}
                    InputLabelProps={{ shrink: true }}
                    InputProps={{ inputProps: { min: "2024-01-01", max: "2025-01-01" } }}
                    {...register('startDate',
                        { required: false })}
                    onBlur={handleBlur('startDate')}
                    error={!!errors.startDate}
                    helperText={errors.startDate ? "Start date must be entered" : ""}
                />
                <TextField
                    variant="outlined"
                    label="End Date"
                    id="endDate"
                    type={"date"}
                    InputLabelProps={{ shrink: true }}
                    InputProps={{ inputProps: { min: currentDate, max: "2027-12-31" } }}
                    {...register('endDate',
                        { required: false})}
                    onBlur={handleBlur('endDate')}
                    error={!!errors.endDate}
                    helperText={errors.endDate ? "End date must be entered" : ""}
                />
                <TextField
                    variant="outlined"
                    label="Amount"
                    id="amount"
                    type={"number"}
                    InputProps={{ inputProps: { min: 1, max: 300 } }}
                    InputLabelProps={{ shrink: true }}
                    {...register('amount',
                          { required: false, min:1 })}
                    onBlur={handleBlur('amount')}
                    error={!!errors.amount}
                    helperText={errors.amount ? "Amount must be between 1 and 300" : ""}
                />
                <TextField
                    variant="outlined"
                    label="Price"
                    id="price"
                    type={"number"}
                    InputLabelProps={{ shrink: true }}
                    InputProps={{ inputProps: { min: 1, max: 1000 } }}
                    {...register('price',
                          { required: false})}
                    onBlur={handleBlur('price')}
                    error={!!errors.price}
                    helperText={errors.price ? "Price must be between 1 and 1000" : ""}
                />
                
                <TextField
                    variant="outlined"
                    label="Image"
                    id="image"
                    type={"file"}
                    InputLabelProps={{ shrink: true }}
                    {...register('image',
                        { required: false,
                                 minLength: 2,
                                 maxLength: 15 })}
                    onBlur={handleBlur('image')}
                    error={!!errors.image}
                    helperText={errors.image ? "Image must be uploaded" : ""}
                />
                <Button variant="outlined" onClick={handleSubmit(sendForm)}>Update</Button>
            </FormControl>


        </div>
    );
}

export default UpdateCoupon;
