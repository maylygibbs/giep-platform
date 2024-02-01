import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { SelectOption } from './../../../../../core/models/select-option';
import { Rol } from '../../../../../core/models/rol';
import { RolesPermissionsService } from './../../../../../core/services/roles-permissions.service';
import { environment } from './../../../../../../environments/environment';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-rol-store',
  templateUrl: './rol-store.component.html',
  styleUrls: ['./rol-store.component.scss']
})
export class RolStoreComponent implements OnInit {


  @Input()
  rol: Rol;

  @Output()
  onBack: EventEmitter<any> = new EventEmitter<any>();

  rolStatus:boolean;

  environment = environment;

  data: any;

  constructor(private rolesPermissionsService: RolesPermissionsService,private route: ActivatedRoute) { 
    this.route.data.subscribe((data) => {
      this.data = data;
      console.log(this.data)
    });
  }

  ngOnInit(): void {
    if(!this.rol.id){
      this.rol.status = new SelectOption('1');
      this.rolStatus = true;
    }else{
      this.rolStatus = this.rol.status.value == '1'? true: false;
    }
  }

  /**
   * Handle event change status
   * @param event 
   */
  onChangeStatus(event:any){
    this.rol.status = this.rolStatus == true ? new SelectOption('1') : new SelectOption('2');
  }

  /**
   * Submit form rol
   * @param form 
   */
  async onSubmit(form:NgForm){
    if(form.valid){
      await this.rolesPermissionsService.storeRole(this.rol);
      this.back();
    }

  }

  /**
   * Return to back page
   */
  back(){
    this.onBack.emit(null);
  }

}
