import "./AddCustomer.css";
import {useNavigate} from "react-router-dom";
import {useForm} from "react-hook-form";
import adminService from "../../../Services/AdminService";
import {toast} from "react-toastify";
import errorHandler from "../../../Services/ErrorHandler";
import {Button, FormControl, FormLabel, TextField} from "@mui/material";
import Customer from "../../../Models/Customer";

function AddCustomer(): JSX.Element {

    const navigate = useNavigate();
    const {register, handleSubmit, formState } = useForm<Customer>({mode:'onBlur'});

    function sendForm(cus:Customer) {
        adminService.addCustomer(cus)
            .then(c => {
                toast.success("Customer added! ");navigate("/")})
            .catch(err => errorHandler.showError(err))
    }

    return (
        <div className="AddCompany">
            <FormControl>
                <FormLabel>New Company</FormLabel>
                <TextField variant="outlined" 
                           label="First Name"
                           id="firstName" 
                           // required={true}
                           {...register('firstName', 
                               { required: "First Name is required!", 
                                        minLength: 2, 
                                        maxLength: 15 })}
                />
                <TextField 
                           variant="outlined"
                           label="Last Name" 
                           id="lastName"
                           {...register('lastName', { required: true, minLength: 2, maxLength: 15 })}
                />
                <TextField 
                           variant="outlined"
                           label="Email"
                           id="email"
                           {...register('email', { required: true, minLength: 5, maxLength: 20 })}

                />
                <TextField 
                           variant="outlined" 
                           type="Password"
                           label="Password" 
                           id="password"
                           {...register('password', { required: true, minLength: 2, maxLength: 20 })}

                />
                <Button variant="outlined" onClick={handleSubmit(sendForm)}>Add</Button>
            </FormControl>
        </div>
    );
}

export default AddCustomer;
