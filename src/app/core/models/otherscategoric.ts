import { SelectOption } from './select-option';

export class Otherscategoric {
    id: string;
    others: string;
    respuestas: SelectOption;

    public static map(area: Otherscategoric):Otherscategoric{
        const newInstace = new Otherscategoric();
        newInstace.id = area.id;
        newInstace.others = area.others
        return newInstace
    }
    public static mapForPost(area: Otherscategoric){
        let professionMap:any = {};
        if (area.id) {
            Object.assign(professionMap, {id: area.id}) 
        }
        Object.assign(professionMap, { Nombre: area.others });
        return professionMap;
    }
    public static mapFromObject(professionObj: any) {
        if (!professionObj)
            return;
        return new SelectOption(professionObj.id, professionObj.desccategoriaotros);
    }
}