import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BaseComponent } from './components/base/base.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { DataTablesModule } from 'angular-datatables';



@NgModule({
  declarations: [BaseComponent],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule,
    NgxDatatableModule,
    DataTablesModule
  ],
  exports:[
    FormsModule,
    ReactiveFormsModule,
    BaseComponent,
    NgxDatatableModule,
    DataTablesModule
  ]

})
export class SharedModule { }
