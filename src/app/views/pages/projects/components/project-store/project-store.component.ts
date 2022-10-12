
import { CommonsService } from '../../../../../core/services/commons.service';
import { environment } from '../../../../../../environments/environment';
import { ProjectService } from '../../../../../core/services/project.service';
import { Project } from '../../../../../core/models/project';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { SelectOption } from '../../../../../core/models/select-option';
import { ActivatedRoute } from '@angular/router';
import { BaseComponent } from '../../../../shared/components/base/base.component';
import { UserService } from 'src/app/core/services/user.service';
import { Filter } from 'src/app/core/models/filter';
import { PaginationResponse } from 'src/app/core/models/pagination-response';
import { NgbCalendar, NgbDate, NgbDateParserFormatter, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { User } from 'src/app/core/models/user';
import { CompanyService } from 'src/app/core/services/company.service';
import { number } from 'ngx-custom-validators/src/app/number/validator';
import { ToastrService } from 'ngx-toastr';

const now = new Date();

@Component({
  selector: 'app-project-store',
  templateUrl: './project-store.component.html',
  styleUrls: ['./project-store.component.scss']
})
export class ProjectStoreComponent extends BaseComponent implements OnInit {

  @Input()
  project: Project;


  @Output()
  onBack: EventEmitter<any> = new EventEmitter<any>();

  environment = environment;

  data: any;

  projectStatus: boolean;

  /** Select options list **/
  statusList: Array<SelectOption>;

  /** All selected users **/
  selectedUsers: Array<SelectOption>;
  assignedResources: Array<User>;
  //const userselected: Array<MenuItem> = new Array<MenuItem>();
  defaultImage = 'https://via.placeholder.com/200x200';
  image = 'https://via.placeholder.com/200x200';

  users: PaginationResponse;
  hoveredDate: NgbDate | null = null;
  startDate: NgbDate | null;
  endDate: NgbDate | null;
  public names: string[];
  minDate1: NgbDateStruct = {year: now.getFullYear(), month: now.getMonth() + 1, day: now.getDate()};
  public events: any[];
  public options: any;

  //Builder Method
  constructor(private route: ActivatedRoute,
    private projectService: ProjectService,
    private commonsService: CommonsService,
    private companyService: CompanyService,
    private calendar: NgbCalendar,
    private toastrService: ToastrService,
    public formatter: NgbDateParserFormatter) {
    super();
  }

  //Initialization Method
  ngOnInit(): void {
    this.route.data.subscribe((data) => {
      this.data = data;
    });
    if (!this.project.id) {
      this.project.status = new SelectOption('1');
      this.projectStatus = true;
    } else {
      this.projectStatus = this.project.status.value == '1' ? true : false;
    }
  }

  //Change state method
  async onChangeStatus(event: any) {
    this.statusList = await this.commonsService.getAllStatus();
  }

  //Change User Resources Method
  async onChangeUserResorces(event: any) {
    if (event.length == 0) {
      this.assignedResources.pop();
    }
    for (var j = 0; j < event.length; j++){
        if (this.project.projectManagementOffice === event[j].value) {
          //this.assignedResources = this.assignedResources.filter((item) => item.id != event[j].value);
          this.selectedUsers = this.selectedUsers.filter((item) => item.name != event[j].label);
          this.toastrService.error('EL usuario que usted a seleccionado esta como usuario PMO verifique.'); 
        }else{
          this.assignedResources = this.selectedUsers.map((u: SelectOption, index: number) => {
            const user = new User();
            user.id = u.value;
            user.firstName = u.label;
            user.nameInputHours = 'inputHoursDedication-' + index;
            return user;
          });
        }
      }
}

  /**
   * 
   * @param user 
   */
  //delete assignedResources and selectedUsers
  deleteResource(user:User){
    this.assignedResources = this.assignedResources.filter((item) => item.id != user.id);
    if (this.assignedResources && this.assignedResources.length > 0) {user
      this.assignedResources.forEach((sectionItem: User, index: number) => {
        console.log(sectionItem.id);
        //sectionItem.id = index + 1;
      });
    }
    this.selectedUsers = this.selectedUsers.filter((item) => item.name != user.firstName);
  }

  //Method that verifies change of company
  async onChangeCompany(event: any) {
    this.data.companies = await this.companyService.getCompanies();
  }

  //Method to verify form and persist data
  async onSubmit(form: NgForm) {
    this.project.assignedResources = this.assignedResources;
    if (form.valid) {
      if (this.assignedResources && this.assignedResources.length > 0 && this.selectedUsers && this.selectedUsers.length > 0 ) {
        await this.projectService.storeProject(Project.mapForPost(this.project));
        await this.projectService.storeResources(Project.map2ForPost(this.project));
        this.back();
      }else{   
        this.toastrService.error('Usted debe asignar usuario PMO y Recursos.'); 
      }
    }
  }

  /**
   * begin fecha
   */

  //Method that will be used to select a date range in calendar
  onDateSelection(date: NgbDate) {
    if (!this.project.startDate && !this.project.endDate) {
      this.project.startDate = date;
    } else if (this.project.startDate && !this.project.endDate && date && date.after(this.project.startDate)) {
      this.project.endDate = date;
    } else {
      this.project.endDate = null;
      this.project.startDate = date;
    }
  }

  //Method that checks if it is suspended
  isHovered(date: NgbDate) {
    return this.project.startDate && !this.project.endDate && this.hoveredDate && date.after(this.project.startDate) &&
      date.before(this.hoveredDate);
  }

  //Method that checks if it is inside
  isInside(date: NgbDate) { return this.project.endDate && date.after(this.project.startDate) && date.before(this.project.endDate); }
  
  //Method that checks if it is in the range
  isRange(date: NgbDate) {
    return date.equals(this.project.startDate) || (this.project.endDate && date.equals(this.project.endDate)) || this.isInside(date) ||
      this.isHovered(date);
  }

  //Method that checks input validation
  validateInput(currentValue: NgbDate | null, input: string): NgbDate | null {
    const parsed = this.formatter.parse(input);
    return parsed && this.calendar.isValid(NgbDate.from(parsed)) ? NgbDate.from(parsed) : currentValue;
  }

  //Method that checks date of change
  onchangeDate(event) {
    console.log(event);

  }
  /**
   * end fecha
   */

  //Method that checks the back
  back() {
    this.onBack.emit(null);
  }

}
