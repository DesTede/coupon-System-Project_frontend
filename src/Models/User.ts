
/**
 * Class representing a user.
 * A user has an ID, name, first name, last name, email, and client type.
 */
export class User{
    public id:number;
    public name:string;
    public firstName:string;
    public lastName:string;
    public email:string;
    public clientType:string;
    

    constructor(id:number, name:string, firstName:string,lastname:string, email:string, clientType:string){
        this.id = id;
        this.name = name;
        this.firstName = firstName;
        this.lastName = lastname;
        this.email = email;
        this.clientType = clientType;
    }
}
export default User;