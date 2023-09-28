
import { Component, OnInit, ViewChild, ElementRef, TemplateRef } from '@angular/core';
import { CalendarOptions, DateSelectArg, EventClickArg, EventApi, FullCalendarComponent, Calendar } from '@fullcalendar/angular';

//**************************************************************** */

//import { CalendarOptions, DateSelectArg, EventClickArg, EventApi } from '@fullcalendar/angular';
import { Draggable } from '@fullcalendar/interaction'; // for dateClick
import { INITIAL_EVENTS, createEventId } from '../../../../../../../src/app/views/pages/apps/calendar/event-utils';

//**************************************************************** */


import { CommonsService } from '../../../../../core/services/commons.service';
import { environment } from '../../../../../../environments/environment';
import { ProjectService } from '../../../../../core/services/project.service';
import { Project } from '../../../../../core/models/project';
import { ProyectCalendar } from 'src/app/core/models/project-calendar';
import { EventEmitter, Input, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { SelectOption } from '../../../../../core/models/select-option';
import { ActivatedRoute } from '@angular/router';
import { BaseComponent } from '../../../../shared/components/base/base.component';
import { UserService } from 'src/app/core/services/user.service';
import { Filter } from 'src/app/core/models/filter';
import { PaginationResponse } from 'src/app/core/models/pagination-response';
import { NgbCalendar, NgbDate, NgbDateParserFormatter, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { User } from 'src/app/core/models/user';
import { CompanyService } from 'src/app/core/services/company.service';
import { number } from 'ngx-custom-validators/src/app/number/validator';
import { ToastrService } from 'ngx-toastr';

import { FullCalendarModule } from '@fullcalendar/angular'; // for FullCalendar!
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import interactionPlugin from '@fullcalendar/interaction';


//import { Draggable } from '@fullcalendar/interaction'; // for dateClick
//import { INITIAL_EVENTS, createEventId } from '../../../../../../../src/app/views/pages/apps/calendar/event-utils';
import { CalendarService } from '../../../../../core/services/calendar.service';
import * as moment from "moment";
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { EventDetail } from '../../../../../core/models/event-detail';



const now = new Date();

@Component({
  selector: 'app-project-store',
  templateUrl: './project-store.component.html',
  styleUrls: ['./project-store.component.scss']
})
export class ProjectStoreComponent extends BaseComponent implements OnInit {

  // references the #calendar in the template
  calendarComponent: FullCalendarComponent;
  @ViewChild('calendar') set customCalendar(elRef: FullCalendarComponent) {
    this.calendarComponent = elRef;
  }

  @ViewChild('addEvent') addEvent: TemplateRef<any>;
  @ViewChild('externalEvents', { static: true }) externalEvents: ElementRef;

  modalAddEvent: NgbModalRef;

  @Input()
  project: Project;
  projectCalendar: ProyectCalendar;


  @Output()
  onBack: EventEmitter<any> = new EventEmitter<any>();

  environment = environment;

  data: any;

  projectStatus: boolean;

  typeCalendar: boolean = false;
  mapSelectUsers: boolean = false;

  /** Select options list **/
  statusList: Array<SelectOption>;

  /** All selected users **/
  selectedUsers: Array<SelectOption>;
  assignPmomf: Array<SelectOption>;

  assignedResources: Array<User>;
  assignNonWorkingDays: Array<ProyectCalendar>;
  assignPmo: number = null;

  selectedUserId: number = null;
  selectedUserLabel: string;

  /*  userPmo = [
         { id:1 , value: 'Juan Blanco', label: 'Juan Blanco' },
         { id:2 , value: 'Mayly Gibbs', label: 'Mayly Gibbs' },
         { id:3 , value: 'Anibal Briceño', label: 'Anibal Briceño' },
         { id:4 , value: 'Marilu Pulido', label: 'Marilu Pulido' }
     ]; */


  defaultImage = 'https://via.placeholder.com/200x200';
  image = 'https://via.placeholder.com/200x200';

  users: PaginationResponse;
  hoveredDate: NgbDate | null = null;
  startDate: NgbDate | null;
  startDate1: NgbDate | null;
  endDate: NgbDate | null;
  public names: string[];
  minDate1: NgbDateStruct = { year: now.getFullYear(), month: now.getMonth() + 1, day: now.getDate() };
  public events: any[];
  events2: any[];
  public startDateCalendarf = '1977-06-22';
  //events2: [];  
  public options: any;

  /** calendar aspect */
  currentViewCalendar: string;
  calendarOptions: CalendarOptions;
  //events: EventApi[] = [];
  eventsByDay: EventApi[] = [];
  selectedStartDateCalendar: string;
  selectedEndDateCalendar: string;
  startHour: string = '00:00:00';
  endHour: string = '23:59:00';
  calendarApi: Calendar;

  selectedDay: Date;

  showCardEvents: boolean = false;
  exitcalendar: boolean = false;
  eventDetail: EventDetail;
  inputHoursDedicationvalue: number;


  minDateEvent = {
    year: new Date().getFullYear(), month: (new Date().getMonth()) + 1, day: new Date().getDate()
  }


  //Builder Method
  constructor(
    private calendarService: CalendarService,
    private route: ActivatedRoute,
    private modalService: NgbModal,
    private projectService: ProjectService,
    private commonsService: CommonsService,
    private companyService: CompanyService,
    private calendar: NgbCalendar,
    private toastrService: ToastrService,
    public formatter: NgbDateParserFormatter) {
    super();


    this.route.data.subscribe((data) => {
      this.data = data;
      console.log(this.data)
    });
  }

  //Initialization Method
  ngOnInit(): void {


    console.log("DATOS DEL PROYECTO");
    console.log(this.project);

    if (!this.project.id) {//BIFURCACION CUANDO SE TRATA DE UN PROY NUEVO

      this.project.status = new SelectOption('1');
      this.projectStatus = true; // ESTA LINEA NO SE PARA QUE ES, projectStatus NO SE UTILIZA EN EL HTML
    } else { //BIFURCACION CUANDO SE TRATA DE UN PROY NUEVO


    }
  }



  //Method that verifies change of company
  async onChangeCompany(event: any) {
    this.data.companies = await this.companyService.getCompanies();
  }

  //Method to verify form and persist data
  async onSubmit(form: NgForm) {
    if (form.valid) {
      await this.projectService.storeProject(Project.mapForPost(this.project));
      this.back();
    }
  }



  //Method that checks the back
  back() {
    this.onBack.emit(null);
  }

}
