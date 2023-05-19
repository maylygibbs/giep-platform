import { SelectOption } from './select-option';
import * as moment from 'moment';
import { MenuItem } from './menu.model';
import { Instrument } from './instrument';
import { User } from './user';
export class DocumentGiep {

    id: string;
    title: string; //front
    originalName: string;  //front
    description: string;  //front
    comments:string;
    ext: string;
    fileType: SelectOption;
    size: number;  //front
    sizeStr: string;  //front
    url: string;
    isPublic: boolean;  //front
    uuid: string; //nemotecnico
    state: SelectOption;  //front
    creationDate: Date;
    file:File;
    hashtag: Array<string>;
    users: Array<User>;
    usersView: Array<User>;
    history: Array<any>;
    isBloqued: boolean;
    bloquedBy: User;
 
}
