import "./UpdateCompany.css";
import {useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import Company from "../../../Models/Company";
import {useNavigate, useParams} from "react-router-dom";
import adminService from "../../../Services/AdminService";
import errorHandler from "../../../Services/ErrorHandler";
import {toast} from "react-toastify";
import { Button, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, TextField } from "@mui/material";


function UpdateCompany(): JSX.Element {
    const {register, handleSubmit, setError, formState:{errors}, setValue } = useForm<Company>({mode:"onChange"});
    const navigate = useNavigate();
    const id:number = +(useParams().id!);

    useEffect(() => {
        adminService.getCompany(id)
            .then(comp => {
                setValue("name", comp.name);
                setValue("email", comp.email);
                setValue("password", comp.password);
            })
            .catch(err=> {errorHandler.showError(err); navigate("admin/getcompanies/")});
    }, []);
    
    function sendForm(comp: Company){
        comp.id = id;
        adminService.updateCompany(comp)
            .then(c=> {toast.success("Company updated!"); navigate("/admin/getcompanies")})
            .catch(err=> errorHandler.showError(err));
    }
    const handleBlur = (field: keyof Company) => (e: React.FocusEvent<HTMLInputElement>) => {
        if (!e.target.value) {
            setError(field, { type: 'manual' });
        }
    };
    
    return (
        <div className="UpdateCompany">
            <FormControl>
                <FormLabel>Update Company</FormLabel>
                <TextField 
                        variant="outlined"
                        label="Name" 
                        id="name"
                    {...register('name', 
                        { required: true, 
                                 minLength: 2, 
                                 maxLength: 15 })}
                    onBlur={handleBlur('name')}
                    error={!!errors.name}
                    helperText={errors.name ? "Name must be at least 2 characters long" : ""}
                />
                <TextField 
                        variant="outlined"
                        label="Email"
                        id="email"
                    {...register('email', 
                        { required: true, 
                                 minLength: 2, 
                                 maxLength: 100 })}
                    onBlur={handleBlur('email')}
                    error={!!errors.email}
                    helperText={errors.email ? "Email must be at least 2 characters long" : ""}
                />
                <TextField 
                        variant="outlined" 
                        type="password" 
                        label="Password" 
                        id="password"
                        {...register('password', 
                            { required: true,
                                     minLength: 2,
                                     maxLength: 15 })}
                    onBlur={handleBlur('password')}
                    error={!!errors.password}
                    helperText={errors.password ? "Password must be at least 2 characters long" : ""}
                        
                />
                    {/*<Button variant="outlined" onClick={sendForm}>Update</Button>*/}
                <Button variant="outlined" onClick={handleSubmit(sendForm)}>Update</Button>
            </FormControl>
            
            
        </div>
    );
}

export default UpdateCompany;
