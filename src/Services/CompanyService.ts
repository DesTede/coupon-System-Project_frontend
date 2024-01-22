import axios from "axios";
import Coupon from "../Models/Coupon";
import appConfig from "../Utils/AppConfig";
import Company from "../Models/Company";
import {Category} from "../Models/Category";
import {companyStore} from "../Redux/OurStore";
import { fetch, add, update, remove } from "../Redux/CompanySlice";

class CompanyService{
    
    public async getDetails(){
        return (await axios.get<Company>(appConfig.url + "/company/details")).data;
    }
    
    public async getCoupons(){
        if (companyStore.getState().value.length === 0) {
            const responseData = (await axios.get<Coupon[]>(appConfig.url + "/company/coupons")).data;
            companyStore.dispatch(fetch(responseData))
            return responseData;
        }else 
            return companyStore.getState().value;
    }
    
    public async getCoupon(id:number){
        if (companyStore.getState().value.length === 0) {
            return (await axios.get<Coupon>(appConfig.url + "/company/coupons/" + id)).data;
        }
        return companyStore.getState().value.find(e=>e.id === id);
    }
    
    public async getCouponByCategory(category:Category){
        const responseData = (await axios.get<Coupon[]>(appConfig.url + "/company/coupons/" + category)).data;
        return responseData;
    }

    public async getCouponByPrice(price:number){
        const responseData = (await axios.get<Coupon[]>(appConfig.url + "/company/coupons/" + price)).data;
        return responseData;
    }
    
    public async addCoupon(coupon:Coupon){
        const responseData = (await axios.post<Coupon>(appConfig.url+ "/company/coupons", coupon)).data;
        return responseData;
    }
    
    public async updateCoupon(coupon:Coupon){
        const responseData = (await axios.put<Coupon>(appConfig.url+ "/company/coupons", coupon)).data;
    }
    
    public async deleteCoupon(id:number){
        const responseData = (await axios.delete( appConfig.url + "/company/" + id)).data;
        return responseData;
        
    }
    
}
const companyService = new CompanyService();
export default companyService;