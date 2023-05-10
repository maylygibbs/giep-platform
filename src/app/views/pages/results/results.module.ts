import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ResultsRoutingModule } from './results-routing.module';
import { NgApexchartsModule } from 'ng-apexcharts';

import { ResultsComponent } from './components/results/results.component';
import { SharedModule } from '../../shared/shared.module';


@NgModule({
  declarations: [
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
