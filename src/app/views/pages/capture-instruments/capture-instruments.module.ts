import { SharedModule } from './../../shared/shared.module';
import { CaptureInstrumentsRoutingModule } from './capture-instruments-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputsComponent } from './components/inputs/inputs.component';
import { InstrumentsComponent } from './components/instruments/instruments.component';
import { InputStoreComponent } from './components/input-store/input-store.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { CategoryStoreComponent } from './components/category-store/category-store.component';
import { UnitsComponent } from './components/units/units.component';
import { UnitStoreComponent } from './components/unit-store/unit-store.component';
import { InstrumentStoreComponent } from './components/instrument-store/instrument-store.component';
import { BoxSectionBuilderComponent } from './components/box-section-builder/box-section-builder.component';
import { BoxQuestionBuilderComponent } from './components/box-question-builder/box-question-builder.component';
import { UsersComponent } from './components/users/users.component';
import { DROPZONE_CONFIG, DropzoneConfigInterface, DropzoneModule } from 'ngx-dropzone-wrapper';


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
    InputsComponent,
    InstrumentsComponent,
    InputStoreComponent,
    CategoriesComponent,
    CategoryStoreComponent,
    UnitsComponent,
    UnitStoreComponent,
    InstrumentStoreComponent,
    BoxSectionBuilderComponent,
    BoxQuestionBuilderComponent,
    UsersComponent
  ],
  imports: [
    CommonModule,
    CaptureInstrumentsRoutingModule,
    SharedModule,
    DropzoneModule,
  ],
  providers: [
    {
      provide: DROPZONE_CONFIG,
      useValue: DEFAULT_DROPZONE_CONFIG
    }, // Ngx-dropzone-wrapper
  ]
})
export class CaptureInstrumentsModule { }
