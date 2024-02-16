import Coupon from "../Models/Coupon";
import appConfig from "../Utils/AppConfig";
import axios from "axios";
import {Category} from "../Models/Category";

/**
 * Service class for handling non-user related operations.
 */
class DiscoveryService{

    /**
     * sends a request to the server to get all available coupons.
     */
    public async getAllCoupons(): Promise<Coupon[]> {
        return (await axios.get<Coupon[]>(appConfig.url + "/discovery/coupons")).data;
    }
    
    /**
     * Sends a request to the server to get all categories available.
     */
    public async getCategories(){
        return (await axios.get<Category[]>(appConfig.url + "/discovery/categories")).data;
    }

    /**
     * Sends a request to the server to get a coupon by id.
     * @param id the id of the coupon
     */
    public async getCoupon(id:number){
            return (await axios.get<Coupon>(appConfig.url + "/discovery/coupon/" + id)).data;
    }
    
}

/**
 * A singleton instance of the discovery service.
 */
const discoveryService = new DiscoveryService();
export default discoveryService;