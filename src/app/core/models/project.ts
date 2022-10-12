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
    condition: string;
    assignedResources?: User[];
    assignedResourcesf?: User[];
    startDate: NgbDate;
    endDate: NgbDate;
    hoursProject: number;
    progress: number;
    TypeGbProgressbar: string;
    projectManagementOffice: User;
    projectManagementOffice1: User;
    springs: Array<Spring>;
    company: Company;
    status: SelectOption;
    idProject: string;
    idResorce: string;
    hoursDedication: string; 
    
    //Variable Mapping Method
    public static map(project: Project): Project {
        const newInstace = new Project();
        newInstace.id = project.id;
        newInstace.name = project.name
        newInstace.description = project.description;
        newInstace.assignedResources = project.assignedResources;
        newInstace.assignedResourcesf = project.assignedResourcesf;
        newInstace.progress = project.progress;
        newInstace.startDate = project.startDate;
        newInstace.springs = project.springs;
        newInstace.endDate = project.endDate;
        newInstace.hoursProject = project.hoursProject;
        newInstace.projectManagementOffice = project.projectManagementOffice;
        newInstace.company = project.company;
        newInstace.status = project.status;
        newInstace.condition = project.condition;
        return newInstace
    }

    //Project Variable Mapping Method
    public static mapForPost(project: Project) {
        let projectMap: any = {};
        if (project.id) {
            Object.assign(projectMap, { id: project.id })
        }
        Object.assign(projectMap, { nombre: project.name });
        Object.assign(projectMap, { descripcion: project.description });
        Object.assign(projectMap, { fechainicio: `${project.startDate.year}-${project.startDate.month}-${project.startDate.day}` });
        Object.assign(projectMap, { IdUserPmo: project.projectManagementOffice });
        //Object.assign(projectMap, { IdUserPmo: 1 });
        Object.assign(projectMap, { idempresa: project.company.id });
        Object.assign(projectMap, { horaestimadas: project.hoursProject });
        Object.assign(projectMap, { idstatuscalendarioproyecto: 2 });
        return projectMap;
    }

    //Project Resource Variable Mapping Method
    public static map2ForPost(resource: Project) {
        let resourceMap: any = {};
        if (resource.id) {
            Object.assign(resourceMap, { id: resource.id })
        }
        var datauserresorce = [];
        resource.assignedResources.forEach((sectionItem, index) => {
            datauserresorce.push({ idproyecto: localStorage.getItem('idusersproyecadd'), idrecurso: sectionItem.id, horasdedicacion: sectionItem.hoursDedication});    
        });
        const jsonData = JSON.stringify(datauserresorce) 
        localStorage.setItem('arrayUsersProyecAdd', jsonData)
        Object.assign(resourceMap, { arrayuserresorce: datauserresorce });
        return resourceMap; 

    }

    //Object Map Method
    public static mapFromObject(projectObj: any) {
        if (!projectObj)
            return;
        let project = new Project();
        project.id = projectObj.id;
        project.name = projectObj.nombre;
        project.assignedResources = projectObj.recursos;
        project.startDate = projectObj.fechaInicio;
        project.endDate = projectObj.fechaFin;
        project.hoursProject = projectObj.horaestimadas;
        project.description = projectObj.descripcion;
        project.progress = projectObj.progreso;
        project.condition = projectObj.estado;
        let min = 0, max = 100;
        // project.progress = Math.floor(Math.random() * (max - min + 1) + min);
         project.progress = projectObj.total[0].totalprogress;
         project.TypeGbProgressbar=projectObj.total[0].colorprogress;
        project.projectManagementOffice = User.mapFromObject(projectObj.userPmo);
        project.company = Company.mapFromObject(projectObj.empresa);
        project.springs = Spring.loadSpringsList(projectObj.springs);
        if (project.springs)
            project.endDate = Project.getEndDate(project.springs);
        if (projectObj.estatus)
            project.status = new SelectOption(projectObj.estatus.id, projectObj.estatus.Descripcion);
        return project;
    }

    //Method of getting the end date
    public static getEndDate(springs:Array<Spring>){
        if (!springs || springs.length == 0) {
            return null;
        }
        
        return _.orderBy(springs, ['endDate'], ['desc'])[0].endDate;
    }

}
