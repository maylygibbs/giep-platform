import { UnitType } from './../../../../../core/models/unit-type';
import { InstrumentsService } from './../../../../../core/services/instruments.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-unit-store',
  templateUrl: './unit-store.component.html',
  styleUrls: ['./unit-store.component.scss']
})
export class UnitStoreComponent  implements OnInit {

  @Input()
  unit: UnitType;

  @Output()
  onBack: EventEmitter<any> = new EventEmitter<any>();

  constructor(private instrumentsService: InstrumentsService) { }

  ngOnInit(): void {
  }

  async onSubmit(form:NgForm){
    if(form.valid){
      await this.instrumentsService.storeUnitType(this.unit);
      this.back();
    }

  }

  back(){
    this.onBack.emit(null);
  }

}
