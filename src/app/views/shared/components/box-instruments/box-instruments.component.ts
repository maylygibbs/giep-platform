import { InstrumentsService } from './../../../../core/services/instruments.service';
import { Instrument } from './../../../../core/models/instrument';
import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-box-instruments',
  templateUrl: './box-instruments.component.html',
  styleUrls: ['./box-instruments.component.scss']
})
export class BoxInstrumentsComponent implements OnInit {

  @Input()
  instruments: Array<any>;
  instrument:Instrument;
  show:boolean = false;
  submitted:boolean = false;

  constructor(private instrumentsService:InstrumentsService) { }

  async ngOnInit() {
    this.instrument = await this.instrumentsService.getInstrumentsById(this.instruments[0].id);

  }

  /**
   * stores user responses
   * @param form 
   */
  async onSubmit(form:NgForm){
    if(form.valid){
        this.submitted = true;
      console.log('instrument resp', this.instrument);
      console.log('instrument map',Instrument.mapForPostResponse(this.instrument));
      await this.instrumentsService.storeInstrumetsResponse(Instrument.mapForPostResponse(this.instrument))
      this.submitted = false;
    }

  }

  reset(form:NgForm){
      form.onReset();
      this.show = false;
  }

}
