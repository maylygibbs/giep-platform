import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../../environments/environment';
import { HttpService } from './http.service';
import * as moment from 'moment';
import { EventDetail } from '../models/event-detail';
import { AuthService } from './auth.service';
import { AcreditationItem } from '../models/accreditation-item';

@Injectable({
  providedIn: 'root'
})
export class CalendarService extends HttpService {

  constructor(protected http: HttpClient,
    private authService: AuthService,
    private toastrService: ToastrService) {
    super(http);
  }


  /**
   * Get events by range
   * @param startDate 
   * @param endDate 
   * @returns 
   */
  async getEvents(start: string, end: string): Promise<any> {
    const currentUser = this.authService.currentUser;
    let events: Array<any> = new Array<any>();
    let eventsDetail: Array<EventDetail> = new Array<EventDetail>();
    try {
      const resp = await firstValueFrom(this.post(environment.apiUrl, `/calendario/event/list`, { start, end }));
      let currentDate = moment(new Date()).startOf('date');
      events = resp.data?.map((item: any) => {

        const eventPast = moment(item.end).isBefore(currentDate);
        const classNames = eventPast ? ['event-font', 'event-past'] : item.classNames;


        return {
          id: item.id,
          title: item.title,
          start: item.start,
          end: item.end,
          classNames: classNames,
          editable: eventPast ? false : true
        }

      });

      eventsDetail = resp.data?.map((item: any) => {

        const eventPast = moment(item.end).isBefore(currentDate);
        const classNames = eventPast ? ['event-font', 'event-past'] : item.classNames;
        const eventDetail = new EventDetail();
        eventDetail.id = item.id;
        eventDetail.title = item.title;
        eventDetail.start = item.start;
        eventDetail.end = item.end;
        eventDetail.description = item.description;

        eventDetail.startHour = moment(item.start).format('HH:mm');
        eventDetail.endHour = moment(item.end).format('HH:mm');
        eventDetail.classNames = classNames;
        eventDetail.ownerEvent = item.ownerEvent === currentUser.email? item.ownerEvent : null;

        return eventDetail;

      });

      return {
        events: events,
        eventsDetail: eventsDetail,
      };

    } catch (error: any) {
      if (error.status != 500) {
        this.toastrService.error('', 'Ha ocurrido un error. Intente más tarde.');
      } else {
        this.toastrService.error('', error.msg);
      }
      return null;
    }
  }


  /**
   * Create o Upedate event
   * @param event 
   */
  async storeEvent(event: any, id: any) {
    try {
      !id ? await firstValueFrom(this.post(environment.apiUrl, '/calendario/event', event)) : await firstValueFrom(this.put(environment.apiUrl, `/calendario/event/${id}`, event));
      this.toastrService.success(!id ? 'El evento fué creado con éxito.': 'El evento fué actualizado con éxito.');
    } catch (error) {
      this.toastrService.error(!id ? 'Ha ocurrido un error creando evento.': 'Ha ocurrido un error actualizando evento.');
    }
  }

  /**
 * Create o Upedate event
 * @param event 
 */
  async deleteEvent(id: any) {
    try {
      await firstValueFrom(this.delete(environment.apiUrl, `/calendario/event/${id}`));
      this.toastrService.success('El evento fué eliminado con éxito.');
    } catch (error) {
      this.toastrService.error('Ha ocurrido un error eliminado evento.');
    }
  }

  /**
   * Get evento by id
   */
  async getEventById(id: string): Promise<EventDetail> {
    const currentUser = this.authService.currentUser;
    let eventsDetail: Array<EventDetail>;
    let eventDetail: EventDetail;
    try {
      const resp = await firstValueFrom(this.get(environment.apiUrl, `/calendario/event/getone/${id}`));
      let currentDate = moment(new Date()).startOf('date');
      eventsDetail = resp.data?.map((item: any) => {

        const eventPast = moment(item.end).isBefore(currentDate);
        const classNames = eventPast ? ['event-font', 'event-past'] : item.classNames;
        const eventDetail = new EventDetail();
        eventDetail.id = item.id;
        eventDetail.title = item.title;
        eventDetail.start = item.start;
        eventDetail.end = item.end;
        eventDetail.description = item.description;
        const d = new Date(item.start);
        eventDetail.eventDate = { year: d.getFullYear(), month: d.getMonth() + 1, day: d.getDate() };
        eventDetail.startHour = { hour: parseInt(moment(item.start).format('HH')), minute: parseInt(moment(item.start).format('mm')), second: 0 };
        eventDetail.endHour = { hour: parseInt(moment(item.end).format('HH')), minute: parseInt(moment(item.end).format('mm')), second: 0 };
        eventDetail.classNames = classNames;
        eventDetail.usersInvited = item.calendarUsers;
        eventDetail.ownerEvent = item.ownerEvent === currentUser.email? item.ownerEvent : null;
        eventDetail.accreditationRequired = item.acreditacion == 1 ? true:false;
        return eventDetail;

      });
      eventDetail = eventsDetail[0];
      return eventDetail;
    } catch (error) {
      this.toastrService.error('Ha ocurrido un error cargando el evento.');
      return eventDetail;
    }
  }



    /**
   * Get evento by id
   */
    async getEventByIdWithAccreditation(id: string): Promise<EventDetail> {
      const currentUser = this.authService.currentUser;
      let eventsDetail: Array<EventDetail>;
      let eventDetail: EventDetail;
      try {
        const resp = await firstValueFrom(this.get(environment.apiUrl, `/calendario/event/getone/acreditacion/${id}`));
        let currentDate = moment(new Date()).startOf('date');
        eventsDetail = resp.data?.map((item: any) => {
  
          const eventPast = moment(item.end).isBefore(currentDate);
          const classNames = eventPast ? ['event-font', 'event-past'] : item.classNames;
          const eventDetail = new EventDetail();
          eventDetail.id = item.id;
          eventDetail.title = item.title;
          eventDetail.start = item.start;
          eventDetail.end = item.end;
          eventDetail.description = item.description;
          const d = new Date(item.start);
          eventDetail.eventDate = { year: d.getFullYear(), month: d.getMonth() + 1, day: d.getDate() };
          eventDetail.startHour = { hour: parseInt(moment(item.start).format('HH')), minute: parseInt(moment(item.start).format('mm')), second: 0 };
          eventDetail.endHour = { hour: parseInt(moment(item.end).format('HH')), minute: parseInt(moment(item.end).format('mm')), second: 0 };
          eventDetail.classNames = classNames;
          eventDetail.usersInvited = item.calendarUsers.map((item:any)=>{
            return item.email;
          });
          eventDetail.usersAccredited = item.calendarUsers?.map((user)=>{
            debugger
            Object.assign(user,{dataQr: JSON.stringify({idEvent: eventDetail.id, userId: user.userId})});
            return user;
          });
          eventDetail.ownerEvent = item.ownerEvent === currentUser.email? item.ownerEvent : null;
          eventDetail.accreditationRequired = item.acreditacion == 1 ? true:false;
          if(item.calendarUsers && item.calendarUsers.length>0){
            eventDetail.accreditationItems = item.calendarUsers[0].accreditationItems.map((accItem:any,index:number)=>{
              const acreditationItem = new AcreditationItem();
              acreditationItem.id = accItem.idTipo;
              acreditationItem.name = accItem.description;
              acreditationItem.quantity = accItem.Cantidad? accItem.Cantidad : 1;
              acreditationItem.controlName = 'accreditatioType'+index;
              acreditationItem.controlQuantity = 'accreditatioQuantity'+index;
              return acreditationItem;
            })
          };

          return eventDetail;
  
        });
        eventDetail = eventsDetail[0];
        return eventDetail;
      } catch (error) {
        this.toastrService.error('Ha ocurrido un error cargando el evento.');
        return eventDetail;
      }
    }



    /**
   * Get events by range
   * @param startDate 
   * @param endDate 
   * @returns 
   */
    async getEventsWithAccreditations(start: string, end: string): Promise<any> {
      const currentUser = this.authService.currentUser;
      let events: Array<any> = new Array<any>();
      let eventsDetail: Array<EventDetail> = new Array<EventDetail>();
      try {
        const resp = await firstValueFrom(this.post(environment.apiUrl, `/calendario/event/list/acreditacion`, { start, end }));
        let currentDate = moment(new Date()).startOf('date');
        events = resp.data?.map((item: any) => {
  
          const eventPast = moment(item.end).isBefore(currentDate);
          const classNames = eventPast ? ['event-font', 'event-past'] : item.classNames;
  
  
          return {
            id: item.id,
            title: item.title,
            start: item.start,
            end: item.end,
            classNames: classNames,
            editable: eventPast ? false : true
          }
  
        });
  
        eventsDetail = resp.data?.map((item: any) => {
  
          const eventPast = moment(item.end).isBefore(currentDate);
          const classNames = eventPast ? ['event-font', 'event-past'] : item.classNames;
          const eventDetail = new EventDetail();
          eventDetail.id = item.id;
          eventDetail.title = item.title;
          eventDetail.start = item.start;
          eventDetail.end = item.end;
          eventDetail.description = item.description;
  
          eventDetail.startHour = moment(item.start).format('HH:mm');
          eventDetail.endHour = moment(item.end).format('HH:mm');
          eventDetail.classNames = classNames;
          eventDetail.ownerEvent = item.ownerEvent === currentUser.email? item.ownerEvent : null;
  
          return eventDetail;
  
        });
  
        return {
          events: events,
          eventsDetail: eventsDetail,
        };
  
      } catch (error: any) {
        if (error.status != 500) {
          this.toastrService.error('', 'Ha ocurrido un error. Intente más tarde.');
        } else {
          this.toastrService.error('', error.msg);
        }
        return null;
      }
    }

}
