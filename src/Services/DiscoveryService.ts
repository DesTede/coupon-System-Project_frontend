import Coupon from "../Models/Coupon";
import appConfig from "../Utils/AppConfig";
import axios from "axios";
import {Category} from "../Models/Category";

class DiscoveryService{
    
    
    public async getAllCoupons(): Promise<Coupon[]> {
        return (await axios.get<Coupon[]>(appConfig.url + "/discovery/coupons")).data;
    }
    
    public async getCategories(){
        return (await axios.get<Category[]>(appConfig.url + "/discovery/categories")).data;
    }
    
    public async getCoupon(id:number){
            return (await axios.get<Coupon>(appConfig.url + "/discovery/coupon/" + id)).data;
    }
    
}

const discoveryService = new DiscoveryService();
export default discoveryService;