import "./UpdateCustomer.css";
import {useForm} from "react-hook-form";
import Company from "../../../Models/Company";
import {useNavigate, useParams} from "react-router-dom";
import {useEffect} from "react";
import adminService from "../../../Services/AdminService";
import errorHandler from "../../../Services/ErrorHandler";
import {toast} from "react-toastify";
import {Button, FormControl, FormLabel, TextField} from "@mui/material";
import Customer from "../../../Models/Customer";

function UpdateCustomer(): JSX.Element {
    const {register, handleSubmit, formState, setValue } = useForm<Customer>({mode:'onBlur'});
    const navigate = useNavigate();
    const id:number = +(useParams().id!);

    useEffect(() => {
        adminService.getCustomer(id)
            .then(cus => {
                setValue("firstName", cus.firstName);
                setValue("lastName", cus.lastName);
                setValue("email", cus.email);
                setValue("password", cus.password);
                
            })
            .catch(err=> {errorHandler.showError(err); navigate("/admin/getcustomers")});
    }, []);

    function sendForm(cus: Customer){
        cus.id = id;
        adminService.updateCustomer(cus)
            .then(c=> {toast.success("Customer updated!"); navigate("/admin/getcustomers")})
            .catch(err=> errorHandler.showError(err));
    }

    return (
        <div className="UpdateCustomer">
            <FormControl>
                <FormLabel>Update Company</FormLabel>
                <TextField
                    variant="outlined"
                    label="First Name"
                    id="firstName"
                    {...register('firstName',
                        { required: true,
                            minLength: 2,
                            maxLength: 15 })}
                />
                <TextField
                    variant="outlined"
                    label="Last Name"
                    id="lastName"
                    {...register('lastName',
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
                            maxLength: 15 })}
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

export default UpdateCustomer;
