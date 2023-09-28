import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

//import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";

import { ProjectsRoutingModule } from './projects-routing.module';
import { ProjectsComponent } from './components/projects/projects.component';
import { SharedModule } from '../../shared/shared.module';
import { ProjectStoreComponent } from './components/project-store/project-store.component';

import { FullCalendarModule } from '@fullcalendar/angular'; // for FullCalendar!
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import interactionPlugin from '@fullcalendar/interaction';


import { BoardDndComponent } from "./components/board-dnd/board-dnd.component";
import { SimpleDivComponent } from "./components/simple-div/simple-div.component";
import { DragDropModule } from "@angular/cdk/drag-drop";
import { BoardDndListComponent } from './components/board-dnd-list/board-dnd-list.component';

import { AppComponent } from "../../../../app/app.component";
import { NewspringComponent } from './components/modal/newspring/newspring.component';
import { ProjectDashboardComponent } from './components/project-dashboard/project-dashboard.component';
import { MembersComponent } from './components/members/members.component';
import { SettingsComponent } from './components/settings/settings.component';

FullCalendarModule.registerPlugins([
  dayGridPlugin,
  timeGridPlugin,
  listPlugin,
  interactionPlugin
])
 
@NgModule({
  declarations: [
    ProjectsComponent,
    ProjectStoreComponent,
    BoardDndComponent,
    SimpleDivComponent,
    BoardDndListComponent,
    NewspringComponent,
    ProjectDashboardComponent,
    MembersComponent,
    SettingsComponent
  ],bootstrap: [AppComponent],
  imports: [
    CommonModule,
    ProjectsRoutingModule,
    SharedModule,
    FullCalendarModule, // import the FullCalendar module! will make the FullCalendar component available
    FormsModule, DragDropModule

  ]
})
export class ProjectsModule { }
