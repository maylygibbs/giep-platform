import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StaexpedRoutingModule } from './staexped-routing.module';
import { StaexpedComponent } from './components/staexped/staexped.component';
import { NgApexchartsModule } from 'ng-apexcharts';
import { SharedModule } from '../../shared/shared.module';
import { ImageCropperModule } from 'ngx-image-cropper';
import { StaexpedStoreComponent } from './components/staexped-store/staexped-store.component';
@NgModule({
  declarations: [
    StaexpedComponent,
    StaexpedStoreComponent
  ],
  imports: [
    CommonModule,
    StaexpedRoutingModule,
    NgApexchartsModule,
    SharedModule,
    ImageCropperModule
  ]
})
export class StaexpedModule { }
