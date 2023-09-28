import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../../../../../views/shared/components/base/base.component';
import { ActivatedRoute } from '@angular/router';
import { ProjectService } from '../../../../../core/services/project.service';
import { ToastrService } from 'ngx-toastr';
import { Project } from '../../../../../core/models/project';
import { NgForm } from '@angular/forms';
import * as moment from 'moment';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent extends BaseComponent implements OnInit {

  selectedItem: Project;
  projectId;
  startDate: any;
  endDate: any;
  startDateFilter: any;
  endDateFilter: any;

  minDate = { year: new Date().getFullYear(), month: (new Date().getMonth()) + 1, day: new Date().getDate() }

  constructor(private route: ActivatedRoute,
    private projectService: ProjectService,
    private toastrService: ToastrService) {
    super()
  }

  async ngOnInit() {
    this.projectId = +localStorage.getItem('projectidselect');
    this.selectedItem = await this.projectService.getFreeDaysOfProject(this.projectId);
  }


  /**
 * Configure free days to resource
 */
  async addFreeDays(form: NgForm) {

    if (form.valid) {
      if (!this.isValidDateRange(this.startDateFilter, this.endDateFilter)) {
        this.setInputError('El rango de fechas que pretende registrar entra en conflicto con los rangos de fehcas ya registrados');
        return false;
      }
      const resp = await this.projectService.addFreeDaysToProject({ projectId: this.projectId, startDate: `${this.startDateFilter} 00:00:00`, endDate: `${this.endDateFilter} 23:59:00` })

      if (resp) {
        form.resetForm();
        this.selectedItem = await this.projectService.getFreeDaysOfProject(this.projectId);
      }
    }
  }

  /**
* Handle validation date range
*/
  changeDateFilter(start: any, end: any) {

    if (start.status == 'VALID' && end.status == 'VALID') {
      this.startDateFilter = this.startDate ? moment().year(this.startDate.year).month(this.startDate.month - 1).date(this.startDate.day).format('YYYY-MM-DD') : null;
      this.endDateFilter = this.endDate ? moment().year(this.endDate.year).month(this.endDate.month - 1).date(this.endDate.day).format('YYYY-MM-DD') : null;

      console.log(moment(this.startDateFilter).isValid())
      console.log(moment(this.endDateFilter).isValid())
      console.log(moment(this.startDateFilter).format('YYYY-MM-DD'))
      console.log(moment(this.endDateFilter).format('YYYY-MM-DD'))

      if (this.startDateFilter && this.endDateFilter) {

        if (moment(this.startDateFilter).isValid() && moment(this.endDateFilter).isValid()) {
          if (moment(this.startDateFilter).isSameOrBefore(this.endDateFilter)) {
            if (!this.isValidDateRange(this.startDateFilter, this.endDateFilter)) {
              this.setInputError('El rango de fechas que pretende registrar entra en conflicto con los rangos de fehcas ya registrados');
            }
          } else {
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
        if (moment(this.startDate).isValid()) {

          this.endDateFilter = this.endDate ? moment().year(this.endDate.year).month(this.endDate.month - 1).date(this.endDate.day).format('YYYY-MM-DD') : null;
        } else {
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
     if(this.selectedItem.freeDays && this.selectedItem.freeDays.length>0){
       
       this.selectedItem.freeDays.forEach((range:any) => {
         const startDateRegistered = moment(range.startDate);
         const endDateRegistered = moment(range.endDate);
         if(endD.isBefore(startDateRegistered) || startD.isAfter(endDateRegistered)){          
         }else{
           isValid = false;
         }
       });
 
     }
    return isValid;
  }

  /**
 * Delete range of dates
 * @param id 
 */
  async deleteRange(id: string) {
    const resp = await this.projectService.deleteFreeDaysFromProject(id);
    if (resp) {
      this.selectedItem = await this.projectService.getFreeDaysOfProject(this.projectId);
    }
  }

}
