import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InstrumentsComponent } from './components/instruments/instruments.component';
import { CommonsListCategoyTypeResolver, CommonsListChargesResolver, CommonsListCountriesResolver, CommonsListInputTypeResolver, CommonsListInstrumentsResolver, CommonsListLevelsResolver, CommonsListRolesResolver, CommonsListUnitsTypeResolver } from './../../../core/resolvers/commons.resolver';

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
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EvaluationInstrumentsRoutingModule { }
