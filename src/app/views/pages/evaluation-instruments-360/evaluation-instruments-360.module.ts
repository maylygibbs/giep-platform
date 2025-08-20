import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { EvaluationInstruments360RoutingModule } from './evaluation-instruments-360-routing.module';
import { Evaluations360Component } from '../evaluation-instruments-360/components/evaluations360/evaluations360.component';
import { Evaluation360Component } from '../evaluation-instruments-360/components/evaluation360/evaluation360.component';
import { Instruments360Component } from '../evaluation-instruments-360/components/instruments360/instruments360.component';
import { Instrument360StoreComponent } from '../evaluation-instruments-360/components/instrument360-store/instrument360-store.component';
import { EvaluationCategoriesComponent } from '../evaluation-instruments-360/components/categories/categories.component';
import { EvaluationCategoryStoreComponent } from '../evaluation-instruments-360/components/category-store/category-store.component';
import { CompetenciesUnitChargeDomainComponent } from '../evaluation-instruments-360/components/competencies-unit-charge-domain/competencies-unit-charge-domain.component';
import { CompetenciesUnitChargeDomainStoreComponent } from '../evaluation-instruments-360/components/competencies-unit-charge-domain-store/competencies-unit-charge-domain-store.component';
import { BoxSectionBuilderComponent } from './components/box-section-builder/box-section-builder.component';
import { BoxQuestionBuilderComponent } from './components/box-question-builder/box-question-builder.component';
import { UsersToEvaluateComponent } from './components/users-to-evaluate/users-to-evaluate.component';



@NgModule({
  declarations: [
    BoxSectionBuilderComponent,
    BoxQuestionBuilderComponent,
    Evaluations360Component,
    Evaluation360Component,
    Instruments360Component,
    Instrument360StoreComponent,
    EvaluationCategoriesComponent,
    EvaluationCategoryStoreComponent,
    CompetenciesUnitChargeDomainComponent,
    CompetenciesUnitChargeDomainStoreComponent,
    UsersToEvaluateComponent
  ],
  imports: [
    CommonModule,
    EvaluationInstruments360RoutingModule,
    SharedModule
  ]
})
export class EvaluationInstruments360Module { }
