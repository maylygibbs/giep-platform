
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
  @ViewChild('calendar') calendarComponent: FullCalendarComponent;
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

  typeCalendar: boolean=false;

  /** Select options list **/
  statusList: Array<SelectOption>;

  /** All selected users **/
  selectedUsers: Array<SelectOption>;
  assignedResources: Array<User>;
  assignNonWorkingDays: Array<ProyectCalendar>;
  
  //const userselected: Array<MenuItem> = new Array<MenuItem>();
  defaultImage = 'https://via.placeholder.com/200x200';
  image = 'https://via.placeholder.com/200x200';

  users: PaginationResponse;
  hoveredDate: NgbDate | null = null;
  startDate: NgbDate | null;
  startDate1: NgbDate | null;
  endDate: NgbDate | null;
  public names: string[];
  minDate1: NgbDateStruct = {year: now.getFullYear(), month: now.getMonth() + 1, day: now.getDate()};
  public events: any[];
  events2: any[];
  public startDateCalendarf ='1977-06-22';
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


  selectedcars: string = '5a15b13c663ea0af9ad0dae8';
  //selectedPeople = [{ id: "5a15b13c663ea0af9ad0dae8", name: 'Mendoza Ruiz' }];

   //selectedCar: number;
 /*  selectedCar = [1];
  selectedCars = [{ id: '1' }]; */
    /* cars = [
        { id: 1, name: 'Volvo' },
        { id: 2, name: 'Saab', disabled: true },
        { id: 3, name: 'Opel', },
        { id: 4, name: 'Audi' },
    ]; */
    selectedCityId: number = null;

    cities = [
      { id: 1, name: 'Vilnius' },
      { id: 2, name: 'Kaunas' },
      { id: 3, name: 'Pavilnys', disabled: true }
  ];

    cars = [
      {
          'id': '5a15b13c36e7a7f00cf0d7cb',
          'index': 2,
          'isActive': true,
          'picture': 'http://placehold.it/32x32',
          'age': 23,
          'name': 'Karyn Wright',
          'gender': 'female',
          'company': 'ZOLAR',
          'email': 'karynwright@zolar.com',
          'phone': '+1 (851) 583-2547'
      },
      {
          'id': '5a15b13c2340978ec3d2c0ea',
          'index': 3,
          'isActive': false,
          'picture': 'http://placehold.it/32x32',
          'age': 35,
          'name': 'Rochelle Estes',
          'disabled': true,
          'gender': 'female',
          'company': 'EXTRAWEAR',
          'email': 'rochelleestes@extrawear.com',
          'phone': '+1 (849) 408-2029'
      },
      {
          'id': '5a15b13c663ea0af9ad0dae8',
          'index': 4,
          'isActive': false,
          'picture': 'http://placehold.it/32x32',
          'age': 25,
          'name': 'Mendoza Ruiz',
          'gender': 'male',
          'company': 'ZYTRAX',
          'email': 'mendozaruiz@zytrax.com',
          'phone': '+1 (904) 536-2020'
      }
  ]




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
  }

  //Initialization Method
  ngOnInit(): void {

    this.selectedCityId = this.cities[0].id;
    
    this.route.data.subscribe((data) => {
      this.data = data;
    });

    console.log("MARIANO DATOS DEL PROYECTO");
    console.log(this.project);

    if (!this.project.id) {
      this.project.status = new SelectOption('1');
      this.projectStatus = true;
    } else {
      this.projectStatus = this.project.status.value == '1' ? true : false;
    }

    this.events2 = [];

    this.currentViewCalendar = 'dayGridMonth';
    this.Loaddatesfromdatabase();
    this.initCalendar();

    /* this.currentViewCalendar = 'dayGridMonth';
    this.initCalendar(); */
    // For external-events dragging
    new Draggable(this.externalEvents.nativeElement, {
      itemSelector: '.fc-event',
      eventData: (eventEl) => {
        return {
          title: eventEl.innerText,
          classNames: ['bgcolor-orange'],
          backgroundColor: eventEl.getAttribute('bgColor'),
          borderColor: eventEl.getAttribute('bdColor')
        };
      }
    });

  }



async ngAfterViewInit() {
    this.calendarApi = this.calendarComponent.getApi();
    this.loadCalendarByRangeDate(this.currentViewCalendar);
 }
  
  /** 
   * Init options to calendar 
   **/
   initCalendar() {

    this.calendarOptions = {
      initialView: 'dayGridMonth',
      initialEvents: INITIAL_EVENTS, // alternatively, use the `events` setting to fetch from a feed
      events: this.events2,
      headerToolbar: {
        left: 'prev,today,next',
        center: 'title',
        right: 'dayGridMonth'
      },
      weekends: true,
      editable: true,
      selectable: true,
      selectMirror: true,
      dayMaxEvents: true,
      plugin: [dayGridPlugin, interactionPlugin],
      dateClick: (info) => {
        this.showCardEventsByDay(info.date);
        console.log(info)

      },
      drop: (infoDrop) => { //cuando el evento es dropped dentro del calendario
        let currentDate = new Date();
        currentDate = moment(currentDate).startOf('date').toDate();
        if (moment(currentDate).isSameOrBefore(infoDrop.date)) {
          this.eventDetail = new EventDetail();
          this.eventDetail.eventDate = { year: infoDrop.date.getFullYear(), month: infoDrop.date.getMonth()+1, day: infoDrop.date.getDate() };
          this.eventDetail.classNames = infoDrop.draggedEl.classList.item(1);
          this.modalAddEvent = this.modalService.open(this.addEvent, { size: 'lg' });
        }

      },
      eventAllow: (dropInfo, draggedEvent) => {
        let currentDate = new Date();
        currentDate = moment(currentDate).startOf('date').toDate();
        if (moment(currentDate).isSameOrBefore(dropInfo.start)) {
          return true;
        } else {
          return false;
        }

      },
    
    
      select: this.handleDateSelect.bind(this),
      eventClick: this.handleEventClick.bind(this),
      eventsSet: this.handleEvents.bind(this)
      //eventsSet: this.handleEvents.bind(this)
      /* you can update a remote database when these fire:
      eventAdd:
      eventChange:
      eventRemove:
      */
    } as CalendarOptions; 
   
     
  }

  currentEvents: EventApi[] = [];
//////////////////////////////////////////////////////////////////////////////////////////////  

  /**
   * Event click over event
   * @param clickInfo 
   */
   handleEventClick(clickInfo: EventClickArg) {
    
    console.log(clickInfo.event);
    this.getEventById(clickInfo.event.id)
    if (this.eventDetail) {
      this.modalAddEvent = this.modalService.open(this.addEvent, { size: 'lg' });
    }
  }

  handleDateSelect(selectInfo: DateSelectArg) {
    //const title = prompt('Please enter a new title for your event');
    //const calendarApi = selectInfo.view.calendar;

    /* calendarApi.unselect(); // clear date selection

    if (title) {
      calendarApi.addEvent({
        id: createEventId(),
        title,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        allDay: selectInfo.allDay,
        backgroundColor: 'rgba(0,204,204,.25)',
        borderColor: '#00cccc'
      });
    } */
  }

  /**
   * Get event detail by id
   * @param id 
   */
  getEventById(id:string){
    this.eventDetail = new EventDetail();
    this.eventDetail.id = id;
    
  }

  handleEvents(events: EventApi[]) {
    this.events = events;
  }

  /**
   * Load events by range
   * @param viewType 
   */
  loadCalendarByRangeDate(viewType: string) {
    let currentDate;
    switch (viewType) {
      case 'dayGridMonth':
        console.log(viewType);
        currentDate = this.calendarApi.getDate();
        this.selectedStartDateCalendar = moment(currentDate).startOf('month').format('YYYY-MM-DD');
        this.selectedEndDateCalendar = moment(currentDate).endOf('month').format('YYYY-MM-DD');
        //this.selectedStartDateCalendar = moment(currentDate).startOf('month').format('YYYY-MM-DD') + ` ${this.startHour}`;
        //this.selectedEndDateCalendar = moment(currentDate).endOf('month').format('YYYY-MM-DD') + ` ${this.endHour}`;
        this.loadEventsCalendar();
        break;
      case 'timeGridWeek':
        console.log(viewType);
        currentDate = this.calendarApi.getDate();
        this.selectedStartDateCalendar = moment(currentDate).startOf('week').format('YYYY-MM-DD') + ` ${this.startHour}`;
        this.selectedEndDateCalendar = moment(currentDate).endOf('week').format('YYYY-MM-DD') + ` ${this.endHour}`;
        this.loadEventsCalendar();
        break;
      case 'timeGridDay':
        console.log(viewType);
        currentDate = this.calendarApi.getDate();
        this.selectedStartDateCalendar = moment(currentDate).startOf('hour').format('YYYY-MM-DD') + ` ${this.startHour}`;
        this.selectedEndDateCalendar = moment(currentDate).endOf('hour').format('YYYY-MM-DD') + ` ${this.endHour}`;
        this.loadEventsCalendar();
        break;
    }
  }

  /**
 * Load dates from database
 */
   async Loaddatesfromdatabase() {
      const verdata  = await this.projectService.storeProjectCalendar('');
      for (var j = 0; j < verdata.length; j++){
        console.log(verdata[j].title);  
        this.events2.push({"title": verdata[j].title, "start":verdata[j].start, color: '#00bbff', base: verdata[j].base});
        //this.events2.push({"title": verdata[j].title, "start":verdata[j].start + ' 00:00:00', color: '#00bbff', base: verdata[j].base});
        this.events2.push({"title": "No Laborable", "start":this.startDateCalendarf, color: '#00bbff'});
        this.events2 = this.events2.filter((item) => item.start != this.startDateCalendarf);
      }
        this.showCardEvents = true;
        this.ViewsByDay();
   }


  /**
 * load events in calendar
 */
   async loadEventsCalendar() {
    this.calendarApi.removeAllEvents();
    //this.calendarApi.getEventSources()[0]?.remove();
    this.events = await this.calendarService.getEvents(this.selectedStartDateCalendar, this.selectedEndDateCalendar);
    this.calendarApi.addEventSource(this.events);
    this.calendarApi.render();
  }

  /**
   * load events by date
   * @param day 
   */
  async showCardEventsByDay(day: Date) {
     let todaysDate = new Date(); 
     let formattedDate = moment(todaysDate).format("YYYY-MM-DD"); 

     //formatted version of todays date so a comparison can be made 
     //let s1 = day.startStr; let s2 = day.endStr; 
     let s1 =  moment(day).format("YYYY-MM-DD"); let s2 = moment(day).format("YYYY-MM-DD"); 
     let currentdate = moment().isUTC(); 
     let newDateObj = moment(s1).add(15, "m").format("YYYY-MM-DD"); 
     if (s1 < formattedDate) { //This checks if time is in the past. If so, 
        this.toastrService.error('No se permiten selección de fechas anteriores.'); 
     }else{
          
      this.selectedDay = day;
      //const startDateCalendar = moment(day).startOf('hour').format('YYYY-MM-DD') + ` ${this.startHour}`;
      const startDateCalendar = moment(day).startOf('hour').format('YYYY-MM-DD');
      for (var j = 0; j < this.events2.length; j++){
        //console.log(this.events2[j].start);  
        if (this.events2[j].start === startDateCalendar) {
          this.exitcalendar = true;
        }
      }
      if (this.exitcalendar === false) {
      this.events2.push({"title": "No Laborable", "start":startDateCalendar, color: '#c23d23', base: 'f'});
      this.events2.push({"title": "No Laborable", "start":this.startDateCalendarf, color: '#c23d23', base: 'f'});
      this.events2 = this.events2.filter((item) => item.start != this.startDateCalendarf);

    /*   const ProyectCalend = new ProyectCalendar();
      ProyectCalend.id = '1';
      ProyectCalend.idProyect = '1';
      ProyectCalend.startDate = moment(day).format("YYYY-MM-DD");
      ProyectCalend.endDate = moment(day).format("YYYY-MM-DD"); */
      //this.assignNonWorkingDays.push("fec":startDateCalendar);

    /*   this.assignNonWorkingDays = this.events2.map((u: SelectOption, index: number) => {
        const proyectCalendar = new ProyectCalendar();
        //proyectCalendar.id = index;
        //proyectCalendar.idProyect = '1';
        proyectCalendar.startDate = moment(u[index].start).format("YYYY-MM-DD");
        proyectCalendar.endDate = moment(day).format("YYYY-MM-DD"); 

        //this.assignNonWorkingDays.push({'id':'1', 'idProyect': '1', 'startDate': moment(day).format("YYYY-MM-DD"), 'endDate' : moment(day).format("YYYY-MM-DD")});

        //proyectCalendar.startDate = u[0].start;
        return proyectCalendar;
      });  

      console.log(this.assignNonWorkingDays); */

      

      this.ViewsByDay();
      const startDate = moment(day).startOf('hour').format('YYYY-MM-DD') + ` ${this.startHour}`;
      const endDate = moment(day).endOf('hour').format('YYYY-MM-DD') + ` ${this.endHour}`;
      //this.eventsByDay = await this.calendarService.getEvents(startDate, endDate);
      console.log(this.eventsByDay);
      this.showCardEvents = true;
      setTimeout(() => {
        this.calendarApi.render();
      }, 150);
     }

     }
    
 }

  ViewsByDay() {
    this.initCalendar();
  }

  /**
  * switch calendar view
  */  
  validcalendar(view: boolean) {
   this.typeCalendar=view;
  }

   //Change User Resources Method
   async closeCardEventByDay1(event: any) {
         console.log(event);
        /* console.log(event);
        console.log(event.target.id);
        console.log(this.events2);   */

        //id:'2022-10-12 00:00:00t'

        ///console.log(event.target.id.substr(-1));

        this.events2 = this.events2.filter((item) => item.start != event.target.id);
        this. ViewsByDay();
        //console.log(this.events2);
   }

  closeCardEventByDay() {
    this.eventsByDay = null;
    this.showCardEvents = false;
    setTimeout(() => {
      this.calendarApi.render();
    }, 150);
  }

  async onClickPrev() {
    this.calendarApi.prev();
    this.loadCalendarByRangeDate(this.currentViewCalendar);
  }

  async onClickNext() {
    this.calendarApi.next();
    this.loadCalendarByRangeDate(this.currentViewCalendar);
  }

  async onClickToday() {
    this.calendarApi.today();
    this.loadCalendarByRangeDate(this.currentViewCalendar);
  }

  /**
 * Event try to change view
*/
  onChangeViewCalendar(view: string) {
    console.log(view);
    this.currentViewCalendar = view;
    this.calendarApi.changeView(view);
    this.loadCalendarByRangeDate(this.currentViewCalendar);
  }


  /**
   * Close modal by ref
   * @param modalRef 
   */
  close(modalRef: NgbModalRef) {
    this.loadCalendarByRangeDate(this.currentViewCalendar);
    modalRef.close();
  }



//+++++++++++++++++++++**********************++++++++++++++++++++++++****************************
  //Change state method
  async onChangeStatus(event: any) {
    this.statusList = await this.commonsService.getAllStatus();
  }

  //Change User Resources Method
  async onChangeUserResorces(event: any) {
    //console.log(this.project.projectManagementOffice.value);

    if (event.length == 0) {
      this.assignedResources.pop();
    }
    for (var j = 0; j < event.length; j++){
        if (this.project.projectManagementOffice === event[j].value) {
          //this.assignedResources = this.assignedResources.filter((item) => item.id != event[j].value);
          this.selectedUsers = this.selectedUsers.filter((item) => item.name != event[j].label);
          this.toastrService.error('EL usuario que usted a seleccionado esta como usuario PMO verifique.'); 
        }else{
          this.assignedResources = this.selectedUsers.map((u: SelectOption, index: number) => {
            const user = new User();
            user.id = u.value;
            user.firstName = u.label;
            user.nameInputHours = 'inputHoursDedication-' + index;
            return user;
          });
        }
        //console.log(this.assignedResources);
      }
      //console.log(this.assignedResources);
      
}

  /**
   * 
   * @param user 
   */
  //delete assignedResources and selectedUsers
  deleteResource(user:User){
    this.assignedResources = this.assignedResources.filter((item) => item.id != user.id);
    if (this.assignedResources && this.assignedResources.length > 0) {user
      this.assignedResources.forEach((sectionItem: User, index: number) => {
        console.log(sectionItem.id);
        //sectionItem.id = index + 1;
      });
    }
    this.selectedUsers = this.selectedUsers.filter((item) => item.name != user.firstName);
  }

  //Method that verifies change of company
  async onChangeCompany(event: any) {
    this.data.companies = await this.companyService.getCompanies();
  }

  //Method to verify form and persist data
  async onSubmit(form: NgForm) {
 
   
    this.project.assignedResources = this.assignedResources;
    if (form.valid) {
      if (this.assignedResources && this.assignedResources.length > 0 && this.selectedUsers && this.selectedUsers.length > 0 ) {
        await this.projectService.storeProject(Project.mapForPost(this.project));
        await this.projectService.storeResources(Project.map2ForPost(this.project));
        
        if (this.events2.length > 0) {
          await this.projectService.storeNonworkingDays(Project.map3ForPost(this.events2));
        }

        this.back();
      }else{   
        this.toastrService.error('Usted debe asignar usuario PMO y Recursos.'); 
      }
    }
  }

  /**
   * begin fecha
   */

  //Method that will be used to select a date range in calendar
  onDateSelection(date: NgbDate) {
    if (!this.project.startDate && !this.project.endDate) {
      this.project.startDate = date;
    } else if (this.project.startDate && !this.project.endDate && date && date.after(this.project.startDate)) {
      this.project.endDate = date;
    } else {
      this.project.endDate = null;
      this.project.startDate = date;
    }
  }

  //Method that checks if it is suspended
  isHovered(date: NgbDate) {
    return this.project.startDate && !this.project.endDate && this.hoveredDate && date.after(this.project.startDate) &&
      date.before(this.hoveredDate);
  }

  //Method that checks if it is inside
  isInside(date: NgbDate) { return this.project.endDate && date.after(this.project.startDate) && date.before(this.project.endDate); }
  
  //Method that checks if it is in the range
  isRange(date: NgbDate) {
    return date.equals(this.project.startDate) || (this.project.endDate && date.equals(this.project.endDate)) || this.isInside(date) ||
      this.isHovered(date);
  }

  //Method that checks input validation
  validateInput(currentValue: NgbDate | null, input: string): NgbDate | null {
    const parsed = this.formatter.parse(input);
    return parsed && this.calendar.isValid(NgbDate.from(parsed)) ? NgbDate.from(parsed) : currentValue;
  }

  //Method that checks date of change
  onchangeDate(event) {
    console.log(event);

  }
  /**
   * end fecha
   */

  //Method that checks the back
  back() {
    this.onBack.emit(null);
  }

}
