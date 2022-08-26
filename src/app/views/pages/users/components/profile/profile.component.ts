import { ActivatedRoute } from '@angular/router';
import { SelectOption } from './../../../../../core/models/select-option';
import { CommonsService } from './../../../../../core/services/commons.service';
import { UserService } from './../../../../../core/services/user.service';
import { AuthService } from './../../../../../core/services/auth.service';
import { User } from './../../../../../core/models/user';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  @ViewChild('inputAvatar')
  inputAvatar: ElementRef<HTMLInputElement>;

  @ViewChild('avatar')
  avatar: ElementRef<HTMLInputElement>;

  user: User;

  tab: string = 'about';


  date: Date = new Date();
  data:any;
  states:Array<SelectOption>;
  cities:Array<SelectOption>;

  //Subcription
  user$: Subscription;

  constructor(private authService: AuthService,
    private route: ActivatedRoute,
    private userService: UserService,
    private commonsService: CommonsService) {
      this.route.data.subscribe((data)=>{      
        this.data = data;
      });
     }

  ngOnInit(): void {

    this.user$ = this.authService.currentUser$.subscribe((user: User) => {
      this.user = user ? user : this.authService.currentUser;
      console.log(this.user)
    });
  }

  selectTab(tab: string) {
    
    this.tab = tab;
      if(!this.user.socialNetwork){
        this.user.socialNetwork = new Array<SelectOption>();
        this.data.networks.forEach((net:SelectOption) => {
          this.user.socialNetwork.push({idTipo:net.value, label: net.label, networkDir:null});
        });

      } else{
        this.data.networks.forEach((net:SelectOption) => {
          const arrayTemp = this.user.socialNetwork
          this.user.socialNetwork.push({idTipo:net.value, label: net.label, networkDir:null});
        });
      }
  }



  preUploadAvatar() {
    this.inputAvatar.nativeElement.click();
  }

  async uploadAvatar(event: any) {
    const file: File = event.target.files[0];
    console.log('avatar', file);
    if (file) {
      this.avatar.nativeElement.src = URL.createObjectURL(file)
      const formData = new FormData();
      formData.append("photo", file);
      const upload$ = await this.userService.uploadAvatar(formData);
      await this.userService.getInfoUser();

    }
  }

  async onChangeCountry(event: any) {
    console.log('country', this.user.country);
    this.states = await this.commonsService.getAllStates(this.user.country.id);

  }

  async onChangeStates(event: any) {
    console.log('state', this.user.state);
    this.cities = await this.commonsService.getAllCities(this.user.state.id);

  }

  async onSubmit(form: NgForm) {
    if (form.valid) {
      console.log('user', this.user)
      console.log('post user', User.mapForEditProfile(this.user));
      await this.userService.updateProfile(User.mapForEditProfile(this.user));
      await this.userService.getInfoUser();
    }

  }

  ngOnDestroy() {
    if (this.user$) {
      this.user$.unsubscribe();
    }
  }

}
