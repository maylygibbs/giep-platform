import { Component, OnInit } from '@angular/core';
import { EventDetail } from '../../../../core/models/event-detail';
import { CalendarService } from '../../../../core/services/calendar.service';

@Component({
  selector: 'app-accreditation-detail',
  templateUrl: './accreditation-detail.component.html',
  styleUrls: ['./accreditation-detail.component.scss']
})
export class AccreditationDetailComponent implements OnInit {

  data:any
  eventDetail: EventDetail;

  constructor(private calendarService: CalendarService) { }

  async ngOnInit() {
    this.data ={"idEvent":27,"userId":48} //history.state.infoQR;
    await this.getEventById(this.data.idEvent);
  }


    /**
   * Get event detail by id
   * @param id 
   */
    async getEventById(id: string) {
      this.eventDetail = await this.calendarService.getEventByIdWithAccreditation(id);
      console.log('eventDetail', this.eventDetail)
    }

}
