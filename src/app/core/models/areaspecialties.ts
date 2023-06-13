import { NgbDate } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';
import { SelectOption } from './select-option';

export class Areaspecialties {
    id: number;
    idPersonal: number;
    idArea: SelectOption;
 
    public static map(areaSpecialties: Areaspecialties): Areaspecialties {
        const newInstace = new Areaspecialties();
        newInstace.id = areaSpecialties.id;
        newInstace.idPersonal = areaSpecialties.idPersonal;
        newInstace.idArea = areaSpecialties.idArea;
        return newInstace
    }
     //Variable Mapping Method
     public static mapForPost(areaSpecialties: Areaspecialties) {
        let areaspecialtiesMap: any = {};
        if (areaSpecialties.id) {
            Object.assign(areaspecialtiesMap, { id: areaSpecialties.id })
        }
        Object.assign(areaspecialtiesMap, { id_personales: areaSpecialties.idPersonal });
        Object.assign(areaspecialtiesMap, { id_area: areaSpecialties.idArea.value });
        return areaspecialtiesMap;
    }
    //Object Map Method
    public static mapFromObject(areaSpecialtiesObj: any) {
        if (!areaSpecialtiesObj)
            return;
        let academicstudy = new Areaspecialties ();
        academicstudy.id = areaSpecialtiesObj.id;
        if (areaSpecialtiesObj.area)
        academicstudy.idArea =  new SelectOption(areaSpecialtiesObj.area.id, areaSpecialtiesObj.area.nombre);
        academicstudy.idPersonal = areaSpecialtiesObj.idDatosPersonales;
        return academicstudy;
    }
}