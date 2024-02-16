import appConfig from "../Utils/AppConfig";
import axios from "axios";
import {ClientType} from "../Models/ClientType";
import {authStore} from "../Redux/OurStore";
import {login, logout} from "../Redux/AuthSlice";

/**
 * Service class for handling authentication-related operations.
 */
class AuthService {

    /**
     * Sends a login request to the server.
     * @param email the email of the user
     * @param password the password of the user
     * @param clientType the client type of the user
     */
    public async login(email: string, password: string, clientType: ClientType) {
        const response = await axios.post<string>(appConfig.url + "/auth/login", null, { params: { "email": email, "password": password, "clientType": ClientType[clientType] } });
        authStore.dispatch(login(response.data));
        
        return response.data;
    }

    /**
     * Sends a logout request to the server.
     */
    public async logout(){
        const response = await axios.post<string>(appConfig.url + "/auth/logout");
        authStore.dispatch(logout());
        return response.data;
    }   
}

/**
 * A singleton instance of the AuthService class. 
 */
const authService = new AuthService();
export default authService;