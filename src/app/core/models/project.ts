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
    projectManagementOffice: User;
    projectManagementOffice1: User;
    springs: Array<Spring>;
    company: Company;
    status: SelectOption;

    idproject: string;
    idresorce: string;
    hoursdedication: string; 

    public static map(project: Project): Project {
        const newInstace = new Project();
        newInstace.id = project.id;
        newInstace.name = project.name
        newInstace.description = project.description;
        newInstace.assignedResources = project.assignedResources;
        newInstace.assignedResourcesf = project.assignedResourcesf;
        
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

    public static map2ForPost(resource: Project) {
        let resourceMap: any = {};
        if (resource.id) {
            Object.assign(resourceMap, { id: resource.id })
        }
        //Object.assign(resourceMap, { idproject: resource.assignedResources});

        var valores = [];
        var datauserresorce = [];
        var datauser2 = [];
        var tablarows = $("#datatableResources1").DataTable().rows().data()
        $(tablarows).each(function() {
          valores.push($(this)[0]);
        });
        var idusers='';
        //var ta1 ='';
        $.each(valores, function (ind, elem) { 
          //console.log('¡Hola :'+elem+'!'); 
          idusers='#'+elem;
          var valtext = $(idusers).val()
          Object.assign(resourceMap, { idproyecto: localStorage.getItem('idusersproyecadd')});
          Object.assign(resourceMap, { idrecurso: elem });
          Object.assign(resourceMap, { horasdedicacion: valtext });
          
          
          //datauserresorce.push({ idproyecto: localStorage.getItem('idusersproyecadd') },{ idrecurso: elem },{ horasdedicacion: valtext });
          datauserresorce.push({ idproyecto: localStorage.getItem('idusersproyecadd'), idrecurso: elem, horasdedicacion: valtext});

          //datauserresorce.unshift({ idproyecto: localStorage.getItem('idusersproyecadd') },{ idrecurso: elem },{ horasdedicacion: valtext });


        });

        const jsonData = JSON.stringify(datauserresorce) 
        localStorage.setItem('arrayUsersProyecAdd', jsonData)
        Object.assign(resourceMap, { arrayuserresorce: datauserresorce });
        //Object.assign(resourceMap, { idresorce: resource.idresorce });
        //Object.assign(resourceMap, { hoursdedication: resource.hoursdedication });

        return resourceMap;
    }

    public static mapFromObject(projectObj: any) {
        if (!projectObj)
            return;
        let project = new Project();
        project.id = projectObj.id;
        project.name = projectObj.nombre;
        project.assignedResources = projectObj.recursos;
        project.startDate = projectObj.fechaInicio;
        project.endDate = projectObj.fechaFin;
        project.hoursProject = projectObj.total;
        project.description = projectObj.descripcion;
        project.progress = projectObj.progreso;
        project.condition = projectObj.estado;

        let min = 0, max = 100;
        project.progress = Math.floor(Math.random() * (max - min + 1) + min);
        project.projectManagementOffice = User.mapFromObject(projectObj.userPmo);
        project.company = Company.mapFromObject(projectObj.empresa);
        project.springs = Spring.loadSpringsList(projectObj.springs);

        if (project.springs)
            project.endDate = Project.getEndDate(project.springs);

        if (projectObj.estatus)
            project.status = new SelectOption(projectObj.estatus.id, projectObj.estatus.Descripcion);

        

        return project;
    }

    public static getEndDate(springs:Array<Spring>){
        if (!springs || springs.length == 0) {
            return null;
        }
        
        return _.orderBy(springs, ['endDate'], ['desc'])[0].endDate;
    }

}
