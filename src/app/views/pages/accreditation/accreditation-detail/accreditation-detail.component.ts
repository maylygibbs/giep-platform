import { Component, OnInit } from '@angular/core';
import { EventDetail } from '../../../../core/models/event-detail';
import { CalendarService } from '../../../../core/services/calendar.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-accreditation-detail',
  templateUrl: './accreditation-detail.component.html',
  styleUrls: ['./accreditation-detail.component.scss']
})
export class AccreditationDetailComponent implements OnInit {

  data:any
  events: Array<EventDetail>;

  constructor(private calendarService: CalendarService, private router: Router) { }

  async ngOnInit() {
    this.data = history.state.infoQR;
    if(this.data){
      await this.getEventByIds(this.data.idEvent, this.data.userId);
    }else{
      this.router.navigate(['/accreditations/scanqr'])
    }
    
  }


    /**
   * Get event detail by id
   * @param id 
   */
    async getEventByIds(idEvent: string, userId:string) {
      this.events = await this.calendarService.getAllUserAccreditationDetail(idEvent, userId);
      console.log('events', this.events)
    }

    async consumeAccreditationItem(idAccreditationItem:string){
      await this.calendarService.consumeAccreditationItem(idAccreditationItem);
      await this.getEventByIds(this.data.idEvent, this.data.userId);   
    }

}
