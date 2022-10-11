import { Component, OnInit, ViewChild, ElementRef, TemplateRef } from '@angular/core';

import { CalendarOptions, DateSelectArg, EventClickArg, EventApi, FullCalendarComponent, Calendar } from '@fullcalendar/angular';
import { Draggable } from '@fullcalendar/interaction'; // for dateClick
import { INITIAL_EVENTS, createEventId } from './event-utils';
import { CalendarService } from '../../../../core/services/calendar.service';
import * as moment from "moment";
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { EventDetail } from '../../../../core/models/event-detail';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {

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
  eventsByDay: EventApi[] = [];
  selectedStartDateCalendar: string;
  selectedEndDateCalendar: string;
  startHour: string = '00:00:00';
  endHour: string = '23:59:00';
  calendarApi: Calendar;

  selectedDay: Date;
  showCardEvents: boolean = false;

  eventDetail: EventDetail;

  minDateEvent = { year: new Date().getFullYear(), month: (new Date().getMonth()) + 1, day: new Date().getDate() }

  constructor(private calendarService: CalendarService,
    private route: ActivatedRoute,
    private modalService: NgbModal) { }

  ngOnInit(): void {
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
      eventClick: this.handleEventClick.bind(this),
      //eventsSet: this.handleEvents.bind(this)
      /* you can update a remote database when these fire:
      eventAdd:
      eventChange:
      eventRemove:
      */
    } as CalendarOptions;
  }

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
    this.selectedDay = day;
    const startDate = moment(day).startOf('hour').format('YYYY-MM-DD') + ` ${this.startHour}`;
    const endDate = moment(day).endOf('hour').format('YYYY-MM-DD') + ` ${this.endHour}`;
    this.eventsByDay = await this.calendarService.getEvents(startDate, endDate);
    this.showCardEvents = true;
    setTimeout(() => {
      this.calendarApi.render();
    }, 150);
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


  /**
   * Save event
   * @param form 
   */
  async onSubmit(form: NgForm, modalRef:NgbModalRef) {
    if (form.valid) {
      console.log(this.eventDetail);
      console.log(EventDetail.mapForPost(this.eventDetail));
      await this.calendarService.storeEvent(EventDetail.mapForPost(this.eventDetail));
      this.close(modalRef);
    }
  }


}
