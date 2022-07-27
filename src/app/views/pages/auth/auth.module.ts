import { SharedModule } from './../../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { Routes, RouterModule } from '@angular/router';
import { AuthComponent } from './auth.component';
import { RecoverPassComponent } from './recover-pass/recover-pass.component';
import { ChangePassComponent } from './change-pass/change-pass.component';

const routes: Routes = [
  {
    path: '',
    component: AuthComponent,
    children: [
      {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
      },
      {
        path: 'login',
        component: LoginComponent
      },
      {
        path: 'recover-pass',
        component: RecoverPassComponent
      },
      {
        path: 'change-pass/:token',
        component: ChangePassComponent
      }

    ]
  },
]

@NgModule({
  declarations: [LoginComponent, RegisterComponent, AuthComponent, RecoverPassComponent, ChangePassComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes)
  ]
})
export class AuthModule { }
