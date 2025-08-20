import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InstrumentsComponent } from './components/instruments/instruments.component';
import { CommonsListCategoyTypeResolver, CommonsListChargesResolver, CommonsListChargesTiposResolver, CommonsListCompetencies360Resolver, CommonsListCountriesResolver, CommonsListDomainLevels360Resolver, CommonsListInputTypeResolver, CommonsListInstrumentEva360TypesResolver, CommonsListInstrumentsResolver, CommonsListLevelsResolver, CommonsListRolesResolver, CommonsListUnits360Resolver, CommonsListUnitsTypeResolver } from './../../../core/resolvers/commons.resolver';
import { EvaluationsComponent } from './components/evaluations/evaluations.component';
import { EvaluationComponent } from './components/evaluation/evaluation.component';


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
      title: 'Gestión de evaluaciones - GIEp'
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
      title: 'Evalaución - GIEp'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EvaluationInstrumentsRoutingModule { }
