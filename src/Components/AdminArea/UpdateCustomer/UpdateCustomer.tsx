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
    const {register, handleSubmit, setError, formState:{errors}, setValue } = useForm<Customer>({mode:"onChange"});
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
            .then(c=> {toast.success("Customer updated!"); navigate("/company/getcustomers")})
            .catch(err=> errorHandler.showError(err));
    }
    const handleBlur = (field: keyof Customer) => (e: React.FocusEvent<HTMLInputElement>) => {
        if (!e.target.value) {
            setError(field, { type: 'manual' });
        }
    };
    

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
                    onBlur={handleBlur('firstName')}
                    error= {!!errors.firstName}
                    helperText={errors.firstName? "First name must be at least 2 characters long" : ""}
                />
                <TextField
                    variant="outlined"
                    label="Last Name"
                    id="lastName"
                    {...register('lastName',
                        { required: true,
                            minLength: 2,
                            maxLength: 15 })}
                    onBlur={handleBlur('lastName')}
                    error= {!!errors.lastName}
                    helperText={errors.lastName? "Last name must be at least 2 characters long" : ""}
                />
                <TextField
                    variant="outlined"
                    label="Email"
                    id="email"
                    {...register('email',
                        { required: true,
                            minLength: 2,
                            maxLength: 15 })}
                    onBlur={handleBlur('email')}
                    error= {!!errors.email}
                    helperText={errors.email? "Email must be at least 2 characters long" : ""}
                />
                <TextField
                    variant="outlined"
                    type="password"
                    label="Password"
                    id="password"
                    {...register('password',
                        { required: true,
                            minLength: 4,
                            maxLength: 15 })}
                    onBlur={handleBlur('password')}
                    error= {!!errors.password}
                    helperText={errors.password? "Password must be at least 4 characters long" : ""}
                />
                {/*<Button variant="outlined" onClick={sendForm}>Update</Button>*/}
                <Button variant="outlined" onClick={handleSubmit(sendForm)}>Update</Button>
            </FormControl>


        </div>
    );
}

export default UpdateCustomer;
