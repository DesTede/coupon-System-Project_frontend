import Coupon from "../Models/Coupon";
import appConfig from "../Utils/AppConfig";
import axios from "axios";
import {Category} from "../Models/Category";

class PublicService{
    
    public async getAllCoupons(){
        return (await axios.get<Coupon[]>(appConfig.url + "/public/coupons")).data;
    }
    
    public async getCategories(){
        return(await axios.get<Category[]>(appConfig.url +"/public/categories")).data;
    }
    
    public async getCoupon(id:number){
        return (await axios.get<Coupon>(appConfig.url + "/public/coupon/" + id)).data;
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