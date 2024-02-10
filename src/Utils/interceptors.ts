import axios from "axios";
import {authStore} from "../Redux/OurStore";
import {useNavigate} from "react-router-dom";
import {jwtDecode} from "jwt-decode";
import {toast} from "react-toastify";

class ClientInterceptors{
    
    public tokenInterceptors() {
        axios.interceptors.request.use(request => {
            if (authStore.getState().token.length > 0)
                request.headers['Authorization'] = "Bearer " + authStore.getState().token;
            return request;

        });
    }
        
    //     axios.interceptors.request.use(request => {
    //         const token = authStore.getState().token;
    //         if (token) {
    //             if (this.isExpired(token)) {
    //                 console.log("Token is expired");
    //                 window.location.href = "/login";
    //                 toast.error("Token is expired", {
    //                     autoClose: 5000, // Duration in milliseconds
    //                 });
    //                 return Promise.reject("Token is expired");
    //             }
    //             request.headers['Authorization'] = "Bearer " + token;
    //         }
    //         return request;
    //     });
    // }
    //
    //  isExpired(token:string){
    //     const decodedToken = jwtDecode(token);
    //     const currentTime = Date.now() / 1000;
    //    
    //     return decodedToken.exp < currentTime;
    //  }
        
}

const clientInterceptors = new ClientInterceptors();
export default clientInterceptors;