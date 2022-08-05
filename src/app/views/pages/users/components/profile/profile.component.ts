import { AuthService } from './../../../../../core/services/auth.service';
import { User } from './../../../../../core/models/user';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  user:User;
  
  tab:string = 'about';

  date:Date = new Date();
  
  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.user = this.authService.currentUser;
  }

}
