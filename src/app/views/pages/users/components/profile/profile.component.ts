import { UserService } from './../../../../../core/services/user.service';
import { AuthService } from './../../../../../core/services/auth.service';
import { User } from './../../../../../core/models/user';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  @ViewChild('inputAvatar')
  inputAvatar: ElementRef<HTMLInputElement>;

  user:User;
  
  tab:string = 'about';

  date:Date = new Date();
  
  constructor(private authService: AuthService,
    private userService: UserService) { }

  ngOnInit(): void {
    this.user = this.authService.currentUser;
  }

  preUploadAvatar(){
    this.inputAvatar.nativeElement.click();
  }

  async uploadAvatar(event:any){
    const file:File = event.target.files[0];
    console.log('avatar' , file);
      if (file) {
        //this.fileName = file.name;
        const formData = new FormData();
        formData.append("photo", file);
        const upload$ = await this.userService.uploadAvatar(formData);

    }
  }

}
