import Coupon from "../Models/Coupon";
import appConfig from "../Utils/AppConfig";
import axios from "axios";
import {Category} from "../Models/Category";
import {discoveryStore} from "../Redux/OurStore";
import {fetchCategories, fetchCoupons} from "../Redux/DiscoverySlice";
import errorHandler from "./ErrorHandler";

class DiscoveryService{
    
    // public async getAllCoupons(){
    //     if (discoveryStore.getState().couponValue.length === 0) {
    //         const response = await axios.get<Coupon[]>(appConfig.url + "/discovery/coupons");
    //         const responseData = response.data;
    //         discoveryStore.dispatch(fetchCoupons(responseData));
    //     }else 
    //         return discoveryStore.getState().couponValue;
    // }
    public async getAllCoupons(): Promise<Coupon[]> {
        // Check if coupons are already fetched in the store
        if (discoveryStore.getState().couponValue.length === 0) {
            const responseData = (await axios.get<Coupon[]>(appConfig.url + "/discovery/coupons")).data;
            discoveryStore.dispatch(fetchCoupons(responseData));
            return responseData; 
        } else 
            return discoveryStore.getState().couponValue;
        
    }
    
    public async getCategories(){
        const responseData = (await axios.get<Category[]>(appConfig.url +"/discovery/categories")).data;
        discoveryStore.dispatch(fetchCategories(responseData));
        return responseData;
    }
    
    public async getCoupon(id:number){
        if(discoveryStore.getState().couponValue.length === 0)
            return (await axios.get<Coupon>(appConfig.url + "/discovery/coupon/" + id)).data;
        else 
            return discoveryStore.getState().couponValue.find(e=>e.id === id);
    }
    
    public async getByPrice(price:number){
        return (await axios.get<Coupon[]>(appConfig.url + "/discovery/coupons/price/" + price)).data;
    }
    
    public async getByCategory(category:string){
        return (await axios.get<Coupon[]>(appConfig.url + "/discovery/coupons/category/" + category)).data;
    }
    
}

const discoveryService = new DiscoveryService();
export default discoveryService;