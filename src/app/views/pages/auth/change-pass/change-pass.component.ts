import { environment } from './../../../../../environments/environment';
import { Component, OnInit } from '@angular/core';
import { AuthService } from './../../../../core/services/auth.service';
import { BaseComponent } from '../../../../views/shared/components/base/base.component';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-change-pass',
  templateUrl: './change-pass.component.html',
  styleUrls: ['./change-pass.component.scss']
})
export class ChangePassComponent extends BaseComponent implements OnInit {

  token:string;
  passwordInput:string;
  confirmPasswordInput:string;

  environment = environment;

  constructor(private authService:AuthService,
    private activatedRoute: ActivatedRoute,
    private router:Router,) {
    super();
   }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {      
      this.token = params["token"];

    });
  }

  async onSubmit(form:NgForm){
    if (form.valid) {
      console.log('data',{token: this.token, password: this.passwordInput, confirmPassword: this.confirmPasswordInput})
      const result = await this.authService.resetPass({token: this.token, password: this.passwordInput});
      if(result){
        this.router.navigate(['/']);
      }
    }
  }

}
