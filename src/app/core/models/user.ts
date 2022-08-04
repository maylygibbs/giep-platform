import { SelectOption } from './select-option';
import * as moment from 'moment';
import { MenuItem } from './menu.model';
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
    dependenceId:string
    position:SelectOption;
    positionId:string;
    phones:any[];
    birthDate:any;
    documentType:string;
    documentNumber:string;
    status:SelectOption;
    avatar:string;
    createAt:Date;
    updateAt:Date;
    instrumentsPending: Array<any>;
    optionsMenu:Array<MenuItem>;


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
        newInstace.dependence = user.dependence;
        newInstace.position = user.position;
        newInstace.phones = user.phones;
        newInstace.birthDate = user.birthDate;
        newInstace.documentType = user.documentType;
        newInstace.documentNumber = user.documentNumber;
        newInstace.status = user.status;
        newInstace.avatar = user.avatar;
        newInstace.createAt = user.createAt;
        newInstace.updateAt = user.updateAt;
        newInstace.instrumentsPending = user.instrumentsPending;
        newInstace.optionsMenu = user.optionsMenu;

        return newInstace
    }

    public static mapForPost(user: User){
        let userMap:any = {};
        if (!user.id) {
           Object.assign(userMap, {username: user.email}) 
        }
        if (user.id) {
            Object.assign(userMap, {id: user.id}) 
         }
        Object.assign(userMap, {idStatus: parseInt(user.status.value)});
        Object.assign(userMap, {numeroDocumento: user.documentNumber});
        Object.assign(userMap, {tipoDocumentoIdentidad: user.documentType});
        Object.assign(userMap, {primerNombre: user.firstName});
        Object.assign(userMap, {segundoNombre: user.secondName});
        Object.assign(userMap, {primerApellido: user.lastName});
        Object.assign(userMap, {segundoApellido: user.secondLastName});
        Object.assign(userMap, {fechaNacimiento: moment().year(user.birthDate.year).month(user.birthDate.month-1).date(user.birthDate.day).format('YYYY-MM-DD') });
        Object.assign(userMap, {email: user.email});
        Object.assign(userMap, {idDependencia: parseInt(user.dependence.value)});
        Object.assign(userMap, {idCargo: parseInt(user.position.value)});
        Object.assign(userMap, {telefono: this.getPhonesUser(user.phones) });
        Object.assign(userMap, {roles: this.getRolesUser(user.roles)});
        return userMap;
    }


    private static getPhonesUser(userPhones:any[]){
        let phones;
        phones = userPhones.map((item:any)=>{
            return {numero: item.numero};
        });
        return phones;
    }

    private static getRolesUser(userRoles:any[]){
        let roles;
        roles = userRoles.map((item:string)=>{
            return {rol: item};
        });
        return roles;
    }


}
