
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BaseComponent } from './components/base/base.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { DataTablesModule } from 'angular-datatables';
import { NgxPaginationModule } from 'ngx-pagination';
import { PagerComponent } from './components/pager/pager.component';
import { NgbModule, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { TagInputModule } from 'ngx-chips';
import { MustMatchDirective } from './directive/must-match.directive';
import { BoxInstrumentsComponent } from './components/box-instruments/box-instruments.component';
import { BoxMessageComponent } from './components/box-message/box-message.component';
import { BoxUtilViewsComponent } from './components/box-util-views/box-util-views.component';
import { ModalConfirmComponent } from './components/modal-confirm/modal-confirm.component';
import { CountdownConfig, CountdownGlobalConfig, CountdownModule } from 'ngx-countdown';
import { NgxPermissionsModule } from 'ngx-permissions';

export function countdownConfigFactory(): CountdownConfig {
  return {};
}


@NgModule({
  declarations: [BaseComponent, PagerComponent, MustMatchDirective, BoxInstrumentsComponent, BoxMessageComponent, BoxUtilViewsComponent, ModalConfirmComponent],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule,
    NgxDatatableModule,
    DataTablesModule,
    NgxPaginationModule,
    NgbPaginationModule,
    NgbModule,
    LazyLoadImageModule,
    TagInputModule,
    CountdownModule,
    NgxPermissionsModule.forChild()
  ],
  exports:[
    FormsModule,
    ReactiveFormsModule,
    BaseComponent,
    NgxDatatableModule,
    DataTablesModule,
    PagerComponent,
    NgxPaginationModule,
    NgbPaginationModule,
    NgbModule,
    NgSelectModule,
    LazyLoadImageModule,
    TagInputModule,
    MustMatchDirective,
    BoxInstrumentsComponent,
    BoxMessageComponent,
    BoxUtilViewsComponent,
    ModalConfirmComponent,
    NgxPermissionsModule
  ],
  providers:[
    { provide: CountdownGlobalConfig, useFactory: countdownConfigFactory }
  ]

})
export class SharedModule { }
