import {Category} from "./Category";
import Company from "./Company";

class Coupon {
    public id: number;
    public company: Company;
    public amount: number;
    public category: Category;
    public title: string;
    public description: string;
    public image: string | File | FileList;
    public startDate: Date;
    public endDate: Date;
    public price: number;


    constructor(id: number, company: Company, amount: number, category: Category, title: string, description: string, image: string | File | FileList, startDate: Date, endDate: Date, price: number) {
        this.id = id;
        this.company = company;
        this.amount = amount;
        this.category = category;
        this.title = title;
        this.description = description;
        this.image = image;
        this.startDate = startDate;
        this.endDate = endDate;
        this.price = price;
    }
    
}
export default Coupon;
