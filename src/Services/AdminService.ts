import axios from "axios";
import Company from "../Models/Company";
import appConfig from "../Utils/AppConfig";
import {adminStore} from "../Redux/OurStore";
import {fetchCompanies, fetchCustomers, addCompany, addCustomer, updateCompany,
    updateCustomer, removeCompany, removeCustomer
} from "../Redux/adminSlice";
import Customer from "../Models/Customer";

/**
 * Service class for handling admin-related operations.
 */
class AdminService{

    /**
     * retrieves all companies from the server.
     * if the companies are already in the store, it will return them from the store. 
     */
    public async getCompanies(){
        
        if (adminStore.getState().companies.length === 0){
            const responseData = (await axios.get<Company[]>(appConfig.url + "/admin/getcompanies")).data;
            adminStore.dispatch(fetchCompanies(responseData));
            return responseData;
        }else
            return adminStore.getState().companies;
    }

    /**
     * retrieves a specific company from the server.
     * if the company is already in the store, it will return it from the store. 
     */
    public async getCompany(id:number){
        if (adminStore.getState().companies.length !== 0){
            return adminStore.getState().companies.find(c=>c.id === id);
        }else
            return (await axios.get<Company>(appConfig.url + "/admin/getcompany/" + id)).data
    }

    /**
     * retrieves all customers from the server.
     * if the customers are already in the store, it will return them from the store.
     */
    public async getCustomers(){
        
        if (adminStore.getState().customers.length === 0){
            const responseData = (await axios.get<Customer[]>(appConfig.url + "/admin/getcustomers")).data;
            adminStore.dispatch(fetchCustomers(responseData));
            return responseData;
        }else
            return adminStore.getState().customers
    }
    
    /**
     * retrieves a specific customer from the server.
     * if the customer is already in the store, it will return it from the store. 
     */
    public async getCustomer(id:number){
        if (adminStore.getState().customers.length !== 0){
            return adminStore.getState().customers.find(c=>c.id === id);
        }else
            return (await axios.get<Customer>(appConfig.url + "/admin/getcustomer/" + id)).data
    }

    /**
     * adds a new company to the server and the store.
     * @param company the company to add.
     */
    public async addCompany(company:Company){
        const responseData = (await axios.post<Company>(appConfig.url +"/admin/addcompany", company)).data;
        adminStore.dispatch(addCompany(responseData));
        return responseData;
    }


    /**
     * adds a new customer to the server and the store.
     * @param customer the customer to add.
     */
    public async addCustomer(customer:Customer){
        const responseData = (await  axios.post<Customer>(appConfig.url + "/admin/addcustomer", customer)).data;
        adminStore.dispatch(addCustomer(responseData));
        return responseData;
    }
    

    /**
     * updates a company in the server and the store.
     * @param company the company to update.
     */
    public async updateCompany(company:Company){
        const responseData = (await axios.put<Company>(appConfig.url + "/admin/updatecompany", company)).data;
        adminStore.dispatch(updateCompany(company));
        return responseData;
    }

    /**
     * updates a customer in the server and the store.
     * @param customer the customer to update.
     */
    public async updateCustomer(customer:Customer){
        const responseData = (await axios.put<Company>(appConfig.url + "/admin/updatecustomer", customer)).data;
        adminStore.dispatch(updateCustomer(customer));
        return responseData;
    }
    
    /**
     * deletes a company from the server and the store.
     * @param id the id of the company to delete.
     */
    public async deleteCompany(id:number){
        const responseData = (await axios.delete(appConfig.url + "/admin/deletecompany/" + id)).data;
        adminStore.dispatch(removeCompany(id));
        return responseData;
    }
    
    /**
     * deletes a customer from the server and the store.
     * @param id the id of the customer to delete.
     */
    public async deleteCustomer(id:number){
        const responseData = (await axios.delete(appConfig.url + "/admin/deletecustomer/" + id)).data;
        adminStore.dispatch(removeCustomer(id));
        return responseData;
    }
}

/**
 * A singleton instance of the AdminService class, which will be used for all admin-related operations.
 */
const adminService = new AdminService();
export default adminService;