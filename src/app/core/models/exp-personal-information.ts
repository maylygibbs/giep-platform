import { NgbDate } from '@ng-bootstrap/ng-bootstrap';
import { SelectOption } from './select-option';

export class ExpPersonalInformation {
    id: number;
    documentNumber: string;
    birthDate: NgbDate;
    familyBusiness: SelectOption;
    entryAuthorization: SelectOption;
    userName: string;
    firstName: string;
    secondName: string;
    lastName: string;
    secondLastName: string;
    sex: string;
    age: number;
    admissionDate: any;
    elapsedtime: number;
    public static map(exppersonalinformation: ExpPersonalInformation): ExpPersonalInformation {
        const newInstace = new ExpPersonalInformation();
        newInstace.id = exppersonalinformation.id;
        newInstace.documentNumber = exppersonalinformation.documentNumber;
        newInstace.birthDate = exppersonalinformation.birthDate;
        newInstace.familyBusiness = exppersonalinformation.familyBusiness;
        newInstace.entryAuthorization = exppersonalinformation.entryAuthorization;
        newInstace.userName = exppersonalinformation.userName;
        newInstace.secondName = exppersonalinformation.secondName;
        newInstace.lastName = exppersonalinformation.lastName;
        newInstace.secondLastName = exppersonalinformation.secondLastName;
        newInstace.sex = exppersonalinformation.sex;
        newInstace.admissionDate = exppersonalinformation.admissionDate;
        return newInstace
    }
     //Variable Mapping Method
     public static mapForPost(exppersonalinformation: ExpPersonalInformation) {
        let exppersonalinformationMap: any = {};
        if (exppersonalinformation.id) {
            Object.assign(exppersonalinformationMap, { id: exppersonalinformation.id })
        }
        Object.assign(exppersonalinformationMap, { cedula: exppersonalinformation.documentNumber });
        Object.assign(exppersonalinformationMap, { fecha_ingreso: `${exppersonalinformation.admissionDate.year}-${exppersonalinformation.admissionDate.month}-${exppersonalinformation.admissionDate.day}` });
        Object.assign(exppersonalinformationMap, { autorizacion_ingreso: `${exppersonalinformation.entryAuthorization.value}` });
        Object.assign(exppersonalinformationMap, { familiar_empresa: `${exppersonalinformation.familyBusiness.value}` });
        return exppersonalinformationMap;
    }
    //Object Map Method
    public static mapFromObject(exppersonalinformationObj: any) {
        if (!exppersonalinformationObj)
            return;
        let exppersonalinformation = new ExpPersonalInformation ();
        exppersonalinformation.id = exppersonalinformationObj.id;
        exppersonalinformation.documentNumber = exppersonalinformationObj.numeroDocumento;
        exppersonalinformation.birthDate = exppersonalinformationObj.birthDate;
        exppersonalinformation.familyBusiness = exppersonalinformationObj.familyBusiness;
        if (exppersonalinformationObj.autorizacion_ingreso.id)
        exppersonalinformation.familyBusiness = new SelectOption(exppersonalinformationObj.autorizacion_ingreso.id, exppersonalinformationObj.autorizacion_ingreso.nombre);
        if (exppersonalinformationObj.familyBusiness.id)
        exppersonalinformation.entryAuthorization = new SelectOption(exppersonalinformationObj.familyBusiness.id, exppersonalinformationObj.familyBusiness.nombre);
        exppersonalinformation.userName = exppersonalinformationObj.userName;
        exppersonalinformation.lastName = exppersonalinformationObj.primerNombre;
        exppersonalinformation.firstName = exppersonalinformationObj.segundoNombre;
        exppersonalinformation.secondName = exppersonalinformationObj.primerApellido;
        exppersonalinformation.secondLastName = exppersonalinformationObj.segundoApellido;
        exppersonalinformation.sex = exppersonalinformationObj.sex;
        if (!exppersonalinformation.admissionDate)
           exppersonalinformation.admissionDate = exppersonalinformationObj.admissionDate;
           const d = new Date(exppersonalinformationObj.admissionDate);
          exppersonalinformation.admissionDate = {year: d.getFullYear(), month: d.getMonth() + 1, day: d.getDate() + 1};
        return exppersonalinformation;
    }
}