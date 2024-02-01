import axios from "axios";
import Customer from "../Models/Customer";
import appConfig from "../Utils/AppConfig";
import Coupon from "../Models/Coupon";
import {Category} from "../Models/Category";

class CustomerService{
    
    public async getDetails(){
        return (await axios.get<Customer>(appConfig.url + "/customer/details")).data;
    }
    
    public async getCustomerCoupons(){
        return (await axios.get<Coupon[]>(appConfig.url + "/customer/purchasedCoupons")).data;
    }

    public async getAllCoupons(){
        return (await axios.get<Coupon[]>(appConfig.url + "/customer/availableCoupons")).data;
    }

    public async getByCategory(category:Category){
        return (await axios.get<Coupon[]>(appConfig.url + "/customer/couponsByCategory/" + category)).data;
    }

    public async getByPrice(maximumPrice:number){
        return (await axios.get<Coupon[]>(appConfig.url + "/customer/couponsByPrice/" + maximumPrice)).data;
    }
    
    // public async purchaseCoupon(coupon:Coupon){
    //     return (await axios.post<Coupon>(appConfig.url + "/customer/purchaseCoupon", coupon)).data;
    // }

    public async purchaseCoupon(couponId:number){
        return (await axios.post<Coupon>(appConfig.url + "/customer/purchaseCoupon/" + couponId )).data;
    }
}

const customerService = new CustomerService();
export default customerService;