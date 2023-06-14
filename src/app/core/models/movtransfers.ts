import { NgbDate } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';
import { SelectOption } from './select-option';

export class Movtransfers {
    id: number;
    idPersonal: number;
    idArea: SelectOption;
    department_Id: SelectOption;
    id_Region: SelectOption;
    transfer_Date: any;
  
    public static map(areaspecialties: Movtransfers): Movtransfers {
        const newInstace = new Movtransfers();
        newInstace.id = areaspecialties.id;
        newInstace.idPersonal = areaspecialties.idPersonal;
        newInstace.idArea = areaspecialties.idArea;
        newInstace.id_Region = areaspecialties.id_Region;
        newInstace.department_Id = areaspecialties.department_Id;
        newInstace.transfer_Date = areaspecialties.transfer_Date;
        return newInstace
    }
     //Variable Mapping Method
     public static mapForPost(areaspecialties: Movtransfers) {
        let areaspecialtiesMap: any = {};
        if (areaspecialties.id) {
            Object.assign(areaspecialtiesMap, { id: areaspecialties.id })
        }
        Object.assign(areaspecialtiesMap, { id_datos_personales: areaspecialties.idPersonal });
        Object.assign(areaspecialtiesMap, { id_area: areaspecialties.idArea.value });
        Object.assign(areaspecialtiesMap, { id_region: areaspecialties.id_Region.value });
        Object.assign(areaspecialtiesMap, { id_departamento: areaspecialties.department_Id.value });
        Object.assign(areaspecialtiesMap, { fecha_transferencia: `${areaspecialties.transfer_Date.year}-${areaspecialties.transfer_Date.month}-${areaspecialties.transfer_Date.day}` });
        return areaspecialtiesMap;
    }
    //Object Map Method
    public static mapFromObject(areaspecialtiesObj: any) {
        if (!areaspecialtiesObj)
            return;
        let movtransfers = new Movtransfers ();
        movtransfers.id = areaspecialtiesObj.id;
        movtransfers.idPersonal = areaspecialtiesObj.idDatosPersonales;
        if (areaspecialtiesObj.area)
        movtransfers.idArea =  new SelectOption(areaspecialtiesObj.area.id, areaspecialtiesObj.area.nombre);
        movtransfers.id_Region =  new SelectOption(areaspecialtiesObj.region.id, areaspecialtiesObj.region.nombre);
        movtransfers.department_Id =  new SelectOption(areaspecialtiesObj.departamento.id, areaspecialtiesObj.departamento.nombre);
        movtransfers.transfer_Date = areaspecialtiesObj.Datosfecha_transferencia;
        movtransfers.transfer_Date =areaspecialtiesObj.Datosfecha_transferencia;
        let arr = areaspecialtiesObj.Datosfecha_transferencia.split('-');
        movtransfers.transfer_Date = {year: parseInt(arr[0]), month: parseInt(arr[1]), day: parseInt(arr[2])};
        return movtransfers;
    }       
}