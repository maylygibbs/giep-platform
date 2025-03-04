import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InstrumentsComponent } from './components/instruments/instruments.component';
import { CommonsListCategoyTypeResolver, CommonsListChargesResolver, CommonsListCountriesResolver, CommonsListInputTypeResolver, CommonsListInstrumentsResolver, CommonsListLevelsResolver, CommonsListRolesResolver, CommonsListUnitsTypeResolver } from './../../../core/resolvers/commons.resolver';
import { EvaluationsComponent } from './components/evaluations/evaluations.component';
import { EvaluationComponent } from './components/evaluation/evaluation.component';
import { Evaluations360Component } from './components/evaluations360/evaluations360.component';
import { Evaluation360Component } from './components/evaluation360/evaluation360.component';
import { Instruments360Component } from './components/instruments360/instruments360.component';


const routes: Routes = [
  {
    path:'instruments',
    component: InstrumentsComponent,
    data: {
      title: 'Gestión de instrumentos - GIEp',
    },
    resolve:{
      roles: CommonsListRolesResolver,
      units: CommonsListUnitsTypeResolver,
      categories: CommonsListCategoyTypeResolver,
      inputTypes: CommonsListInputTypeResolver,
      countries: CommonsListCountriesResolver,
      charges: CommonsListChargesResolver      
    }
  },
  {
    path:'evaluations',
    component: EvaluationsComponent,
    data: {
      title: 'Gestión de evaluaciones - GIEp',
    },
    resolve:{
      roles: CommonsListRolesResolver,
      units: CommonsListUnitsTypeResolver,
      categories: CommonsListCategoyTypeResolver,
      inputTypes: CommonsListInputTypeResolver,
      countries: CommonsListCountriesResolver,
      charges: CommonsListChargesResolver      
    }
  },
  {
    path:'evaluation/:id',
    component: EvaluationComponent,
    data: {
      title: 'Evalaución - GIEp',
    }
  },
  {
    path:'instruments360',
    component: Instruments360Component,
    data: {
      title: 'Gestión de instrumentos 360 - GIEp',
    },
    resolve:{
      roles: CommonsListRolesResolver,
      units: CommonsListUnitsTypeResolver,
      categories: CommonsListCategoyTypeResolver,
      inputTypes: CommonsListInputTypeResolver,
      countries: CommonsListCountriesResolver,
      charges: CommonsListChargesResolver      
    }
  },
  {
    path:'evaluations360',
    component: Evaluations360Component,
    data: {
      title: 'Gestión de evaluaciones 360 - GIEp',
    },
    resolve:{
      roles: CommonsListRolesResolver,
      units: CommonsListUnitsTypeResolver,
      categories: CommonsListCategoyTypeResolver,
      inputTypes: CommonsListInputTypeResolver,
      countries: CommonsListCountriesResolver,
      charges: CommonsListChargesResolver      
    }
  },
  {
    path:'evaluation360/:id',
    component: Evaluation360Component,
    data: {
      title: 'Evalaución 360 - GIEp',
    }
  }
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EvaluationInstrumentsRoutingModule { }
