import { Instrument } from './../../../../../core/models/instrument';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-instrument-store',
  templateUrl: './instrument-store.component.html',
  styleUrls: ['./instrument-store.component.scss']
})
export class InstrumentStoreComponent implements OnInit {

  @Input()
  instrument: Instrument;

  @Output()
  onBack: EventEmitter<any> = new EventEmitter<any>();

  defaultNavActiveId = 1;

  constructor() { }

  ngOnInit(): void {
  }

  back(){
    this.onBack.emit(null);
  }

}
