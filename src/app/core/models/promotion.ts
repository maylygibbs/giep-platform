import { NgbDate } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';
import { SelectOption } from './select-option';

export class Promotion {
    id: number;
    idPersonal: number;
    idCargo: SelectOption;
    promotion_Date: any;
  
  public static map(promotion: Promotion): Promotion {
        const newInstace = new Promotion();
        newInstace.id = promotion.id;
        newInstace.idPersonal = promotion.idPersonal;
        newInstace.idCargo = promotion.idCargo;
        newInstace.promotion_Date = promotion.promotion_Date;

        return newInstace
    }
     //Variable Mapping Method
     public static mapForPost(promotion: Promotion) {
        let areaspecialtiesMap: any = {};
        if (promotion.id) {
            Object.assign(areaspecialtiesMap, { id: promotion.id })
        }
        Object.assign(areaspecialtiesMap, { id_datos_personales: promotion.idPersonal });
        Object.assign(areaspecialtiesMap, { id_cargo: promotion.idCargo.value });
        Object.assign(areaspecialtiesMap, { fecha_promocion: `${promotion.promotion_Date.year}-${promotion.promotion_Date.month}-${promotion.promotion_Date.day}` });
        return areaspecialtiesMap;
    }
    //Object Map Method
    public static mapFromObject(areaspecialtiesObj: any) {
        if (!areaspecialtiesObj)
            return;
        let movtransfers = new Promotion ();
        movtransfers.id = areaspecialtiesObj.id;
        movtransfers.idPersonal = areaspecialtiesObj.idDatosPersonales;
        movtransfers.idCargo =  new SelectOption(areaspecialtiesObj.cargo.id, areaspecialtiesObj.cargo.nombre);
        const d = new Date(areaspecialtiesObj.idDatosFechaPromocion);
        movtransfers.promotion_Date = {year: d.getFullYear(), month: d.getMonth() + 1, day: d.getDate() + 1};
        return movtransfers;
    }
    //Object Map Method
    public static mapFromObjectCargo(areaspecialtiesObj: any) {
        if (!areaspecialtiesObj)
            return;
        let movtransfers = new Promotion ();
        movtransfers.idCargo =  new SelectOption(areaspecialtiesObj.id, areaspecialtiesObj.descripcion);
        return movtransfers;
    }
}