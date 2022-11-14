import { SelectOption } from './select-option';


export class StatusActivityTask {
    id: string;
    name: string;
    assignedStatus?: StatusActivityTask[];

    public static map(statusactivitytask: StatusActivityTask):StatusActivityTask{
        const newInstace = new StatusActivityTask();
        newInstace.id = statusactivitytask.id;
        newInstace.name = statusactivitytask.name
        return newInstace
    }

    public static mapForPost(statusactivitytask: StatusActivityTask){
        let statusactivitytaskMap:any = {};
        if (statusactivitytask.id) {
            Object.assign(statusactivitytaskMap, {id: statusactivitytask.id}) 
        }
        Object.assign(statusactivitytaskMap, { Nombre: statusactivitytask.name });
        Object.assign(statusactivitytaskMap, { Descripcion: statusactivitytask.name});
        return statusactivitytaskMap;
    }

    public static mapFromObject(statusactivitytaskObj: any) {
        if (!statusactivitytaskObj)
            return;
        let statusactivitytask = new StatusActivityTask();
        statusactivitytask.id = statusactivitytaskObj.id;
        statusactivitytask.name = statusactivitytaskObj.nombre;
        return statusactivitytask;
    }

}
