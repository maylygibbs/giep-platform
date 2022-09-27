import { InstrumentsService } from './../../../../core/services/instruments.service';
import { Instrument } from './../../../../core/models/instrument';
import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { environment } from '../../../../../environments/environment';
import { Question } from 'src/app/core/models/question';

@Component({
  selector: 'app-box-instruments',
  templateUrl: './box-instruments.component.html',
  styleUrls: ['./box-instruments.component.scss']
})
export class BoxInstrumentsComponent implements OnInit {

  @Input()
  instruments: Array<any>;
  instrument: Instrument;
  show: boolean = false;
  submitted: boolean = false;

  sectionActive: number = 0;

  environment = environment;

  constructor(private instrumentsService: InstrumentsService) { }

  async ngOnInit() {
    this.instrument = await this.instrumentsService.getInstrumentsById(this.instruments[0].id);
    console.log('instrument', this.instrument);
  }

  /**
 * Go to next section
 */
  nextSection() {
    this.sectionActive++;
  }

  /**
   * Go to back section
   */
  backSection() {
    this.sectionActive--;
  }

  onChangeCheckbox(event:any, question:Question, optionId:string){
    console.log(event)
    if(!question.valueResp){
      question.valueResp = [];
    }
    if(event.target.checked){
      question.valueResp.push(optionId);
    }else{
      question.valueResp = question.valueResp.filter((item)=> item != optionId);
    }
  }


  /**
   * stores user responses
   * @param form 
   */
  async onSubmit(form: NgForm) {
    if (form.valid) {
      this.submitted = true;
      console.log('instrument resp', this.instrument);
      console.log('instrument map', Instrument.mapForPostResponse(this.instrument));
      await this.instrumentsService.storeInstrumetsResponse(Instrument.mapForPostResponse(this.instrument))
      this.submitted = false;
    }

  }

  reset(form: NgForm) {
    form.onReset();
    this.show = false;
  }

}
