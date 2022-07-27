import { AuthService } from './../../../../core/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { BaseComponent } from '../../../../views/shared/components/base/base.component';

@Component({
  selector: 'app-recover-pass',
  templateUrl: './recover-pass.component.html',
  styleUrls: ['./recover-pass.component.scss']
})
export class RecoverPassComponent extends BaseComponent implements OnInit {

  email:string;

  constructor(private authService:AuthService) {
    super();
   }

  ngOnInit(): void {
  }


  onSubmit(form:NgForm){
    if(form.valid){
      this.authService.initRecoverPass(this.email);
    }
  }

}
