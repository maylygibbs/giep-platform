import { NgbDate } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';
import { SelectOption } from './select-option';

export class Vacation {
    id: number;
    idPersonal: number;
    date_From: any;
    date_Until: any;
    date_Incorporation: any;
    vacation_Type_Id: SelectOption;
    vacation_Authorization: SelectOption;
    cumulative_Periods: number;
    enjoy_Period: string;
    date_Fromv: string;
    date_Untilv: string;
    date_Incorporationv: string;
    timeCalculation: number;
    
    public static map(areaspecialties: Vacation): Vacation {
        const newInstace = new Vacation();
        newInstace.id = areaspecialties.id;
        newInstace.idPersonal = areaspecialties.idPersonal;
        newInstace.vacation_Type_Id = areaspecialties.vacation_Type_Id;
        newInstace.vacation_Authorization = areaspecialties.vacation_Authorization;
        newInstace.date_From = areaspecialties.date_From;
        newInstace.date_Until = areaspecialties.date_Until;
        newInstace.date_Incorporation = areaspecialties.date_Incorporation;
        newInstace.cumulative_Periods = areaspecialties.cumulative_Periods;
        newInstace.enjoy_Period = areaspecialties.enjoy_Period;
        return newInstace
    }
     //Variable Mapping Method
     public static mapForPost(areaspecialties: Vacation) {
        let areaspecialtiesMap: any = {};
        if (areaspecialties.id) {
            Object.assign(areaspecialtiesMap, { id: areaspecialties.id })
        }
        Object.assign(areaspecialtiesMap, { id_datos_personales: areaspecialties.idPersonal });
        Object.assign(areaspecialtiesMap, { id_tipo_vacaciones: areaspecialties.vacation_Type_Id.value });
        Object.assign(areaspecialtiesMap, { autorizacion_vacaciones: areaspecialties.vacation_Authorization.value });
        Object.assign(areaspecialtiesMap, { periodos_acumulados: areaspecialties.cumulative_Periods });
        Object.assign(areaspecialtiesMap, { periodo_difrute: areaspecialties.enjoy_Period });
        Object.assign(areaspecialtiesMap, { fecha_desde: `${areaspecialties.date_From.year}-${areaspecialties.date_From.month}-${areaspecialties.date_From.day}` });
        Object.assign(areaspecialtiesMap, { fecha_hasta: `${areaspecialties.date_Until.year}-${areaspecialties.date_Until.month}-${areaspecialties.date_Until.day}` });
        Object.assign(areaspecialtiesMap, { fecha_incorporacion: `${areaspecialties.date_Incorporation.year}-${areaspecialties.date_Incorporation.month}-${areaspecialties.date_Incorporation.day}` });
        return areaspecialtiesMap;
    }
    //Object Map Method
    public static mapFromObject(areaspecialtiesObj: any) {
        if (!areaspecialtiesObj)
            return;
        let movtransfers = new Vacation ();
        movtransfers.id = areaspecialtiesObj.id;
        movtransfers.idPersonal = areaspecialtiesObj.idDatosPersonales;
        movtransfers.vacation_Type_Id = new SelectOption(areaspecialtiesObj.Datostipovacaciones.id, areaspecialtiesObj.Datostipovacaciones.nombre);
        movtransfers.vacation_Authorization =  new SelectOption(areaspecialtiesObj.Datosautorizacion_vacaciones.id, areaspecialtiesObj.Datosautorizacion_vacaciones.nombre);
        movtransfers.enjoy_Period =areaspecialtiesObj.idDatosperiodo_difrute;
        movtransfers.cumulative_Periods =areaspecialtiesObj.idDatosperiodos_acumulados;
        movtransfers.date_Fromv = areaspecialtiesObj.idDatosFechaDesde;
        movtransfers.date_Untilv = areaspecialtiesObj.idDatosFechaHasta;
        movtransfers.date_Incorporationv = areaspecialtiesObj.idDatosfecha_incorporacion;
        let arrFechaDesde = areaspecialtiesObj.idDatosFechaDesde.split('-');
        movtransfers.date_From = {year: parseInt(arrFechaDesde[0]), month: parseInt(arrFechaDesde[1]), day: parseInt(arrFechaDesde[2])};
        let arrFechaHasta = areaspecialtiesObj.idDatosFechaHasta.split('-');
        movtransfers.date_Until = {year: parseInt(arrFechaHasta[0]), month: parseInt(arrFechaHasta[1]), day: parseInt(arrFechaHasta[2])};
        let dateFromrest = new Date(movtransfers.date_From.year+'/'+movtransfers.date_From.month +'/'+movtransfers.date_From.day);
        let date_Untilrest = new Date(movtransfers.date_Until.year+'/'+movtransfers.date_Until.month +'/'+movtransfers.date_Until.day); 
        let rest = date_Untilrest.getTime() - dateFromrest.getTime()
        movtransfers.timeCalculation= Math.round(rest/ (1000*60*60*24)) + 1 ;
        let arrFechaIncorporacion = areaspecialtiesObj.idDatosfecha_incorporacion.split('-');
        movtransfers.date_Incorporation = {year: parseInt(arrFechaIncorporacion[0]), month: parseInt(arrFechaIncorporacion[1]), day: parseInt(arrFechaIncorporacion[2])};
        return movtransfers;
    }        
}