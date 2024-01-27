import "./AddCompany.css";
import { Button, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, TextField } from "@mui/material";
import {useForm} from "react-hook-form";
import authService from "../../../Services/AuthenticationService";
import {toast} from "react-toastify";
import {authStore} from "../../../Redux/OurStore";
import errorHandler from "../../../Services/ErrorHandler";
import {useNavigate} from "react-router-dom";
import adminService from "../../../Services/AdminService";
import Company from "../../../Models/Company";


function AddCompany(): JSX.Element {

    const navigate = useNavigate();
    const {register, handleSubmit, formState, } = useForm<Company>();

    function sendForm(comp:Company) {
        // const name = getValues("name");
        // const email = getValues("email");
        // const password = getValues("password");
        // const clienttype = getValues("clienttype");
        adminService.addCompany(comp)
            .then(t => {
                toast.success("Company added! ");navigate("/company/coupons")})
            .catch(err => errorHandler.showError(err))
    }
    
    return (
        <div className="AddCompany">
            <FormControl>
                <FormLabel>New Company</FormLabel>
                <TextField 
                        variant="outlined"
                        label="Name" 
                        id="name"
                        {...register('name', { required: true, minLength: 2, maxLength: 15 })}
                />
                <TextField 
                        variant="outlined"
                        label="Email" 
                        id="email"
                        {...register('email', { required: true, minLength: 2, maxLength: 100 })}
                />
                <TextField  
                        variant="outlined" 
                        type="Password"
                        label="Password" 
                        id="password"
                        {...register('password', { required: true, minLength: 4, maxLength: 15 })}

                />
                <Button variant="outlined" onClick={handleSubmit(sendForm)}>Add</Button>
            </FormControl>
        </div>
    );
}

export default AddCompany;
