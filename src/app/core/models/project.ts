import { NgbDate } from '@ng-bootstrap/ng-bootstrap';
import * as _ from 'lodash';
import { Company } from './company';
import { SelectOption } from './select-option';
import { Spring } from './spring';
import { ProyectCalendar } from './project-calendar';
import { User } from './user';


export class Project {

    id: string;
    name: string;
    description: string;
    condition: string;
    assignedResources?: User[];
    assignedResourcesf?: User[];
    //startDate: NgbDate;
    startDate: any;

    endDate: NgbDate;
    hoursProject: number;
    progress: number;
    TypeGbProgressbar: string;

    pmo: User;

    userPmo?: User[];

    springs: Array<Spring>;
    assignNonWorkingDays?: ProyectCalendar[];
    //company: Company;
    company: SelectOption;

    status: SelectOption;
    idProject: string;
    idResorce: string;
    hoursDedication: string;
    
    freeDays:any; // range of dates
    totalFreeDays:any;
    

    //Project Variable Mapping Method
    public static mapForPost(project: Project) {
        let projectMap: any = {};
        if (project.id) {
            Object.assign(projectMap, { id: project.id })
        }
        Object.assign(projectMap, { nombre: project.name });
        Object.assign(projectMap, { descripcion: project.description });
        Object.assign(projectMap, { fechainicio: `${project.startDate.year}-${project.startDate.month}-${project.startDate.day}` });
        Object.assign(projectMap, { IdUserPmo: null });
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

    //Map variables of non-working days
    public static map3ForPost(options: Array<ProyectCalendar>,proyect: Project){

        var dataProyectCalendar = [];
        let proyectoCalendarMap: any = {};
        if (proyect.id) {
            Object.assign(proyectoCalendarMap, { id: proyect.id })
        }

        options.forEach((sectionItem, index) => {
            dataProyectCalendar.push({ id_proyecto: localStorage.getItem('idusersproyecadd'), fecha_inicio_nolaboral: sectionItem.start, fecha_fin_nolaboral: sectionItem.start});    
        });
        const jsonData = JSON.stringify(dataProyectCalendar) 
        localStorage.setItem('arrayofnon-working-daysAdd', jsonData)
        Object.assign(proyectoCalendarMap, { arrayofnonworkingdays: dataProyectCalendar });
        return proyectoCalendarMap; 

    }

    //Object Map Method
    public static mapFromObject(projectObj: any) {
        if (!projectObj)
            return;
        let project = new Project();
        project.id = projectObj.id;
        project.name = projectObj.nombre;

        
        project.startDate = projectObj.fechaInicio;
        project.endDate = projectObj.fechaFin;
        project.hoursProject = projectObj.horaestimadas;
        project.description = projectObj.descripcion;
        project.progress = projectObj.progreso;
        project.condition = projectObj.estado;
        let min = 0, max = 100;

         project.progress = projectObj.total[0].totalprogress;
         project.TypeGbProgressbar=projectObj.total[0].colorprogress;
         if(projectObj.userPmo){
            project.pmo = new User();
            project.pmo.id = projectObj.userPmo.id;
            project.pmo.email = projectObj.userPmo.email;
            project.pmo.firstName = projectObj.userPmo.primerNombre;
            project.pmo.lastName =  projectObj.userPmo.primerApellido;
         }

        project.company = new SelectOption(projectObj.empresa.id, projectObj.empresa.nombre);
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
