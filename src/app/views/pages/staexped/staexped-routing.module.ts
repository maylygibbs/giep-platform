import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StaexpedComponent } from './components/staexped/staexped.component';
import { CommonsListDepartmentsResolver, CommonsListPositionsResolver} from './../../../core/resolvers/commons.resolver';
import { GraphicReportsComponent } from './components/graphic-reports/graphic-reports.component';
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
  },
  {
    path: 'graphic-reports',
    component: GraphicReportsComponent,
    resolve:{
      departments: CommonsListDepartmentsResolver
    }
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StaexpedRoutingModule { }