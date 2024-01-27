import "./UpdateCoupon.css";
import {useForm} from "react-hook-form";
import {useNavigate, useParams} from "react-router-dom";
import {useEffect} from "react";
import errorHandler from "../../../Services/ErrorHandler";
import {toast} from "react-toastify";
import {Button, FormControl, FormLabel, TextField} from "@mui/material";
import companyService from "../../../Services/CompanyService";
import Coupon from "../../../Models/Coupon";

function UpdateCoupon(): JSX.Element {
    const {register, handleSubmit, setValue } = useForm<Coupon>();
    const navigate = useNavigate();
    const id:number = +(useParams().id!);

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
                setValue("imageUrl", coup.imageUrl);
                
            })
            .catch(err=> {errorHandler.showError(err); navigate("/company/coupons")});
    }, []);

    function sendForm(coup: Coupon){
        coup.id = id;
        companyService.updateCoupon(coup)
            .then(c=> {toast.success("Coupon updated!"); navigate("/company/coupons")})
            .catch(err=> errorHandler.showError(err));
    }

    return (
        <div className="UpdateCompany">
            <FormControl>
                <FormLabel>Update Company</FormLabel>
                <TextField
                    variant="outlined"
                    label="Title"
                    id="title"
                    {...register('title',
                        { required: false,
                                 minLength: 2,
                                 maxLength: 100 })}
                />
                <TextField
                    variant="outlined"
                    label="Description"
                    id="description"
                    {...register('description',
                        { required: false,
                                 minLength: 2,
                                 maxLength: 100 })}
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
                    InputProps={{ inputProps: { min: "2024-01-01", max: "2025-01-01" } }}
                    {...register('startDate',
                        { required: false })}
                />
                <TextField
                    variant="outlined"
                    label="End Date"
                    id="endDate"
                    type={"date"}
                    InputProps={{ inputProps: { min: "2024-01-01", max: "2027-12-31" } }}
                    {...register('endDate',
                        { required: false})}
                />
                <TextField
                    variant="outlined"
                    label="Amount"
                    id="amount"
                    type={"number"}
                    InputProps={{ inputProps: { min: 1, max: 300 } }}
                    {...register('amount',
                          { required: false })}
                />
                <TextField
                    variant="outlined"
                    label="Price"
                    id="price"
                    type={"number"}
                    InputProps={{ inputProps: { min: 1, max: 1000 } }}
                    {...register('price',
                          { required: false})}
                />
                
                <TextField
                    variant="outlined"
                    label="Image"
                    id="imageUrl"
                    type={"file"}
                    {...register('imageUrl',
                        { required: false,
                                 minLength: 2,
                                 maxLength: 15 })}
                />
                {/*<Button variant="outlined" onClick={sendForm}>Update</Button>*/}
                <Button variant="outlined" onClick={handleSubmit(sendForm)}>Update</Button>
            </FormControl>


        </div>
    );
}

export default UpdateCoupon;
