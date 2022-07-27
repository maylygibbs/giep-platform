import { environment } from './../../../../../../environments/environment';
import { UserService } from './../../../../../core/services/user.service';
import { User } from './../../../../../core/models/user';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { SelectOption } from '../../../../../core/models/select-option';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-store',
  templateUrl: './user-store.component.html',
  styleUrls: ['./user-store.component.scss']
})
export class UserStoreComponent implements OnInit {

  @Input()
  user:User;

  @Output()
  onBack: EventEmitter<any> = new EventEmitter<any>();

  environment = environment;

  data:any;

  userStatus:boolean;

  /** Select options list **/
  dependences: Array<SelectOption>;
  positions: Array<SelectOption>;
  roles:Array<SelectOption>;

  defaultImage = 'https://via.placeholder.com/200x200';
  image = 'https://via.placeholder.com/200x200';


  constructor(private route: ActivatedRoute,
    private userService:UserService) { }

  ngOnInit(): void {
    this.route.data.subscribe((data)=>{      
      this.data = data;
    });
    if(!this.user.id){
      this.user.status = new SelectOption('1');
      this.userStatus = true;
    }else{
      this.userStatus = this.user.status.value == '1'? true: false;
    }
  }

  onChangeStatus(event:any){
    debugger
    this.user.status = this.userStatus == true ? new SelectOption('1') : new SelectOption('2');
  }

  onSubmit(form:NgForm){
    
  }

  back(){
    this.onBack.emit(null);
  }

}
