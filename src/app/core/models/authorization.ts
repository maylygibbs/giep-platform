import { Apps } from "./apps";
import { Rol } from "./rol";
import { SelectOption } from "./select-option";
export class Authorization {
    id: string;
    app: Apps;
    role:string;
    auths: Array<string>;
    status: SelectOption;

    public static mapForPost(auth: Authorization) {
        let authMap: any = {};
        if (auth.id) {
            Object.assign(authMap, { id: auth.id });
        }
        Object.assign(authMap, { modulo: auth.app.id });
        Object.assign(authMap, { rol: auth.role});
        Object.assign(authMap, { autorizaciones: this.getAuthorizationsApp(auth.auths)});
        Object.assign(authMap, { statusId: parseInt(auth.status.value)})
        return authMap;
    }
    private static getAuthorizationsApp(authorizationsApp: any[]) {
        let auths:any[];
        auths = authorizationsApp.map((item: string) => {
            return { permiso: item };
        });
        return auths;
    }
}