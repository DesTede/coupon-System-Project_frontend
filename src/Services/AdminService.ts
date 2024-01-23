import axios from "axios";
import Company from "../Models/Company";
import appConfig from "../Utils/AppConfig";
import {adminStore} from "../Redux/OurStore";
import {
    addCompany,
    addCustomer,
    fetchCompanies, fetchCustomers,
    removeCompany, removeCustomer,
    updateCompany,
    updateCustomer
} from "../Redux/adminSlice";
import Customer from "../Models/Customer";

class AdminService{

    public async getCompanies(){
        if (adminStore.getState().companies.length === 0){
            const responseData = (await axios.get<Company[]>(appConfig.url + "/admin/getCompanies")).data;
            adminStore.dispatch(fetchCompanies(responseData));
            return responseData;
        }else
            return adminStore.getState().companies;
    }

    public async getCompany(id:number){
        if (adminStore.getState().companies.length !== 0){
            return adminStore.getState().companies.find(c=>c.id === id);
        }else
            return (await axios.get<Company>(appConfig.url + "/admin/getCompany/" + id)).data
    }


    public async getCustomers(){
        if (adminStore.getState().customers.length === 0){
            const responseData = (await axios.get<Customer[]>(appConfig.url + "/admin/getCustomers")).data;
            adminStore.dispatch(fetchCustomers(responseData));
            return responseData;
        }else
            return adminStore.getState().customers;
    }

    public async getCustomer(id:number){
        if (adminStore.getState().customers.length !== 0){
            return adminStore.getState().customers.find(c=>c.id === id);
        }else
            return (await axios.get<Customer>(appConfig.url + "/admin/getCustomer/" + id)).data
    }
    
    public async addCompany(company:Company){
        const responseData = (await axios.post<Company>(appConfig.url +"/admin/addCompany", company)).data;
        adminStore.dispatch(addCompany(responseData));
        return responseData;
    }

    public async addCustomer(customer:Customer){
        const responseData = (await  axios.post<Customer>(appConfig.url + "/admin/addCustomer", customer)).data;
        adminStore.dispatch(addCustomer(responseData));
        return responseData;
    }
    

    public async updateCompany(company:Company){
        const responseData = (await axios.put<Company>(appConfig.url + "/admin/updateCompany", company)).data;
        adminStore.dispatch(updateCompany(company));
        return responseData;
    }

    public async updateCustomer(customer:Customer){
        const responseData = (await axios.put<Company>(appConfig.url + "/admin/updateCustomer/", customer)).data;
        adminStore.dispatch(updateCustomer(customer));
        return responseData;
    }
    
    public async deleteCompany(id:number){
        const responseData = (await axios.delete(appConfig.url + "/admin/deleteCompany/" + id)).data;
        adminStore.dispatch(removeCompany(id));
        return responseData;
    }
    
    public async deleteCustomer(id:number){
        const responseData = (await axios.delete(appConfig.url + "/admin/deleteCustomer/" + id)).data;
        adminStore.dispatch(removeCustomer(id));
        return responseData;
    }
}

const adminService = new AdminService();
export default adminService;