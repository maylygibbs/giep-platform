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
import { NgbCalendar, NgbDate, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { User } from 'src/app/core/models/user';
import { CompanyService } from 'src/app/core/services/company.service';

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
  userseleced:Array<SelectOption>;
  //const userselected: Array<MenuItem> = new Array<MenuItem>();

  defaultImage = 'https://via.placeholder.com/200x200';
  image = 'https://via.placeholder.com/200x200';

  users: PaginationResponse;
  hoveredDate: NgbDate | null = null;

  startDate: NgbDate | null;
  endDate: NgbDate | null;

  public names: string[];

  constructor(private route: ActivatedRoute,
    private projectService: ProjectService,
    private commonsService: CommonsService,
    private userService: UserService,
    private companyService: CompanyService,
    private calendar: NgbCalendar, 
    public formatter: NgbDateParserFormatter) {
    super();
  }

  ngOnInit(): void {
    
    // this.project = new Project();

    // this.project.name ="proyecto";
    // this.project.description ="Descripcion";
    // this.project.startDate = this.calendar.getToday();
    // this.project.endDate = this.calendar.getNext(this.calendar.getToday(), 'd', 10);
    // this.project.projectManagementOffice = new User();
    // this.project.projectManagementOffice.id = "1";
    // this.project.status = new SelectOption('1');
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

  async onChangeStatus(event: any) {
    this.statusList = await this.commonsService.getAllStatus();
  }


  async onChangeProjectManagementOffice(event: any) {
    let filter = new Filter();
    filter.page = 1;
    filter.rowByPage = 9999;
    filter.word = null;
    this.users = await this.userService.getUsersPaginated(filter);
    this.userseleced = event; 
    //console.log(this.data.users.filter((item)=>item.id));
    //console.log(this.project.assignedResources);
  }

  async onChangeProjectManagementOfficePmo(event: any) {
    // let filter = new Filter();
    // filter.page = 1;
    // filter.rowByPage = 9999;
    // filter.word = null;
    // this.users = await this.userService.getUsersPaginated(filter);
  }

  async onChangeCompany(event: any) {
    this.data.companies = await this.companyService.getCompanies();
  }

  async onSubmit(form: NgForm) {
    if (form.valid) {
      await this.projectService.storeProject(Project.mapForPost(this.project));
      this.back();
    }

  }

  /**
   * begin fecha
   */


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

  isHovered(date: NgbDate) {
    return this.project.startDate && !this.project.endDate && this.hoveredDate && date.after(this.project.startDate) &&
      date.before(this.hoveredDate);
  }

  isInside(date: NgbDate) { return this.project.endDate && date.after(this.project.startDate) && date.before(this.project.endDate); }

  isRange(date: NgbDate) {
    return date.equals(this.project.startDate) || (this.project.endDate && date.equals(this.project.endDate)) || this.isInside(date) ||
      this.isHovered(date);
  }

  validateInput(currentValue: NgbDate | null, input: string): NgbDate | null {
    const parsed = this.formatter.parse(input);
    return parsed && this.calendar.isValid(NgbDate.from(parsed)) ? NgbDate.from(parsed) : currentValue;
  }

  onchangeDate(event) {
    console.log(event);
    
  }
  /**
   * end fecha
   */

  back() {
    this.onBack.emit(null);
  }

}
