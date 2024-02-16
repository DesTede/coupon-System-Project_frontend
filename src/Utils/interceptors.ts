import axios from "axios";
import {authStore} from "../Redux/OurStore";

/**
 * Class for configuring client-side interceptors for Axios requests.
 * Interceptors can be used to modify requests or responses before they are handled by Axios.
 */
class ClientInterceptors{

    /**
     * Configures an interceptor to add the authorization token to outgoing requests.
     * The token is retrieved from the Redux store.
     */
    public tokenInterceptors() {
        axios.interceptors.request.use(request => {
            if (authStore.getState().token.length > 0)
                request.headers['Authorization'] = "Bearer " + authStore.getState().token;
            return request;

        });
    }
        
}

/**
 * Singleton instance of the ClientInterceptors class to Instantiate clientinterceptors.
 */
const clientInterceptors = new ClientInterceptors();
export default clientInterceptors;