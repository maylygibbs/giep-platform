import { InstrumentsService } from './../../../../core/services/instruments.service';
import { Instrument } from './../../../../core/models/instrument';
import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { environment } from '../../../../../environments/environment';
import { Question } from '../../../../core/models/question';
import { CountdownComponent, CountdownConfig } from 'ngx-countdown';


@Component({
  selector: 'app-box-instruments',
  templateUrl: './box-instruments.component.html',
  styleUrls: ['./box-instruments.component.scss']
})
export class BoxInstrumentsComponent implements OnInit {

  @Input()
  instruments: Array<any>;

  @Output()
  onFinish: EventEmitter<boolean> = new EventEmitter<boolean>();

  @ViewChild('cd', { static: false }) private countdown: CountdownComponent;

  instrument: Instrument;
  show: boolean = false;
  submitted: boolean = false;

  sectionActive: number = 0;

  environment = environment;

  config: CountdownConfig;

  constructor(private instrumentsService: InstrumentsService) { }

  async ngOnInit() {
    this.instrument = await this.instrumentsService.getInstrumentsById(this.instruments[0].id);

    this.config = { stopTime: new Date().getTime() + this.getDurationCountDown(this.instrument), demand:true };
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

  onChangeCheckbox(event: any, question: Question, optionId: string) {
    console.log(event)
    if (!question.valueResp) {
      question.valueResp = [];
    }
    if (event.target.checked) {
      question.valueResp.push(optionId);
    } else {
      question.valueResp = question.valueResp.filter((item) => item != optionId);
    }
  }

  /**
   * Return duration of instrument in miliseconds
   * @param instrument 
   */
  getDurationCountDown(instrument: Instrument):number {
    let second: number;
    switch (instrument.unitType.value) {
      case '1'://dia
          second = (((Number(instrument.dutation)*24 )* 60) * 60);
        break;
      case '2'://minutos
        second = Number(instrument.dutation) * 60;
        break;
      case '3'://horas
        second = ((Number(instrument.dutation) * 60) * 60);
      break;  
      case '4'://segundos
        second = Number(instrument.dutation);
      break;  
    }
    return second * 1000;
  }

  /**
   * Prepare init answere
   */
  initAnswerInstrument() {
    this.show = true;
    this.countdown.begin();
  }

  /**
   * handle event of countdown
   * @param event 
   */
  handleEvent(event) {
    console.log('event coutdown', event);
    switch (event.action) {
      case 'start':
          this.instrumentsService.registerInitAnswarInstrument();
        break;
      case 'done':
          this.instrumentsService.registerTimeoutInstrument();
        break;   
      default:
        break;
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
      await this.instrumentsService.storeInstrumetsResponse(Instrument.mapForPostResponse(this.instrument));
      this.countdown.pause();
      setTimeout(() => {
        this.onFinish.emit(true);
        this.submitted = false;
      }, 1000);

    }

  }


  reset(form: NgForm) {
    form.onReset();
    this.show = false;
  }

}
