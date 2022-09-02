import { NgbDate } from '@ng-bootstrap/ng-bootstrap';
import { Company } from './company';
import { SelectOption } from './select-option';
import { User } from './user';


export class Project {

    id: string;
    name: string;
    description: string;
    assignedResources?: User[];
    startDate: NgbDate;
    endDate: NgbDate;
    hoursProject: number;
    progress: number;
    projectManagementOffice: User;
    company: Company;
    status: SelectOption;

    public static map(project: Project): Project {
        const newInstace = new Project();
        newInstace.id = project.id;
        newInstace.name = project.name
        newInstace.description = project.description;
        newInstace.assignedResources = project.assignedResources;
        newInstace.startDate = project.startDate;
        newInstace.endDate = project.endDate;
        newInstace.hoursProject = project.hoursProject;
        newInstace.projectManagementOffice = project.projectManagementOffice;
        newInstace.company = project.company;
        newInstace.status = project.status;
        return newInstace
    }

    public static mapForPost(project: Project) {
        let projectMap: any = {};
        if (project.id) {
            Object.assign(projectMap, { id: project.id })
        }
        Object.assign(projectMap, { Nombre: project.name });
        Object.assign(projectMap, { Descripcion: project.name });
        Object.assign(projectMap, { RecursosAsignados: project.assignedResources });
        Object.assign(projectMap, { FechaInicio: project.startDate });
        Object.assign(projectMap, { FechaFinal: project.endDate });
        Object.assign(projectMap, { HorasProyecto: project.hoursProject });
        Object.assign(projectMap, { UserPmo: project.projectManagementOffice });
        Object.assign(projectMap, { Empresa: project.company });
        Object.assign(projectMap, { idStatus: parseInt(project.status.value) });
        return projectMap;
    }

    public static mapFromObject(projectObj: any) {
        if (!projectObj)
            return;
        let project = new Project();
        project.id = projectObj.id;
        project.name = projectObj.nombre;
        project.assignedResources = projectObj.recursos;
        project.startDate = projectObj.fechainicio;
        project.endDate = projectObj.fechafin;
        project.hoursProject = projectObj.total;
        project.description = projectObj.descripcion;
        project.progress = projectObj.progreso;

        let min = 0, max = 100;
        project.progress = Math.floor(Math.random() * (max - min + 1) + min);
        project.projectManagementOffice = User.mapFromObject(projectObj.IdUserPmo);
        project.company = Company.mapFromObject(projectObj.empresa);
        if (projectObj.estatus)
            project.status = new SelectOption(projectObj.estatus.id, projectObj.estatus.Descripcion);
        return project;
    }

}
