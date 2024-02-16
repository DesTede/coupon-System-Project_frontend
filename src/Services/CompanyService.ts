import axios from "axios";
import Coupon from "../Models/Coupon";
import appConfig from "../Utils/AppConfig";
import Company from "../Models/Company";

/**
 * Service class for handling company-related operations.
 */
class CompanyService{

    /**
     * Sends a request to the server to get the details of the company.
     */
    public async getDetails(){
        return (await axios.get<Company>(appConfig.url + "/company/details")).data;
    }

    /**
     * Sends a request to the server to get the coupons of the company.
     */
    public async getCompanyCoupons(): Promise<Coupon[]> {
        return (await axios.get<Coupon[]>(appConfig.url + "/company/coupons")).data;
    }
    
    /**
     * Sends a request to the server to get the coupon by id.
     * @param id the id of the coupon
     */
    public async getCoupon(id:number) {
        return (await axios.get<Coupon>(appConfig.url + "/company/coupon/" + id)).data;
    }

    /**
     * Sends a request to the server to get the coupons by category.
     * @param category the category of the coupons
     */
    public async getCouponByCategory(category:string) {
        return (await axios.get<Coupon[]>(appConfig.url + "/company/couponsByCategory/" + category)).data;
    }

    /**
     * Sends a request to the server to get the coupons by max price.
     * @param price the max price of the coupons
     */
    public async getCouponByPrice(price:number) {
        return (await axios.get<Coupon[]>(appConfig.url + "/company/couponsByPrice/" + price)).data;
    }

    /**
     * Sends a request to the server to add a new coupon.
     * @param coupon the coupon to add
     */
    public async addCoupon(coupon:Coupon){
        return (await axios.post<Coupon>(appConfig.url + "/company/addCoupon", coupon)).data;
    }
    
    /**
     * Sends a request to the server to update a coupon.
     * @param coupon the coupon to update
     */
    public async updateCoupon(coupon:Coupon){
        return (await axios.put<Coupon>(appConfig.url + "/company/updateCoupon", coupon)).data;
    }
    
    /**
     * Sends a request to the server to delete a coupon.
     * @param id the id of the coupon to delete
     */
    public async deleteCoupon(id:number){
        return (await axios.delete(appConfig.url + "/company/deleteCoupon/" + id)).data;
        
    }
    
}

/**
 * A singleton instance of the CompanyService class.
 */
const companyService = new CompanyService();
export default companyService;