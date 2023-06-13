import { SelectOption } from './select-option';
export class Area {
    id: string;
    area: string;
    idDepartment: SelectOption;
    respuestas: SelectOption;
    public static map(area: Area):Area{
        const newInstace = new Area();
        newInstace.id = area.id;
        newInstace.area = area.area
        newInstace.idDepartment = area.idDepartment
        return newInstace
    }
    public static mapForPost(area: Area){
        let professionMap:any = {};
        if (area.id) {
            Object.assign(professionMap, {id: area.id}) 
        }
        Object.assign(professionMap, { descarea: area.area });
        Object.assign(professionMap, { iddepartamentos: area.idDepartment.value });
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
        let professiontask = new Area();
        professiontask.id = professionObj.id;
        professiontask.area = professionObj.descprofesion;
        professiontask.idDepartment = professionObj.iddepartment;
        return professiontask;
    }
}