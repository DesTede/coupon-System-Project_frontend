import { Button, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, TextField } from "@mui/material";
import "./Login.css";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import errorHandler from "../../../Services/ErrorHandler";
import {authStore} from "../../../Redux/OurStore";
import {useNavigate} from "react-router-dom";
import authService from "../../../Services/AuthService";

function Login(): JSX.Element {
    const navigate = useNavigate();

    const {register, handleSubmit, formState, getValues} = useForm();

    
    function sendForm(){
        const email = getValues("email");
        const password = getValues("password");
        const clienttype = getValues("clienttype");
        authService.login(email, password, clienttype)
            .then(t=> {toast.success("Welcom Back " + authStore.getState().user.name); navigate("/discovery")})
            .catch(err => errorHandler.showError(err))
        
    }
    // mui form
    return (
        <div className="Login">
			<FormControl>
                <FormLabel>Login Information</FormLabel>
                <TextField variant="outlined" label="Email" id="email" {...register("email")}/>
                <TextField variant="outlined" type="password" label="Password" id="password" {...register("password")}/>
                <RadioGroup defaultValue="1" id="clienttype">
                    <FormControlLabel value="0" control={<Radio  {...register("clienttype")}/>} label="Administrator" />
                    <FormControlLabel value="1" control={<Radio  {...register("clienttype")}/>} label="Company" />
                    <FormControlLabel value="2" control={<Radio  {...register("clienttype")}/>} label="Customer" />
                </RadioGroup>
            <Button variant="outlined" onClick={sendForm}>Login</Button>
            </FormControl>
        </div>
    );
}

export default Login;
