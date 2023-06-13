import { SelectOption } from './select-option';
export class Escrow {
    id: string;
    idPersonal: number;
    const_Depos_Prestac_Sociales: SelectOption;
    annual_Interest_Receipt   : SelectOption;
    
    public static map(area: Escrow):Escrow{
        const newInstace = new Escrow();
        newInstace.id = area.id;
        newInstace.annual_Interest_Receipt = area.annual_Interest_Receipt;
        newInstace.const_Depos_Prestac_Sociales = area.const_Depos_Prestac_Sociales;
        return newInstace
    }
    public static mapForPost(area: Escrow){
        let professionMap:any = {};
        if (area.id) {
            Object.assign(professionMap, {id: area.id}) 
        }
        Object.assign(professionMap, { id_datos_personales: area.idPersonal});
        Object.assign(professionMap, { recibo_anual_intereses: area.annual_Interest_Receipt.value});
        Object.assign(professionMap, { const_depos_prestac_sociales: area.const_Depos_Prestac_Sociales.value});
        return professionMap;
    }
    public static mapFromObject(areaspecialtiesObj: any) {
        if (!areaspecialtiesObj)
            return;
        let movtransfers = new Escrow ();
        movtransfers.id = areaspecialtiesObj.id;
         movtransfers.annual_Interest_Receipt =  new SelectOption(areaspecialtiesObj.Datosrecibo_anual_intereses.id, areaspecialtiesObj.Datosrecibo_anual_intereses.nombre);
        movtransfers.const_Depos_Prestac_Sociales =  new SelectOption(areaspecialtiesObj.Datosconst_depos_prestac_sociales.id, areaspecialtiesObj.Datosconst_depos_prestac_sociales.nombre);
        return movtransfers;
    }
}