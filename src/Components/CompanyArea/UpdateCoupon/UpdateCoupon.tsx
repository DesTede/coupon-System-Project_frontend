import "./UpdateCoupon.css";
import {useForm} from "react-hook-form";
import {useNavigate, useParams} from "react-router-dom";
import React, {useEffect} from "react";
import errorHandler from "../../../Services/ErrorHandler";
import {toast} from "react-toastify";
import {Button, FormControl, FormLabel, TextField} from "@mui/material";
import companyService from "../../../Services/CompanyService";
import Coupon from "../../../Models/Coupon";

function UpdateCoupon(): JSX.Element {
    const {register, handleSubmit, setValue, setError, formState:{errors} } = useForm<Coupon>({mode:"onChange"});
    const navigate = useNavigate();
    const id:number = +(useParams().id!);

    const currentDate = new Date().toISOString().split('T')[0];
    

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

    function sendForm(coup: Coupon){
        if (coup.image) {
            const imageFile = (coup.image as FileList)[0];
            let reader = new FileReader();
            // reader.readAsDataURL(coupon.image);

            reader.onload = function () {
                const base64String = reader.result as string;
                coup.image = base64String;
                console.log(base64String);
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
                    {...register('description',
                        { required: false,
                                 minLength: 2,
                                 maxLength: 100 })}
                    onBlur={handleBlur('description')}
                    error={!!errors.description}
                    helperText={errors.description ? "Description must be between 2 and 100 characters" : ""}
                />
                <TextField
                    variant="outlined"
                    label="Category"
                    id="category"
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
                    {...register('amount',
                          { required: false })}
                    onBlur={handleBlur('amount')}
                    error={!!errors.amount}
                    helperText={errors.amount ? "Amount must be between 1 and 300" : ""}
                />
                <TextField
                    variant="outlined"
                    label="Price"
                    id="price"
                    type={"number"}
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
                {/*<Button variant="outlined" onClick={sendForm}>Update</Button>*/}
                <Button variant="outlined" onClick={handleSubmit(sendForm)}>Update</Button>
            </FormControl>


        </div>
    );
}

export default UpdateCoupon;
