import { SelectOption } from './select-option';

export class Region {
    id: string;
    region: string;
    respuestas: SelectOption;

    public static map(region: Region):Region{
        const newInstace = new Region();
        newInstace.id = region.id;
        newInstace.region = region.region
        return newInstace
    }
    public static mapForPost(region: Region){
        let professionMap:any = {};
        if (region.id) {
            Object.assign(professionMap, {id: region.id}) 
        }
        Object.assign(professionMap, { Nombre: region.region });
        return professionMap;
    }
    public static mapFromObject(regionObj: any) {
        if (!regionObj)
            return;
        return new SelectOption(regionObj.id, regionObj.region);
    }
}