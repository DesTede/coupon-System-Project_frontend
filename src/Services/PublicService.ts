import Coupon from "../Models/Coupon";
import appConfig from "../Utils/AppConfig";
import axios from "axios";
import {Category} from "../Models/Category";
import {publicStore} from "../Redux/OurStore";
import {fetchCategories, fetchCoupons} from "../Redux/PublicSlice";

class PublicService{
    
    public async getAllCoupons(){
        if (publicStore.getState().couponValue.length === 0) {
            const responseData = (await axios.get<Coupon[]>(appConfig.url + "/public/coupons")).data;
            publicStore.dispatch(fetchCoupons(responseData));
        }else 
            return publicStore.getState().couponValue;
    }
    
    public async getCategories(){
        const responseData = (await axios.get<Category[]>(appConfig.url +"/public/categories")).data;
        publicStore.dispatch(fetchCategories(responseData));
        return responseData;
    }
    
    public async getCoupon(id:number){
        if(publicStore.getState().couponValue.length === 0)
            return (await axios.get<Coupon>(appConfig.url + "/public/coupon/" + id)).data;
        else 
            return publicStore.getState().couponValue.find(e=>e.id === id);
    }
    
    public async getByPrice(price:number){
        return (await axios.get<Coupon[]>(appConfig.url + "/public/coupons/price/" + price)).data;
    }
    
    public async getByCategory(category:string){
        return (await axios.get<Coupon[]>(appConfig.url + "/public/coupons/category/" + category)).data;
    }
    
}

const publicService = new PublicService();
export default publicService;