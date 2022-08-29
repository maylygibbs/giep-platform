import { NgbDate } from '@ng-bootstrap/ng-bootstrap';
import { SelectOption } from './select-option';
import { User } from './user';


export class Project {

    id: string;
    name: string;
    description: string;
    token: string;
    assignedResources?: User[];
    startDate: NgbDate ;
    endDate: NgbDate ;
    hoursProject:number;
    progress:number;
    projectManagementOffice:User;
    status: SelectOption;

    public static map(project: Project):Project{
        const newInstace = new Project();
        newInstace.id = project.id;
        newInstace.name = project.name
        newInstace.description = project.description;
        newInstace.assignedResources = project.assignedResources;
        newInstace.startDate = project.startDate;
        newInstace.endDate = project.endDate;
        newInstace.hoursProject = project.hoursProject;
        newInstace.projectManagementOffice = project.projectManagementOffice;
        newInstace.status = project.status;
        return newInstace
    }

    public static mapForPost(project: Project){
        let projectMap:any = {};
        if (project.id) {
            Object.assign(projectMap, {id: project.id}) 
        }
        Object.assign(projectMap, { Nombre: project.name });
        Object.assign(projectMap, {Descripcion: project.name});
        Object.assign(projectMap, {RecursosAsignados: project.assignedResources});
        Object.assign(projectMap, {FechaInicio: project.startDate});
        Object.assign(projectMap, {FechaFinal: project.endDate});
        Object.assign(projectMap, {HorasProyecto: project.hoursProject});
        Object.assign(projectMap, { OficinaGetionProyectos: project.projectManagementOffice });
        Object.assign(projectMap, { idStatus: parseInt(project.status.value) });
        return projectMap;
    }

    public static mapFromObject(projectObj: any) {
        const project = new Project();
        project.id = projectObj.id;
        project.name = projectObj.Nombre;
        project.description = projectObj.Descripcion;
        project.assignedResources = projectObj.RecursosAsignados;
        project.startDate = projectObj.FechaInicio;
        project.endDate = projectObj.FechaFinal;
        project.hoursProject = projectObj.HorasProyecto;
        project.progress = projectObj.Progreso;
        project.projectManagementOffice = projectObj.OficinaGetionProyectos;
        project.status = new SelectOption(projectObj.estatus.id, projectObj.estatus.Descripcion);
        return project;
    }

}
