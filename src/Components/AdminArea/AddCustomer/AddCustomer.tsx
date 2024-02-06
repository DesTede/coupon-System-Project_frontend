import "./AddCustomer.css";
import {useNavigate} from "react-router-dom";
import {useForm} from "react-hook-form";
import adminService from "../../../Services/AdminService";
import {toast} from "react-toastify";
import errorHandler from "../../../Services/ErrorHandler";
import {Button, FormControl, FormLabel, TextField} from "@mui/material";
import Customer from "../../../Models/Customer";
import React from "react";

function AddCustomer(): JSX.Element {

    const navigate = useNavigate();
    const {register, handleSubmit, setError, formState:{errors} } = useForm<Customer>({mode:"onChange"});

    function sendForm(cus:Customer) {
        adminService.addCustomer(cus)
            .then(c => {
                toast.success("Customer added! ");
                navigate("/admin/getcustomers")})
            .catch(err => errorHandler.showError(err))
    }
    const handleBlur = (field: keyof Customer) => (e: React.FocusEvent<HTMLInputElement>) => {
        if (!e.target.value) {
            setError(field, { type: 'manual' });
        }
    };

    return (
        <div className="AddCustomer">
            <FormControl>
                <FormLabel>New Customer</FormLabel>
                <TextField variant="outlined" 
                           label="First Name"
                           id="firstName" 
                           // required={true}
                           {...register('firstName', 
                               { required: true, 
                                        minLength: 2, 
                                        maxLength: 15 })}
                            onBlur={handleBlur('firstName')}
                           error= {!!errors.firstName}
                           helperText={errors.firstName? "First name must be at least 2 characters long" : ""}
                />
                <TextField 
                           variant="outlined"
                           label="Last Name" 
                           id="lastName"
                           {...register('lastName', { required: true, minLength: 2, maxLength: 15 })}
                            onBlur={handleBlur('lastName')}
                            error= {!!errors.lastName}
                            helperText={errors.lastName? "Last name must be at least 2 characters long" : ""}
                />
                <TextField 
                           variant="outlined"
                           label="Email"
                           id="email"
                           {...register('email', { required: true, minLength: 5, maxLength: 20 })}
                            onBlur={handleBlur('email')}
                            error= {!!errors.email}
                            helperText={errors.email? "Email must be at least 5 characters long" : ""}

                />
                <TextField 
                           variant="outlined" 
                           type="Password"
                           label="Password" 
                           id="password"
                           {...register('password', { required: true, minLength: 4, maxLength: 20 })}
                            onBlur={handleBlur('password')}
                            error= {!!errors.password}
                            helperText={errors.password? "Password must be at least 4 characters long" : ""}

                />
                <Button variant="outlined" onClick={handleSubmit(sendForm)}>Add</Button>
            </FormControl>
        </div>
    );
}

export default AddCustomer;
