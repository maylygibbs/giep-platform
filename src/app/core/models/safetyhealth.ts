import { NgbDate } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';
import { SelectOption } from './select-option';

export class Safetyhealth {
    id: number;
    idPersonal: number;
    metro_Route: SelectOption;
    work_Insurance_Analysis: SelectOption;
    delivery_Protection_Equipment: SelectOption;
    record_Occupational_Exams: SelectOption;
    proof_Safety_Rules: SelectOption;
    copy_Registration_Delegate: SelectOption;
    
    public static map(areaspecialties: Safetyhealth): Safetyhealth {
        const newInstace = new Safetyhealth();
        newInstace.id = areaspecialties.id;
        newInstace.idPersonal = areaspecialties.idPersonal;
        newInstace.copy_Registration_Delegate=areaspecialties.copy_Registration_Delegate;
        newInstace.delivery_Protection_Equipment=areaspecialties.delivery_Protection_Equipment;
        newInstace.metro_Route=areaspecialties.metro_Route;
        newInstace.proof_Safety_Rules=areaspecialties.proof_Safety_Rules;
        newInstace.record_Occupational_Exams=areaspecialties.record_Occupational_Exams;
        newInstace.work_Insurance_Analysis=areaspecialties.work_Insurance_Analysis;
        return newInstace
    }
     //Variable Mapping Method
     public static mapForPost(areaspecialties: Safetyhealth) {
        let areaspecialtiesMap: any = {};
        if (areaspecialties.id) {
            Object.assign(areaspecialtiesMap, { id: areaspecialties.id })
        }
        Object.assign(areaspecialtiesMap, { id_datos_personales: areaspecialties.idPersonal });
        Object.assign(areaspecialtiesMap, { copia_registro_delegado: areaspecialties.copy_Registration_Delegate.value });
        Object.assign(areaspecialtiesMap, { entrega_equipo_proteccion: areaspecialties.delivery_Protection_Equipment.value });
        Object.assign(areaspecialtiesMap, { ruta_metro: areaspecialties.metro_Route.value });
        Object.assign(areaspecialtiesMap, { constancia_normas_seguridad: areaspecialties.proof_Safety_Rules.value });
        Object.assign(areaspecialtiesMap, { constancia_examenes_ocupacionales: areaspecialties.record_Occupational_Exams.value });
        Object.assign(areaspecialtiesMap, { analisis_seguro_trabajo: areaspecialties.work_Insurance_Analysis.value });
        return areaspecialtiesMap;
    }
    //Object Map Method
    public static mapFromObject(areaspecialtiesObj: any) {
        if (!areaspecialtiesObj)
            return;
        let movtransfers = new Safetyhealth ();
        movtransfers.id = areaspecialtiesObj.id;
        movtransfers.idPersonal = areaspecialtiesObj.idDatosPersonales;
        movtransfers.copy_Registration_Delegate = new SelectOption(areaspecialtiesObj.Datoscopia_registro_delegado.id, areaspecialtiesObj.Datoscopia_registro_delegado.nombre);
        movtransfers.delivery_Protection_Equipment =  new SelectOption(areaspecialtiesObj.Datosentrega_equipo_proteccion.id, areaspecialtiesObj.Datosentrega_equipo_proteccion.nombre);
        movtransfers.metro_Route =  new SelectOption(areaspecialtiesObj.Datosruta_metro.id, areaspecialtiesObj.Datosruta_metro.nombre);
        movtransfers.proof_Safety_Rules =  new SelectOption(areaspecialtiesObj.Datosconstancia_normas_seguridad.id, areaspecialtiesObj.Datosconstancia_normas_seguridad.nombre);
        movtransfers.record_Occupational_Exams =  new SelectOption(areaspecialtiesObj.Datosconstancia_examenes_ocupacionales.id, areaspecialtiesObj.Datosconstancia_examenes_ocupacionales.nombre);
        movtransfers.work_Insurance_Analysis =  new SelectOption(areaspecialtiesObj.Datosanalisis_seguro_trabajo.id, areaspecialtiesObj.Datosanalisis_seguro_trabajo.nombre);
        return movtransfers;
    }        
}