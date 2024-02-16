import "./UpdateCompany.css";
import {useEffect} from "react";
import {useForm} from "react-hook-form";
import Company from "../../../Models/Company";
import {useNavigate, useParams} from "react-router-dom";
import adminService from "../../../Services/AdminService";
import errorHandler from "../../../Utils/ErrorHandler";
import {toast} from "react-toastify";
import { Button, FormControl, FormLabel, TextField } from "@mui/material";

/**
 * Component for updating company details.
 * Allows users to update the name, email, and password of a company.
 */
function UpdateCompany(): JSX.Element {
    const {register, handleSubmit, setError, formState:{errors}, setValue } = useForm<Company>({mode:"onChange"});
    const navigate = useNavigate();
    const id:number = +(useParams().id!);

    /**
     * Fetches the company details and sets the form values on component mount
     */
    useEffect(() => {
        adminService.getCompany(id)
            .then(comp => {
                setValue("name", comp.name);
                setValue("email", comp.email);
                setValue("password", comp.password);
            })
            .catch(err=> {errorHandler.showError(err); navigate("admin/getcompanies/")});
    }, []);

    /**
     * Sends the updated company details to the server.
     * Displays a success message if the update is successful, otherwise shows an error message.
     * @param comp - The updated company object containing the new details.
     */
    function sendForm(comp: Company){
        comp.id = id;
        adminService.updateCompany(comp)
            .then(c=> {toast.success("Company updated!"); navigate("/admin/getcompanies")})
            .catch(err=> errorHandler.showError(err));
    }

    /**
     * Sets an error message if a form field is blurred and its value is empty.
     * @param field - The field key to set the error for.
     */
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
                    disabled={true}
                />
                <TextField 
                        variant="outlined"
                        label="Email"
                        id="email"
                        InputLabelProps={{ shrink: true }}
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
                        InputLabelProps={{ shrink: true }}
                        {...register('password', 
                            { required: true,
                                     minLength: 2,
                                     maxLength: 15 })}
                    onBlur={handleBlur('password')}
                    error={!!errors.password}
                    helperText={errors.password ? "Password must be at least 2 characters long" : ""}
                        
                />
                <Button variant="outlined" onClick={handleSubmit(sendForm)}>Update</Button>
            </FormControl>
            
            
        </div>
    );
}

export default UpdateCompany;
