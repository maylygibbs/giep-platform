import { SelectOption } from './select-option';

export class Sleeptype {
    id: string;
    sleepType: string;
    respuestas: SelectOption;

    public static map(sleeptype: Sleeptype):Sleeptype{
        const newInstace = new Sleeptype();
        newInstace.id = sleeptype.id;
        newInstace.sleepType = sleeptype.sleepType;
        return newInstace
    }
    public static mapForPost(sleeptype: Sleeptype){
        let professionMap:any = {};
        if (sleeptype.id) {
            Object.assign(professionMap, {id: sleeptype.id}) 
        }
        Object.assign(professionMap, { tiporeposo: sleeptype.sleepType });
        return professionMap;
    }
    public static mapFromObject(professionObj: any) {
        if (!professionObj)
            return;
        return new SelectOption(professionObj.id, professionObj.desctiporeposo);
    }
    public static mapFromObjectv(professionObj: any) {
        if (!professionObj)
            return;
        let professiontask = new Sleeptype();
        professiontask.id = professionObj.id;
        professiontask.sleepType = professionObj.desctiporeposo;
        return professiontask;
    }
}