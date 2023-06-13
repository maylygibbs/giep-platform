import { SelectOption } from './select-option';

export class Vacationtype {
    id: string;
    vacationType: string;
    respuestas: SelectOption;

    public static map(vacationtype: Vacationtype):Vacationtype{
        const newInstace = new Vacationtype();
        newInstace.id = vacationtype.id;
        newInstace.vacationType = vacationtype.vacationType
        return newInstace
    }
    public static mapForPost(area: Vacationtype){
        let professionMap:any = {};
        if (area.id) {
            Object.assign(professionMap, {id: area.id}) 
        }
        Object.assign(professionMap, { vacaciones: area.vacationType });
        return professionMap;
    }
    public static mapFromObject(professionObj: any) {
        if (!professionObj)
            return;
        return new SelectOption(professionObj.id, professionObj.desctipovacaciones);
    }
    public static mapFromObjectv(professionObj: any) {
        if (!professionObj)
            return;
        let professiontask = new Vacationtype();
        professiontask.id = professionObj.id;
        professiontask.vacationType = professionObj.desctipovacaciones;
        return professiontask;
    }
}