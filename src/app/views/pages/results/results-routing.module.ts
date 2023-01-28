import { ByQuestionsComponent } from './components/by-questions/by-questions.component';
import { ByCategoryComponent } from './components/by-category/by-category.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ByCounterComponent } from './components/by-counter/by-counter.component';
import { ResultsComponent } from './components/results/results.component';
import { CommonsListCountriesResolver, CommonsListInstrumentsResolver } from '../../../core/resolvers/commons.resolver';

const routes: Routes = [
  {
    path: '',
    component: ResultsComponent,
    data: {
      title: 'Resultados de evaluación - GIEp',
    },
    resolve:{
      instruments: CommonsListInstrumentsResolver,
      countries: CommonsListCountriesResolver
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ResultsRoutingModule { }
