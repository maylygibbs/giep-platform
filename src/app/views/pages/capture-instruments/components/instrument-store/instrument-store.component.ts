import { InstrumentsService } from './../../../../../core/services/instruments.service';
import { BaseComponent } from './../../../../shared/components/base/base.component';
import { User } from './../../../../../core/models/user';
import { Section } from './../../../../../core/models/section';
import { Instrument } from './../../../../../core/models/instrument';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { environment } from './../../../../../../environments/environment';

@Component({
  selector: 'app-instrument-store',
  templateUrl: './instrument-store.component.html',
  styleUrls: ['./instrument-store.component.scss']
})
export class InstrumentStoreComponent extends BaseComponent implements OnInit {

  @Input()
  instrument: Instrument;

  @Output()
  onBack: EventEmitter<any> = new EventEmitter<any>();

  defaultNavActiveId = 1;

  data:any;

  environment = environment;

  users: Array<any>;
  selectedUsers = [];

  constructor(private route: ActivatedRoute,
    private instrumentsService: InstrumentsService) {
    super();
   }

  ngOnInit(): void {
    this.route.data.subscribe((data)=>{      
      this.data = data;
    });
  }


  addSection(){
    const section = new Section();
    section.numberSection = this.instrument.sections.length + 1;
    this.instrument.sections.push(section)
  }

  deleteSection(section:Section){
    this.instrument.sections = this.instrument.sections.filter((item)=>item.numberSection != section.numberSection);
    
  }



  back(){
    this.onBack.emit(null);
  }


  async loadUsersByRoles(){
    console.log('roles', this.instrument.roles);
    this.users = await this.instrumentsService.getUsersByRoles(this.arrayToString(this.instrument.roles,'|'));
    console.log('resp',this.users)
  }

}
