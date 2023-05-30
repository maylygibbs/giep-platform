import { NgbDate } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';
import { SelectOption } from './select-option';

export class Others {
    id: number;
    idPersonal: number;
    legal_Files: SelectOption;
    reason: SelectOption;
    labor_Area_Development_Course: SelectOption;
    service_Area_Oriented_Profession: SelectOption;
    id_Category_Others: SelectOption;
 
    public static map(areaspecialties: Others): Others {
        const newInstace = new Others();
        newInstace.id = areaspecialties.id;
        newInstace.idPersonal = areaspecialties.idPersonal;
        newInstace.legal_Files = areaspecialties.legal_Files;
        newInstace.reason = areaspecialties.reason;
        newInstace.labor_Area_Development_Course = areaspecialties.labor_Area_Development_Course;
        newInstace.service_Area_Oriented_Profession = areaspecialties.service_Area_Oriented_Profession;
        newInstace.id_Category_Others = areaspecialties.id_Category_Others;
        return newInstace
    }
     //Variable Mapping Method
     public static mapForPost(areaspecialties: Others) {
        let areaspecialtiesMap: any = {};
        if (areaspecialties.id) {
            Object.assign(areaspecialtiesMap, { id: areaspecialties.id })
        }
        Object.assign(areaspecialtiesMap, { id_datos_personales: areaspecialties.idPersonal });
        Object.assign(areaspecialtiesMap, { expedientes_legal: areaspecialties.legal_Files.value });
        Object.assign(areaspecialtiesMap, { motivo: areaspecialties.reason.value });
        Object.assign(areaspecialtiesMap, { curso_desarrollo_area_laboral: areaspecialties.labor_Area_Development_Course.value });
        Object.assign(areaspecialtiesMap, { profesion_orientada_area_servicio: areaspecialties.service_Area_Oriented_Profession });
        Object.assign(areaspecialtiesMap, { id_categoria_otros: areaspecialties.id_Category_Others.value });
        return areaspecialtiesMap;
    }
    //Object Map Method
    public static mapFromObject(areaspecialtiesObj: any) {
        if (!areaspecialtiesObj)
            return;
        let movtransfers = new Others ();
        movtransfers.id = areaspecialtiesObj.id;
        movtransfers.idPersonal = areaspecialtiesObj.idDatosPersonales;
        movtransfers.legal_Files = new SelectOption(areaspecialtiesObj.Datosexpedientes_legal.id, areaspecialtiesObj.Datosexpedientes_legal.nombre);
        movtransfers.reason =  new SelectOption(areaspecialtiesObj.Datosid_motivoexpedientes.id, areaspecialtiesObj.Datosid_motivoexpedientes.nombre);
        movtransfers.labor_Area_Development_Course =  new SelectOption(areaspecialtiesObj.Datoscurso_desarrollo_area_laboral.id, areaspecialtiesObj.Datoscurso_desarrollo_area_laboral.nombre);
        movtransfers.service_Area_Oriented_Profession =  areaspecialtiesObj.idDatosprofesion_orientada_area_servicio;
        movtransfers.id_Category_Others =  new SelectOption(areaspecialtiesObj.Datosid_categoria_otros.id, areaspecialtiesObj.Datosid_categoria_otros.nombre);
        return movtransfers;
    }        
}