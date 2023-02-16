import { CommonsService } from './../../../../../core/services/commons.service';
import { environment } from './../../../../../../environments/environment';
import { UserService } from './../../../../../core/services/user.service';
import { User } from './../../../../../core/models/user';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { SelectOption } from '../../../../../core/models/select-option';
import { ActivatedRoute } from '@angular/router';
import { BaseComponent } from '../../../../../views/shared/components/base/base.component';

@Component({
  selector: 'app-user-store',
  templateUrl: './user-store.component.html',
  styleUrls: ['./user-store.component.scss']
})
export class UserStoreComponent extends BaseComponent implements OnInit {

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

  states:Array<SelectOption>;
  cities:Array<SelectOption>;


  constructor(private route: ActivatedRoute,
    private userService:UserService,
    private commonsService: CommonsService) {
      super();
     }

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

  /**
   * Handle status change
   * @param event 
   */
  onChangeStatus(event:any){
    this.user.status = this.userStatus == true ? new SelectOption('1') : new SelectOption('2');
  }

  /**
   * Handle change country
   * @param event 
   */
  async onChangeCountry(event:any){
    console.log('country', this.user.country);
    this.user.state = null;
    this.states = null;
    this.user.city = null;
    this.cities = null;
    if(this.user.country){
      this.states = await this.commonsService.getAllStates(this.user.country.id);
    }
        
  }

  /**
   * Handle change state
   * @param event 
   */
  async onChangeStates(event:any){
    console.log('state', this.user.state);
    this.user.city = null;
    this.cities = null;
    if(this.user.state){
      this.cities = await this.commonsService.getAllCities(this.user.state.id);
    }
    
    
  }

    /**
   * Handle submit form
   * @param event 
   */
  async onSubmit(form:NgForm){
    if(form.valid){
      console.log('user', this.user)
      console.log('post user',User.mapForPost(this.user));
      await this.userService.storeUser(User.mapForPost(this.user));
      this.back();
    }

  }

  back(){
    this.onBack.emit(null);
  }

}
