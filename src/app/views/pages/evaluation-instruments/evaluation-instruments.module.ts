import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EvaluationInstrumentsRoutingModule } from './evaluation-instruments-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { InstrumentsComponent } from './components/instruments/instruments.component';
import { InstrumentStoreComponent } from './components/instrument-store/instrument-store.component';
import { BoxSectionBuilderComponent } from './components/box-section-builder/box-section-builder.component';
import { BoxQuestionBuilderComponent } from './components/box-question-builder/box-question-builder.component';


@NgModule({
  declarations: [
    InstrumentsComponent,
    InstrumentStoreComponent,
    BoxSectionBuilderComponent,
    BoxQuestionBuilderComponent],
  imports: [
    CommonModule,
    EvaluationInstrumentsRoutingModule,
    SharedModule
  ]
})
export class EvaluationInstrumentsModule { }
