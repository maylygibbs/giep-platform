import { NgbDate } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';
import { SelectOption } from './select-option';

export class Permission {
    id: number;
    idPersonal: number;
    authorization_Permissions: SelectOption;
    date_From: any;
    date_Until: any;
    date_Fromv: any;
    date_Untilv: any;
    permission_Reason_Id: SelectOption;
    timeCalculation: number;
 
    public static map(areaspecialties: Permission): Permission {
        const newInstace = new Permission();
        newInstace.id = areaspecialties.id;
        newInstace.idPersonal = areaspecialties.idPersonal;
        newInstace.authorization_Permissions = areaspecialties.authorization_Permissions;
        newInstace.date_From = areaspecialties.date_From;
        newInstace.date_Until = areaspecialties.date_Until;
        newInstace.permission_Reason_Id = areaspecialties.permission_Reason_Id;
        return newInstace
    }
     //Variable Mapping Method
     public static mapForPost(areaspecialties: Permission) {
        let areaspecialtiesMap: any = {};
        if (areaspecialties.id) {
            Object.assign(areaspecialtiesMap, { id: areaspecialties.id })
        }
        Object.assign(areaspecialtiesMap, { id_datos_personales: areaspecialties.idPersonal });
        Object.assign(areaspecialtiesMap, { autorizacion_permisos: areaspecialties.authorization_Permissions.value });
        Object.assign(areaspecialtiesMap, { id_motivo_permiso: areaspecialties.permission_Reason_Id.value });
        Object.assign(areaspecialtiesMap, { fecha_desde: `${areaspecialties.date_From.year}-${areaspecialties.date_From.month}-${areaspecialties.date_From.day}` });
        Object.assign(areaspecialtiesMap, { fecha_hasta: `${areaspecialties.date_Until.year}-${areaspecialties.date_Until.month}-${areaspecialties.date_Until.day}` });
        return areaspecialtiesMap;
    }
    //Object Map Method
    public static mapFromObject(areaspecialtiesObj: any) {
        if (!areaspecialtiesObj)
            return;
        let movtransfers = new Permission ();
        movtransfers.id = areaspecialtiesObj.id;
        movtransfers.idPersonal = areaspecialtiesObj.idDatosPersonales;
        movtransfers.authorization_Permissions = new SelectOption(areaspecialtiesObj.autorizacion.id, areaspecialtiesObj.autorizacion.nombre);
        movtransfers.permission_Reason_Id =  new SelectOption(areaspecialtiesObj.motivo.id, areaspecialtiesObj.motivo.nombre);
        movtransfers.date_Fromv = areaspecialtiesObj.idDatosFechaDesde;
        movtransfers.date_Untilv = areaspecialtiesObj.idDatosFechaHasta;
        const dd = new Date(areaspecialtiesObj.idDatosFechaDesde);
        movtransfers.date_From = {year: dd.getFullYear(), month: dd.getMonth() + 1, day: dd.getDate() + 1};
        const dh = new Date(areaspecialtiesObj.idDatosFechaHasta);
        movtransfers.date_Until = {year: dh.getFullYear(), month: dh.getMonth() + 1, day: dh.getDate() + 1};
        return movtransfers;
    }        
}