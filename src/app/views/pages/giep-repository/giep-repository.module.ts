import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GiepRepositoryRoutingModule } from './giep-repository-routing.module';
import { DocumentsComponent } from './components/documents/documents.component';
// Ngx-dropzone-wrapper
import { DropzoneModule } from 'ngx-dropzone-wrapper';
import { DROPZONE_CONFIG } from 'ngx-dropzone-wrapper';
import { DropzoneConfigInterface } from 'ngx-dropzone-wrapper';
import { SharedModule } from '../../shared/shared.module';
import { DndDirective } from './directives/dnd.directive';
const DEFAULT_DROPZONE_CONFIG: DropzoneConfigInterface = {
  // Change this to your upload POST address:
  url: 'https://httpbin.org/post',
  maxFilesize: 2,
  paramName: "file",
  ignoreHiddenFiles:false,  
  accept: function(file, done) {
    if (file.name == "justinbieber.jpg") {
      done("Naha, you don't.");
    }
    else { done(); }
  }
};


@NgModule({
  declarations: [
    DocumentsComponent,
    DndDirective
  ],
  imports: [
    CommonModule,
    SharedModule,
    GiepRepositoryRoutingModule,
    DropzoneModule, // Ngx-dropzone-wrapper
  ],
  providers: [
    {
      provide: DROPZONE_CONFIG,
      useValue: DEFAULT_DROPZONE_CONFIG
    }, // Ngx-dropzone-wrapper
  ]
})
export class GiepRepositoryModule { }
