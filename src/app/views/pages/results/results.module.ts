import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ResultsRoutingModule } from './results-routing.module';
import { ByCategoryComponent } from './components/by-category/by-category.component';
import { ByQuestionsComponent } from './components/by-questions/by-questions.component';
import { NgApexchartsModule } from 'ng-apexcharts';


@NgModule({
  declarations: [
    ByCategoryComponent,
    ByQuestionsComponent
  ],
  imports: [
    CommonModule,
    ResultsRoutingModule,
    NgApexchartsModule
  ]
})
export class ResultsModule { }
