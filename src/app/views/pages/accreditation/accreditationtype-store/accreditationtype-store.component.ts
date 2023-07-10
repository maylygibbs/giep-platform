import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SelectOption } from '../../../../core/models/select-option';
import { AccreditationType } from '../../../../core/models/accreditation-type';
import { CalendarService } from '../../../../core/services/calendar.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-accreditationtype-store',
  templateUrl: './accreditationtype-store.component.html',
  styleUrls: ['./accreditationtype-store.component.scss']
})
export class AccreditationtypeStoreComponent implements OnInit {



  @Input()
  input: AccreditationType;

  @Output()
  onBack: EventEmitter<any> = new EventEmitter<any>();

  accreditationtTypeStatus: boolean;

  constructor(private calendarService: CalendarService) { }

  ngOnInit(): void {
    if (!this.input.id) {
      this.input.status = new SelectOption('1');
      this.accreditationtTypeStatus = true;
    } else {
      this.accreditationtTypeStatus = this.input.status.value == '1' ? true : false;
    }
  }


    /**
 * Handle event change status
 * @param event 
 */
    onChangeStatus(event: any) {
      this.input.status = this.accreditationtTypeStatus == true ? new SelectOption('1') : new SelectOption('2');
    }
  
  
    /**
     * Submit form input type
     * @param form 
     */
    async onSubmit(form: NgForm) {
      if (form.valid) {
        await this.calendarService.storeAccreditationType(this.input);
        this.back();
      }
    }
  
    /**
   * Return to back page
   */
    back() {
      this.onBack.emit(null);
    }

}
