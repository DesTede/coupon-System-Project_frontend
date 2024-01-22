export class User{
    public id:number;
    public name:string;
    public firstName:string;
    public lastName:string;
    public email:string;
    public role:string;

    constructor(id:number, name:string, lastname:string, firstName:string, email:string, role:string){
        this.email = email;
        this.lastName = lastname;
        this.firstName = firstName;
        this.name = name;
        this.role = role;
        this.id = id;
    }
}
export default User;