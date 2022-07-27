import { SelectOption } from './select-option';
export class User {

    id: string;
    username: string;
    token?: string;
    roles?:any[];
    firstName:string;
    secondName:string;
    lastName:string;
    secondLastName:string
    email:string;
    dependence:SelectOption;
    position:SelectOption;
    phones:any[];
    birthDate:Date;
    documentType:string;
    documentNumber:string;
    status:SelectOption;
    avatar:string;

    get fullName(){    
        return (this.firstName ? this.firstName : '')  + ' ' + (this.lastName ? this.lastName:'');  
    }

    public static map(user: User):User{
        const newInstace = new User();
        newInstace.id = user.id;
        newInstace.username = user.username
        newInstace.firstName = user.firstName;
        newInstace.secondName = user.secondName;
        newInstace.lastName = user.lastName;
        newInstace.secondLastName = user.secondLastName;
        newInstace.email = user.email;
        newInstace.token = user.token;
        newInstace.token = user.token;
        return newInstace
    }

    public static mapForPost(user: User){
        let userMap:any;
        if (!user.id) {
           Object.assign(userMap, {username: user.email}) 
        }
        Object.assign(userMap, {idStatus: parseInt(user.status.value)});
        Object.assign(userMap, {numeroDocumento: user.documentNumber});
        Object.assign(userMap, {tipoDocumentoIdentidad: user.documentType});
        Object.assign(userMap, {primerNombre: user.firstName});
        Object.assign(userMap, {segundoNombre: user.secondName});
        Object.assign(userMap, {primerApellido: user.lastName});
        Object.assign(userMap, {segundoApellido: user.secondLastName});
        Object.assign(userMap, {fechaNacimiento: user.birthDate});
        Object.assign(userMap, {email: user.email});
        Object.assign(userMap, {idDependencia: parseInt(user.dependence.value)});
        Object.assign(userMap, {idCargo: parseInt(user.position.value)});
        Object.assign(userMap, {telefono: user.phones});
        Object.assign(userMap, {roles: user.roles});
        return userMap;
    }


}
