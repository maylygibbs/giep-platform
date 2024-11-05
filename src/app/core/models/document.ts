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
    //datos control de archivo
    status: SelectOption;
    almacen: SelectOption;
    almacenType: SelectOption;
    location1: SelectOption;
    location2: SelectOption;
    location3: SelectOption;
    nivelUnidad: SelectOption;
    estructuraOrganizativa: SelectOption;
    region: SelectOption;
    pais:SelectOption;
    estado: SelectOption;
    ciudad: SelectOption;
    gerencia: SelectOption;
    asunto: string;
    fechaFinConservacion:any;
    tieneArchivoFisico:SelectOption;
    justificacion:string;
    numExpediente:string;
    fechaDocumento:any;
    cantidadCaja: number;
    cantidadEstuche: number;
    usuarioEntrega: number;
    contenidoCaja: SelectOption;
    folios:string;
    numCaja:number;
    numEstuche:string;
    fechaExtremaInicio:any;
    fechaExtramaFin:any;
    serie: SelectOption;
    subSerie: SelectOption;
 
}
