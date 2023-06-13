import { SelectOption } from './select-option';

export class Permissiontype {
    id: string;
    permission: string;
    respuestas: SelectOption;

    public static map(permision: Permissiontype):Permissiontype{
        const newInstace = new Permissiontype();
        newInstace.id = permision.id;
        newInstace.permission = permision.permission
        return newInstace
    }
    public static mapForPost(permision: Permissiontype){
        let professionMap:any = {};
        if (permision.id) {
            Object.assign(professionMap, {id: permision.id}) 
        }
        Object.assign(professionMap, { permiso: permision.permission });
        return professionMap;
    }
    public static mapFromObject(professionObj: any) {
        if (!professionObj)
            return;
        return new SelectOption(professionObj.id, professionObj.descpermisos);
    }
    public static mapFromObjectv(professionObj: any) {
        if (!professionObj)
            return;
        let professiontask = new Permissiontype();
        professiontask.id = professionObj.id;
        professiontask.permission = professionObj.descpermisos;
        return professiontask;
    }
}