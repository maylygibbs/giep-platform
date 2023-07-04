import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ResultsComponent } from './components/results/results.component';
import { CommonsListCategoyTypeResolver, CommonsListCountriesResolver, CommonsListInstrumentsResolver } from '../../../core/resolvers/commons.resolver';

const routes: Routes = [
  {
    path: '',
    component: ResultsComponent,
    data: {
      title: 'Resultados de evaluación - GIEp',
    },
    resolve:{
      instruments: CommonsListInstrumentsResolver,
      countries: CommonsListCountriesResolver,
      categories: CommonsListCategoyTypeResolver
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ResultsRoutingModule { }
