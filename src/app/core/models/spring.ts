import { NgbDate } from '@ng-bootstrap/ng-bootstrap';
import { Activity } from './activity';


export class Spring {

    id: string;
    startDate: NgbDate;
    endDate: NgbDate;
    iteration: number;
    activities: Array<Activity>;

    public static map(spring: Spring): Spring {
        const newInstace = new Spring();
        newInstace.id = spring.id;
        newInstace.startDate = spring.startDate;
        newInstace.endDate = spring.endDate;
        newInstace.iteration = spring.iteration;
        newInstace.activities = spring.activities;
        return newInstace
    }

    public static mapForPost(spring: Spring) {
        let springMap: any = {};
        if (spring.id) {
            Object.assign(springMap, { id: spring.id })
        }
        Object.assign(springMap, { FechaInicio: spring.startDate });
        Object.assign(springMap, { FechaFin: spring.endDate });
        Object.assign(springMap, { Actividades: spring.activities });
        Object.assign(springMap, { Iteracion: spring.iteration });
        return springMap;
    }

    public static mapFromObject(springObj: any) {
        console.log(springObj);
        if (!springObj)
            return;
        let spring = new Spring();
        spring.id = springObj.id;
        spring.startDate = springObj.fechaInicio;
        spring.endDate = springObj.fechaFin;
        spring.iteration = springObj.total;
        spring.activities = Activity.loadActivitiesList(springObj.actividades);
        console.log(spring, springObj);
        return spring;
    }

    static loadSpringsList(springs: Array<any>): Array<Spring> {
        let springsList: Array<Spring> = new Array<Spring>();
        springs.forEach(a => {
            let spring = Spring.mapFromObject(a);
            console.log(spring,a);
            
            if (spring)
                springsList.push(spring);
        });
        console.log(springsList);
        
        return springsList;
    }

}
