import { environment } from './../../../../../../environments/environment';
import { Component, OnInit, Input,ViewChild, ElementRef, Inject, Renderer2, ViewEncapsulation } from "@angular/core";
import { JLane, JIssue } from '../interface/lane';

import { PaginationResponse } from './../../../../../core/models/pagination-response';
import { UserService } from './../../../../../core/services/user.service';
import { DOCUMENT } from '@angular/common';
import { User } from './../../../../../core/models/user';
import { NavigationEnd, Router } from '@angular/router';
import { filter, Subscription } from 'rxjs';

import { ProjectService } from '../../../../../core/services/project.service';
import { CompanyService } from 'src/app/core/services/company.service';

import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

import { ActivatedRoute } from '@angular/router';

import { SelectOption } from '../../../../../core/models/select-option';
import { StatusActivityTask } from './../../../../../core/models/statusactivitytask';

import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem
} from '@angular/cdk/drag-drop';

@Component({
  selector: '[board-dnd-list]',
  templateUrl: './board-dnd-list.component.html',
  styleUrls: ['./board-dnd-list.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class BoardDndListComponent implements OnInit {
  @Input() lane: JLane;
  users: PaginationResponse;

  environment = environment;
  step:number = 1;
  page: number = 1;
  word:string;
  data: any;
  data1: PaginationResponse;
  selectedUserLabel: string; 
  selectedUserLabel2: string; 
  titleLabel: string; 
  descripcionLabel: string; 
  peso: string; 
  comp: string;
  companies: Array<SelectOption>;
  nompanel: string; 
  
   status = [
    { id:2 , value: 'QUE HACER', label: 'SELECCIONADO' },
    { id:3 , value: 'EN PROGRESO', label: 'EN PROGRESO' },
    { id:4 , value: 'LISTO', label: 'LISTO' }
  ];

  private $eventNavigationEnd: Subscription;

  //Builder Method
  constructor(@Inject(DOCUMENT) private document: Document,private userService: UserService,private router: Router,
  private projectService: ProjectService,  private route: ActivatedRoute,private companyService: CompanyService,private modal:NgbModal) {}

  async ngOnInit() {
    
    this.route.data.subscribe((data) => {
      this.data = data;
      console.log(this.data)
    });

    this.data.statusActivityTask = await this.projectService.getStatusActivityTask();

    
    this.users = await this.userService.getUsersPaginated({ page: environment.paginator.default_page, rowByPage: environment.paginator.row_per_page, word: null });
    console.log(this.users);


    this.$eventNavigationEnd = this.router.events.pipe(filter((event: any) => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.step = 1;
      this.loadPage(environment.paginator.default_page);
    });

    

   /* this.data1 = await this.companyService.getCompanies();
   console.log(this.data1);
   console.log("AJAJAJAJ"); 
    this.data = await this.projectService.getSpringItem();
    console.log(this.data);  */

  }

  async loadPage(pageInfo: any) {
    console.log('pageInfo', pageInfo);
    this.page = pageInfo;
    this.users = null;
    this.users = await this.userService.getUsersPaginated({ page: this.page, rowByPage: environment.paginator.row_per_page, word: this.word ? this.word : null});

    
  }

  drop(event: CdkDragDrop<JIssue[]>) {
    if (event.previousContainer.id != "IssueStatus.BACKLOG") {
    let isMovingInsideTheSameList = event.previousContainer === event.container;
    if (isMovingInsideTheSameList) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      if (event.container.id == "IssueStatus.BACKLOG") {
      }else{
        transferArrayItem(
          event.previousContainer.data,
          event.container.data,
          event.previousIndex,
          event.currentIndex
        );
      }
      
    }
   }
 }

    //Change Spring Method
    async select(event: any) {
      console.log("AJAJA CREAR NUEVA ACTIVIDAD");
      console.log(event);
    
    }

    openNewSM(contenidonew){
      
      this.modal.open(contenidonew,{backdropClass:'azul'});
    }

    openNewSM2(){
      
      this.modal.open('#contenidonew',{backdropClass:'azul'});
      
    }

    openEditSM(contenidoedit){
      
      this.modal.open(contenidoedit,{backdropClass:'azul'});
    }

    openEditver(datos){
      this.descripcionLabel=datos;
      
    }


    async onChangeUserPMO(event: any) {
      //this.assignPmo = event;
      console.log(event);
      //console.log(this.assignPmo["value"]);
      //this.project.projectManagementOffice = this.assignPmo["value"];
    }

    configPanel(datos){
      const myArray = datos.split(".");
      this.nompanel=  myArray[1];
    }
 
    

}
