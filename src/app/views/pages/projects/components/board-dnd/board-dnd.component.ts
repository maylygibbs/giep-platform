import { CommonsService } from '../../../../../core/services/commons.service';
import { ActivatedRoute } from '@angular/router';

import { environment } from './../../../../../../environments/environment';
import { Component, OnInit, ViewChild, ElementRef, Inject, Renderer2, TemplateRef, ViewChildren, QueryList, AfterViewChecked } from "@angular/core";
import { EventEmitter, Input, Output } from '@angular/core';


import { UserService } from './../../../../../core/services/user.service';
import { JLane, MOCK_LANESorg } from "../interface/lane";
import { DOCUMENT } from '@angular/common';

import { NavigationEnd, Router } from '@angular/router';
import { filter, Subscription } from 'rxjs';
import { ProjectService } from '../../../../../core/services/project.service';
import { SpringService } from 'src/app/core/services/spring.service';
import { Project } from '../../../../../core/models/project';
import { NgForm } from '@angular/forms';


//import { SpringService } from '../../../../../core/services/project.service';
import { Spring } from '../../../../../core/models/spring';
import { ToastrService } from 'ngx-toastr';

import { CompanyService } from 'src/app/core/services/company.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgbDate, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

import { NewspringComponent } from '../modal/newspring/newspring.component';

import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
  CdkDrag,
  CdkDropList,
} from '@angular/cdk/drag-drop';
import { Board, ItemProject, ItemTypeProject } from '../../../../../core/models/item-project';
import { LevelBoardProject } from '../../../../../core/models/level-board-project';
import { User } from '../../../../../core/models/user';

const now = new Date();
@Component({
  selector: "board-dnd",
  templateUrl: "./board-dnd.component.html",
  styleUrls: ["./board-dnd.component.scss"]
})
export class BoardDndComponent implements OnInit {

  @Output()
  onBack: EventEmitter<any> = new EventEmitter<any>();
  @ViewChildren('inputNameItem') inputNameItems: QueryList<ElementRef>;
  environment = environment;
  springs = [];
  springsFuture = [];
  projectId: number;
  project: Project;
  spring: Spring;
  selectedSpring: any;
  selectedItemProject:ItemProject;

  //Contain data from resolver
  data: any;

  itemsType: ItemTypeProject[];
  columns: LevelBoardProject[];
  board: Board;
  minDate1: NgbDateStruct = { year: now.getFullYear(), month: now.getMonth() + 1, day: now.getDate() };

  isLoadProject:boolean = false;

  private $eventNavigationEnd: Subscription;

  constructor(
    private userService: UserService,
    private router: Router,
    private projectService: ProjectService,
    private springService: SpringService,
    private companyService: CompanyService,
    private modal: NgbModal,
    private toastrService: ToastrService,
    private route: ActivatedRoute,
    protected modalService: NgbModal) { }

  async ngOnInit() {

    this.projectId = +localStorage.getItem('projectidselect');

    //Carga lista de spring
    await this.loadSpring();

    //Carga las columns configuradas
    this.columns = await this.projectService.getConfiguredColumns();

    //Carga los items del tablero dado el spring
    this.loadItemsBoardBySpring();

    //Carga los typos de items
    this.loadItemTypes();


    //Carga info basica del proyecto
    this.project = await this.projectService.getProjectPmoAndResource(this.projectId);
    this.isLoadProject = true;
    console.log('project', this.project);

    console.log('itemsType', this.itemsType);
    console.log('columns', this.columns);



    this.$eventNavigationEnd = this.router.events.pipe(filter((event: any) => event instanceof NavigationEnd)
    ).subscribe(() => {
      //this.loadPage(environment.paginator.default_page);
    });

  }


  /**
   * Load all springs by project
   */
  async loadSpring() {
    this.springs = await this.projectService.getSpringsOfProject(this.projectId);
    if(this.springs && this.springs.length>0){
      this.springsFuture = this.springs.filter((itemSpring)=> itemSpring.isCurrent==='NULL');
      this.selectedSpring = this.springs.find((spring: any) => spring.isCurrent == 1)
    }

    console.log('selectedSpring', this.selectedSpring);
  }

  /**
 * Load all item types
 */
  async loadItemTypes() {
    this.itemsType = await this.projectService.getItemsTypes();
  }

  /**
   * Load item board by spring
   */
  async loadItemsBoardBySpring() {
    if(this.selectedSpring){
      this.board = await this.springService.getItemsBoardBySpring(this.selectedSpring.id, this.columns);
      console.log('board', this.board)
    }
    
  }

  /**
   * Mouse enter over Members element
   * @param modalRef 
   */
  showModal(modalRef: TemplateRef<any>, size: string) {
    this.modalService.open(modalRef, { size: 'md' }).result.then((result) => {
      console.log("Modal closed" + result);
    }).catch((res) => { });
  }

  /**
   * Close modal
   */
  closeModal() {
    this.modalService.dismissAll();
  }


  openNewSpring() {
    const modalRef = this.modalService.open(NewspringComponent, { size: 'md' });
    modalRef.componentInstance.projectId = this.project.id;
    modalRef.componentInstance.passEntry.subscribe(async (passEntry: boolean) => {
      if (passEntry) {
        this.loadSpring();
      }
    })
  }


  onChangeSpring() {
    console.log('selectedSpring', this.selectedSpring);
    this.loadItemsBoardBySpring();
  }

  /**
   * Pre create item parent (Activity or Bug)
   * @param itemType 
   */
  preCreateItem(list: Array<ItemProject>, parentId:any, levelBoardId:number, itemType?: ItemTypeProject) {
    
    const newItem = new ItemProject();
    if(!itemType){
      itemType = {
        id:2,
        label:"Task",
        icon_class:"mdi mdi-clipboard-check",
        color: "#C8651B"
      }
    }
    newItem.itemType = { ...itemType };
    newItem.assignedName = 'Sin asignar';
    if(parentId === 'null'){
      newItem.tasks = {};
      this.columns.forEach((column: LevelBoardProject) => {
        newItem.tasks[column.attr_key] = new Array<ItemProject>();
      });
    }

    if (!list) {
      list = new Array<ItemProject>();
    }
    newItem.order = list.length + 1;
    newItem.parentId = parentId;   
    newItem.levelBoardId = levelBoardId;
    list.push(newItem);
    console.log('activities', list)
    if(parentId=="null"){    

        setTimeout(()=>{
          const inputElement:HTMLInputElement = document.getElementById('inputNameItem-'+(list.length-1)) as HTMLInputElement;
          console.log('inputElement', inputElement);
          inputElement.focus();
        },300);        

    }else{
      setTimeout(()=>{
        const inputElement:HTMLInputElement = document.getElementById('inputTaskName-'+parentId+levelBoardId+(list.length-1)) as HTMLInputElement;
        console.log('inputTaskName-'+parentId+levelBoardId+(list.length-1));
        console.log('inputElement', inputElement);
        inputElement.focus();
      },500)
    }

  }


  /**
   * Create item
   * @param item 
   */
  async createItem(list: any, item: ItemProject) {
    if (item.name) {
      const resp = await this.springService.createItem({
        parentId: item.parentId,
        title: item.name,
        typeItemId: item.itemType.id,
        springId: this.selectedSpring.id,
        order: item.order,
        levelBoardId: item.levelBoardId
      });
      this.loadItemsBoardBySpring();
    } else {
      list.pop();
    }
    
  }

  /**
   * Handle task move
   * @param event 
   */
 async drop(event: CdkDragDrop<string[]>) {
    console.log('event', event);
    console.log('event.previousContainer', event.previousContainer);
    console.log('event.container', event.container);
    console.log('current index', event.currentIndex);
    if (event.previousContainer === event.container) {
      console.log('moveItemInArray')
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      console.log('transferArrayItem')
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
    console.log('event.previousContainer list', event.previousContainer.data);
    console.log('event.container list', event.container.data);
    const currentIdsContiner = event.container.id.split('|');
    const data = {
      id: +event.item.data.itemId,
      idBacklogPadre:+currentIdsContiner[0],
      idnivelboardpanel:+currentIdsContiner[1],
      orden:event.currentIndex + 1,
      previousArray: this.getOrderedArray(event.previousContainer.data),
      currentArray: this.getOrderedArray(event.container.data)
    }
    await this.springService.updatePositionItem(data);
    this.loadItemsBoardBySpring();
  }

  /**
   * Build Ordered array
   * @param arrayInput 
   * @returns 
   */
  getOrderedArray(arrayInput:Array<any>):Array<any>{
    return arrayInput && arrayInput.length > 0 ? arrayInput.map((item:any,index)=>{
      return {
        idTask: +item.itemId,
        order: index+1
      }
    }) : []
  }

  /**
   * Open modal item project detail
   * @param modalRef 
   * @param id 
   */
  async openModalItemProjectDetail(modalRef: TemplateRef<any>, id: number){
    this.selectedItemProject = await this.springService.getItemProjectById(id);
    console.log('selectedItemProject', this.selectedItemProject)
    this.modalService.open(modalRef, { size: 'lg' }).result.then((result) => {
      console.log("Modal closed" + result);
    }).catch((res) => { });
  }

  selectResource(){ 
    if(this.selectedItemProject.assignedId){
      const selectedResource = this.project.assignedResources?.find((user:User)=>{+user.id == this.selectedItemProject.assignedId});
      if(selectedResource){
        this.selectedItemProject.avatar = selectedResource.avatar;
      }

    }
   
  }

  /**
   * Allows updating item
   * @param form 
   */
  async onSubmitItem(form: NgForm){
    if(form){
      const resp = await this.springService.updateInfoItem(ItemProject.fromDomain(this.selectedItemProject))
      this.closeModal();
      this.loadItemsBoardBySpring();
    }
  }

}
