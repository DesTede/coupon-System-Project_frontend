import axios from "axios";
import Coupon from "../Models/Coupon";
import appConfig from "../Utils/AppConfig";
import Company from "../Models/Company";

class CompanyService{
    
    public async getDetails(){
        return (await axios.get<Company>(appConfig.url + "/company/details")).data;
    }

    
    public async getCompanyCoupons(): Promise<Coupon[]> {
        return (await axios.get<Coupon[]>(appConfig.url + "/company/coupons")).data;
    }
    
    public async getCoupon(id:number) {
        return (await axios.get<Coupon>(appConfig.url + "/company/coupon/" + id)).data;
    }
        
    
    public async getCouponByCategory(category:string) {
        return (await axios.get<Coupon[]>(appConfig.url + "/company/couponsByCategory/" + category)).data;
    }

    
    public async getCouponByPrice(price:number) {
        return (await axios.get<Coupon[]>(appConfig.url + "/company/couponsByPrice/" + price)).data;
    }
        
    
    public async addCoupon(coupon:Coupon){
        // companyStore.dispatch(add(responseData));
        return (await axios.post<Coupon>(appConfig.url + "/company/addCoupon", coupon)).data;
    }
    
    public async updateCoupon(coupon:Coupon){
        // companyStore.dispatch(update(coupon));
        return (await axios.put<Coupon>(appConfig.url + "/company/updateCoupon", coupon)).data;
    }
    
    public async deleteCoupon(id:number){
        // companyStore.dispatch(remove(id));
        return (await axios.delete(appConfig.url + "/company/deleteCoupon/" + id)).data;
        
    }
    
}
const companyService = new CompanyService();
export default companyService;