import { SelectOption } from './select-option';

export class Typereasonfile {
    id: string;
    typeReasonFile: string;
    respuestas: SelectOption;

    public static map(profession: Typereasonfile):Typereasonfile{
        const newInstace = new Typereasonfile();
        newInstace.id = profession.id;
        newInstace.typeReasonFile = profession.typeReasonFile
        return newInstace
    }
    public static mapForPost(profession: Typereasonfile){
        let professionMap:any = {};
        if (profession.id) {
            Object.assign(professionMap, {id: profession.id}) 
        }
        Object.assign(professionMap, { motivoexpediente: profession.typeReasonFile });
        return professionMap;
    }
    public static mapFromObject(professionObj: any) {
        if (!professionObj)
            return;
        return new SelectOption(professionObj.id, professionObj.motivoexpediente);
    }
    public static mapFromObjectv(professionObj: any) {
        if (!professionObj)
            return;
        let professiontask = new Typereasonfile();
        professiontask.id = professionObj.id;
        professiontask.typeReasonFile = professionObj.motivoexpediente;
        return professiontask;
    }
}