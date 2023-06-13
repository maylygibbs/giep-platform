import { NgbDate } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';
import { SelectOption } from './select-option';

export class Vacationobservation {
    id: number;
    idPersonal: number;
    observation: string;
 
    public static map(areaSpecialties: Vacationobservation): Vacationobservation {
        const newInstace = new Vacationobservation();
        newInstace.id = areaSpecialties.id;
        newInstace.idPersonal = areaSpecialties.idPersonal;
        newInstace.observation = areaSpecialties.observation;
        return newInstace
    }
     //Variable Mapping Method
     public static mapForPost(areaSpecialties: Vacationobservation) {
        let observationMap: any = {};
        if (areaSpecialties.id) {
            Object.assign(observationMap, { id: areaSpecialties.id })
        }
        Object.assign(observationMap, { id_datos_personales: areaSpecialties.idPersonal });
        Object.assign(observationMap, { observacion: areaSpecialties.observation});
        return observationMap;
    }
    //Object Map Method
    public static mapFromObject(observationObj: any) {
        if (!observationObj)
            return;
        let observation = new Vacationobservation ();
        observation.id = observationObj.id;
        if (observationObj.observacion)
        observation.idPersonal = observationObj.idDatosPersonales;
        observation.observation = observationObj.idDatosObservacion;
        return observation;
    }
}