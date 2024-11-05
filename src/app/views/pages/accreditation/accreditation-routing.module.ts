import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccreditationComponent } from './accreditation.component';
import { CalendarComponent } from './calendar/calendar.component';
import { CommonsListColorsCalendarResolver, CommonsListUsersEmailsResolver, CommonsListAccreditationTypeResolver, CommonsListInstrumentEvaResolver, CommonsListInstrumentCapResolver } from '../../../core/resolvers/commons.resolver';
import { PrintAccreditationComponent } from './print-accreditation/print-accreditation.component';
import { ScanqrComponent } from './scanqr/scanqr.component';
import { AccreditationDetailComponent } from './accreditation-detail/accreditation-detail.component';
import { AccreditationstypesComponent } from './accreditationstypes/accreditationstypes.component';
import { AttendanceReportComponent } from './attendance-report/attendance-report.component';

const routes: Routes = [  {
  path: '',
  component: AccreditationComponent,
  children: [
    {
      path: '',
      redirectTo: 'calendar',
      pathMatch: 'full',
    },
    {
      path: 'calendar',
      component: CalendarComponent,
      resolve:{
        colors: CommonsListColorsCalendarResolver,
        users: CommonsListUsersEmailsResolver,
        accreditationType: CommonsListAccreditationTypeResolver,
        instrumentCaplist: CommonsListInstrumentCapResolver,
        instrumentEvalist: CommonsListInstrumentEvaResolver
      }
    },
    {
      path: 'print',
      component: PrintAccreditationComponent,
    },
    {
      path: 'scanqr',
      component: ScanqrComponent,
    },
    {
      path: 'detail',
      component: AccreditationDetailComponent,
    },
    {
      path: 'types',
      component: AccreditationstypesComponent,
    },
    {
      path: 'report',
      component: AttendanceReportComponent
    }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccreditationRoutingModule { }
