import { InstrumentsService } from './../../../../../core/services/instruments.service';
import { BaseComponent } from './../../../../shared/components/base/base.component';
import { User } from './../../../../../core/models/user';
import { Section } from './../../../../../core/models/section';
import { Instrument } from './../../../../../core/models/instrument';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { environment } from './../../../../../../environments/environment';
import { NgForm } from '@angular/forms';

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

  show: boolean;

  defaultNavActiveId = 1;

  data: any;

  environment = environment;

  users: Array<any>;
  selectedUsers = [];

  sectionActive: number;

  constructor(private route: ActivatedRoute,
    private instrumentsService: InstrumentsService) {
    super();
  }

  ngOnInit(): void {
    this.route.data.subscribe((data) => {
      this.data = data;
    });
  }

  /**
   * Add sections to instrument
   */
  addSection() {
    const section = new Section();
    section.numberSection = this.instrument.sections.length + 1;
    this.instrument.sections.push(section)
  }

  /**
   * Delete section of intrument
   * @param section 
   */
  deleteSection(section: Section) {
    this.instrument.sections = this.instrument.sections.filter((item) => item.numberSection != section.numberSection);
    if (this.instrument.sections && this.instrument.sections.length > 0) {
      this.instrument.sections.forEach((sectionItem: Section, index: number) => {
        sectionItem.numberSection = index + 1;
      });
    }
  }


  /**
   * Back to list of instruments
   */
  back() {
    this.onBack.emit(null);
  }

  /**
   * Load users by rol
   */
  async loadUsersByRoles() {
    console.log('roles', this.instrument.roles);
    this.users = await this.instrumentsService.getUsersByRoles(this.arrayToString(this.instrument.roles, '|'));
    console.log('resp', this.users)
  }

  /**
   * Reset Intrument
   */
  reset() {
    this.instrument = new Instrument();
    this.instrument.sections = new Array<Section>();
    const section = new Section();
    section.numberSection = 1;
    this.instrument.sections.push(section)
  }

  /**
   * Preview instrument
   */
  seeInstrument() {
    this.show = false;
    this.sectionActive = 0;
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

  /**
   * Preview instrument
   */
  preview(defaultNav) {
    if (this.instrument.sections && this.instrument.sections.length > 0) {
      let isComplete = true;
      this.instrument.sections.forEach((section: Section) => {
        if (section.questions && section.questions.length > 0) {
          const arrayTemp = section.questions.filter((question) => question.isReady == false);
          if (arrayTemp.length > 0) {
            isComplete = false;
          }
        } else {
          isComplete = false;
        }
      })

      if (isComplete == true) {
        this.show = false;
        this.sectionActive = 0;
        defaultNav.select(2);
      } else {
        defaultNav.select(1);
      }
    } else {
      defaultNav.select(1);
    }

  }
  /**
   * Save instrument
   * @param form 
   */
  async onSubmit(form: NgForm) {
    if (form.valid) {
      console.log('users', this.selectedUsers)
      console.log('instrumento', Instrument.mapForPost(this.instrument, this.selectedUsers));
      await this.instrumentsService.storeInstrument(Instrument.mapForPost(this.instrument, this.selectedUsers))
    }
  }

}
