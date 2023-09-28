import { SelectOption } from './select-option';
import { User } from './user';
export class ItemProject {

    itemId:number;
    name:string;
    assignedName:string;
    assignedId:number;
    itemType:ItemTypeProject;
    order:number;
    hours:number;
    tasks:any;
    avatar:string;
    parentId:any;
    levelBoardId:number;
    levelBoardName:string;
    description:string;
    comment:string;
    comments:any[];
    selectedResource:User;

    public static fromDomain(itemInput: ItemProject){
        const itemOput= {};
        Object.assign(itemOput,{id: +itemInput.itemId});
        Object.assign(itemOput,{id_user_id: itemInput.assignedId ?+itemInput.assignedId : null});
        Object.assign(itemOput,{id_backlog_padre_id: itemInput.parentId ? +itemInput.parentId : null});
        Object.assign(itemOput,{titulo: itemInput.name ? itemInput.name : null});
        Object.assign(itemOput,{descripcion: itemInput.description ? itemInput.description : null});
        Object.assign(itemOput,{peso: itemInput.hours ? itemInput.hours : null});
        Object.assign(itemOput,{idnivelboardpanel_id: itemInput.levelBoardId ? +itemInput.levelBoardId : null});
        Object.assign(itemOput,{id_typeevent_id: +itemInput.itemType.id});
        Object.assign(itemOput,{comentario: itemInput.comment ? itemInput.comment : null});
        return itemOput;
    }

}


export class ItemTypeProject {

    id:number;
    label: string;
    icon_class: string;
    color: string;
    
}

export class Board{

    springId:number;
    springName:string;
    startDate:string
    endDate:string;
    activities: Array<ItemProject>
}

