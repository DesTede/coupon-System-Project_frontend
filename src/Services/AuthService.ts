import appConfig from "../Utils/AppConfig";
import axios from "axios";
import {ClientType} from "../Models/ClientType";
import {authStore, companyStore} from "../Redux/OurStore";
import {login, logout} from "../Redux/AuthSlice";

class AuthService {

    
    public async login(email: string, password: string, clientType: ClientType) {
        const response = await axios.post<string>(appConfig.url + "/auth/login", null, { params: { "email": email, "password": password, "clientType": ClientType[clientType] } });
        authStore.dispatch(login(response.data));
        
        return response.data;
    }
    
    public async logout(){
        const response = await axios.post<string>(appConfig.url + "/auth/logout");
        authStore.dispatch(logout());
        // companyStore.dispatch(fetchCoupons([]))
        return response.data;
    }   
}

const authService = new AuthService();
export default authService;