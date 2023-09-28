import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbActiveModal, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { Spring } from '../../../../../../core/models/spring';
import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SpringService } from 'src/app/core/services/spring.service';
import * as moment from 'moment';
import { BaseComponent } from '../../../../../../views/shared/components/base/base.component';

const now = new Date();
@Component({
  selector: 'app-newspring',
  templateUrl: './newspring.component.html',
  styleUrls: ['./newspring.component.scss']
})
export class NewspringComponent extends BaseComponent implements OnInit {

  @Input() public projectId;
  @Output() passEntry: EventEmitter<any> = new EventEmitter();
  selectedSpring: Spring;
  editForm: FormGroup;
  isLoading = false;
  startDate: any;
  endDate: any;
  startDateFilter: any;
  endDateFilter: any;
  minDate = { year: new Date().getFullYear(), month: (new Date().getMonth()) + 1, day: new Date().getDate() }
  springName: string;
  isSubmited: boolean = false;

  constructor(public modal: NgbActiveModal, private route: ActivatedRoute, private springService: SpringService, private formBuilder: FormBuilder, private router: Router) {
    super();
  }

  ngOnInit(): void {

  }
  /**
* Handle validation date range
*/
  changeDateFilter(start: any, end: any) {

    if (start.status == 'VALID' && end.status == 'VALID') {
      this.startDateFilter = this.startDate ? moment().year(this.startDate.year).month(this.startDate.month - 1).date(this.startDate.day).format('YYYY-MM-DD') : null;
      this.endDateFilter = this.endDate ? moment().year(this.endDate.year).month(this.endDate.month - 1).date(this.endDate.day).format('YYYY-MM-DD') : null;

      if (this.startDateFilter && this.endDateFilter) {

        if (moment(this.startDateFilter).isValid() && moment(this.endDateFilter).isValid()) {
          if (!moment(this.startDateFilter).isSameOrBefore(this.endDateFilter)) {
            this.setInputError('Fecha inicio debe ser menor a la fecha fin');
          }
        } else {
          if (!moment(this.startDateFilter).isValid()) {
            this.setInputError('Fecha inicio es inválida');
          }
          if (!moment(this.endDateFilter).isValid()) {
            this.setInputError('Fecha fin es inválida');
          }
        }

      } else if (this.startDateFilter && !this.endDateFilter) {
        if (!moment(this.startDate).isValid()) {
          this.setInputError('Fecha inicio es inválida');
        }
      } else if (!this.startDateFilter && this.endDateFilter) {
        if (moment(this.endDateFilter).isValid()) {
          this.setInputError('Indique fecha inicio');
        } else {
          this.setInputError('Fecha fin es inválida');
        }
      }
    }
  }

  /**
   * Validate if range od date is valid
   * @param startDate 
   * @param endDate 
   * @returns 
   */
  isValidDateRange(startDate: string, endDate: string): boolean {
    const startD = moment(`${startDate} 00:00:00`);
    const endD = moment(`${endDate} 23:59:00`);
    let isValid = true;
    if (endD.isBefore(startD)) {
      isValid = false;
    }
    return isValid;
  }

  /**
   * Lets create spring
   */
  async storeSpring(form: NgForm) {
    if (form.valid) {
      if (this.isValidDateRange(this.startDateFilter, this.endDateFilter)) {
        this.isSubmited = true;
        const data = {
          idproyecto: this.projectId,
          fechainicio: this.startDateFilter,
          fechafin: this.endDateFilter,
          nombre: this.springName
        }
        const resp = await this.springService.storeSpring(data);
        this.isSubmited = false;
        if(resp){
          this.passEntry.emit(true);
          this.modal.close();
        }
      } else {
        this.setInputError('Fecha inicio debe ser menor a la fecha fin');
      }
    }
  }

}
