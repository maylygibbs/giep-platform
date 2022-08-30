import { InstrumentsService } from './../../../../../core/services/instruments.service';
import { InputType } from './../../../../../core/models/input-type';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-input-store',
  templateUrl: './input-store.component.html',
  styleUrls: ['./input-store.component.scss']
})
export class InputStoreComponent implements OnInit {


  @Input()
  input: InputType;

  @Output()
  onBack: EventEmitter<any> = new EventEmitter<any>();

  constructor(private instrumentsService: InstrumentsService) {}

  ngOnInit(): void {
  }


  async onSubmit(form:NgForm){
    if(form.valid){
      await this.instrumentsService.storeInputType(this.input);
      this.back();
    }

  }

  back(){
    this.onBack.emit(null);
  }

}
