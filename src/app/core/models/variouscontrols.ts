import { SelectOption } from './select-option';

export class Variouscontrols {
    id: string;
    idPersonal: number;
    internal_Rules: SelectOption;
    enrolled_Ivss: SelectOption;
    shape_Ari: SelectOption;

    public static map(area: Variouscontrols):Variouscontrols{
        const newInstace = new Variouscontrols();
        newInstace.id = area.id;
        newInstace.enrolled_Ivss = area.enrolled_Ivss
        newInstace.shape_Ari = area.shape_Ari
        newInstace.internal_Rules = area.internal_Rules
        return newInstace
    }
    public static mapForPost(area: Variouscontrols){
        let professionMap:any = {};
        if (area.id) {
            Object.assign(professionMap, {id: area.id}) 
        }
        Object.assign(professionMap, { id_datos_personales: area.idPersonal});
        Object.assign(professionMap, { forma_ari: area.shape_Ari.value});
        Object.assign(professionMap, { inscrito_ivss: area.enrolled_Ivss.value});
        Object.assign(professionMap, { normas_internas: area.internal_Rules.value});
        return professionMap;
    }
    public static mapFromObject(areaspecialtiesObj: any) {
        if (!areaspecialtiesObj)
            return;
        let movtransfers = new Variouscontrols ();
        movtransfers.id = areaspecialtiesObj.id;
        movtransfers.internal_Rules =  new SelectOption(areaspecialtiesObj.Datosnormas_internas.id, areaspecialtiesObj.Datosnormas_internas.nombre);
        movtransfers.shape_Ari =  new SelectOption(areaspecialtiesObj.Datosforma_ari.id, areaspecialtiesObj.Datosforma_ari.nombre);
        movtransfers.enrolled_Ivss =  new SelectOption(areaspecialtiesObj.Datosinscrito_ivss.id, areaspecialtiesObj.Datosinscrito_ivss.nombre);
        return movtransfers;
    }
}