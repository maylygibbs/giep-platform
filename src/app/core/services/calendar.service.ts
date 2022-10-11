import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../../environments/environment';
import { HttpService } from './http.service';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class CalendarService extends HttpService {

  constructor(protected http:HttpClient,
    private toastrService: ToastrService) {
    super(http);
   }


   /**
    * Get events by range
    * @param startDate 
    * @param endDate 
    * @returns 
    */
   async getEvents(start:string, end:string): Promise<any>{
    let events: Array<any> = new Array<any>();
    try {
      const resp = await firstValueFrom(this.post(environment.apiUrl, `/calendario/event/list`, {start, end}));
      let currentDate = moment(new Date()).startOf('date');
      console.log(currentDate);
      
      events = resp.data?.map((item:any)=>{

        const eventPast = moment(item.end).isBefore(currentDate);
        const classNames = eventPast ? ['event-font', 'event-past'] : item.classNames;


        return {
          id: item.id,
          title: item.title,
          start: item.start,
          end: item.end,
          className: classNames,
          editable: eventPast ? false : true
        }

      });
      return events;
      
    } catch (error:any) {
      if (error.status != 500) {
        this.toastrService.error('','Ha ocurrido un error. Intente más tarde.');
      }else{
        this.toastrService.error('',error.msg);
      }
      return events;
    }
   }


   /**
    * Create o Upedate event
    * @param event 
    */
  async storeEvent(event: any){
    try{
      await firstValueFrom(this.post(environment.apiUrl, '/calendario/event' , event));
      this.toastrService.success('El evento fué creado con éxito.');
    }catch(error){
      this.toastrService.error('Ha ocurrido un error creando evento.');
    }
   }

   /**
    * 
    */
   getEventById(id:string){

   }

}
