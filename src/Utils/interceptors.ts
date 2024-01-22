import axios from "axios";
import {authStore} from "../Redux/OurStore";

class ClientInterceptors{
    public tokenInterceptors(){
        axios.interceptors.request.use( request => {
            if(authStore.getState().token.length > 0)
                request.headers['Authorization'] = "Bearer " + authStore.getState().token;
            return request;
        } );
    }
}

const clientInterceptors = new ClientInterceptors();
export default clientInterceptors;