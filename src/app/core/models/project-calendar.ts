import { NgbDate } from '@ng-bootstrap/ng-bootstrap';
import { Activity } from './activity';


export class ProyectCalendar {

    id: string;
    idProyect: string;
    start: string;
    endDate: string;
    

    public static map(proyectCalendar: ProyectCalendar): ProyectCalendar {
        const newInstace = new ProyectCalendar();
        newInstace.id = proyectCalendar.id;
        newInstace.idProyect = proyectCalendar.idProyect;
        newInstace.start = proyectCalendar.start;
        newInstace.endDate = proyectCalendar.endDate;
       
        return newInstace
    }

    public static mapForPost(proyectCalendar: ProyectCalendar) {
        let proyectCalendarMap: any = {};
        if (proyectCalendar.id) {
            Object.assign(proyectCalendarMap, { id: proyectCalendar.id })
        }
        Object.assign(proyectCalendarMap, { IdProyecto: proyectCalendar.idProyect });
        Object.assign(proyectCalendarMap, { FechaInicio: proyectCalendar.start });
        Object.assign(proyectCalendarMap, { FechaFin: proyectCalendar.endDate });
        return proyectCalendarMap;
    }

    public static mapFromObject(proyectCalendarObj: any) {
        if (!proyectCalendarObj)
            return;
        let proyectCalendar = new ProyectCalendar();
        proyectCalendar.id = proyectCalendarObj.id;
        proyectCalendar.idProyect = proyectCalendarObj.id_proyecto_id;
        proyectCalendar.start = proyectCalendarObj.fecha_inicio_nolaboral;
        proyectCalendar.endDate = proyectCalendarObj.fecha_fin_nolaboral;
        return proyectCalendar;
    }

    static loadSpringsList(proyectCalendar: Array<any>): Array<ProyectCalendar> {
        let proyectCalendarList: Array<ProyectCalendar> = new Array<ProyectCalendar>();
        proyectCalendar.forEach(a => {
            let proyectCalendar = ProyectCalendar.mapFromObject(a);
            if (proyectCalendar)
            proyectCalendarList.push(proyectCalendar);
        });
        
        return proyectCalendarList;
    }

}
