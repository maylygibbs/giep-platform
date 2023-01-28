import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ResultsRoutingModule } from './results-routing.module';
import { ByCategoryComponent } from './components/by-category/by-category.component';
import { ByQuestionsComponent } from './components/by-questions/by-questions.component';
import { NgApexchartsModule } from 'ng-apexcharts';
import { ByCounterComponent } from './components/by-counter/by-counter.component';
import { ResultsComponent } from './components/results/results.component';
import { SharedModule } from '../../shared/shared.module';


@NgModule({
  declarations: [
    ByCategoryComponent,
    ByQuestionsComponent,
    ByCounterComponent,
    ResultsComponent
  ],
  imports: [
    CommonModule,
    ResultsRoutingModule,
    NgApexchartsModule,
    SharedModule
  ]
})
export class ResultsModule { }
