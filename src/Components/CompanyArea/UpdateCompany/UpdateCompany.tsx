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
    const {register, handleSubmit, formState, setValue } = useForm<Company>({mode:'onBlur'});
    const navigate = useNavigate();
    const id:number = +(useParams().id!);

    useEffect(() => {
        adminService.getCompany(id)
            .then(comp => {
                setValue("name", comp.name);
                setValue("email", comp.email);
                setValue("password", comp.password);
            })
            .catch(err=> {errorHandler.showError(err); navigate("/admin/getcompanies")});
    }, []);
    
    function sendForm(comp: Company){
        comp.id = id;
        adminService.updateCompany(comp)
            .then(c=> {toast.success("Company updated!"); navigate("/admin/getcompanies")})
            .catch(err=> errorHandler.showError(err));
    }
    
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
                />
                <TextField 
                        variant="outlined"
                        label="Email"
                        id="email"
                    {...register('email', 
                        { required: true, 
                                 minLength: 2, 
                                 maxLength: 100 })}
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
                />
                    {/*<Button variant="outlined" onClick={sendForm}>Update</Button>*/}
                <Button variant="outlined" onClick={handleSubmit(sendForm)}>Update</Button>
            </FormControl>
            
            
        </div>
    );
}

export default UpdateCompany;
