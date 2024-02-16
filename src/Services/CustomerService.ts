import axios from "axios";
import Customer from "../Models/Customer";
import appConfig from "../Utils/AppConfig";
import Coupon from "../Models/Coupon";
import {Category} from "../Models/Category";

/**
 * Service class for handling company-related operations.
 */
class CustomerService{
    
    /**
     * Sends a request to the server to get the details of the customer.
     */
    public async getDetails(){
        return (await axios.get<Customer>(appConfig.url + "/customer/details")).data;
    }

    /**
     * Sends a request to the server to get the coupons purchased by the customer.
     */
    public async getCustomerCoupons(){
        return (await axios.get<Coupon[]>(appConfig.url + "/customer/purchasedCoupons")).data;
    }

    /**
     * Sends a request to the server to get all available coupons.
     */
    public async getAllCoupons(){
        return (await axios.get<Coupon[]>(appConfig.url + "/customer/availableCoupons")).data;
    }

    /**
     * Sends a request to the server to get all available coupons by category.
     * @param category the category of the coupons
     */
    public async getByCategory(category:Category){
        return (await axios.get<Coupon[]>(appConfig.url + "/customer/couponsByCategory/" + category)).data;
    }

    /**
     * Sends a request to the server to get all available coupons by max price.
     * @param maximumPrice the max price of the coupons
     */
    public async getByPrice(maximumPrice:number){
        return (await axios.get<Coupon[]>(appConfig.url + "/customer/couponsByPrice/" + maximumPrice)).data;
    }
    
    /**
     * Sends a request to the server to purchase a coupon.
     * @param couponId the id of the coupon to purchase
     */
    public async purchaseCoupon(couponId:number){
        return (await axios.post<Coupon>(appConfig.url + "/customer/purchaseCoupon/" + couponId )).data;
    }
}

/**
 * A singleton instance of the company service.
 */
const customerService = new CustomerService();
export default customerService;