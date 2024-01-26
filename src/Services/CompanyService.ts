import axios from "axios";
import Coupon from "../Models/Coupon";
import appConfig from "../Utils/AppConfig";
import Company from "../Models/Company";
import {Category} from "../Models/Category";
import {companyStore} from "../Redux/OurStore";
import { fetchCoupons, fetchCategories, add, update, remove } from "../Redux/CompanySlice";

class CompanyService{
    
    public async getDetails(){
        return (await axios.get<Company>(appConfig.url + "/company/details")).data;
    }
    
    public async getCoupons(){
        if (companyStore.getState().couponValue.length === 0) {
            const responseData = (await axios.get<Coupon[]>(appConfig.url + "/company/coupons")).data;
            companyStore.dispatch(fetchCoupons(responseData))
            return responseData;
        }else 
            return companyStore.getState().couponValue;
    }
    
    public async getCoupon(id:number){
        if (companyStore.getState().couponValue.length === 0) {
            return (await axios.get<Coupon>(appConfig.url + "/company/coupon/" + id)).data;
        }
        return companyStore.getState().couponValue.find(e=>e.id === id);
    }
    
    public async getCouponByCategory(category:string){
        if (companyStore.getState().couponValue.length === 0) {
            return (await axios.get<Coupon[]>(appConfig.url + "/company/couponsByCategory/" + category)).data;
        }
        return companyStore.getState().couponValue.filter(e=>e.category.toString() === category);
    }

    public async getCouponByPrice(price:number){
        if (companyStore.getState().couponValue.length === 0) {
            return (await axios.get<Coupon[]>(appConfig.url + "/company/couponsByPrice/" + price)).data;
        }
        return companyStore.getState().couponValue.filter(e=>e.price <= price);
    }
    
    public async getCategories(){
        if (companyStore.getState().categoryValue.length === 0) {
            const responseData = (await axios.get<Category[]>(appConfig.url + "/company/categories")).data;
            companyStore.dispatch(fetchCategories(responseData))
            return responseData;
        }else
            return companyStore.getState().categoryValue;
    
    }
    
    public async addCoupon(coupon:Coupon){
        const responseData = (await axios.post<Coupon>(appConfig.url+ "/company/addCoupon", coupon)).data;
        companyStore.dispatch(add(responseData));
        return responseData;
    }
    
    public async updateCoupon(coupon:Coupon){
        const responseData = (await axios.put<Coupon>(appConfig.url+ "/company/updateCoupon", coupon)).data;
        companyStore.dispatch(update(coupon));
        return responseData;
    }
    
    public async deleteCoupon(id:number){
        const responseData = (await axios.delete( appConfig.url + "/company/deleteCoupon/" + id)).data;
        companyStore.dispatch(remove(id));
        return responseData;
        
    }
    
}
const companyService = new CompanyService();
export default companyService;