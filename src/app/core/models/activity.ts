import { NgbDate } from '@ng-bootstrap/ng-bootstrap';
import { User } from './user';
export class Activity {
    id: string;
    title: string;
    description: string;
    startDate: NgbDate;
    endDate: NgbDate;
    hoursActivity: number;
    resource: User;

    public static map(project: Activity): Activity {
        const newInstace = new Activity();
        newInstace.id = project.id;
        newInstace.title = project.title
        newInstace.description = project.description;
        newInstace.startDate = project.startDate;
        newInstace.endDate = project.endDate;
        newInstace.resource = project.resource;
        newInstace.hoursActivity = project.hoursActivity;
        return newInstace
    }
    public static mapForPost(project: Activity) {
        let projectMap: any = {};
        if (project.id) {
            Object.assign(projectMap, { id: project.id })
        }
        Object.assign(projectMap, { Nombre: project.title });
        Object.assign(projectMap, { Descripcion: project.title });
        Object.assign(projectMap, { recursosAsignado: project.resource });
        Object.assign(projectMap, { FechaInicio: project.startDate });
        Object.assign(projectMap, { FechaFinal: project.endDate });
        Object.assign(projectMap, { HorasProyecto: project.hoursActivity });
        return projectMap;
    }
    public static mapFromObject(projectObj: any) {
        if (!projectObj)
            return;
        let project = new Activity();
        project.id = projectObj.id;
        project.title = projectObj.titulo;
        project.startDate = projectObj.fechaInicio;
        project.endDate = projectObj.fechafin;
        project.hoursActivity = projectObj.total;
        project.description = projectObj.descripcion;
        project.resource = User.mapFromObject(projectObj.recursosAsignado);
        return project;
    }
    static loadActivitiesList(activities: Array<any>): Array<Activity> {
        let activitiesList: Array<Activity> = new Array<Activity>();
        activities.forEach(a => {
            let activity = Activity.mapFromObject(a);
            if (activity)
                activitiesList.push(activity);
        });
        return activities;
    }

}
