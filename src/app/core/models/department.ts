import { SelectOption } from './select-option';
export class Department {
    id: string;
    department: string;
    respuestas: SelectOption;
    public static map(department: Department):Department{
        const newInstace = new Department();
        newInstace.id = department.id;
        newInstace.department = department.department
        return newInstace
    }
    public static mapForPost(department: Department){
        let professionMap:any = {};
        if (department.id) {
            Object.assign(professionMap, {id: department.id}) 
        }
        Object.assign(professionMap, { descdepartamento: department.department });
        return professionMap;
    }
    public static mapFromObject(departmentObj: any) {
        if (!departmentObj)
            return;
        return new SelectOption(departmentObj.id, departmentObj.departamento);
    }
    public static mapFromObjectv(professionObj: any) {
        if (!professionObj)
            return;
        let professiontask = new Department();
        professiontask.id = professionObj.id;
        professiontask.department = professionObj.departamento;
        return professiontask;
    }
}