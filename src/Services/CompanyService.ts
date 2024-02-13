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
        // if (companyStore.getState().value.length === 0) {
        //     return (await axios.get<Coupon[]>(appConfig.url + "/company/couponsByCategory/" + category)).data;
        // }
        // return companyStore.getState().value.filter(e=>e.category.toString() === category);
    // }

    
    public async getCouponByPrice(price:number) {
        return (await axios.get<Coupon[]>(appConfig.url + "/company/couponsByPrice/" + price)).data;
    }
        
        // if (companyStore.getState().value.length === 0) {
        //     return (await axios.get<Coupon[]>(appConfig.url + "/company/couponsByPrice/" + price)).data;
        // }
        // return companyStore.getState().value.filter(e=>e.price <= price);
    // }
    
    
    // public async getCategories(){
    //     if (companyStore.getState().categoryValue.length === 0) {
    //         const responseData = (await axios.get<Category[]>(appConfig.url + "/company/categories")).data;
    //         companyStore.dispatch(fetchCategories(responseData))
    //         return responseData;
    //     }else
    //         return companyStore.getState().categoryValue;
    //
    // }
    
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