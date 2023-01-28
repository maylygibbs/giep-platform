import { Rol } from "./rol";
import { SelectOption } from "./select-option";

export class Apps {

    id: string;
    label: string;
    description:string;
    status:SelectOption;
    icon:string;
    parent: Apps;
    children: Array<Apps>;
    roles: Array<string>;
    type:string;
    path:string;
    position:string;
    authoritations: Array<string>;

    public static mapForPost(app: Apps) {
        let appMap: any = {};

        if (app.id) {
            Object.assign(appMap, { id: app.id });
            Object.assign(appMap, { idStatus: parseInt(app.status.value)})
        }
        Object.assign(appMap, { nombre: app.label });
        Object.assign(appMap, { descripcion: app.description });
        Object.assign(appMap, { icono: app.icon });
        Object.assign(appMap, { tipoComponente: app.type });
        Object.assign(appMap, { path: app.path });
        Object.assign(appMap, { orden: parseInt(app.position) });
        Object.assign(appMap, { padre: app.type =='Menu' ? 3 : null });//
        Object.assign(appMap, { roles: this.getRolesApp(app.roles) });
        Object.assign(appMap, { autorizacion: this.getAuthorizationsApp(app.authoritations)});


        return appMap;
    }


    private static getRolesApp(rolesApp: any[]) {
        let roles:any[];
        roles = rolesApp.map((item: string) => {
            return { rol: item };
        });
        return roles;
    }

    private static getAuthorizationsApp(authorizationsApp: any[]) {
        let auths:any[];
        auths = authorizationsApp.map((item: string) => {
            return { permiso: item };
        });
        return auths;
    }

 
}
