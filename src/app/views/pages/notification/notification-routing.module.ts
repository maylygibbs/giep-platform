import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotificationComponent } from './components/notification/notification.component';

const routes: Routes = [
  {
    path:'',
    component: NotificationComponent,
    data:{
      title: 'Notificaciones - GIEp',
    },
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NotificationRoutingModule { }
