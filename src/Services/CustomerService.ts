import axios from "axios";
import Customer from "../Models/Customer";
import appConfig from "../Utils/AppConfig";
import Coupon from "../Models/Coupon";
import {Category} from "../Models/Category";

class CustomerService{
    
    public async getDetails(){
        const responseData = (await axios.get<Customer>(appConfig.url + "/customer/details")).data;
        return responseData;
    }

    public async getCoupons(){
        const responseData = (await axios.get<Coupon[]>(appConfig.url + "/customer/coupons")).data;
        return responseData;
    }

    public async getByCategory(category:Category){
        const responseData = (await axios.get<Coupon[]>(appConfig.url + "/customer/coupons/category/" + category)).data;
        return responseData;
    }

    public async getByPrice(price:number){
        const responseData = (await axios.get<Coupon[]>(appConfig.url + "/customer/coupons/price/" + price)).data;
        return responseData;
    }
    
    public async purchaseCoupon(coupon:Coupon){
        const responseData = (await axios.post<Coupon>(appConfig.url + "/customer/purchase")).data;
        return responseData;
    }
}

const customerService = new CustomerService();
export default customerService;