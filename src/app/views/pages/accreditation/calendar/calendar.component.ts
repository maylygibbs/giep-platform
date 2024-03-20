import { Component, OnInit, ViewChild, ElementRef, TemplateRef } from '@angular/core';

import { CalendarOptions, DateSelectArg, EventClickArg, EventApi, FullCalendarComponent, Calendar, EventDropArg } from '@fullcalendar/angular';
import { Draggable, EventResizeStopArg } from '@fullcalendar/interaction'; // for dateClick
import { INITIAL_EVENTS, createEventId } from './event-utils';
import { CalendarService } from '../../../../core/services/calendar.service';
import * as moment from "moment";
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { EventDetail } from '../../../../core/models/event-detail';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { BaseComponent } from '../../../../views/shared/components/base/base.component';
import { AuthService } from 'src/app/core/services/auth.service';
import { User } from 'src/app/core/models/user';
import esLocale from '@fullcalendar/core/locales/es';
import { AcreditationItem } from '../../../../core/models/accreditation-item';


@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent extends BaseComponent implements OnInit {

  public config = {
    printMode: 'template-popup',
    popupProperties: 'toolbar=yes,scrollbars=yes,resizable=yes,top=0,left=0,fullscreen=yes',
    pageTitle: 'Hello World',
    templateString: '<header>I\'m part of the template header</header>{{printBody}}<footer>I\'m part of the template footer</footer>',
    stylesheets: [{ rel: 'stylesheet', href: 'https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css' }],
    styles: ['.table { color: red; }', '.table td { color: green; }']
  }

  @ViewChild('externalEvents', { static: true }) externalEvents: ElementRef;
  // references the #calendar in the template
  @ViewChild('calendar') calendarComponent: FullCalendarComponent;

  @ViewChild('addEvent') addEvent: TemplateRef<any>;

  modalAddEvent: NgbModalRef;
  data: any;

  /** calendar aspect */
  currentViewCalendar: string;
  calendarOptions: CalendarOptions;
  events: EventApi[] = [];
  eventsByDay: EventDetail[] = [];
  selectedStartDateCalendar: string;
  selectedEndDateCalendar: string;
  startHour: string = '00:00:00';
  endHour: string = '23:59:00';
  calendarApi: Calendar;

  selectedDay: Date;
  showCardEvents: boolean = false;

  eventDetail: EventDetail;

  minDateEvent = { year: new Date().getFullYear(), month: (new Date().getMonth()) + 1, day: new Date().getDate() }

  currentUser: User;

  step:number = 1;


  accreditations: Array<any>;

  constructor(private calendarService: CalendarService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    private modalService: NgbModal
    ) {
    super();
  }

  ngOnInit(): void {
    this.currentUser = this.authService.currentUser;
    this.route.data.subscribe((data) => {
      this.data = data;
    });
    this.currentViewCalendar = 'dayGridMonth';
    this.initCalendar();
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
    this.selectAllForDropdownItems(this.data.users)
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
      locale: esLocale,
      headerToolbar: {
        left: 'prev,today,next',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
      },
      customButtons: {
        prev: {
          text: 'prev',
          click: () => {
            this.onClickPrev();
          }
        },
        next: {
          text: 'next',
          click: () => {
            this.onClickNext();
          }
        },
        today: {
          text: 'Hoy',
          click: () => {
            this.onClickToday()
          }
        },
        dayGridMonth: {
          text: 'Mes',
          click: () => {
            console.log('Mes')
            this.onChangeViewCalendar('dayGridMonth');
          }
        },
        timeGridWeek: {
          text: 'Semana',
          click: () => {
            console.log('Semana')
            this.onChangeViewCalendar('timeGridWeek');
          }
        },
        timeGridDay: {
          text: 'Día',
          click: () => {
            console.log('Día')
            this.onChangeViewCalendar('timeGridDay');
          }
        },
        listWeek: {
          text: 'Agenda semanal',
          click: () => {
            console.log('Agenda semanal')
            this.onChangeViewCalendar('listWeek');
          }
        }
      },

      weekends: true,
      editable: true,
      selectable: true,
      selectMirror: true,
      dayMaxEvents: true,
      dateClick: (info) => {
        this.showCardEventsByDay(info.date);
        console.log(info)

      },
      drop: (infoDrop) => { //cuando el evento es dropped dentro del calendario
        let currentDate = new Date();
        currentDate = moment(currentDate).startOf('date').toDate();
        if (moment(currentDate).isSameOrBefore(infoDrop.date)) {
          this.eventDetail = new EventDetail();
          this.eventDetail.eventDate = { year: infoDrop.date.getFullYear(), month: infoDrop.date.getMonth() + 1, day: infoDrop.date.getDate() };
          this.eventDetail.classNames = infoDrop.draggedEl.classList.item(1);
          this.eventDetail.ownerEvent = this.currentUser.email;
          this.eventDetail.accreditationRequired = true;
          this.addAccreditationItem();
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
      eventClick: this.handleEventClick.bind(this),
      eventDrop: this.handleEventDrop.bind(this),
      eventResize: this.handleEventResize.bind(this)
    } as CalendarOptions;
  }


  /**
 * Event new event
 * @param clickInfo 
 */
  async handleNewEvent() {
    this.selectedDay
    this.eventDetail = new EventDetail();
    this.eventDetail.eventDate = { year: this.selectedDay.getFullYear(), month: this.selectedDay.getMonth() + 1, day: this.selectedDay.getDate() };
    this.eventDetail.classNames = 'bgcolor-orange';
    this.eventDetail.ownerEvent = this.currentUser.email; 
    this.eventDetail.accreditationRequired = true;
    this.addAccreditationItem();
    this.modalAddEvent = this.modalService.open(this.addEvent, { size: 'lg' });
  }

  /**
   * Event click over event
   * @param clickInfo 
   */
  async handleEventClick(clickInfo: EventClickArg) {
    await this.getEventById(clickInfo.event.id)
    if (this.eventDetail) {
      this.modalAddEvent = this.modalService.open(this.addEvent, { size: 'lg' });
    }
  }

  /**
 * Event click over event
 * @param clickInfo 
 */
  async handleEditEvent(id: string) {
    await this.getEventById(id);
    if (this.eventDetail) {
      this.modalAddEvent = this.modalService.open(this.addEvent, { size: 'lg' });
    }
  }

  /**
   * Get event detail by id
   * @param id 
   */
  async getEventById(id: string) {
    this.eventDetail = await this.calendarService.getEventByIdWithAccreditation(id);
    console.log(this.eventDetail)
  }

  /**
   * Event drop between into dates
   * @param eventDropInfo 
   */
  async handleEventDrop(eventDropInfo: EventDropArg) {
    console.log('eventDropInfo', eventDropInfo.event.start);
    console.log('eventDropInfo', eventDropInfo.event.end);
    await this.getEventById(eventDropInfo.event.id);
    if (this.eventDetail) {
      this.eventDetail.eventDate = { year: eventDropInfo.event.start.getFullYear(), month: eventDropInfo.event.start.getMonth() + 1, day: eventDropInfo.event.start.getDate() }
      this.eventDetail.startHour = { hour: parseInt(moment(eventDropInfo.event.start).format('HH')), minute: parseInt(moment(eventDropInfo.event.start).format('mm')), second: 0 };
      this.eventDetail.endHour = { hour: parseInt(moment(eventDropInfo.event.end).format('HH')), minute: parseInt(moment(eventDropInfo.event.end).format('mm')), second: 0 }
      this.modalAddEvent = this.modalService.open(this.addEvent, { size: 'lg' });
    }
  }

  /**
   * Event Resize hours
   * @param eventResizeInfo 
   */
   async handleEventResize(eventResizeInfo: EventResizeStopArg){
    console.log('eventResizeInfo', eventResizeInfo.event.start);
    console.log('eventResizeInfo', eventResizeInfo.event.end);
    await this.getEventById(eventResizeInfo.event.id);
    if (this.eventDetail) {
      this.eventDetail.eventDate = { year: eventResizeInfo.event.start.getFullYear(), month: eventResizeInfo.event.start.getMonth() + 1, day: eventResizeInfo.event.start.getDate() }
      this.eventDetail.startHour = { hour: parseInt(moment(eventResizeInfo.event.start).format('HH')), minute: parseInt(moment(eventResizeInfo.event.start).format('mm')), second: 0 };
      this.eventDetail.endHour = { hour: parseInt(moment(eventResizeInfo.event.end).format('HH')), minute: parseInt(moment(eventResizeInfo.event.end).format('mm')), second: 0 }
      this.modalAddEvent = this.modalService.open(this.addEvent, { size: 'lg' });
    }
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
        this.selectedStartDateCalendar = moment(currentDate).startOf('month').format('YYYY-MM-DD') + ` ${this.startHour}`;
        this.selectedEndDateCalendar = moment(currentDate).endOf('month').format('YYYY-MM-DD') + ` ${this.endHour}`;
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
 * load events in calendar
 */
  async loadEventsCalendar() {
    this.calendarApi.removeAllEvents();
    const resp = await this.calendarService.getEventsWithAccreditations(this.selectedStartDateCalendar, this.selectedEndDateCalendar);
    this.events = resp.events;
    this.calendarApi.addEventSource(this.events);
    this.calendarApi.render();
  }

  /**
   * load events by date
   * @param day 
   */
  async showCardEventsByDay(day: Date) {
    this.selectedDay = day;
    const startDate = moment(day).startOf('hour').format('YYYY-MM-DD') + ` ${this.startHour}`;
    const endDate = moment(day).endOf('hour').format('YYYY-MM-DD') + ` ${this.endHour}`;
    const resp = await this.calendarService.getEventsWithAccreditations(startDate, endDate);
    this.eventsByDay = resp.eventsDetail;
    this.showCardEvents = true;
    setTimeout(() => {
      this.calendarApi.render();
    }, 150);
  }

  /**
   * close card with list od events
  */
  closeCardEventByDay() {
    this.eventsByDay = null;
    this.showCardEvents = false;
    setTimeout(() => {
      this.calendarApi.render();
    }, 150);
  }

  /**
   * Event try to click button prev
  */
  async onClickPrev() {
    this.calendarApi.prev();
    this.loadCalendarByRangeDate(this.currentViewCalendar);
  }


  /**
 * Event try to click button next
*/
  async onClickNext() {
    this.calendarApi.next();
    this.loadCalendarByRangeDate(this.currentViewCalendar);
  }

  /**
   * Event try to click button today
  */
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
    this.showCardEvents = false;
    modalRef.close();
  }


  /**
   * Delete event
   * @param id 
   */
  async deleteEvent(id: string) {
    await this.calendarService.deleteEvent(id);
    this.loadCalendarByRangeDate(this.currentViewCalendar);
    this.showCardEvents = false;
  }


  /**
   * Save event
   * @param form 
   */
  async onSubmit(form: NgForm, modalRef: NgbModalRef) {
    console.log('form',form.value)
    if (form.valid) {
      if (this.isValidEventDate(this.eventDetail)) {
        if (this.isValidEventHours(this.eventDetail)) {
          if(form.value.eventColor && Array.isArray(form.value.eventColor)){
            this.setInputColorError('Indique el color del evento');
            return;
          }
          console.log(this.eventDetail);
          console.log('eventDetail for post',EventDetail.mapForPost(this.eventDetail));
          await this.calendarService.storeEvent(EventDetail.mapForPost(this.eventDetail), this.eventDetail.id);
          this.close(modalRef);
        } else {
          this.setInputError('La hora de inicio debe ser menor o igual a la hora fin del evento');
        }

      } else {
        const cuerrentDate = moment(new Date()).format('YYYY-MM-DD HH:mm')
        this.setInputError(`Indique una fecha y hora igual o superior a la fecha y hora actual: ${cuerrentDate}`);
      }

    }else{
      
    }
  }

  /**
   * Validate date of event
   * @param eventDetail 
   * @returns 
   */
  isValidEventDate(eventDetail: EventDetail) {
    const start = EventDetail.getStartEvent(eventDetail);
    return moment(new Date()).isSameOrBefore(start);
  }

  /**
 * Validate hour of event
 * @param eventDetail 
 * @returns 
 */
  isValidEventHours(eventDetail: EventDetail) {
    const startHour = eventDetail.startHour.hour;
    const startMinute = eventDetail.startHour.minute;
    const endHour = eventDetail.endHour.hour;
    const endMinute = eventDetail.endHour.minute;

    if (startHour < endHour) {
      return true;
    } else if (startHour == endHour) {
      if (startMinute <= endMinute) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }

  }

  /**
   * add accreditation item to event
   */
  addAccreditationItem(){
    if(!this.eventDetail.accreditationItems){
      this.eventDetail.accreditationItems = new Array<AcreditationItem>();
    } 
    const indexNew = this.eventDetail.accreditationItems.length + 1;   
    const accreditationItems = new AcreditationItem();
    accreditationItems.quantity = '1';
    accreditationItems.controlName = 'accreditatioType'+indexNew;
    accreditationItems.controlQuantity = 'accreditatioQuantity'+indexNew;
    this.eventDetail.accreditationItems.push(accreditationItems)
  }

  deleteAccreditationItem(i:number){
    this.eventDetail.accreditationItems.splice(i,1);
  }

  /**
   * mark como selectable
   * @param items 
   */
  selectAllForDropdownItems(items: any[]) {
    let allSelect = items => {
      items.forEach(element => {
        element['selectedAllGroup'] = 'selectedAllGroup';
      });
    };

    allSelect(items);
  }


  print(id:string){
    this.router.navigate(['/accreditations/print'],{queryParams:{idEvent:id}})
  }


  /**
   * 
   * @param id 
   */
  async cloneEvent(id:string){
    await this.calendarService.cloneEvent(id);
    this.loadCalendarByRangeDate(this.currentViewCalendar);
    this.showCardEvents = false;
  }


}
