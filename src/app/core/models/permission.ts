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
        let arrFechaDesde = areaspecialtiesObj.idDatosFechaDesde.split('-');
        movtransfers.date_From = {year: parseInt(arrFechaDesde[0]), month: parseInt(arrFechaDesde[1]), day: parseInt(arrFechaDesde[2])};
        let arrFechaHasta = areaspecialtiesObj.idDatosFechaHasta.split('-');
        movtransfers.date_Until = {year: parseInt(arrFechaHasta[0]), month: parseInt(arrFechaHasta[1]), day: parseInt(arrFechaHasta[2])};
        let dateFromrest = new Date(movtransfers.date_From.year+'/'+movtransfers.date_From.month +'/'+movtransfers.date_From.day);
        let date_Untilrest = new Date(movtransfers.date_Until.year+'/'+movtransfers.date_Until.month +'/'+movtransfers.date_Until.day); 
        let rest = date_Untilrest.getTime() - dateFromrest.getTime()
        movtransfers.timeCalculation= Math.round(rest/ (1000*60*60*24)) + 1 ;
        return movtransfers;
    }        
}