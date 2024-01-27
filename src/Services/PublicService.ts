import Coupon from "../Models/Coupon";
import appConfig from "../Utils/AppConfig";
import axios from "axios";
import {publicStore} from "../Redux/OurStore";

class PublicService{
    
    public async getAllCoupons(){
        return (await axios.get<Coupon[]>(appConfig.url + "/public/coupons")).data;
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