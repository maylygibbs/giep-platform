import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StaexpedComponent } from './components/staexped/staexped.component';
import { CommonsListPositionsResolver} from './../../../core/resolvers/commons.resolver';
const routes: Routes = [
  {
    path: '',
    component: StaexpedComponent,
    data: {
      title: 'Expedientes personales - staexped',
    },
    resolve:{
      positions: CommonsListPositionsResolver,
    }
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StaexpedRoutingModule { }