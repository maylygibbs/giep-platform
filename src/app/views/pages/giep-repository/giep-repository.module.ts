import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GiepRepositoryRoutingModule } from './giep-repository-routing.module';
import { DocumentsComponent } from './components/documents/documents.component';


@NgModule({
  declarations: [
    DocumentsComponent
  ],
  imports: [
    CommonModule,
    GiepRepositoryRoutingModule
  ]
})
export class GiepRepositoryModule { }
