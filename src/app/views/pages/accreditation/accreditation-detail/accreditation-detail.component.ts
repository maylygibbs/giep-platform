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
  eventDetail: EventDetail;

  constructor(private calendarService: CalendarService, private router: Router) { }

  async ngOnInit() {
    this.data = history.state.infoQR;
    if(this.data){
      await this.getEventById(this.data.idEvent, this.data.userId);
    }else{
      this.router.navigate(['/accreditations/scanqr'])
    }
    
  }


    /**
   * Get event detail by id
   * @param id 
   */
    async getEventById(idEvent: string, userId:string) {
      this.eventDetail = await this.calendarService.getUserAccreditationDetail(idEvent, userId);
      console.log('eventDetail', this.eventDetail)
    }

    async consumeAccreditationItem(idAccreditationItem:string){
      await this.calendarService.consumeAccreditationItem(idAccreditationItem);
      await this.getEventById(this.data.idEvent, this.data.userId);   
    }

}
