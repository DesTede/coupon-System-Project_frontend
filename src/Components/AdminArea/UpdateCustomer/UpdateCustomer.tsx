import "./UpdateCustomer.css";
import {useForm} from "react-hook-form";
import {useNavigate, useParams} from "react-router-dom";
import {useEffect} from "react";
import adminService from "../../../Services/AdminService";
import errorHandler from "../../../Utils/ErrorHandler";
import {toast} from "react-toastify";
import {Button, FormControl, FormLabel, TextField} from "@mui/material";
import Customer from "../../../Models/Customer";

/**
 * Component for updating customer details.
 * Allows users to update the first name, last name, email, and password of a customer.
 */
function UpdateCustomer(): JSX.Element {
    const {register, handleSubmit, setError, formState:{errors}, setValue } = useForm<Customer>({mode:"onChange"});
    const navigate = useNavigate();
    
    // retrieves the customer id from the URL
    const id:number = +(useParams().id!);

    /**
     * Fetches the customer details and sets the form values on component mount
     */
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

    /**
     * Sends the updated customer details to the server.
     * Displays a success message if the update is successful, otherwise shows an error message.
     * @param cus - The updated customer object containing the new details.
     */
    function sendForm(cus: Customer){
        cus.id = id;
        adminService.updateCustomer(cus)
            .then(c=> {toast.success("Customer updated!"); navigate("/company/getcustomers")})
            .catch(err=> errorHandler.showError(err));
    }

    /**
     * Sets an error message if a form field is blurred and its value is empty.
     * @param field - The field key to set the error for.
     */
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
                    InputLabelProps={{ shrink: true }}
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
                    InputLabelProps={{ shrink: true }}
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
                    InputLabelProps={{ shrink: true }}
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
                    InputLabelProps={{ shrink: true }}
                    {...register('password',
                        { required: true,
                            minLength: 4,
                            maxLength: 15 })}
                    onBlur={handleBlur('password')}
                    error= {!!errors.password}
                    helperText={errors.password? "Password must be at least 4 characters long" : ""}
                />
                <Button variant="outlined" onClick={handleSubmit(sendForm)}>Update</Button>
            </FormControl>


        </div>
    );
}

export default UpdateCustomer;
