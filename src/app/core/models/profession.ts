import { SelectOption } from './select-option';

export class Profession {
    id: string;
    professio: string;
    respuestas: SelectOption;

    public static map(profession: Profession):Profession{
        const newInstace = new Profession();
        newInstace.id = profession.id;
        newInstace.professio = profession.professio
        return newInstace
    }
    public static mapForPost(profession: Profession){
        let professionMap:any = {};
        if (profession.id) {
            Object.assign(professionMap, {id: profession.id}) 
        }
        Object.assign(professionMap, { descprofesion: profession.professio });
        return professionMap;
    }
    public static mapFromObject(professionObj: any) {
        if (!professionObj)
            return;
        return new SelectOption(professionObj.id, professionObj.descprofesion);
    }
    public static mapFromObjectv(professionObj: any) {
        if (!professionObj)
            return;
        let professiontask = new Profession();
        professiontask.id = professionObj.id;
        professiontask.professio = professionObj.descprofesion;
        return professiontask;
    }
}