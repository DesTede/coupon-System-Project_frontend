import Coupon from "../Models/Coupon";
import appConfig from "../Utils/AppConfig";
import axios from "axios";
import {Category} from "../Models/Category";

class DiscoveryService{
    
    
    public async getAllCoupons(): Promise<Coupon[]> {
        return (await axios.get<Coupon[]>(appConfig.url + "/discovery/coupons")).data;
        // if (discoveryStore.getState().couponValue.length === 0) {
        //     const responseData = (await axios.get<Coupon[]>(appConfig.url + "/discovery/coupons")).data;
        //     discoveryStore.dispatch(fetchCoupons(responseData));
        //     return responseData; 
        // } else 
        //     return discoveryStore.getState().couponValue;
    }
    
    public async getCategories(){
        return (await axios.get<Category[]>(appConfig.url + "/discovery/categories")).data;
    }
    
    public async getCoupon(id:number){
            return (await axios.get<Coupon>(appConfig.url + "/discovery/coupon/" + id)).data;
    }
    
    // public async getByPrice(price:number){
    //     return (await axios.get<Coupon[]>(appConfig.url + "/discovery/coupons/price/" + price)).data;
    // }
    
    // public async getByCategory(category:string){
    //     return (await axios.get<Coupon[]>(appConfig.url + "/discovery/coupons/category/" + category)).data;
    // }
    
}

const discoveryService = new DiscoveryService();
export default discoveryService;