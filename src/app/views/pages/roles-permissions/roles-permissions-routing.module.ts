import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RolesComponent } from './components/roles/roles.component';


const routes: Routes = [
  {
    path:'roles',
    component: RolesComponent,
    data: {
      title: 'Roles - GIEp',
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RolesPermissionsRoutingModule { }
