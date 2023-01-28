import { UnitType } from './../../../../../core/models/unit-type';
import { InstrumentsService } from './../../../../../core/services/instruments.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { SelectOption } from './../../../../../core/models/select-option';

@Component({
  selector: 'app-unit-store',
  templateUrl: './unit-store.component.html',
  styleUrls: ['./unit-store.component.scss']
})
export class UnitStoreComponent implements OnInit {

  @Input()
  unit: UnitType;

  @Output()
  onBack: EventEmitter<any> = new EventEmitter<any>();

  unitStatus: boolean;

  constructor(private instrumentsService: InstrumentsService) { }

  ngOnInit(): void {
    if(!this.unit.id){
      this.unit.status = new SelectOption('1');
      this.unitStatus = true;
    }else{
      this.unitStatus = this.unit.status.value == '1'? true: false;
    }
  }


  /**
 * Handle event change status
 * @param event 
 */
  onChangeStatus(event: any) {
    this.unit.status = this.unitStatus == true ? new SelectOption('1') : new SelectOption('2');
  }

  /**
 * Submit form rol
 * @param form 
 */
  async onSubmit(form: NgForm) {
    if (form.valid) {
      await this.instrumentsService.storeUnitType(this.unit);
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
