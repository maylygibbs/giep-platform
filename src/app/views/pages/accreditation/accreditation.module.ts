import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccreditationRoutingModule } from './accreditation-routing.module';
import { AccreditationComponent } from './accreditation.component';
import { CalendarComponent } from './calendar/calendar.component';
import { FormsModule } from '@angular/forms';
import { FullCalendarModule } from '@fullcalendar/angular';
import { NgbCollapseModule, NgbDropdownModule, NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { SharedModule } from '../../shared/shared.module';
import { PrintAccreditationComponent } from './print-accreditation/print-accreditation.component';
import { DROPZONE_CONFIG, DropzoneConfigInterface, DropzoneModule } from 'ngx-dropzone-wrapper';
import { DndDirective } from './directives/dnd.directive';
import { QRCodeModule } from 'angularx-qrcode';
import { ColorPickerModule } from 'ngx-color-picker';
import { ScanqrComponent } from './scanqr/scanqr.component';
import { AccreditationDetailComponent } from './accreditation-detail/accreditation-detail.component';


const DEFAULT_DROPZONE_CONFIG: DropzoneConfigInterface = {
  // Change this to your upload POST address:
  url: 'https://httpbin.org/post',
  maxFilesize: 10,
  paramName: "file",
  ignoreHiddenFiles:true,  
  accept: function(file, done) {
    if (file.name == "justinbieber.jpg") {
      done("Naha, you don't.");
    }
    else { done(); }
  }
};






@NgModule({
  declarations: [
    AccreditationComponent,
    CalendarComponent,
    PrintAccreditationComponent,
    ScanqrComponent,
    AccreditationDetailComponent
  ],
  imports: [
    CommonModule,
    AccreditationRoutingModule,
    FormsModule,
    FullCalendarModule,
    NgbDropdownModule,
    NgbNavModule,
    NgbCollapseModule,
    NgSelectModule,
    SharedModule,
    DropzoneModule, // Ngx-dropzone-wrapper
    QRCodeModule,
    ColorPickerModule
  ],
  providers: [
    {
      provide: DROPZONE_CONFIG,
      useValue: DEFAULT_DROPZONE_CONFIG
    }, // Ngx-dropzone-wrapper
  ]
})
export class AccreditationModule { }
