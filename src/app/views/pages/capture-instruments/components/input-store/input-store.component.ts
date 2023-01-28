import { InstrumentsService } from './../../../../../core/services/instruments.service';
import { InputType } from './../../../../../core/models/input-type';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { SelectOption } from './../../../../../core/models/select-option';

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

  inputTypeStatus: boolean;

  constructor(private instrumentsService: InstrumentsService) { }

  ngOnInit(): void {
    if (!this.input.id) {
      this.input.status = new SelectOption('1');
      this.inputTypeStatus = true;
    } else {
      this.inputTypeStatus = this.input.status.value == '1' ? true : false;
    }
  }

  /**
 * Handle event change status
 * @param event 
 */
  onChangeStatus(event: any) {
    this.input.status = this.inputTypeStatus == true ? new SelectOption('1') : new SelectOption('2');
  }


  /**
   * Submit form input type
   * @param form 
   */
  async onSubmit(form: NgForm) {
    if (form.valid) {
      await this.instrumentsService.storeInputType(this.input);
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
