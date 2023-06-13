import { SelectOption } from './select-option';

export class Reasonrest {
    id: string;
    reasonRest: string;
    respuestas: SelectOption;

    public static map(sleeptype: Reasonrest):Reasonrest{
        const newInstace = new Reasonrest();
        newInstace.id = sleeptype.id;
        newInstace.reasonRest = sleeptype.reasonRest;
        return newInstace
    }
    public static mapForPost(sleeptype: Reasonrest){
        let professionMap:any = {};
        if (sleeptype.id) {
            Object.assign(professionMap, {id: sleeptype.id}) 
        }
        Object.assign(professionMap, { motivo: sleeptype.reasonRest });
        return professionMap;
    }
    public static mapFromObject(professionObj: any) {
        if (!professionObj)
            return;
        return new SelectOption(professionObj.id, professionObj.descreposo);
    }
     public static mapFromObjectv(professionObj: any) {
        if (!professionObj)
            return;
        let professiontask = new Reasonrest();
        professiontask.id = professionObj.id;
        professiontask.reasonRest = professionObj.descreposo;
        return professiontask;
    }
}