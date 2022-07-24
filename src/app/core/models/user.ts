import { SelectOption } from './select-option';
export class User {

    id: string;
    username: string;
    token?: string;
    role?:string[];
    firstName:string;
    secondName:string;
    lastName:string;
    secondLastName:string
    email:string;
    dependence:SelectOption;
    position:SelectOption;
    phone:any[];
    birthDate:Date;
    documentType:string;
    documentNumber:string;
    status:SelectOption;

    get fullName(){    
        return this.firstName + ' ' + this.lastName;  
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

    /*{
        "id": 1,
        "username": "sirjcbg1@hotmail.com",
        "tipoDocumentoIdentidad": "V",
        "primerNombre": "Juan",
        "segundoNombre": "Carlos",
        "primerApellido": "Blanco",
        "segundoApellido": "Garcia",
        "fechaNacimiento": "16/07/2022",
        "email": "sirjcbg1@hotmail.com",
        "status": {
            "id": 1,
            "Descripcion": "Vigente"
        },
        "createAt": "16/07/2022",
        "updateBy": null,
        "updateAt": "16/07/2022",
        "createBy": null,
        "telefonos": [],
        "Dependencia": null,
        "roles": [
            {
                "rol": "Administrador"
            }
        ]
    }*/
}
