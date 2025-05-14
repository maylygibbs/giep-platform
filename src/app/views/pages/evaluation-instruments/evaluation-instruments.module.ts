import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EvaluationInstrumentsRoutingModule } from './evaluation-instruments-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { InstrumentsComponent } from './components/instruments/instruments.component';
import { InstrumentStoreComponent } from './components/instrument-store/instrument-store.component';
import { BoxSectionBuilderComponent } from './components/box-section-builder/box-section-builder.component';
import { BoxQuestionBuilderComponent } from './components/box-question-builder/box-question-builder.component';
import { EvaluationsComponent } from './components/evaluations/evaluations.component';
import { EvaluationComponent } from './components/evaluation/evaluation.component';
import { Evaluations360Component } from './components/evaluations360/evaluations360.component';
import { Evaluation360Component } from './components/evaluation360/evaluation360.component';
import { Instruments360Component } from './components/instruments360/instruments360.component';
import { Instrument360StoreComponent } from './components/instrument360-store/instrument360-store.component';
import { EvaluationCategoriesComponent } from './components/categories/categories.component';
import { EvaluationCategoryStoreComponent } from './components/category-store/category-store.component';
import { CompetenciesUnitChargeDomainComponent } from './components/competencies-unit-charge-domain/competencies-unit-charge-domain.component';
import { CompetenciesUnitChargeDomainStoreComponent } from './components/competencies-unit-charge-domain-store/competencies-unit-charge-domain-store.component';


@NgModule({
  declarations: [
    InstrumentsComponent,
    InstrumentStoreComponent,
    BoxSectionBuilderComponent,
    BoxQuestionBuilderComponent,
    EvaluationsComponent,
    EvaluationComponent,
    Evaluations360Component,
    Evaluation360Component,
    Instruments360Component,
    Instrument360StoreComponent,
    EvaluationCategoriesComponent,
    EvaluationCategoryStoreComponent,
    CompetenciesUnitChargeDomainComponent,
    CompetenciesUnitChargeDomainStoreComponent
  ],
  imports: [
    CommonModule,
    EvaluationInstrumentsRoutingModule,
    SharedModule
  ]
})
export class EvaluationInstrumentsModule { }
