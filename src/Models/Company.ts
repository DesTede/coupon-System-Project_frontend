import Coupon from "./Coupon";


/**
 * Class representing a company.
 * A company has an ID, name, email, password, and a list of coupons.
 */
class Company{
    public id:number;
    public name:string;
    public email:string;
    public password:string;
    public coupons:Coupon[];


    constructor(id: number, name: string, email: string, password: string, coupons:Coupon[]){
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;
        this.coupons = coupons;
    }
}
export default Company;