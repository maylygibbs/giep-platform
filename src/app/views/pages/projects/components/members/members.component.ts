import { Component, OnInit, TemplateRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { environment } from '../../../../../../environments/environment';
import { Project } from '../../../../../core/models/project';
import { ProjectService } from '../../../../../core/services/project.service';
import { User } from '../../../../../core/models/user';
import { ToastrService } from 'ngx-toastr';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';
import { BaseComponent } from '../../../../../views/shared/components/base/base.component';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.scss']
})
export class MembersComponent extends BaseComponent implements OnInit {

  selectedItem: Project;
  data: any;
  selectedPmo: any;
  newResource: any = {};
  environment = environment;
  selectedResource: User;

  startDate: any;
  endDate: any;
  startDateFilter: any;
  endDateFilter: any;

  minDate = { year: new Date().getFullYear(), month: (new Date().getMonth()) + 1, day: new Date().getDate() }

  constructor(private route: ActivatedRoute,
    private projectService: ProjectService,
    private toastrService: ToastrService,
    protected modalService: NgbModal) {
    super();
    this.route.data.subscribe((data) => {
      this.data = data;
    });
  }

  async ngOnInit() {
    const id = +localStorage.getItem('projectidselect');
    this.selectedItem = await this.projectService.getProjectPmoAndResource(id);
  }

  /**
   * Link pmo to the project
   */
  async addPmo() {

    const existResource = this.selectedItem.assignedResources.find((user: User) => this.selectedPmo == user.id);

    if (existResource) {
      this.toastrService.warning('El usuario ya se encuentra como recurso vinculado al proyecto.')
    }

    if (!existResource) {
      const resp = await this.projectService.addPmoToProject({ projectId: this.selectedItem.id, userPmoId: +this.selectedPmo });
      if (resp) {
        this.selectedItem = await this.projectService.getProjectPmoAndResource(+this.selectedItem.id);
        this.selectedPmo = null
      }
    }

  }

  /**
   * Unlink pmo from the project
   */
  async deletePmo(id: string) {
    const resp = await this.projectService.deletePmoFromProject(this.selectedItem.id);
    if (resp) {
      this.selectedItem = await this.projectService.getProjectPmoAndResource(+this.selectedItem.id);
    }

  }

  /**
   * Valid if it already exists as a resource in the project
   */
  onChangeResource() {
    const existResource = this.selectedItem.assignedResources.find((user: User) => this.newResource.id == user.id);
    const existPMO = this.selectedItem.pmo ? this.selectedItem.pmo.id == this.newResource.id : false;
    if (existResource) {
      this.newResource.id = null;
      this.toastrService.warning('El usuario ya se encuentra como recurso vinculado al proyecto.');

    }
    if (existPMO) {
      this.newResource.id = null;
      this.toastrService.warning('El usuario ya se encuentra como PMO vinculado al proyecto.');
    }
  }

  /**
   * Link resource to the project
   */
  async resourceAdd(form: NgForm) {
    if (form.valid) {
      const resp = await this.projectService.addResourceToProject({ projectId: +this.selectedItem.id, userId: +this.newResource.id, dedicatedHours: +this.newResource.hours });
      if (resp) {
        this.selectedItem = await this.projectService.getProjectPmoAndResource(+this.selectedItem.id);
        form.resetForm();
      }
    }
  }


  /**
   * Unlink resource from project
   */
  async deleteResource(id: string) {
    const resp = await this.projectService.deleteResourceFromProject({ projectId: +this.selectedItem.id, userId: +id });
    if (resp) {
      this.selectedItem = await this.projectService.getProjectPmoAndResource(+this.selectedItem.id);
    }
  }


  async openAddFreeDaysModal(modalRef: TemplateRef<any>, resource: User) {
    this.selectedResource = resource;
    this.selectedResource.freeDays = await this.projectService.getFreeDaysOfResoruce({projectId: +this.selectedItem.id, userId: this.selectedResource.id});
    this.modalService.open(modalRef, { size: 'md' }).result.then((result) => {
      console.log("Modal closed" + result);
    }).catch((res) => { });
  }


  /**
 * Close free days modal
 */
  closeAddFreeDaysModal() {
    this.modalService.dismissAll();
    this.selectedResource = null;
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
            if(!this.isValidDateRange(this.startDateFilter, this.endDateFilter)){
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
  isValidDateRange(startDate:string, endDate:string):boolean{
    const startD = moment(`${startDate} 00:00:00`);
    const endD = moment(`${endDate} 23:59:00`);
    let isValid = true;
    if(this.selectedResource.freeDays && this.selectedResource.freeDays.length>0){
      
      this.selectedResource.freeDays.forEach((range:any) => {
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
   * Configure free days to resource
   */
 async addFreeDays(form: NgForm) {

    if (form.valid) {
      if(!this.isValidDateRange(this.startDateFilter, this.endDateFilter)){
        this.setInputError('El rango de fechas que pretende registrar entra en conflicto con los rangos de fehcas ya registrados');
        return false;
      }
      const resp = await this.projectService.addFreeDaysToResource({projectId: +this.selectedItem.id, userId: this.selectedResource.id, startDate:`${this.startDateFilter} 00:00:00` , endDate:`${this.endDateFilter} 23:59:00`})
      
      if(resp){        
        form.resetForm();
        this.selectedResource.freeDays = await this.projectService.getFreeDaysOfResoruce({projectId: +this.selectedItem.id, userId: this.selectedResource.id});
        this.selectedItem = await this.projectService.getProjectPmoAndResource(+this.selectedItem.id);
      }     
    }

  }

  /**
   * Delete range of dates
   * @param id 
   */
  async deleteRange(id:string){
    const resp = await this.projectService.deleteFreeDaysFromResource(id);
    if (resp) {
      this.selectedResource.freeDays = await this.projectService.getFreeDaysOfResoruce({projectId: +this.selectedItem.id, userId: this.selectedResource.id});
      this.selectedItem = await this.projectService.getProjectPmoAndResource(+this.selectedItem.id);
    }
  }

}
