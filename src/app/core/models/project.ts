import { NgbDate } from '@ng-bootstrap/ng-bootstrap';
import * as _ from 'lodash';
import { Company } from './company';
import { SelectOption } from './select-option';
import { Spring } from './spring';
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
    springs: Array<Spring>;
    company: Company;
    status: SelectOption;

    public static map(project: Project): Project {
        const newInstace = new Project();
        newInstace.id = project.id;
        newInstace.name = project.name
        newInstace.description = project.description;
        newInstace.assignedResources = project.assignedResources;
        newInstace.startDate = project.startDate;
        newInstace.springs = project.springs;
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
        Object.assign(projectMap, { nombre: project.name });
        Object.assign(projectMap, { descripcion: project.description });
        Object.assign(projectMap, { fechainicio: `${project.startDate.year}-${project.startDate.month}-${project.startDate.day}` });
        Object.assign(projectMap, { IdUserPmo: project.projectManagementOffice.id });
        Object.assign(projectMap, { idempresa: project.company.id });
        
        return projectMap;
    }

    public static mapFromObject(projectObj: any) {
        if (!projectObj)
            return;
        let project = new Project();
        project.id = projectObj.id;
        project.name = projectObj.nombre;
        project.assignedResources = projectObj.recursos;
        // TODO: FIx convention Name camelCase
        project.startDate = projectObj.fechainicio; //fechaInicio;
        project.endDate = projectObj.fechaFin;
        project.hoursProject = projectObj.total;
        project.description = projectObj.descripcion;
        project.progress = projectObj.progreso;

        let min = 0, max = 100;
        project.progress = Math.floor(Math.random() * (max - min + 1) + min);
        project.projectManagementOffice = User.mapFromObject(projectObj.userPmo);
        project.company = Company.mapFromObject(projectObj.empresa);
        project.company = Company.mapFromObject(projectObj.idempresa);
        project.springs = Spring.loadSpringsList(projectObj.springs);

        if (project.springs)
            project.endDate = Project.getEndDate(project.springs);

        if (projectObj.estatus)
            project.status = new SelectOption(projectObj.estatus.id, projectObj.estatus.Descripcion);
        return project;
    }

    public static getEndDate(springs){
        return _.orderBy(springs, ['fechaFin'], ['asc'])[0].endDate;
    }

}
